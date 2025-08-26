from datetime import datetime
from typing import List

from flask_security import RoleMixin, UserMixin
from sqlalchemy import Boolean, Integer, String, ForeignKey, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .organization import TMC_Organization

from .database import db


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
    organization_id: Mapped[int] = mapped_column(
        Integer(), ForeignKey(TMC_Organization.id), nullable=False
    )
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    active: Mapped[bool] = mapped_column(Boolean(), default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(), default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(), onupdate=func.now())
    deactivated_at: Mapped[datetime] = mapped_column(DateTime(), nullable=True)
    roles: Mapped[List["Role"]] = relationship(
        "Role", secondary="user_roles", backref=db.backref("users", lazy="dynamic")
    )


class User_Roles(db.Model):
    __tablename__ = "user_roles"
    __table_args__ = {"schema": "tmc_dev"}

    id: Mapped[int] = mapped_column(Integer(), primary_key=True)
    user_id: Mapped[int] = mapped_column(Integer(), ForeignKey(User.id))
    role_id: Mapped[int] = mapped_column(Integer(), ForeignKey(Role.id))
