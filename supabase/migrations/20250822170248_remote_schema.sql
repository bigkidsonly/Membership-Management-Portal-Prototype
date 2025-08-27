drop extension if exists "pg_net";


  create table "public"."benefit_usage" (
    "id" uuid not null default uuid_generate_v4(),
    "benefit_id" uuid,
    "organization_id" uuid,
    "usage_count" integer default 0,
    "last_used" timestamp with time zone,
    "status" text default 'active'::text,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."benefit_usage" enable row level security;


  create table "public"."benefits" (
    "id" uuid not null default uuid_generate_v4(),
    "name" text not null,
    "description" text,
    "category" text,
    "tier_eligibility" uuid[],
    "usage_limit" integer,
    "billing_period" text default 'monthly'::text,
    "is_active" boolean default true,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );



  create table "public"."event_attendees" (
    "id" uuid not null default uuid_generate_v4(),
    "event_id" uuid,
    "organization_id" uuid,
    "user_id" uuid,
    "status" text default 'registered'::text,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."event_attendees" enable row level security;


  create table "public"."events" (
    "id" uuid not null default uuid_generate_v4(),
    "title" text not null,
    "description" text,
    "event_date" timestamp with time zone not null,
    "duration_minutes" integer default 60,
    "location" text,
    "is_virtual" boolean default true,
    "meeting_link" text,
    "max_attendees" integer,
    "is_members_only" boolean default true,
    "tier_eligibility" uuid[],
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."events" enable row level security;


  create table "public"."marketplace_tools" (
    "id" uuid not null default uuid_generate_v4(),
    "name" text not null,
    "vendor_id" uuid,
    "category_id" uuid,
    "description" text,
    "long_description" text,
    "logo_url" text,
    "screenshots" text[],
    "features" text[],
    "regular_price" numeric(10,2),
    "discount_percentage" integer,
    "is_featured" boolean default false,
    "is_active" boolean default true,
    "rating" numeric(3,2) default 0.0,
    "review_count" integer default 0,
    "tier_eligibility" uuid[],
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."marketplace_tools" enable row level security;


  create table "public"."membership_tiers" (
    "id" uuid not null default uuid_generate_v4(),
    "name" text not null,
    "code" text not null,
    "description" text,
    "monthly_price" numeric(10,2),
    "annual_price" numeric(10,2),
    "max_affiliates" integer,
    "benefits" jsonb,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );



  create table "public"."orders" (
    "id" uuid not null default uuid_generate_v4(),
    "organization_id" uuid,
    "tool_id" uuid,
    "pricing_tier_id" uuid,
    "user_id" uuid,
    "quantity" integer default 1,
    "total_amount" numeric(10,2),
    "status" text default 'pending_approval'::text,
    "payment_status" text default 'pending'::text,
    "requested_date" timestamp with time zone default now(),
    "approved_date" timestamp with time zone,
    "approved_by" uuid,
    "rejection_reason" text,
    "notes" text,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."orders" enable row level security;


  create table "public"."organizations" (
    "id" uuid not null default uuid_generate_v4(),
    "name" text not null,
    "slug" text not null,
    "tier_id" uuid,
    "parent_organization_id" uuid,
    "logo_url" text,
    "description" text,
    "website" text,
    "primary_contact_email" text,
    "primary_contact_phone" text,
    "address" text,
    "city" text,
    "state" text,
    "zip" text,
    "country" text default 'US'::text,
    "status" text default 'pending'::text,
    "joined_date" timestamp with time zone,
    "max_users" integer default 5,
    "is_private" boolean default false,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."organizations" enable row level security;


  create table "public"."pricing_tiers" (
    "id" uuid not null default uuid_generate_v4(),
    "tool_id" uuid,
    "name" text not null,
    "billing_period" text default 'monthly'::text,
    "regular_price" numeric(10,2),
    "member_price" numeric(10,2),
    "features" text[],
    "max_users" integer,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );



  create table "public"."profiles" (
    "id" uuid not null,
    "organization_id" uuid,
    "first_name" text,
    "last_name" text,
    "email" text not null,
    "phone" text,
    "role" text default 'member'::text,
    "avatar_url" text,
    "is_primary_contact" boolean default false,
    "last_login" timestamp with time zone,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."profiles" enable row level security;


  create table "public"."project_organizations" (
    "id" uuid not null default uuid_generate_v4(),
    "project_id" uuid,
    "organization_id" uuid,
    "role" text default 'participant'::text,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."project_organizations" enable row level security;


  create table "public"."projects" (
    "id" uuid not null default uuid_generate_v4(),
    "title" text not null,
    "description" text,
    "status" text default 'planning'::text,
    "priority" text default 'medium'::text,
    "progress" integer default 0,
    "start_date" timestamp with time zone,
    "end_date" timestamp with time zone,
    "assigned_staff" uuid,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."projects" enable row level security;


  create table "public"."reviews" (
    "id" uuid not null default uuid_generate_v4(),
    "tool_id" uuid,
    "organization_id" uuid,
    "user_id" uuid,
    "rating" integer not null,
    "title" text,
    "comment" text,
    "is_verified" boolean default false,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."reviews" enable row level security;


  create table "public"."staff" (
    "id" uuid not null,
    "first_name" text,
    "last_name" text,
    "email" text not null,
    "role" text default 'support'::text,
    "avatar_url" text,
    "is_active" boolean default true,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );



  create table "public"."support_tickets" (
    "id" uuid not null default uuid_generate_v4(),
    "organization_id" uuid,
    "user_id" uuid,
    "title" text not null,
    "description" text,
    "status" text default 'open'::text,
    "priority" text default 'medium'::text,
    "assigned_to" uuid,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "resolved_at" timestamp with time zone
      );


alter table "public"."support_tickets" enable row level security;


  create table "public"."ticket_messages" (
    "id" uuid not null default uuid_generate_v4(),
    "ticket_id" uuid,
    "sender_id" uuid not null,
    "sender_type" text not null,
    "message" text not null,
    "attachments" text[],
    "created_at" timestamp with time zone default now()
      );


alter table "public"."ticket_messages" enable row level security;


  create table "public"."tool_categories" (
    "id" uuid not null default uuid_generate_v4(),
    "name" text not null,
    "icon" text,
    "description" text,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );



  create table "public"."vendors" (
    "id" uuid not null default uuid_generate_v4(),
    "name" text not null,
    "logo_url" text,
    "website" text,
    "description" text,
    "contact_email" text,
    "contact_phone" text,
    "is_active" boolean default true,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );



  create table "public"."vote_responses" (
    "id" uuid not null default uuid_generate_v4(),
    "vote_id" uuid,
    "organization_id" uuid,
    "user_id" uuid,
    "response" boolean not null,
    "created_at" timestamp with time zone default now()
      );


alter table "public"."vote_responses" enable row level security;


  create table "public"."votes" (
    "id" uuid not null default uuid_generate_v4(),
    "title" text not null,
    "description" text,
    "status" text default 'draft'::text,
    "start_date" timestamp with time zone,
    "end_date" timestamp with time zone,
    "tier_eligibility" uuid[],
    "created_by" uuid,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."votes" enable row level security;

CREATE UNIQUE INDEX benefit_usage_benefit_id_organization_id_key ON public.benefit_usage USING btree (benefit_id, organization_id);

CREATE UNIQUE INDEX benefit_usage_pkey ON public.benefit_usage USING btree (id);

CREATE UNIQUE INDEX benefits_pkey ON public.benefits USING btree (id);

CREATE UNIQUE INDEX event_attendees_event_id_user_id_key ON public.event_attendees USING btree (event_id, user_id);

CREATE UNIQUE INDEX event_attendees_pkey ON public.event_attendees USING btree (id);

CREATE UNIQUE INDEX events_pkey ON public.events USING btree (id);

CREATE INDEX idx_benefit_usage_organization_id ON public.benefit_usage USING btree (organization_id);

CREATE INDEX idx_marketplace_tools_category_id ON public.marketplace_tools USING btree (category_id);

CREATE INDEX idx_marketplace_tools_vendor_id ON public.marketplace_tools USING btree (vendor_id);

CREATE INDEX idx_orders_organization_id ON public.orders USING btree (organization_id);

CREATE INDEX idx_orders_status ON public.orders USING btree (status);

CREATE INDEX idx_organizations_parent_id ON public.organizations USING btree (parent_organization_id);

CREATE INDEX idx_organizations_tier_id ON public.organizations USING btree (tier_id);

CREATE INDEX idx_profiles_organization_id ON public.profiles USING btree (organization_id);

CREATE INDEX idx_support_tickets_assigned_to ON public.support_tickets USING btree (assigned_to);

CREATE INDEX idx_support_tickets_organization_id ON public.support_tickets USING btree (organization_id);

CREATE UNIQUE INDEX marketplace_tools_pkey ON public.marketplace_tools USING btree (id);

CREATE UNIQUE INDEX membership_tiers_code_key ON public.membership_tiers USING btree (code);

CREATE UNIQUE INDEX membership_tiers_pkey ON public.membership_tiers USING btree (id);

CREATE UNIQUE INDEX orders_pkey ON public.orders USING btree (id);

CREATE UNIQUE INDEX organizations_pkey ON public.organizations USING btree (id);

CREATE UNIQUE INDEX organizations_slug_key ON public.organizations USING btree (slug);

CREATE UNIQUE INDEX pricing_tiers_pkey ON public.pricing_tiers USING btree (id);

CREATE UNIQUE INDEX profiles_email_key ON public.profiles USING btree (email);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX project_organizations_pkey ON public.project_organizations USING btree (id);

CREATE UNIQUE INDEX project_organizations_project_id_organization_id_key ON public.project_organizations USING btree (project_id, organization_id);

CREATE UNIQUE INDEX projects_pkey ON public.projects USING btree (id);

CREATE UNIQUE INDEX reviews_pkey ON public.reviews USING btree (id);

CREATE UNIQUE INDEX reviews_tool_id_organization_id_key ON public.reviews USING btree (tool_id, organization_id);

CREATE UNIQUE INDEX staff_email_key ON public.staff USING btree (email);

CREATE UNIQUE INDEX staff_pkey ON public.staff USING btree (id);

CREATE UNIQUE INDEX support_tickets_pkey ON public.support_tickets USING btree (id);

CREATE UNIQUE INDEX ticket_messages_pkey ON public.ticket_messages USING btree (id);

CREATE UNIQUE INDEX tool_categories_name_key ON public.tool_categories USING btree (name);

CREATE UNIQUE INDEX tool_categories_pkey ON public.tool_categories USING btree (id);

CREATE UNIQUE INDEX vendors_pkey ON public.vendors USING btree (id);

CREATE UNIQUE INDEX vote_responses_pkey ON public.vote_responses USING btree (id);

CREATE UNIQUE INDEX vote_responses_vote_id_organization_id_key ON public.vote_responses USING btree (vote_id, organization_id);

CREATE UNIQUE INDEX votes_pkey ON public.votes USING btree (id);

alter table "public"."benefit_usage" add constraint "benefit_usage_pkey" PRIMARY KEY using index "benefit_usage_pkey";

alter table "public"."benefits" add constraint "benefits_pkey" PRIMARY KEY using index "benefits_pkey";

alter table "public"."event_attendees" add constraint "event_attendees_pkey" PRIMARY KEY using index "event_attendees_pkey";

alter table "public"."events" add constraint "events_pkey" PRIMARY KEY using index "events_pkey";

alter table "public"."marketplace_tools" add constraint "marketplace_tools_pkey" PRIMARY KEY using index "marketplace_tools_pkey";

alter table "public"."membership_tiers" add constraint "membership_tiers_pkey" PRIMARY KEY using index "membership_tiers_pkey";

alter table "public"."orders" add constraint "orders_pkey" PRIMARY KEY using index "orders_pkey";

alter table "public"."organizations" add constraint "organizations_pkey" PRIMARY KEY using index "organizations_pkey";

alter table "public"."pricing_tiers" add constraint "pricing_tiers_pkey" PRIMARY KEY using index "pricing_tiers_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."project_organizations" add constraint "project_organizations_pkey" PRIMARY KEY using index "project_organizations_pkey";

alter table "public"."projects" add constraint "projects_pkey" PRIMARY KEY using index "projects_pkey";

alter table "public"."reviews" add constraint "reviews_pkey" PRIMARY KEY using index "reviews_pkey";

alter table "public"."staff" add constraint "staff_pkey" PRIMARY KEY using index "staff_pkey";

alter table "public"."support_tickets" add constraint "support_tickets_pkey" PRIMARY KEY using index "support_tickets_pkey";

alter table "public"."ticket_messages" add constraint "ticket_messages_pkey" PRIMARY KEY using index "ticket_messages_pkey";

alter table "public"."tool_categories" add constraint "tool_categories_pkey" PRIMARY KEY using index "tool_categories_pkey";

alter table "public"."vendors" add constraint "vendors_pkey" PRIMARY KEY using index "vendors_pkey";

alter table "public"."vote_responses" add constraint "vote_responses_pkey" PRIMARY KEY using index "vote_responses_pkey";

alter table "public"."votes" add constraint "votes_pkey" PRIMARY KEY using index "votes_pkey";

alter table "public"."benefit_usage" add constraint "benefit_usage_benefit_id_fkey" FOREIGN KEY (benefit_id) REFERENCES benefits(id) not valid;

alter table "public"."benefit_usage" validate constraint "benefit_usage_benefit_id_fkey";

alter table "public"."benefit_usage" add constraint "benefit_usage_benefit_id_organization_id_key" UNIQUE using index "benefit_usage_benefit_id_organization_id_key";

alter table "public"."benefit_usage" add constraint "benefit_usage_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES organizations(id) not valid;

alter table "public"."benefit_usage" validate constraint "benefit_usage_organization_id_fkey";

alter table "public"."benefit_usage" add constraint "benefit_usage_status_check" CHECK ((status = ANY (ARRAY['active'::text, 'suspended'::text, 'expired'::text]))) not valid;

alter table "public"."benefit_usage" validate constraint "benefit_usage_status_check";

alter table "public"."benefits" add constraint "benefits_billing_period_check" CHECK ((billing_period = ANY (ARRAY['monthly'::text, 'annual'::text, 'one-time'::text]))) not valid;

alter table "public"."benefits" validate constraint "benefits_billing_period_check";

alter table "public"."event_attendees" add constraint "event_attendees_event_id_fkey" FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE not valid;

alter table "public"."event_attendees" validate constraint "event_attendees_event_id_fkey";

alter table "public"."event_attendees" add constraint "event_attendees_event_id_user_id_key" UNIQUE using index "event_attendees_event_id_user_id_key";

alter table "public"."event_attendees" add constraint "event_attendees_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES organizations(id) not valid;

alter table "public"."event_attendees" validate constraint "event_attendees_organization_id_fkey";

alter table "public"."event_attendees" add constraint "event_attendees_status_check" CHECK ((status = ANY (ARRAY['registered'::text, 'attended'::text, 'no_show'::text, 'cancelled'::text]))) not valid;

alter table "public"."event_attendees" validate constraint "event_attendees_status_check";

alter table "public"."event_attendees" add constraint "event_attendees_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) not valid;

alter table "public"."event_attendees" validate constraint "event_attendees_user_id_fkey";

alter table "public"."marketplace_tools" add constraint "marketplace_tools_category_id_fkey" FOREIGN KEY (category_id) REFERENCES tool_categories(id) not valid;

alter table "public"."marketplace_tools" validate constraint "marketplace_tools_category_id_fkey";

alter table "public"."marketplace_tools" add constraint "marketplace_tools_discount_percentage_check" CHECK (((discount_percentage >= 0) AND (discount_percentage <= 100))) not valid;

alter table "public"."marketplace_tools" validate constraint "marketplace_tools_discount_percentage_check";

alter table "public"."marketplace_tools" add constraint "marketplace_tools_rating_check" CHECK (((rating >= 0.0) AND (rating <= 5.0))) not valid;

alter table "public"."marketplace_tools" validate constraint "marketplace_tools_rating_check";

alter table "public"."marketplace_tools" add constraint "marketplace_tools_vendor_id_fkey" FOREIGN KEY (vendor_id) REFERENCES vendors(id) not valid;

alter table "public"."marketplace_tools" validate constraint "marketplace_tools_vendor_id_fkey";

alter table "public"."membership_tiers" add constraint "membership_tiers_code_key" UNIQUE using index "membership_tiers_code_key";

alter table "public"."orders" add constraint "orders_approved_by_fkey" FOREIGN KEY (approved_by) REFERENCES profiles(id) not valid;

alter table "public"."orders" validate constraint "orders_approved_by_fkey";

alter table "public"."orders" add constraint "orders_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES organizations(id) not valid;

alter table "public"."orders" validate constraint "orders_organization_id_fkey";

alter table "public"."orders" add constraint "orders_payment_status_check" CHECK ((payment_status = ANY (ARRAY['pending'::text, 'paid'::text, 'failed'::text, 'refunded'::text]))) not valid;

alter table "public"."orders" validate constraint "orders_payment_status_check";

alter table "public"."orders" add constraint "orders_pricing_tier_id_fkey" FOREIGN KEY (pricing_tier_id) REFERENCES pricing_tiers(id) not valid;

alter table "public"."orders" validate constraint "orders_pricing_tier_id_fkey";

alter table "public"."orders" add constraint "orders_status_check" CHECK ((status = ANY (ARRAY['pending_approval'::text, 'approved'::text, 'rejected'::text, 'active'::text, 'cancelled'::text]))) not valid;

alter table "public"."orders" validate constraint "orders_status_check";

alter table "public"."orders" add constraint "orders_tool_id_fkey" FOREIGN KEY (tool_id) REFERENCES marketplace_tools(id) not valid;

alter table "public"."orders" validate constraint "orders_tool_id_fkey";

alter table "public"."orders" add constraint "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) not valid;

alter table "public"."orders" validate constraint "orders_user_id_fkey";

alter table "public"."organizations" add constraint "organizations_parent_organization_id_fkey" FOREIGN KEY (parent_organization_id) REFERENCES organizations(id) not valid;

alter table "public"."organizations" validate constraint "organizations_parent_organization_id_fkey";

alter table "public"."organizations" add constraint "organizations_slug_key" UNIQUE using index "organizations_slug_key";

alter table "public"."organizations" add constraint "organizations_status_check" CHECK ((status = ANY (ARRAY['pending'::text, 'active'::text, 'suspended'::text, 'cancelled'::text]))) not valid;

alter table "public"."organizations" validate constraint "organizations_status_check";

alter table "public"."organizations" add constraint "organizations_tier_id_fkey" FOREIGN KEY (tier_id) REFERENCES membership_tiers(id) not valid;

alter table "public"."organizations" validate constraint "organizations_tier_id_fkey";

alter table "public"."pricing_tiers" add constraint "pricing_tiers_billing_period_check" CHECK ((billing_period = ANY (ARRAY['monthly'::text, 'annual'::text, 'one-time'::text]))) not valid;

alter table "public"."pricing_tiers" validate constraint "pricing_tiers_billing_period_check";

alter table "public"."pricing_tiers" add constraint "pricing_tiers_tool_id_fkey" FOREIGN KEY (tool_id) REFERENCES marketplace_tools(id) ON DELETE CASCADE not valid;

alter table "public"."pricing_tiers" validate constraint "pricing_tiers_tool_id_fkey";

alter table "public"."profiles" add constraint "profiles_email_key" UNIQUE using index "profiles_email_key";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

alter table "public"."profiles" add constraint "profiles_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES organizations(id) not valid;

alter table "public"."profiles" validate constraint "profiles_organization_id_fkey";

alter table "public"."profiles" add constraint "profiles_role_check" CHECK ((role = ANY (ARRAY['admin'::text, 'member'::text, 'affiliate'::text]))) not valid;

alter table "public"."profiles" validate constraint "profiles_role_check";

alter table "public"."project_organizations" add constraint "project_organizations_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES organizations(id) not valid;

alter table "public"."project_organizations" validate constraint "project_organizations_organization_id_fkey";

alter table "public"."project_organizations" add constraint "project_organizations_project_id_fkey" FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE not valid;

alter table "public"."project_organizations" validate constraint "project_organizations_project_id_fkey";

alter table "public"."project_organizations" add constraint "project_organizations_project_id_organization_id_key" UNIQUE using index "project_organizations_project_id_organization_id_key";

alter table "public"."project_organizations" add constraint "project_organizations_role_check" CHECK ((role = ANY (ARRAY['participant'::text, 'lead'::text, 'observer'::text]))) not valid;

alter table "public"."project_organizations" validate constraint "project_organizations_role_check";

alter table "public"."projects" add constraint "projects_priority_check" CHECK ((priority = ANY (ARRAY['low'::text, 'medium'::text, 'high'::text, 'urgent'::text]))) not valid;

alter table "public"."projects" validate constraint "projects_priority_check";

alter table "public"."projects" add constraint "projects_progress_check" CHECK (((progress >= 0) AND (progress <= 100))) not valid;

alter table "public"."projects" validate constraint "projects_progress_check";

alter table "public"."projects" add constraint "projects_status_check" CHECK ((status = ANY (ARRAY['planning'::text, 'in_progress'::text, 'on_hold'::text, 'completed'::text, 'cancelled'::text]))) not valid;

alter table "public"."projects" validate constraint "projects_status_check";

alter table "public"."reviews" add constraint "reviews_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES organizations(id) not valid;

alter table "public"."reviews" validate constraint "reviews_organization_id_fkey";

alter table "public"."reviews" add constraint "reviews_rating_check" CHECK (((rating >= 1) AND (rating <= 5))) not valid;

alter table "public"."reviews" validate constraint "reviews_rating_check";

alter table "public"."reviews" add constraint "reviews_tool_id_fkey" FOREIGN KEY (tool_id) REFERENCES marketplace_tools(id) not valid;

alter table "public"."reviews" validate constraint "reviews_tool_id_fkey";

alter table "public"."reviews" add constraint "reviews_tool_id_organization_id_key" UNIQUE using index "reviews_tool_id_organization_id_key";

alter table "public"."reviews" add constraint "reviews_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) not valid;

alter table "public"."reviews" validate constraint "reviews_user_id_fkey";

alter table "public"."staff" add constraint "staff_email_key" UNIQUE using index "staff_email_key";

alter table "public"."staff" add constraint "staff_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."staff" validate constraint "staff_id_fkey";

alter table "public"."staff" add constraint "staff_role_check" CHECK ((role = ANY (ARRAY['admin'::text, 'strategist'::text, 'support'::text, 'engineer'::text]))) not valid;

alter table "public"."staff" validate constraint "staff_role_check";

alter table "public"."support_tickets" add constraint "support_tickets_assigned_to_fkey" FOREIGN KEY (assigned_to) REFERENCES staff(id) not valid;

alter table "public"."support_tickets" validate constraint "support_tickets_assigned_to_fkey";

alter table "public"."support_tickets" add constraint "support_tickets_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES organizations(id) not valid;

alter table "public"."support_tickets" validate constraint "support_tickets_organization_id_fkey";

alter table "public"."support_tickets" add constraint "support_tickets_priority_check" CHECK ((priority = ANY (ARRAY['low'::text, 'medium'::text, 'high'::text, 'urgent'::text]))) not valid;

alter table "public"."support_tickets" validate constraint "support_tickets_priority_check";

alter table "public"."support_tickets" add constraint "support_tickets_status_check" CHECK ((status = ANY (ARRAY['open'::text, 'in_progress'::text, 'waiting_for_response'::text, 'resolved'::text, 'closed'::text]))) not valid;

alter table "public"."support_tickets" validate constraint "support_tickets_status_check";

alter table "public"."support_tickets" add constraint "support_tickets_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) not valid;

alter table "public"."support_tickets" validate constraint "support_tickets_user_id_fkey";

alter table "public"."ticket_messages" add constraint "ticket_messages_sender_type_check" CHECK ((sender_type = ANY (ARRAY['user'::text, 'staff'::text]))) not valid;

alter table "public"."ticket_messages" validate constraint "ticket_messages_sender_type_check";

alter table "public"."ticket_messages" add constraint "ticket_messages_ticket_id_fkey" FOREIGN KEY (ticket_id) REFERENCES support_tickets(id) ON DELETE CASCADE not valid;

alter table "public"."ticket_messages" validate constraint "ticket_messages_ticket_id_fkey";

alter table "public"."tool_categories" add constraint "tool_categories_name_key" UNIQUE using index "tool_categories_name_key";

alter table "public"."vote_responses" add constraint "vote_responses_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES organizations(id) not valid;

alter table "public"."vote_responses" validate constraint "vote_responses_organization_id_fkey";

alter table "public"."vote_responses" add constraint "vote_responses_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) not valid;

alter table "public"."vote_responses" validate constraint "vote_responses_user_id_fkey";

alter table "public"."vote_responses" add constraint "vote_responses_vote_id_fkey" FOREIGN KEY (vote_id) REFERENCES votes(id) ON DELETE CASCADE not valid;

alter table "public"."vote_responses" validate constraint "vote_responses_vote_id_fkey";

alter table "public"."vote_responses" add constraint "vote_responses_vote_id_organization_id_key" UNIQUE using index "vote_responses_vote_id_organization_id_key";

alter table "public"."votes" add constraint "votes_created_by_fkey" FOREIGN KEY (created_by) REFERENCES staff(id) not valid;

alter table "public"."votes" validate constraint "votes_created_by_fkey";

alter table "public"."votes" add constraint "votes_status_check" CHECK ((status = ANY (ARRAY['draft'::text, 'active'::text, 'closed'::text]))) not valid;

alter table "public"."votes" validate constraint "votes_status_check";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$function$
;

grant delete on table "public"."benefit_usage" to "anon";

grant insert on table "public"."benefit_usage" to "anon";

grant references on table "public"."benefit_usage" to "anon";

grant select on table "public"."benefit_usage" to "anon";

grant trigger on table "public"."benefit_usage" to "anon";

grant truncate on table "public"."benefit_usage" to "anon";

grant update on table "public"."benefit_usage" to "anon";

grant delete on table "public"."benefit_usage" to "authenticated";

grant insert on table "public"."benefit_usage" to "authenticated";

grant references on table "public"."benefit_usage" to "authenticated";

grant select on table "public"."benefit_usage" to "authenticated";

grant trigger on table "public"."benefit_usage" to "authenticated";

grant truncate on table "public"."benefit_usage" to "authenticated";

grant update on table "public"."benefit_usage" to "authenticated";

grant delete on table "public"."benefit_usage" to "service_role";

grant insert on table "public"."benefit_usage" to "service_role";

grant references on table "public"."benefit_usage" to "service_role";

grant select on table "public"."benefit_usage" to "service_role";

grant trigger on table "public"."benefit_usage" to "service_role";

grant truncate on table "public"."benefit_usage" to "service_role";

grant update on table "public"."benefit_usage" to "service_role";

grant delete on table "public"."benefits" to "anon";

grant insert on table "public"."benefits" to "anon";

grant references on table "public"."benefits" to "anon";

grant select on table "public"."benefits" to "anon";

grant trigger on table "public"."benefits" to "anon";

grant truncate on table "public"."benefits" to "anon";

grant update on table "public"."benefits" to "anon";

grant delete on table "public"."benefits" to "authenticated";

grant insert on table "public"."benefits" to "authenticated";

grant references on table "public"."benefits" to "authenticated";

grant select on table "public"."benefits" to "authenticated";

grant trigger on table "public"."benefits" to "authenticated";

grant truncate on table "public"."benefits" to "authenticated";

grant update on table "public"."benefits" to "authenticated";

grant delete on table "public"."benefits" to "service_role";

grant insert on table "public"."benefits" to "service_role";

grant references on table "public"."benefits" to "service_role";

grant select on table "public"."benefits" to "service_role";

grant trigger on table "public"."benefits" to "service_role";

grant truncate on table "public"."benefits" to "service_role";

grant update on table "public"."benefits" to "service_role";

grant delete on table "public"."event_attendees" to "anon";

grant insert on table "public"."event_attendees" to "anon";

grant references on table "public"."event_attendees" to "anon";

grant select on table "public"."event_attendees" to "anon";

grant trigger on table "public"."event_attendees" to "anon";

grant truncate on table "public"."event_attendees" to "anon";

grant update on table "public"."event_attendees" to "anon";

grant delete on table "public"."event_attendees" to "authenticated";

grant insert on table "public"."event_attendees" to "authenticated";

grant references on table "public"."event_attendees" to "authenticated";

grant select on table "public"."event_attendees" to "authenticated";

grant trigger on table "public"."event_attendees" to "authenticated";

grant truncate on table "public"."event_attendees" to "authenticated";

grant update on table "public"."event_attendees" to "authenticated";

grant delete on table "public"."event_attendees" to "service_role";

grant insert on table "public"."event_attendees" to "service_role";

grant references on table "public"."event_attendees" to "service_role";

grant select on table "public"."event_attendees" to "service_role";

grant trigger on table "public"."event_attendees" to "service_role";

grant truncate on table "public"."event_attendees" to "service_role";

grant update on table "public"."event_attendees" to "service_role";

grant delete on table "public"."events" to "anon";

grant insert on table "public"."events" to "anon";

grant references on table "public"."events" to "anon";

grant select on table "public"."events" to "anon";

grant trigger on table "public"."events" to "anon";

grant truncate on table "public"."events" to "anon";

grant update on table "public"."events" to "anon";

grant delete on table "public"."events" to "authenticated";

grant insert on table "public"."events" to "authenticated";

grant references on table "public"."events" to "authenticated";

grant select on table "public"."events" to "authenticated";

grant trigger on table "public"."events" to "authenticated";

grant truncate on table "public"."events" to "authenticated";

grant update on table "public"."events" to "authenticated";

grant delete on table "public"."events" to "service_role";

grant insert on table "public"."events" to "service_role";

grant references on table "public"."events" to "service_role";

grant select on table "public"."events" to "service_role";

grant trigger on table "public"."events" to "service_role";

grant truncate on table "public"."events" to "service_role";

grant update on table "public"."events" to "service_role";

grant delete on table "public"."marketplace_tools" to "anon";

grant insert on table "public"."marketplace_tools" to "anon";

grant references on table "public"."marketplace_tools" to "anon";

grant select on table "public"."marketplace_tools" to "anon";

grant trigger on table "public"."marketplace_tools" to "anon";

grant truncate on table "public"."marketplace_tools" to "anon";

grant update on table "public"."marketplace_tools" to "anon";

grant delete on table "public"."marketplace_tools" to "authenticated";

grant insert on table "public"."marketplace_tools" to "authenticated";

grant references on table "public"."marketplace_tools" to "authenticated";

grant select on table "public"."marketplace_tools" to "authenticated";

grant trigger on table "public"."marketplace_tools" to "authenticated";

grant truncate on table "public"."marketplace_tools" to "authenticated";

grant update on table "public"."marketplace_tools" to "authenticated";

grant delete on table "public"."marketplace_tools" to "service_role";

grant insert on table "public"."marketplace_tools" to "service_role";

grant references on table "public"."marketplace_tools" to "service_role";

grant select on table "public"."marketplace_tools" to "service_role";

grant trigger on table "public"."marketplace_tools" to "service_role";

grant truncate on table "public"."marketplace_tools" to "service_role";

grant update on table "public"."marketplace_tools" to "service_role";

grant delete on table "public"."membership_tiers" to "anon";

grant insert on table "public"."membership_tiers" to "anon";

grant references on table "public"."membership_tiers" to "anon";

grant select on table "public"."membership_tiers" to "anon";

grant trigger on table "public"."membership_tiers" to "anon";

grant truncate on table "public"."membership_tiers" to "anon";

grant update on table "public"."membership_tiers" to "anon";

grant delete on table "public"."membership_tiers" to "authenticated";

grant insert on table "public"."membership_tiers" to "authenticated";

grant references on table "public"."membership_tiers" to "authenticated";

grant select on table "public"."membership_tiers" to "authenticated";

grant trigger on table "public"."membership_tiers" to "authenticated";

grant truncate on table "public"."membership_tiers" to "authenticated";

grant update on table "public"."membership_tiers" to "authenticated";

grant delete on table "public"."membership_tiers" to "service_role";

grant insert on table "public"."membership_tiers" to "service_role";

grant references on table "public"."membership_tiers" to "service_role";

grant select on table "public"."membership_tiers" to "service_role";

grant trigger on table "public"."membership_tiers" to "service_role";

grant truncate on table "public"."membership_tiers" to "service_role";

grant update on table "public"."membership_tiers" to "service_role";

grant delete on table "public"."orders" to "anon";

grant insert on table "public"."orders" to "anon";

grant references on table "public"."orders" to "anon";

grant select on table "public"."orders" to "anon";

grant trigger on table "public"."orders" to "anon";

grant truncate on table "public"."orders" to "anon";

grant update on table "public"."orders" to "anon";

grant delete on table "public"."orders" to "authenticated";

grant insert on table "public"."orders" to "authenticated";

grant references on table "public"."orders" to "authenticated";

grant select on table "public"."orders" to "authenticated";

grant trigger on table "public"."orders" to "authenticated";

grant truncate on table "public"."orders" to "authenticated";

grant update on table "public"."orders" to "authenticated";

grant delete on table "public"."orders" to "service_role";

grant insert on table "public"."orders" to "service_role";

grant references on table "public"."orders" to "service_role";

grant select on table "public"."orders" to "service_role";

grant trigger on table "public"."orders" to "service_role";

grant truncate on table "public"."orders" to "service_role";

grant update on table "public"."orders" to "service_role";

grant delete on table "public"."organizations" to "anon";

grant insert on table "public"."organizations" to "anon";

grant references on table "public"."organizations" to "anon";

grant select on table "public"."organizations" to "anon";

grant trigger on table "public"."organizations" to "anon";

grant truncate on table "public"."organizations" to "anon";

grant update on table "public"."organizations" to "anon";

grant delete on table "public"."organizations" to "authenticated";

grant insert on table "public"."organizations" to "authenticated";

grant references on table "public"."organizations" to "authenticated";

grant select on table "public"."organizations" to "authenticated";

grant trigger on table "public"."organizations" to "authenticated";

grant truncate on table "public"."organizations" to "authenticated";

grant update on table "public"."organizations" to "authenticated";

grant delete on table "public"."organizations" to "service_role";

grant insert on table "public"."organizations" to "service_role";

grant references on table "public"."organizations" to "service_role";

grant select on table "public"."organizations" to "service_role";

grant trigger on table "public"."organizations" to "service_role";

grant truncate on table "public"."organizations" to "service_role";

grant update on table "public"."organizations" to "service_role";

grant delete on table "public"."pricing_tiers" to "anon";

grant insert on table "public"."pricing_tiers" to "anon";

grant references on table "public"."pricing_tiers" to "anon";

grant select on table "public"."pricing_tiers" to "anon";

grant trigger on table "public"."pricing_tiers" to "anon";

grant truncate on table "public"."pricing_tiers" to "anon";

grant update on table "public"."pricing_tiers" to "anon";

grant delete on table "public"."pricing_tiers" to "authenticated";

grant insert on table "public"."pricing_tiers" to "authenticated";

grant references on table "public"."pricing_tiers" to "authenticated";

grant select on table "public"."pricing_tiers" to "authenticated";

grant trigger on table "public"."pricing_tiers" to "authenticated";

grant truncate on table "public"."pricing_tiers" to "authenticated";

grant update on table "public"."pricing_tiers" to "authenticated";

grant delete on table "public"."pricing_tiers" to "service_role";

grant insert on table "public"."pricing_tiers" to "service_role";

grant references on table "public"."pricing_tiers" to "service_role";

grant select on table "public"."pricing_tiers" to "service_role";

grant trigger on table "public"."pricing_tiers" to "service_role";

grant truncate on table "public"."pricing_tiers" to "service_role";

grant update on table "public"."pricing_tiers" to "service_role";

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";

grant delete on table "public"."project_organizations" to "anon";

grant insert on table "public"."project_organizations" to "anon";

grant references on table "public"."project_organizations" to "anon";

grant select on table "public"."project_organizations" to "anon";

grant trigger on table "public"."project_organizations" to "anon";

grant truncate on table "public"."project_organizations" to "anon";

grant update on table "public"."project_organizations" to "anon";

grant delete on table "public"."project_organizations" to "authenticated";

grant insert on table "public"."project_organizations" to "authenticated";

grant references on table "public"."project_organizations" to "authenticated";

grant select on table "public"."project_organizations" to "authenticated";

grant trigger on table "public"."project_organizations" to "authenticated";

grant truncate on table "public"."project_organizations" to "authenticated";

grant update on table "public"."project_organizations" to "authenticated";

grant delete on table "public"."project_organizations" to "service_role";

grant insert on table "public"."project_organizations" to "service_role";

grant references on table "public"."project_organizations" to "service_role";

grant select on table "public"."project_organizations" to "service_role";

grant trigger on table "public"."project_organizations" to "service_role";

grant truncate on table "public"."project_organizations" to "service_role";

grant update on table "public"."project_organizations" to "service_role";

grant delete on table "public"."projects" to "anon";

grant insert on table "public"."projects" to "anon";

grant references on table "public"."projects" to "anon";

grant select on table "public"."projects" to "anon";

grant trigger on table "public"."projects" to "anon";

grant truncate on table "public"."projects" to "anon";

grant update on table "public"."projects" to "anon";

grant delete on table "public"."projects" to "authenticated";

grant insert on table "public"."projects" to "authenticated";

grant references on table "public"."projects" to "authenticated";

grant select on table "public"."projects" to "authenticated";

grant trigger on table "public"."projects" to "authenticated";

grant truncate on table "public"."projects" to "authenticated";

grant update on table "public"."projects" to "authenticated";

grant delete on table "public"."projects" to "service_role";

grant insert on table "public"."projects" to "service_role";

grant references on table "public"."projects" to "service_role";

grant select on table "public"."projects" to "service_role";

grant trigger on table "public"."projects" to "service_role";

grant truncate on table "public"."projects" to "service_role";

grant update on table "public"."projects" to "service_role";

grant delete on table "public"."reviews" to "anon";

grant insert on table "public"."reviews" to "anon";

grant references on table "public"."reviews" to "anon";

grant select on table "public"."reviews" to "anon";

grant trigger on table "public"."reviews" to "anon";

grant truncate on table "public"."reviews" to "anon";

grant update on table "public"."reviews" to "anon";

grant delete on table "public"."reviews" to "authenticated";

grant insert on table "public"."reviews" to "authenticated";

grant references on table "public"."reviews" to "authenticated";

grant select on table "public"."reviews" to "authenticated";

grant trigger on table "public"."reviews" to "authenticated";

grant truncate on table "public"."reviews" to "authenticated";

grant update on table "public"."reviews" to "authenticated";

grant delete on table "public"."reviews" to "service_role";

grant insert on table "public"."reviews" to "service_role";

grant references on table "public"."reviews" to "service_role";

grant select on table "public"."reviews" to "service_role";

grant trigger on table "public"."reviews" to "service_role";

grant truncate on table "public"."reviews" to "service_role";

grant update on table "public"."reviews" to "service_role";

grant delete on table "public"."staff" to "anon";

grant insert on table "public"."staff" to "anon";

grant references on table "public"."staff" to "anon";

grant select on table "public"."staff" to "anon";

grant trigger on table "public"."staff" to "anon";

grant truncate on table "public"."staff" to "anon";

grant update on table "public"."staff" to "anon";

grant delete on table "public"."staff" to "authenticated";

grant insert on table "public"."staff" to "authenticated";

grant references on table "public"."staff" to "authenticated";

grant select on table "public"."staff" to "authenticated";

grant trigger on table "public"."staff" to "authenticated";

grant truncate on table "public"."staff" to "authenticated";

grant update on table "public"."staff" to "authenticated";

grant delete on table "public"."staff" to "service_role";

grant insert on table "public"."staff" to "service_role";

grant references on table "public"."staff" to "service_role";

grant select on table "public"."staff" to "service_role";

grant trigger on table "public"."staff" to "service_role";

grant truncate on table "public"."staff" to "service_role";

grant update on table "public"."staff" to "service_role";

grant delete on table "public"."support_tickets" to "anon";

grant insert on table "public"."support_tickets" to "anon";

grant references on table "public"."support_tickets" to "anon";

grant select on table "public"."support_tickets" to "anon";

grant trigger on table "public"."support_tickets" to "anon";

grant truncate on table "public"."support_tickets" to "anon";

grant update on table "public"."support_tickets" to "anon";

grant delete on table "public"."support_tickets" to "authenticated";

grant insert on table "public"."support_tickets" to "authenticated";

grant references on table "public"."support_tickets" to "authenticated";

grant select on table "public"."support_tickets" to "authenticated";

grant trigger on table "public"."support_tickets" to "authenticated";

grant truncate on table "public"."support_tickets" to "authenticated";

grant update on table "public"."support_tickets" to "authenticated";

grant delete on table "public"."support_tickets" to "service_role";

grant insert on table "public"."support_tickets" to "service_role";

grant references on table "public"."support_tickets" to "service_role";

grant select on table "public"."support_tickets" to "service_role";

grant trigger on table "public"."support_tickets" to "service_role";

grant truncate on table "public"."support_tickets" to "service_role";

grant update on table "public"."support_tickets" to "service_role";

grant delete on table "public"."ticket_messages" to "anon";

grant insert on table "public"."ticket_messages" to "anon";

grant references on table "public"."ticket_messages" to "anon";

grant select on table "public"."ticket_messages" to "anon";

grant trigger on table "public"."ticket_messages" to "anon";

grant truncate on table "public"."ticket_messages" to "anon";

grant update on table "public"."ticket_messages" to "anon";

grant delete on table "public"."ticket_messages" to "authenticated";

grant insert on table "public"."ticket_messages" to "authenticated";

grant references on table "public"."ticket_messages" to "authenticated";

grant select on table "public"."ticket_messages" to "authenticated";

grant trigger on table "public"."ticket_messages" to "authenticated";

grant truncate on table "public"."ticket_messages" to "authenticated";

grant update on table "public"."ticket_messages" to "authenticated";

grant delete on table "public"."ticket_messages" to "service_role";

grant insert on table "public"."ticket_messages" to "service_role";

grant references on table "public"."ticket_messages" to "service_role";

grant select on table "public"."ticket_messages" to "service_role";

grant trigger on table "public"."ticket_messages" to "service_role";

grant truncate on table "public"."ticket_messages" to "service_role";

grant update on table "public"."ticket_messages" to "service_role";

grant delete on table "public"."tool_categories" to "anon";

grant insert on table "public"."tool_categories" to "anon";

grant references on table "public"."tool_categories" to "anon";

grant select on table "public"."tool_categories" to "anon";

grant trigger on table "public"."tool_categories" to "anon";

grant truncate on table "public"."tool_categories" to "anon";

grant update on table "public"."tool_categories" to "anon";

grant delete on table "public"."tool_categories" to "authenticated";

grant insert on table "public"."tool_categories" to "authenticated";

grant references on table "public"."tool_categories" to "authenticated";

grant select on table "public"."tool_categories" to "authenticated";

grant trigger on table "public"."tool_categories" to "authenticated";

grant truncate on table "public"."tool_categories" to "authenticated";

grant update on table "public"."tool_categories" to "authenticated";

grant delete on table "public"."tool_categories" to "service_role";

grant insert on table "public"."tool_categories" to "service_role";

grant references on table "public"."tool_categories" to "service_role";

grant select on table "public"."tool_categories" to "service_role";

grant trigger on table "public"."tool_categories" to "service_role";

grant truncate on table "public"."tool_categories" to "service_role";

grant update on table "public"."tool_categories" to "service_role";

grant delete on table "public"."vendors" to "anon";

grant insert on table "public"."vendors" to "anon";

grant references on table "public"."vendors" to "anon";

grant select on table "public"."vendors" to "anon";

grant trigger on table "public"."vendors" to "anon";

grant truncate on table "public"."vendors" to "anon";

grant update on table "public"."vendors" to "anon";

grant delete on table "public"."vendors" to "authenticated";

grant insert on table "public"."vendors" to "authenticated";

grant references on table "public"."vendors" to "authenticated";

grant select on table "public"."vendors" to "authenticated";

grant trigger on table "public"."vendors" to "authenticated";

grant truncate on table "public"."vendors" to "authenticated";

grant update on table "public"."vendors" to "authenticated";

grant delete on table "public"."vendors" to "service_role";

grant insert on table "public"."vendors" to "service_role";

grant references on table "public"."vendors" to "service_role";

grant select on table "public"."vendors" to "service_role";

grant trigger on table "public"."vendors" to "service_role";

grant truncate on table "public"."vendors" to "service_role";

grant update on table "public"."vendors" to "service_role";

grant delete on table "public"."vote_responses" to "anon";

grant insert on table "public"."vote_responses" to "anon";

grant references on table "public"."vote_responses" to "anon";

grant select on table "public"."vote_responses" to "anon";

grant trigger on table "public"."vote_responses" to "anon";

grant truncate on table "public"."vote_responses" to "anon";

grant update on table "public"."vote_responses" to "anon";

grant delete on table "public"."vote_responses" to "authenticated";

grant insert on table "public"."vote_responses" to "authenticated";

grant references on table "public"."vote_responses" to "authenticated";

grant select on table "public"."vote_responses" to "authenticated";

grant trigger on table "public"."vote_responses" to "authenticated";

grant truncate on table "public"."vote_responses" to "authenticated";

grant update on table "public"."vote_responses" to "authenticated";

grant delete on table "public"."vote_responses" to "service_role";

grant insert on table "public"."vote_responses" to "service_role";

grant references on table "public"."vote_responses" to "service_role";

grant select on table "public"."vote_responses" to "service_role";

grant trigger on table "public"."vote_responses" to "service_role";

grant truncate on table "public"."vote_responses" to "service_role";

grant update on table "public"."vote_responses" to "service_role";

grant delete on table "public"."votes" to "anon";

grant insert on table "public"."votes" to "anon";

grant references on table "public"."votes" to "anon";

grant select on table "public"."votes" to "anon";

grant trigger on table "public"."votes" to "anon";

grant truncate on table "public"."votes" to "anon";

grant update on table "public"."votes" to "anon";

grant delete on table "public"."votes" to "authenticated";

grant insert on table "public"."votes" to "authenticated";

grant references on table "public"."votes" to "authenticated";

grant select on table "public"."votes" to "authenticated";

grant trigger on table "public"."votes" to "authenticated";

grant truncate on table "public"."votes" to "authenticated";

grant update on table "public"."votes" to "authenticated";

grant delete on table "public"."votes" to "service_role";

grant insert on table "public"."votes" to "service_role";

grant references on table "public"."votes" to "service_role";

grant select on table "public"."votes" to "service_role";

grant trigger on table "public"."votes" to "service_role";

grant truncate on table "public"."votes" to "service_role";

grant update on table "public"."votes" to "service_role";


  create policy "Users can view eligible events"
  on "public"."events"
  as permissive
  for select
  to public
using (((NOT is_members_only) OR (( SELECT organizations.tier_id
   FROM organizations
  WHERE (organizations.id IN ( SELECT profiles.organization_id
           FROM profiles
          WHERE (profiles.id = auth.uid())))) = ANY (tier_eligibility)) OR (tier_eligibility IS NULL)));



  create policy "Everyone can view active marketplace tools"
  on "public"."marketplace_tools"
  as permissive
  for select
  to public
using ((is_active = true));



  create policy "Users can create orders for their organization"
  on "public"."orders"
  as permissive
  for insert
  to public
with check ((organization_id IN ( SELECT profiles.organization_id
   FROM profiles
  WHERE (profiles.id = auth.uid()))));



  create policy "Users can view organization orders"
  on "public"."orders"
  as permissive
  for select
  to public
using ((organization_id IN ( SELECT profiles.organization_id
   FROM profiles
  WHERE (profiles.id = auth.uid()))));



  create policy "Users can view own organization"
  on "public"."organizations"
  as permissive
  for select
  to public
using (((id IN ( SELECT profiles.organization_id
   FROM profiles
  WHERE (profiles.id = auth.uid()))) OR (parent_organization_id IN ( SELECT profiles.organization_id
   FROM profiles
  WHERE (profiles.id = auth.uid()))) OR (id IN ( SELECT organizations_1.parent_organization_id
   FROM organizations organizations_1
  WHERE (organizations_1.id IN ( SELECT profiles.organization_id
           FROM profiles
          WHERE (profiles.id = auth.uid())))))));



  create policy "Users can update own profile"
  on "public"."profiles"
  as permissive
  for update
  to public
using ((auth.uid() = id));



  create policy "Users can view organization colleagues"
  on "public"."profiles"
  as permissive
  for select
  to public
using ((organization_id IN ( SELECT profiles_1.organization_id
   FROM profiles profiles_1
  WHERE (profiles_1.id = auth.uid()))));



  create policy "Users can view own profile"
  on "public"."profiles"
  as permissive
  for select
  to public
using ((auth.uid() = id));



  create policy "Everyone can view reviews"
  on "public"."reviews"
  as permissive
  for select
  to public
using (true);



  create policy "Users can create reviews for their organization"
  on "public"."reviews"
  as permissive
  for insert
  to public
with check (((organization_id IN ( SELECT profiles.organization_id
   FROM profiles
  WHERE (profiles.id = auth.uid()))) AND (user_id = auth.uid())));



  create policy "Users can create tickets for their organization"
  on "public"."support_tickets"
  as permissive
  for insert
  to public
with check (((organization_id IN ( SELECT profiles.organization_id
   FROM profiles
  WHERE (profiles.id = auth.uid()))) AND (user_id = auth.uid())));



  create policy "Users can view organization tickets"
  on "public"."support_tickets"
  as permissive
  for select
  to public
using ((organization_id IN ( SELECT profiles.organization_id
   FROM profiles
  WHERE (profiles.id = auth.uid()))));



  create policy "Users can create vote responses for their organization"
  on "public"."vote_responses"
  as permissive
  for insert
  to public
with check (((organization_id IN ( SELECT profiles.organization_id
   FROM profiles
  WHERE (profiles.id = auth.uid()))) AND (user_id = auth.uid())));



  create policy "Users can view organization vote responses"
  on "public"."vote_responses"
  as permissive
  for select
  to public
using ((organization_id IN ( SELECT profiles.organization_id
   FROM profiles
  WHERE (profiles.id = auth.uid()))));


CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_marketplace_tools_updated_at BEFORE UPDATE ON public.marketplace_tools FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_membership_tiers_updated_at BEFORE UPDATE ON public.membership_tiers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON public.organizations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_support_tickets_updated_at BEFORE UPDATE ON public.support_tickets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_votes_updated_at BEFORE UPDATE ON public.votes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


