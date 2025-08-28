export interface Affiliate {
  id: string;
  name: string;
  organization: string;
  email: string;
  phone: string;
  status: "active" | "pending" | "inactive";
  join_date: string;
  notes: string;
  tags: string[];
  avatar: string;
  address: string;
  website: string;
  primaryContact: string;
}
