from datetime import datetime

from sqlalchemy import Boolean, DateTime, Integer, func
from sqlalchemy.orm import Mapped, mapped_column

from .database import db
from .organization import TMC_Organization


class Data_Sharing_Relationship(db.Model):
    __tablename__ = "data_sharing"
    __table_args__ = {"schema": "tmc_dev"}

    id: Mapped[int] = mapped_column(Integer(), primary_key=True)
    granting_data_owner_id: Mapped[int] = mapped_column(
        Integer(), db.ForeignKey(TMC_Organization.data_owner_id), nullable=False
    )
    receiving_data_owner_id: Mapped[int] = mapped_column(
        Integer(), db.ForeignKey(TMC_Organization.data_owner_id), nullable=False
    )
    grant_national: Mapped[bool] = mapped_column(Boolean(), default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=func.now())
    deactivated_at: Mapped[datetime] = mapped_column(DateTime, nullable=True)
