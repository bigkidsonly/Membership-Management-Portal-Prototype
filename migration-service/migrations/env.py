import os
import sys

sys.path.append(os.path.abspath(os.path.join("..", "web-app", "backend")))

import logging
from logging.config import fileConfig

from alembic import context
from sqlalchemy import create_engine, text
from utilities.models.database import db

####

logging.basicConfig(level=logging.DEBUG)

config = context.config
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

target_metadata = db.Model.metadata
sqlalchemy_url = (
    "postgresql://{user}:{password}@{host}:{port}/{dbname}?sslmode=require".format(
        user=os.environ["DB_USERNAME"],
        password=os.environ["DB_PASSWORD"],
        host=os.environ["DB_HOST"],
        port=int(os.environ["DB_PORT"]),
        dbname=os.environ["DB_DATABASE"],
    )
)


def run_migrations_offline() -> None:
    """
    Run migrations in 'offline' mode.

    This configures the context with just a URL
    and not an Engine, though an Engine is acceptable
    here as well.  By skipping the Engine creation
    we don't even need a DBAPI to be available.

    Calls to context.execute() here emit the given string to the
    script output.

    """

    context.configure(
        url=sqlalchemy_url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """
    Run migrations in 'online' mode.

    In this scenario we need to create an Engine
    and associate a connection with the context.
    This version sets the search_path to a specific schema.
    """

    connectable = create_engine(sqlalchemy_url)

    with connectable.begin() as connection:
        connection.execute(text("SET search_path TO tmc_dev"))
        context.configure(connection=connection, target_metadata=target_metadata)

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
