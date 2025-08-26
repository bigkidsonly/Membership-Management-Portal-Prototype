from flask import Blueprint, request
from utilities.models import Data_Shares, TMC_Organization, db

bp = Blueprint("api", __name__, url_prefix="/api")


@bp.route("/add-user", methods=["GET"])
def add_user():
    pass


@bp.route("/add-organization", methods=["GET"])
def add_organization():
    """
    Endpoint to add a new organization.
    """

    pass
