from datetime import datetime
from typing import List

from flask_security import RoleMixin, UserMixin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Boolean, DateTime, ForeignKey, Integer, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

#####

db = SQLAlchemy()


class TMC_Organization(db.Model):
    """
    This represents any organization in TMC's system - a member,
    affiliate, external party, etc.
    """

    __tablename__ = "organization"
    __table_args__ = {"schema": "tmc_dev"}

    id: Mapped[int] = mapped_column(Integer(), primary_key=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    data_owner_id: Mapped[int] = mapped_column(
        Integer(), autoincrement=True, unique=True
    )
    organization_type: Mapped[str] = mapped_column(String(100), nullable=False)

    created_at: Mapped[datetime] = mapped_column(DateTime, default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime, onupdate=func.now())
    deactivated_at: Mapped[datetime] = mapped_column(DateTime, nullable=True)

    domain: Mapped[str] = mapped_column(String(255), nullable=True)
    website: Mapped[str] = mapped_column(String(255), nullable=True)
    slack_channel: Mapped[str] = mapped_column(String(255), nullable=True)


class Data_Shares(db.Model):
    """
    This maps data sharing agreements between organizations.
    """

    __tablename__ = "data_shares"
    __table_args__ = {"schema": "tmc_dev"}

    id: Mapped[int] = mapped_column(Integer(), primary_key=True)
    granting_data_owner_id: Mapped[int] = mapped_column(
        Integer(), ForeignKey(TMC_Organization.id), nullable=False
    )
    receiving_data_owner_id: Mapped[int] = mapped_column(
        Integer(), ForeignKey("tmc_dev.organization.id"), nullable=False
    )
    receiving_data_owner_id: Mapped[int] = mapped_column(
        Integer(), ForeignKey("tmc_dev.organization.id"), nullable=False
    )
    grant_national: Mapped[bool] = mapped_column(Boolean(), default=False)

    created_at: Mapped[datetime] = mapped_column(DateTime, default=func.now())
    deactivated_at: Mapped[datetime] = mapped_column(DateTime, nullable=True)


### Conventional Access Control Tables


class Role(db.Model, RoleMixin):
    __tablename__ = "role"
    __table_args__ = {"schema": "tmc_dev"}

    id: Mapped[int] = mapped_column(Integer(), primary_key=True)
    name: Mapped[str] = mapped_column(String(80), unique=True)
    description: Mapped[str] = mapped_column(String(255))


class User(db.Model, UserMixin):
    __tablename__ = "user"
    __table_args__ = {"schema": "tmc_dev"}

    id: Mapped[int] = mapped_column(Integer(), primary_key=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(255), nullable=False)
    active: Mapped[bool] = mapped_column(Boolean(), default=True)
    confirmed_at: Mapped[datetime] = mapped_column(db.DateTime())
    roles: Mapped[List["Role"]] = relationship(
        "Role", secondary="user_roles", backref=db.backref("users", lazy="dynamic")
    )
