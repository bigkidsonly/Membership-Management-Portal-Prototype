import traceback

from flask import Blueprint, jsonify, request
from flask_security import current_user
from sqlalchemy import func
from utilities.models import (
    Data_Owners,
    Data_Sharing_Relationship,
    TMC_Organization,
    TMC_Organization_Contacts,
    TMC_Organization_Tags,
    db,
)
from utilities.tmc_logger import tmc_logger

bp = Blueprint("api", __name__, url_prefix="/api")


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
            name=payload["organizationName"],
            data_owner_id=next_data_owner_id,
            google_group_name=payload["googleGroupName"],
            haven_project_name=payload["havenProjectName"],
            organization_type=payload["organizationType"],
            organization_size=payload.get("organizationSize"),
            location=payload.get("location"),
            join_date=payload["joinDate"],
            domain=payload.get("domain"),
            website=payload.get("website"),
            slack_channel=payload.get("slackChannel"),
            logo=payload.get("logo"),
        )

        tmc_logger.info(f"Adding organization: {org.name}")
        db.session.add(org)
        db.session.commit()

        if payload["organizationType"] == "Affiliate":
            national_member = (
                db.session.query(TMC_Organization)
                .filter(TMC_Organization.id == payload["nationalMemberId"])
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
        # TODO - Make this sustainable
        data_owner_code = "".join([x[0].upper() for x in org.name.split(" ")])
        if org.organization_type == "Affiliate":
            data_owner_code = f"A_{data_owner_code}"

        data_owner = Data_Owners(
            data_owner_id=org.data_owner_id, data_owner_code=data_owner_code
        )

        tmc_logger.info(f"Adding data owner: {data_owner.data_owner_code}")
        db.session.add(data_owner)
        db.session.commit()

        # Add the point-of-contact record
        point_of_contact = TMC_Organization_Contacts(
            organization_id=org.id,
            contact_email=payload["contactEmail"],
            contact_name=payload["contactName"],
            contact_phone=payload["contactPhone"],
            contact_title=payload["contactTitle"],
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


@bp.route("/organization/affiliates/<affiliate_id>", methods=["GET"])
def get_single_affiliate(affiliate_id: int):
    """
    Endpoint to get a single affiliate organization by ID.
    """

    if not current_user.is_authenticated:
        return jsonify({"error": "Unauthorized", "status_code": 401})

    affiliate = (
        db.session.query(TMC_Organization)
        .filter(
            TMC_Organization.id == affiliate_id,
            TMC_Organization.id.in_(current_user.accessible_organizations),
        )
        .first()
    )

    if not affiliate:
        return jsonify({"error": "Affiliate not found", "status_code": 404})

    return jsonify({"affiliate": affiliate.to_dict(), "status_code": 200})
