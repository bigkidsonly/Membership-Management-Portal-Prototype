from flask import Blueprint, render_template

bp = Blueprint("core", __name__)


@bp.route("/")
def home():
    return render_template("core/home.html")
