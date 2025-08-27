import traceback
from uuid import uuid4

from flask import Blueprint, jsonify, request
from flask_security import current_user
from sqlalchemy import func
from utilities.models import (
    Data_Owners,
    Data_Sharing_Relationship,
    TMC_Organization,
    TMC_Organization_Contacts,
    TMC_Organization_Tags,
    User,
    db,
)
from utilities.tmc_logger import tmc_logger

bp = Blueprint("api", __name__, url_prefix="/api")


@bp.route("/users/add", methods=["POST"])
def add_user():
    """
    Endpoint to add a new user to the TMC web app
    """

    # NOTE - This is a POST request coming in from
    # the React app
    payload = request.get_json()

    try:
        # Create a new User record
        new_user = User(
            organization_id=payload["organization_id"],
            email=payload["email"],
            name=payload["name"],
            fs_uniquifier=uuid4().hex,
        )

        tmc_logger.info(f"Adding user: {new_user.email}")

        # Add it to PG
        db.session.add(new_user)
        db.session.commit()

    except Exception as e:
        traceback.print_exc()
        tmc_logger.error(f"Error adding user: {e}")
        db.session.rollback()

        return jsonify({"error": str(e), "status_code": 400})

    return jsonify({"message": "Success", "status_code": 200})


@bp.route("/users/edit", methods=["POST"])
def edit_user():
    """
    Endpoint to edit an existing user in the TMC web app
    """

    # NOTE - this is a POST request coming in
    # from the React app
    payload = request.get_json()

    try:
        # Get the existing user record
        user = User.query.filter_by(id=payload["id"]).first()
        if not user:
            return jsonify({"error": "User not found", "status_code": 404})

        # Loop through the keys in the request
        # and update the User object where applicable
        for key in payload.keys():
            if hasattr(user, key):
                setattr(user, key, payload[key])
            else:
                tmc_logger.warning(f"User has no attribute {key}, skipping update...")

        tmc_logger.info(f"Finished editing user: {user.email}")
        db.session.commit()

    except Exception as e:
        traceback.print_exc()
        tmc_logger.error(f"Error editing user: {e}")
        db.session.rollback()

        return jsonify({"error": str(e), "status_code": 400})

    return jsonify({"message": "Success", "status_code": 200})


@bp.route("/users/deactivate", methods=["POST"])
def deactivate_user():
    """
    Endpoint to deactivate a user in the TMC web app.

    NOTE - we soft delete records only, this endpoint
    will update the `deactivated_at` field in the User record
    """

    payload = request.get_json()

    try:
        # Get the existing user record
        user = User.query.filter_by(id=payload["id"]).first()
        if not user:
            return jsonify({"error": "User not found", "status_code": 404})

        # Update the deactivated_at field
        user.deactivated_at = func.now()
        user.active = False
        db.session.commit()

    except Exception as e:
        traceback.print_exc()
        tmc_logger.error(f"Error deactivating user: {e}")
        db.session.rollback()

        return jsonify({"error": str(e), "status_code": 400})

    return jsonify({"message": "Success", "status_code": 200})


