from flask import Blueprint, request
from sqlalchemy import func
from utilities.models import (
    Data_Owners,
    TMC_Organization,
    TMC_Organization_Contacts,
    Data_Sharing_Relationship,
    User,
    db,
)
from utilities.tmc_logger import tmc_logger
import traceback
from uuid import uuid4

bp = Blueprint("api", __name__, url_prefix="/api")


@bp.route("/add-user", methods=["POST"])
def add_user():
    """
    Endpoint to add a new user to the TMC web app
    """

    payload = request.get_json()

    try:
        new_user = User(
            organization_id=payload["organization_id"],
            email=payload["email"],
            name=payload["name"],
            fs_uniquifier=uuid4().hex,
        )

        tmc_logger.info(f"Adding user: {new_user.email}")
        db.session.add(new_user)
        db.session.commit()

    except Exception as e:
        traceback.print_exc()
        tmc_logger.error(f"Error adding user: {e}")
        db.session.rollback()

        return {"error": str(e), "status_code": 400}

    return {"message": "Success", "status_code": 200}


@bp.route("/add-organization", methods=["POST"])
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
            domain=payload.get("domain"),
            website=payload.get("website"),
            slack_channel=payload.get("slack_channel"),
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

    except Exception as e:
        traceback.print_exc()
        tmc_logger.error(f"Error adding organization: {e}")
        db.session.rollback()
        return {"error": str(e), "status_code": 400}

    return {"message": "Success", "status_code": 200}
