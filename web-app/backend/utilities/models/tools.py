from datetime import datetime

from sqlalchemy import Boolean, DateTime, Float, Integer, String, func, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from .database import db
from .vendors import Vendor


class Tool_Categories(db.Model):
    __tablename__ = "tool_categories"
    __table_args__ = {"schema": "tmc_dev"}

    id: Mapped[int] = mapped_column(Integer(), primary_key=True)
    name: Mapped[str] = mapped_column(String(length=100), nullable=False)
    slug: Mapped[str] = mapped_column(String(length=100), nullable=False)
    icon: Mapped[str] = mapped_column(String(length=100), nullable=False)
    tool_count: Mapped[int] = mapped_column(Integer(), nullable=False)
    display_order: Mapped[int] = mapped_column(Integer(), nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(), nullable=False, default=func.now()
    )
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)


class Tools(db.Model):
    __tablename__ = "tools"
    __table_args__ = {"schema": "tmc_dev"}

    id: Mapped[int] = mapped_column(Integer(), primary_key=True)
    name: Mapped[str] = mapped_column(String(length=100), nullable=False)
    description: Mapped[str] = mapped_column(String(length=255), nullable=False)
    category_id: Mapped[int] = mapped_column(
        Integer(), ForeignKey(Tool_Categories.id), nullable=False
    )
    vendor_id: Mapped[int] = mapped_column(
        Integer(), ForeignKey(Vendor.id), nullable=False
    )
    logo_url: Mapped[str] = mapped_column(String(length=255), nullable=False)
    regular_price: Mapped[float] = mapped_column(Float(), nullable=False)
    member_price: Mapped[float] = mapped_column(Float(), nullable=False)
    discount_percentage: Mapped[float] = mapped_column(Float(), nullable=False)
    is_featured: Mapped[bool] = mapped_column(Boolean(), nullable=False)
    tier_requirement: Mapped[int] = mapped_column(Integer(), nullable=False)
    rating: Mapped[float] = mapped_column(Float(), nullable=False)
    review_count: Mapped[int] = mapped_column(Integer(), nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(), nullable=False, default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(DateTime(), onupdate=func.now())
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)


class Tool_Tags(db.Model):
    __tablename__ = "tool_tags"
    __table_args__ = {"schema": "tmc_dev"}

    id: Mapped[int] = mapped_column(Integer(), primary_key=True)
    tool_id: Mapped[int] = mapped_column(Integer(), nullable=False)
    tag: Mapped[str] = mapped_column(String(length=100), nullable=False)
