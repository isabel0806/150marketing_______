'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Platform, ContentType } from '@/lib/types'

const platformsByType: Record<string, Platform[]> = {
  paid_media: ['meta_ads', 'google'],
  organic_media: ['instagram', 'facebook', 'pinterest', 'reddit'],
  email: ['email'],
}

const contentTypes: ContentType[] = ['copy', 'image', 'video', 'email_template', 'ad']

export default function NewCreativeForm({
  campaignId,
  campaignType,
  clientId,
}: {
  campaignId: string
  campaignType: string
  clientId: string
}) {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const platforms = platformsByType[campaignType] ?? ['meta_ads']

  const [form, setForm] = useState({
    platform: platforms[0],
    content_type: 'copy' as ContentType,
    title: '',
    body: '',
    image_url: '',
    status: 'draft',
    ai_generated: false,
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.from('campaign_creatives').insert({
      ...form,
      campaign_id: campaignId,
      image_url: form.image_url || null,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push(`/dashboard/clients/${clientId}/campaigns/${campaignId}`)
    router.refresh()
  }

  const inputClass = "w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-400"
  const labelClass = "block text-sm font-medium text-gray-700 mb-1"

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Platform *</label>
          <select
            className={inputClass}
            value={form.platform}
            onChange={e => setForm(f => ({ ...f, platform: e.target.value as Platform }))}
          >
            {platforms.map(p => (
              <option key={p} value={p}>{p.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Content Type *</label>
          <select
            className={inputClass}
            value={form.content_type}
            onChange={e => setForm(f => ({ ...f, content_type: e.target.value as ContentType }))}
          >
            {contentTypes.map(t => (
              <option key={t} value={t}>{t.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Title / Headline</label>
        <input
          className={inputClass}
          value={form.title}
          onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
          placeholder="Ad headline or email subject..."
        />
      </div>

      <div>
        <label className={labelClass}>Body / Copy</label>
        <textarea
          className={`${inputClass} min-h-[120px] resize-y`}
          value={form.body}
          onChange={e => setForm(f => ({ ...f, body: e.target.value }))}
          placeholder="Ad copy, post caption, email body..."
        />
      </div>

      <div>
        <label className={labelClass}>Image URL</label>
        <input
          className={inputClass}
          value={form.image_url}
          onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))}
          placeholder="https://..."
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1">
          <label className={labelClass}>Status</label>
          <select
            className={inputClass}
            value={form.status}
            onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
          >
            <option value="draft">Draft</option>
            <option value="review">Ready for Review</option>
            <option value="approved">Approved</option>
          </select>
        </div>
        <div className="flex items-center gap-2 mt-6">
          <input
            type="checkbox"
            id="ai_generated"
            checked={form.ai_generated}
            onChange={e => setForm(f => ({ ...f, ai_generated: e.target.checked }))}
            className="rounded"
          />
          <label htmlFor="ai_generated" className="text-sm text-gray-600">AI Generated</label>
        </div>
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
          {loading ? 'Saving...' : 'Add Creative'}
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
