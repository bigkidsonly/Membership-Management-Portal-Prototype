// src/services/database.ts
import { supabase } from '../lib/supabase'
import type { Database } from '../lib/supabase'

type Tables = Database['public']['Tables']
type Affiliate = Tables['affiliates']['Row']
type MarketplaceTool = Tables['marketplace_tools']['Row']

// Affiliates Service
export const affiliatesService = {
  async getAll() {
    const { data, error } = await supabase
      .from('affiliates')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('affiliates')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  async create(affiliate: Tables['affiliates']['Insert']) {
    const { data, error } = await supabase
      .from('affiliates')
      .insert(affiliate)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, updates: Tables['affiliates']['Update']) {
    const { data, error } = await supabase
      .from('affiliates')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('affiliates')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Marketplace Tools Service
export const marketplaceService = {
  async getTools(options?: {
    category?: string
    featured?: boolean
    limit?: number
  }) {
    let query = supabase
      .from('marketplace_tools')
      .select('*')
    
    if (options?.category) {
      query = query.eq('category', options.category)
    }
    
    if (options?.featured !== undefined) {
      query = query.eq('featured', options.featured)
    }
    
    if (options?.limit) {
      query = query.limit(options.limit)
    }
    
    query = query.order('created_at', { ascending: false })
    
    const { data, error } = await query
    
    if (error) throw error
    return data
  },

  async getToolById(id: string) {
    const { data, error } = await supabase
      .from('marketplace_tools')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  async getFeaturedTools() {
    return this.getTools({ featured: true })
  },

  async searchTools(searchTerm: string) {
    const { data, error } = await supabase
      .from('marketplace_tools')
      .select('*')
      .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,vendor.ilike.%${searchTerm}%`)
      .order('rating', { ascending: false })
    
    if (error) throw error
    return data
  }
}

// Authentication Service
export const authService = {
  async signUp(email: string, password: string, metadata?: any) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    })
    
    if (error) throw error
    return data
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) throw error
    return data
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  },

  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) throw error
  }
}

// Real-time subscriptions
export const subscribeToTable = (
  table: keyof Tables,
  callback: (payload: any) => void,
  filter?: string
) => {
  const channel = supabase
    .channel(`${table}_changes`)
    .on('postgres_changes', { 
      event: '*', 
      schema: 'public', 
      table,
      filter 
    }, callback)
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}