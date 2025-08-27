from flask import Blueprint, redirect, render_template, request, url_for
from flask_security import login_user
from utilities.models import User, db

bp = Blueprint("auth", __name__)


@bp.route("/login", methods=["GET"])
def login():
    """
    Dummy route to login a user
    """

    return render_template("auth/login.html")


@bp.route("/login-user", methods=["POST"])
def login_user_route():
    """
    Route to login a user
    """

    user = db.session.query(User).filter(User.id == 1).first()
    login_user(user)

    return redirect(url_for("core.home"))
