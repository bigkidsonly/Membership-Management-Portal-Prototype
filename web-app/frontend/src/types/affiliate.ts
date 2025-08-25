export interface Affiliate {
  id: string
  name: string
  organization: string
  email: string
  phone: string
  status: 'active' | 'pending' | 'inactive'
  tier: string
  joinDate: string
  notes: string
  tags: string[]
  avatar: string
  address: string
  website: string
  primaryContact: string
}
