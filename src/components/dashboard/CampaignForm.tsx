'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Campaign, CampaignType, CampaignStatus } from '@/lib/types'

interface Props {
  clientId: string
  campaign?: Campaign
  defaultType?: string
}

export default function CampaignForm({ clientId, campaign, defaultType }: Props) {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    name: campaign?.name ?? '',
    type: campaign?.type ?? (defaultType as CampaignType) ?? 'paid_media',
    status: campaign?.status ?? 'draft',
    start_date: campaign?.start_date ?? '',
    end_date: campaign?.end_date ?? '',
    budget: campaign?.budget?.toString() ?? '',
    notes: campaign?.notes ?? '',
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const payload = {
      ...form,
      client_id: clientId,
      budget: form.budget ? parseFloat(form.budget) : null,
      start_date: form.start_date || null,
      end_date: form.end_date || null,
    }

    let result
    if (campaign) {
      result = await supabase.from('campaigns').update(payload).eq('id', campaign.id)
    } else {
      result = await supabase.from('campaigns').insert(payload).select().single()
    }

    if (result.error) {
      setError(result.error.message)
      setLoading(false)
      return
    }

    const campaignId = campaign?.id ?? result.data?.id
    router.push(`/dashboard/clients/${clientId}/campaigns/${campaignId}`)
    router.refresh()
  }

  const inputClass = "w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-400"
  const labelClass = "block text-sm font-medium text-gray-700 mb-1"

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
      <div>
        <label className={labelClass}>Campaign Name *</label>
        <input
          className={inputClass}
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          required
          placeholder="e.g. Summer Launch 2025"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Type *</label>
          <select
            className={inputClass}
            value={form.type}
            onChange={e => setForm(f => ({ ...f, type: e.target.value as CampaignType }))}
          >
            <option value="paid_media">Paid Media</option>
            <option value="organic_media">Organic Media</option>
            <option value="email">Email</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Status</label>
          <select
            className={inputClass}
            value={form.status}
            onChange={e => setForm(f => ({ ...f, status: e.target.value as CampaignStatus }))}
          >
            <option value="draft">Draft</option>
            <option value="review">Review</option>
            <option value="approved">Approved</option>
            <option value="running">Running</option>
            <option value="paused">Paused</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Start Date</label>
          <input
            type="date"
            className={inputClass}
            value={form.start_date}
            onChange={e => setForm(f => ({ ...f, start_date: e.target.value }))}
          />
        </div>
        <div>
          <label className={labelClass}>End Date</label>
          <input
            type="date"
            className={inputClass}
            value={form.end_date}
            onChange={e => setForm(f => ({ ...f, end_date: e.target.value }))}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Budget ($)</label>
        <input
          type="number"
          className={inputClass}
          value={form.budget}
          onChange={e => setForm(f => ({ ...f, budget: e.target.value }))}
          placeholder="0.00"
          min="0"
          step="0.01"
        />
      </div>

      <div>
        <label className={labelClass}>Notes</label>
        <textarea
          className={`${inputClass} min-h-[80px] resize-y`}
          value={form.notes}
          onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
          placeholder="Campaign notes..."
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {loading ? 'Saving...' : campaign ? 'Save Changes' : 'Create Campaign'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
