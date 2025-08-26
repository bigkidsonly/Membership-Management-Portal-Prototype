export interface MemberOrganization {
  id: string;
  name: string;
  tier: string;
  movementFocus: string[];
  size: string;
  primaryContact: {
    name: string;
    title: string;
    email: string;
    phone?: string;
  };
  location?: string;
  website?: string;
  joinDate: string;
  logo?: string;
  reach?: string;
}