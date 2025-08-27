from flask import Blueprint, render_template
from flask_security import login_required, current_user

bp = Blueprint("core", __name__)


@bp.route("/")
@login_required
def home():
    if not current_user.is_authenticated:
        return render_template("auth/login.html")

    return render_template("index.html")
