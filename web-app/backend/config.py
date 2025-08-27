import os

SECRET_KEY = os.environ["SECRET_KEY"]
PROD_RUN = os.environ.get("STAGE") == "prod"
SQLALCHEMY_DATABASE_URI = (
    "{DRIVER}://{USERNAME}:{PASSWORD}@{HOST}:{PORT}/{DATABASE}".format(
        DRIVER=os.getenv("DB_DRIVER", "postgresql"),
        USERNAME=(
            os.environ["DB_USERNAME"] if PROD_RUN else os.environ["DEV_DB_USERNAME"]
        ),
        PASSWORD=(
            os.environ["DB_PASSWORD"] if PROD_RUN else os.environ["DEV_DB_PASSWORD"]
        ),
        HOST=os.environ["DB_HOST"] if PROD_RUN else "host.docker.internal",
        PORT=os.environ["DB_PORT"] if PROD_RUN else 5432,
        DATABASE=(
            os.environ["DB_DATABASE"] if PROD_RUN else os.environ["DEV_DB_DATABASE"]
        ),
    )
)
SECURITY_LOGIN_URL = "/login"
