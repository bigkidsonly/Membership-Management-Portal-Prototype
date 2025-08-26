import os

SECRET_KEY = os.environ["SECRET_KEY"]
SQLALCHEMY_DATABASE_URI = (
    "{DRIVER}://{USERNAME}:{PASSWORD}@{HOST}:{PORT}/{DATABASE}".format(
        DRIVER=os.getenv("DB_DRIVER", "postgresql"),
        USERNAME=os.environ["DB_USERNAME"],
        PASSWORD=os.environ["DB_PASSWORD"],
        HOST=os.environ["DB_HOST"],
        PORT=os.environ["DB_PORT"],
        DATABASE=os.environ["DB_DATABASE"],
    )
)
