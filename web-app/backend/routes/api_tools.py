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


@bp.route("/add", methods=["POST"])
def add_tool():
    """
    Endpoint to add a new tool.
    """

    data = request.get_json()

    tmc_logger.info(f"Adding {data['name']} to the database")
    new_tool = Tools(**data)
    db.session.add(new_tool)
    db.session.commit()

    return jsonify({"message": "Tool added successfully", "status_code": 201})
