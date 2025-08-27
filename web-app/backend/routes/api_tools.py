from flask import Blueprint, jsonify, request
from utilities.models import Tool_Categories, Tool_Tags, Tools, Vendor, db
from utilities.tmc_logger import tmc_logger

bp = Blueprint("api_tools", __name__, url_prefix="/api/tools")


@bp.route("/get-all-tools", methods=["GET"])
def get_all_tools():
    """
    Endpoint to get all tools.
    """

    tools = Tools.query.all()

    return jsonify({"tools": [tool.to_dict() for tool in tools], "status_code": 200})
