from flask import Flask
from flask_security import Security, SQLAlchemyUserDatastore
from utilities.models import Role, User, db
from utilities.tmc_logger import tmc_logger

api = Flask(__name__, template_folder="assets", static_folder="assets")
api.config.from_object("config")
api.logger = tmc_logger

db.init_app(api)

### Register routes

from routes import api_membership_bp, api_tools_bp, auth_bp, core_bp

api.register_blueprint(core_bp)
api.register_blueprint(api_membership_bp)
api.register_blueprint(api_tools_bp)
api.register_blueprint(auth_bp)


user_datastore = SQLAlchemyUserDatastore(db, User, Role)
security = Security(api, user_datastore)
