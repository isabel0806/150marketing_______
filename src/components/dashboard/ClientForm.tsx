'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Client } from '@/lib/types'
import { X, Plus } from 'lucide-react'

interface Props {
  client?: Client
}

export default function ClientForm({ client }: Props) {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    name: client?.name ?? '',
    industry: client?.industry ?? '',
    location: client?.location ?? '',
    age_gap: client?.age_gap ?? '',
    income_bracket: client?.income_bracket ?? '',
    naics: client?.naics ?? '',
    notes: client?.notes ?? '',
    brand_themes: client?.brand_themes ?? '',
    brand_colors: client?.brand_colors ?? '',
    brand_fonts: client?.brand_fonts ?? '',
    brand_voice: client?.brand_voice ?? '',
    website: client?.website ?? '',
    social_instagram: client?.social_instagram ?? '',
    social_facebook: client?.social_facebook ?? '',
    social_tiktok: client?.social_tiktok ?? '',
  })

  const [keywords, setKeywords] = useState<string[]>(client?.keywords ?? ['', '', ''])
  const [feels, setFeels] = useState<string[]>(client?.feels ?? ['', '', ''])
  const [competitors, setCompetitors] = useState<string[]>(client?.brand_competitors ?? [''])

  function setKeyword(i: number, v: string) {
    setKeywords(prev => prev.map((k, idx) => idx === i ? v : k))
  }

  function setFeel(i: number, v: string) {
    setFeels(prev => prev.map((f, idx) => idx === i ? v : f))
  }

  function setCompetitor(i: number, v: string) {
    setCompetitors(prev => prev.map((c, idx) => idx === i ? v : c))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const payload = {
      ...form,
      income_bracket: form.income_bracket || null,
      keywords: keywords.filter(Boolean),
      feels: feels.filter(Boolean),
      brand_competitors: competitors.filter(Boolean),
    }

    let result
    if (client) {
      result = await supabase.from('clients').update(payload).eq('id', client.id)
    } else {
      result = await supabase.from('clients').insert(payload).select().single()
    }

    if (result.error) {
      setError(result.error.message)
      setLoading(false)
      return
    }

    const id = client?.id ?? result.data?.id
    router.push(`/dashboard/clients/${id}`)
    router.refresh()
  }

  const inputClass = "w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-400"
  const labelClass = "block text-sm font-medium text-gray-700 mb-1"

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Info */}
      <section className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Basic Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className={labelClass}>Client Name *</label>
            <input
              className={inputClass}
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              required
              placeholder="Acme Corp"
            />
          </div>
          <div className="col-span-2">
            <label className={labelClass}>Website</label>
            <input
              className={inputClass}
              value={form.website}
              onChange={e => setForm(f => ({ ...f, website: e.target.value }))}
              placeholder="https://www.empresa.com"
              type="url"
            />
          </div>
          <div>
            <label className={labelClass}>Instagram</label>
            <input
              className={inputClass}
              value={form.social_instagram}
              onChange={e => setForm(f => ({ ...f, social_instagram: e.target.value }))}
              placeholder="@usuario"
            />
          </div>
          <div>
            <label className={labelClass}>Facebook</label>
            <input
              className={inputClass}
              value={form.social_facebook}
              onChange={e => setForm(f => ({ ...f, social_facebook: e.target.value }))}
              placeholder="@página"
            />
          </div>
          <div>
            <label className={labelClass}>TikTok</label>
            <input
              className={inputClass}
              value={form.social_tiktok}
              onChange={e => setForm(f => ({ ...f, social_tiktok: e.target.value }))}
              placeholder="@usuario"
            />
          </div>
          <div>
            <label className={labelClass}>Industry</label>
            <input
              className={inputClass}
              value={form.industry}
              onChange={e => setForm(f => ({ ...f, industry: e.target.value }))}
              placeholder="e.g. E-commerce, SaaS, Retail"
            />
          </div>
          <div>
            <label className={labelClass}>Location</label>
            <input
              className={inputClass}
              value={form.location}
              onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
              placeholder="e.g. New York, USA"
            />
          </div>
          <div>
            <label className={labelClass}>Age Gap</label>
            <input
              className={inputClass}
              value={form.age_gap}
              onChange={e => setForm(f => ({ ...f, age_gap: e.target.value }))}
              placeholder="e.g. 25-45"
            />
          </div>
          <div>
            <label className={labelClass}>Income Bracket</label>
            <select
              className={inputClass}
              value={form.income_bracket}
              onChange={e => setForm(f => ({ ...f, income_bracket: e.target.value }))}
            >
              <option value="">Select...</option>
              <option value="High Ticket">High Ticket</option>
              <option value="Low Ticket">Low Ticket</option>
              <option value="High Vol">High Vol</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>NAICS Code</label>
            <input
              className={inputClass}
              value={form.naics}
              onChange={e => setForm(f => ({ ...f, naics: e.target.value }))}
              placeholder="e.g. 541613"
            />
          </div>
        </div>
      </section>

      {/* Keywords & Feels */}
      <section className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Brand Positioning</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>3 Keywords that define the business</label>
            <div className="space-y-2">
              {keywords.map((k, i) => (
                <input
                  key={i}
                  className={inputClass}
                  value={k}
                  onChange={e => setKeyword(i, e.target.value)}
                  placeholder={`Keyword ${i + 1}`}
                />
              ))}
            </div>
          </div>
          <div>
            <label className={labelClass}>3 Feels / Perceptions del negocio</label>
            <div className="space-y-2">
              {feels.map((f, i) => (
                <input
                  key={i}
                  className={inputClass}
                  value={f}
                  onChange={e => setFeel(i, e.target.value)}
                  placeholder={`Feel ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brand & Design */}
      <section className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Brand & Design Guidelines</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Themes</label>
              <input
                className={inputClass}
                value={form.brand_themes}
                onChange={e => setForm(f => ({ ...f, brand_themes: e.target.value }))}
                placeholder="e.g. Modern, Minimalist"
              />
            </div>
            <div>
              <label className={labelClass}>Colors</label>
              <input
                className={inputClass}
                value={form.brand_colors}
                onChange={e => setForm(f => ({ ...f, brand_colors: e.target.value }))}
                placeholder="e.g. #000000, #FF5733"
              />
            </div>
            <div>
              <label className={labelClass}>Fonts</label>
              <input
                className={inputClass}
                value={form.brand_fonts}
                onChange={e => setForm(f => ({ ...f, brand_fonts: e.target.value }))}
                placeholder="e.g. Inter, Playfair Display"
              />
            </div>
            <div>
              <label className={labelClass}>Voice</label>
              <input
                className={inputClass}
                value={form.brand_voice}
                onChange={e => setForm(f => ({ ...f, brand_voice: e.target.value }))}
                placeholder="e.g. Professional, Friendly"
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Brand Competitors</label>
            <div className="space-y-2">
              {competitors.map((c, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    className={inputClass}
                    value={c}
                    onChange={e => setCompetitor(i, e.target.value)}
                    placeholder={`Competitor ${i + 1}`}
                  />
                  {i > 0 && (
                    <button
                      type="button"
                      onClick={() => setCompetitors(prev => prev.filter((_, idx) => idx !== i))}
                      className="p-2 text-gray-400 hover:text-red-500"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => setCompetitors(prev => [...prev, ''])}
                className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-900"
              >
                <Plus size={14} />
                Add competitor
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Notes */}
      <section className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Notes</h2>
        <textarea
          className={`${inputClass} min-h-[100px] resize-y`}
          value={form.notes}
          onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
          placeholder="Internal notes about this client..."
        />
      </section>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-lg">{error}</p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {loading ? 'Saving...' : client ? 'Save Changes' : 'Create Client'}
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
