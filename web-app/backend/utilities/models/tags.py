from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from .database import db


class TMC_Tags(db.Model):
    __tablename__ = "tags"
    __table_args__ = {"schema": "tmc_dev"}

    id: Mapped[int] = mapped_column(Integer(), primary_key=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
