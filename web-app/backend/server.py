from flask import Flask
from utilities.models import db

api = Flask(__name__)
api.config.from_object("config")

db.init_app(api)


### Register routes

from routes import core_bp

api.register_blueprint(core_bp)
