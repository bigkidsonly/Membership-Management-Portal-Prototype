from datetime import datetime
from typing import List

from flask_security import RoleMixin, UserMixin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Boolean, Date, DateTime, Float, ForeignKey, Integer, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

db = SQLAlchemy()


class TMC_Organization(db.Model):
    __tablename__ = "organization"
    __table_args__ = {"schema": "tmc_dev"}

    id: Mapped[int] = mapped_column(Integer(), primary_key=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    data_owner_id: Mapped[int] = mapped_column(
        Integer(), unique=True, autoincrement=True
    )

    google_group_name: Mapped[str] = mapped_column(String(255), nullable=True)
    haven_project_name: Mapped[str] = mapped_column(String(255), nullable=True)

    organization_type: Mapped[str] = mapped_column(String(100), nullable=False)
    organization_size: Mapped[str] = mapped_column(String(100), nullable=True)
    member_tier: Mapped[str] = mapped_column(String(100), nullable=True)
    join_date: Mapped[Date] = mapped_column(Date, nullable=False)
    location: Mapped[str] = mapped_column(String(100), nullable=True)

    created_at: Mapped[datetime] = mapped_column(DateTime, default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, onupdate=func.now(), nullable=True
    )
    deactivated_at: Mapped[datetime] = mapped_column(DateTime, nullable=True)

    domain: Mapped[str] = mapped_column(String(255), nullable=True)
    website: Mapped[str] = mapped_column(String(255), nullable=True)
    slack_channel: Mapped[str] = mapped_column(String(255), nullable=True)
    logo: Mapped[str] = mapped_column(String(255), nullable=True)


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
    description: Mapped[str] = mapped_column(String(255), nullable=True)
    grant_national: Mapped[bool] = mapped_column(Boolean(), default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=func.now())
    deactivated_at: Mapped[datetime] = mapped_column(DateTime, nullable=True)


##### ACCESS CONTROLS


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
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    active: Mapped[bool] = mapped_column(Boolean(), default=True)
    fs_uniquifier: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(), default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(), onupdate=func.now(), nullable=True
    )
    deactivated_at: Mapped[datetime] = mapped_column(DateTime(), nullable=True)

    @property
    def accessible_organizations(self) -> List[int]:
        """
        This returns a list of organization IDs that the user has access to based
        on active data sharing agreements.
        """

        # TODO - there's gotta be a more efficient way to do this
        # Start with the organization the user is assigned
        organizations = [self.organization_id]
        user_org = (
            db.session.query(TMC_Organization)
            .filter_by(id=self.organization_id)
            .first()
        )

        # These are orgs that are sharing "up" to the user's org
        shared_data_owner_ids = (
            db.session.query(Data_Sharing_Relationship)
            .filter(
                Data_Sharing_Relationship.receiving_data_owner_id
                == user_org.data_owner_id,
                Data_Sharing_Relationship.deactivated_at.is_(None),
            )
            .all()
        )

        # Write these back to the organizations array
        shared_orgs = (
            db.session.query(TMC_Organization)
            .filter(TMC_Organization.data_owner_id.in_(shared_data_owner_ids))
            .all()
        )
        organizations.extend([org.id for org in shared_orgs])

        return organizations


class User_Roles(db.Model):
    __tablename__ = "user_roles"
    __table_args__ = {"schema": "tmc_dev"}

    id: Mapped[int] = mapped_column(Integer(), primary_key=True)
    user_id: Mapped[int] = mapped_column(Integer(), ForeignKey(User.id))
    role_id: Mapped[int] = mapped_column(Integer(), ForeignKey(Role.id))


##### HAVEN TABLES


class BigQuery_User(db.Model):
    __tablename__ = "bigquery_user"
    __table_args__ = {"schema": "tmc_dev"}

    id: Mapped[int] = mapped_column(Integer(), primary_key=True)
    email: Mapped[str] = mapped_column(String(), nullable=False, unique=True)
    name: Mapped[str] = mapped_column(String(), nullable=False)
    user_type: Mapped[str] = mapped_column(String(), nullable=False)
    organization_id: Mapped[int] = mapped_column(
        Integer(), ForeignKey(TMC_Organization.id), nullable=False
    )
    organization: Mapped[TMC_Organization] = relationship(backref="bigquery_users")


class Data_Owners(db.Model):
    __tablename__ = "data_owners"
    __table_args__ = {"schema": "tmc_dev"}

    id: Mapped[int] = mapped_column(Integer(), primary_key=True)
    data_owner_id: Mapped[int] = mapped_column(
        Integer(),
        ForeignKey(TMC_Organization.data_owner_id),
        nullable=False,
        unique=True,
    )
    data_owner_code: Mapped[str] = mapped_column(
        String(50), nullable=False, unique=True
    )
    description: Mapped[str] = mapped_column(String(255), nullable=True)


##### ORDERS


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


##### ORGANIZATION


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
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, onupdate=func.now(), nullable=True
    )
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


##### TAGS


class TMC_Tags(db.Model):
    __tablename__ = "tags"
    __table_args__ = {"schema": "tmc_dev"}

    id: Mapped[int] = mapped_column(Integer(), primary_key=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)


##### TOOLS


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
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(), onupdate=func.now(), nullable=True
    )
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)


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
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(), onupdate=func.now(), nullable=True
    )
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)


class Tool_Tags(db.Model):
    __tablename__ = "tool_tags"
    __table_args__ = {"schema": "tmc_dev"}

    id: Mapped[int] = mapped_column(Integer(), primary_key=True)
    tool_id: Mapped[int] = mapped_column(Integer(), nullable=False)
    tag: Mapped[str] = mapped_column(String(length=100), nullable=False)


# NOTE - This table must be defined downstream of Tools
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


###

User.roles = relationship("Role", secondary=User_Roles, back_populates="users")
