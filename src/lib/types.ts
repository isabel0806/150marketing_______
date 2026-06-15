export type IncomeBracket = 'High Ticket' | 'Low Ticket' | 'High Vol'
export type CampaignType = 'paid_media' | 'organic_media' | 'email'
export type CampaignStatus = 'draft' | 'review' | 'approved' | 'running' | 'completed' | 'paused'
export type CreativeStatus = 'draft' | 'review' | 'approved' | 'rejected'
export type Platform = 'meta_ads' | 'facebook' | 'instagram' | 'pinterest' | 'google' | 'reddit' | 'email'
export type ContentType = 'image' | 'video' | 'copy' | 'email_template' | 'ad'

export interface Client {
  id: string
  client_num: number
  name: string
  industry?: string
  location?: string
  age_gap?: string
  income_bracket?: IncomeBracket
  keywords: string[]
  feels: string[]
  brand_themes?: string
  brand_colors?: string
  brand_logo_url?: string
  brand_fonts?: string
  brand_voice?: string
  brand_competitors: string[]
  meta_parameters?: Record<string, unknown>
  naics?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface Campaign {
  id: string
  client_id: string
  name: string
  type: CampaignType
  status: CampaignStatus
  start_date?: string
  end_date?: string
  budget?: number
  notes?: string
  created_at: string
  updated_at: string
}

export interface CampaignCreative {
  id: string
  campaign_id: string
  platform: Platform
  content_type: ContentType
  title?: string
  body?: string
  image_url?: string
  status: CreativeStatus
  reviewer_notes?: string
  ai_generated: boolean
  created_at: string
  updated_at: string
}

export interface CampaignPerformance {
  id: string
  campaign_id: string
  date: string
  impressions: number
  clicks: number
  conversions: number
  spend: number
  revenue: number
  platform?: string
}
