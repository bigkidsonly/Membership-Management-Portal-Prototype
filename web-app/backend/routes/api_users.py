import traceback
from uuid import uuid4

from flask import Blueprint, jsonify, request
from flask_security import current_user
from utilities.models import TMC_Organization, User, db
from utilities.tmc_logger import tmc_logger

bp = Blueprint("api_users", __name__, url_prefix="/api/users")


@bp.route("/add")
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


@bp.route("/list")
def list_users():
    """
    Lists all users in the current user's constellation of organizations.
    """

    if not current_user.is_authenticated:
        return jsonify({"error": "User not authenticated", "status_code": 401})

    users = (
        db.session.query(
            User,
            TMC_Organization.name.label("organization_name"),
        )
        .filter(User.organization_id.in_(current_user.accessible_organizations))
        .join(TMC_Organization, TMC_Organization.id == User.organization_id)
        .all()
    )

    # Each item in users is a tuple: (User, organization_name)
    users_serialized = [
        {
            **user.to_dict(),  # Assumes User model has a to_dict() method
            "organization_name": organization_name,
        }
        for user, organization_name in users
    ]

    return jsonify({"users": users_serialized, "status_code": 200})


@bp.route("/me")
def get_current_user():
    """
    Endpoint to get the current user's information.
    """

    if not current_user.is_authenticated:
        return jsonify({"error": "User not authenticated", "status_code": 401})

    associated_national_member = (
        db.session.query(TMC_Organization)
        .filter(TMC_Organization.id == current_user.organization_id)
        .first()
    )

    user_info = {
        "id": current_user.id,
        "email": current_user.email,
        "name": current_user.name,
        "organization_id": current_user.organization_id,
        "first_name": current_user.name.split(" ")[0],
        "national_member": associated_national_member.to_dict(),
    }

    return jsonify({"user": user_info, "status_code": 200})