@bp.route("/organization/add", methods=["POST"])
def add_organization():
    """
    Endpoint to add a new organization.

    We expect an example payload to include the following:
    * Organization metadata
    * Best point of contact
    * Data owner code
    """

    payload = request.get_json()

    try:
        max_data_owner_id = db.session.query(
            func.max(TMC_Organization.data_owner_id)
        ).scalar()

        if not max_data_owner_id:
            next_data_owner_id = 1
        else:
            next_data_owner_id = max_data_owner_id + 1

        # Add the organization record
        org = TMC_Organization(
            name=payload["name"],
            data_owner_id=next_data_owner_id,
            google_group_name=payload["google_group_name"],
            haven_project_name=payload["haven_project_name"],
            organization_type=payload["organization_type"],
            organization_size=payload.get("organization_size"),
            join_date=payload["join_date"],
            domain=payload.get("domain"),
            website=payload.get("website"),
            slack_channel=payload.get("slack_channel"),
            logo=payload.get("logo"),
        )

        tmc_logger.info(f"Adding organization: {org.name}")
        db.session.add(org)
        db.session.commit()

        if "national_member_id" in payload.keys():
            national_member = (
                db.session.query(TMC_Organization)
                .filter(TMC_Organization.id == payload["national_member_id"])
                .first()
            )

            data_share = Data_Sharing_Relationship(
                granting_data_owner_id=org.data_owner_id,
                receiving_data_owner_id=national_member.data_owner_id,
                grant_national=True,
                description="Auto-granted member-affiliate data sharing agreement",
            )

            tmc_logger.info(
                f"Adding data sharing relationship between {org.name} and {national_member.name}"
            )
            db.session.add(data_share)
            db.session.commit()

        # Add the data owner record
        data_owner = Data_Owners(
            data_owner_id=org.data_owner_id, data_owner_code=payload["data_owner_code"]
        )

        tmc_logger.info(f"Adding data owner: {data_owner.data_owner_code}")
        db.session.add(data_owner)
        db.session.commit()

        # Add the point-of-contact record
        point_of_contact = TMC_Organization_Contacts(
            organization_id=org.id,
            contact_email=payload["contact_email"],
            contact_name=payload["contact_name"],
            contact_phone=payload["contact_phone"],
        )

        tmc_logger.info(f"Adding point of contact: {point_of_contact.contact_name}")
        db.session.add(point_of_contact)
        db.session.commit()

        if payload.get("movement_focus"):
            tmc_logger.info("Adding organization tags...")
            for tag_id in payload["movement_focus"]:
                organization_tag = TMC_Organization_Tags(
                    organization_id=org.id, tag_id=tag_id
                )
                db.session.add(organization_tag)
            db.session.commit()

    except Exception as e:
        traceback.print_exc()
        tmc_logger.error(f"Error adding organization: {e}")
        db.session.rollback()
        return jsonify({"error": str(e), "status_code": 400})

    return jsonify({"message": "Success", "status_code": 200})


@bp.route("/organization/edit", methods=["POST"])
def edit_organization():
    """
    Endpoint to edit an existing `TMC_Organization` record
    """

    payload = request.get_json()

    try:
        # Get the existing organization record
        org = TMC_Organization.query.filter_by(id=payload["id"]).first()
        if not org:
            return jsonify({"error": "Organization not found", "status_code": 404})

        # Update the organization fields
        # TODO - Should this loop through and `setattr()`?
        org.name = payload["name"]
        org.google_group_name = payload["google_group_name"]
        org.haven_project_name = payload["haven_project_name"]
        org.organization_type = payload["organization_type"]
        org.organization_size = payload.get("organization_size")
        org.join_date = payload["join_date"]
        org.domain = payload.get("domain")
        org.website = payload.get("website")
        org.slack_channel = payload.get("slack_channel")
        org.logo = payload.get("logo")

        db.session.commit()

    except Exception as e:
        traceback.print_exc()
        tmc_logger.error(f"Error editing organization: {e}")
        db.session.rollback()
        return jsonify({"error": str(e), "status_code": 400})

    return jsonify({"message": "Success", "status_code": 200})


@bp.route("/organization/all-affiliates", methods=["GET"])
def get_all_affiliates():
    """
    Endpoint to get affiliates for the current user.
    """

    if not current_user.is_authenticated:
        return jsonify({"error": "Unauthorized", "status_code": 401})

    # Check to see if the current user is a part of a National Member or not
    # If they are, return all affiliates
    # If they are not, return their own org
    current_user_org = (
        db.session.query(TMC_Organization)
        .filter(TMC_Organization.id == current_user.organization_id)
        .first()
        .organization_type
    )

    match current_user_org:
        case "National Member":
            affiliates = db.session.query(TMC_Organization).filter(
                TMC_Organization.id.in_(current_user.accessible_organizations)
            )
        case _:
            affiliates = (
                db.session.query(TMC_Organization)
                .filter(TMC_Organization.id == current_user.organization_id)
                .all()
            )

    return jsonify(
        {"affiliates": [org.to_dict() for org in affiliates], "status_code": 200}
    )
