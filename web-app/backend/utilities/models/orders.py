from datetime import datetime

from sqlalchemy import Boolean, DateTime, Float, Integer, String, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column

from .database import db
from .organization import TMC_Organization
from .access_control import User
from .tools import Tools


class Orders(db.Model):
    __tablename__ = "orders"
    __table_args__ = {"schema": "tmc_dev"}

    id: Mapped[Integer] = mapped_column(Integer(), primary_key=True)
    user_id: Mapped[Integer] = mapped_column(
        Integer(), ForeignKey(User.id), nullable=False
    )
    organization_id: Mapped[Integer] = mapped_column(
        Integer(), ForeignKey(TMC_Organization.id), nullable=False
    )
    total_amount: Mapped[Float] = mapped_column(Float(), nullable=False)
    status: Mapped[str] = mapped_column(
        String(length=100), nullable=False, default="new"
    )
    approval_required: Mapped[bool] = mapped_column(Boolean(), nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(), nullable=False, default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(), nullable=True, onupdate=func.now()
    )
    cancelled_at: Mapped[datetime] = mapped_column(DateTime(), nullable=True)
    approved_by: Mapped[Integer] = mapped_column(Integer(), nullable=True)
    approved_at: Mapped[datetime] = mapped_column(DateTime(), nullable=True)


class OrderItems(db.Model):
    __tablename__ = "order_items"
    __table_args__ = {"schema": "tmc_dev"}

    id: Mapped[Integer] = mapped_column(Integer(), primary_key=True)
    order_id: Mapped[Integer] = mapped_column(
        Integer(), ForeignKey(Orders.id), nullable=False
    )
    tool_id: Mapped[Integer] = mapped_column(
        Integer(), ForeignKey(Tools.id), nullable=False
    )
    quantity: Mapped[Integer] = mapped_column(Integer(), nullable=False)
    unit_price: Mapped[Float] = mapped_column(Float(), nullable=False)
    total_price: Mapped[Float] = mapped_column(Float(), nullable=False)
    subscription_length: Mapped[Integer] = mapped_column(Integer(), nullable=False)
