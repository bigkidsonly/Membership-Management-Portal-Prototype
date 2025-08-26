from datetime import datetime

from sqlalchemy import DateTime, Integer, String, func
from sqlalchemy.orm import Mapped, mapped_column

from .database import db


class TMC_Organization(db.Model):
    __tablename__ = "organization"
    __table_args__ = {"schema": "tmc_dev"}

    id: Mapped[int] = mapped_column(Integer(), primary_key=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    data_owner_id: Mapped[int] = mapped_column(
        Integer(), autoincrement=True, unique=True
    )
    organization_type: Mapped[str] = mapped_column(String(100), nullable=False)
    organization_size: Mapped[str] = mapped_column(String(100), nullable=True)
    member_tier: Mapped[str] = mapped_column(String(100), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime, onupdate=func.now())
    deactivated_at: Mapped[datetime] = mapped_column(DateTime, nullable=True)
    domain: Mapped[str] = mapped_column(String(255), nullable=True)
    website: Mapped[str] = mapped_column(String(255), nullable=True)
    slack_channel: Mapped[str] = mapped_column(String(255), nullable=True)


class TMC_Organization_Contacts(db.Model):
    __tablename__ = "organization_contacts"
    __table_args__ = {"schema": "tmc_dev"}

    id: Mapped[int] = mapped_column(Integer(), primary_key=True)
    organization_id: Mapped[int] = mapped_column(
        Integer(), db.ForeignKey(TMC_Organization.id), nullable=False
    )
    contact_name: Mapped[str] = mapped_column(String(255), nullable=False)
    contact_email: Mapped[str] = mapped_column(String(255), nullable=False)
    contact_phone: Mapped[str] = mapped_column(String(50), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime, onupdate=func.now())
    deactivated_at: Mapped[datetime] = mapped_column(DateTime, nullable=True)


class TMC_Organization_Tags(db.Model):
    __tablename__ = "organization_tags"
    __table_args__ = {"schema": "tmc_dev"}

    organization_id: Mapped[int] = mapped_column(
        Integer(), db.ForeignKey(TMC_Organization.id), nullable=False
    )
    tag_id: Mapped[int] = mapped_column(
        Integer(), db.ForeignKey("tmc_dev.tags.id"), primary_key=True
    )
