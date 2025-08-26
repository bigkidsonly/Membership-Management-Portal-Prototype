from datetime import datetime

from sqlalchemy import Boolean, DateTime, Integer, String, func
from sqlalchemy.orm import Mapped, mapped_column

from .database import db


class Vendor(db.Model):
    __tablename__ = "vendors"
    __table_args__ = {"schema": "tmc_dev"}

    id: Mapped[int] = mapped_column(Integer(), primary_key=True)
    name: Mapped[str] = mapped_column(String(length=100), nullable=False)
    slug: Mapped[str] = mapped_column(String(length=100), nullable=False)
    logo_url: Mapped[str] = mapped_column(String(length=255), nullable=False)
    description: Mapped[str] = mapped_column(String(length=255), nullable=False)
    website_url: Mapped[str] = mapped_column(String(length=255), nullable=False)
    partnership_tier: Mapped[int] = mapped_column(Integer(), nullable=False)
    tool_count: Mapped[int] = mapped_column(Integer(), nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(), nullable=False, default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(DateTime(), onupdate=func.now())
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)
