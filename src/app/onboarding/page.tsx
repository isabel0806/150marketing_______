'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, X, CheckCircle } from 'lucide-react'

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    name: '',
    industry: '',
    location: '',
    age_gap: '',
    income_bracket: '',
    naics: '',
    notes: '',
    brand_themes: '',
    brand_colors: '',
    brand_fonts: '',
    brand_voice: '',
  })

  const [keywords, setKeywords] = useState(['', '', ''])
  const [feels, setFeels] = useState(['', '', ''])
  const [competitors, setCompetitors] = useState([''])

  const totalSteps = 3

  async function handleSubmit() {
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.from('clients').insert({
      ...form,
      income_bracket: form.income_bracket || null,
      keywords: keywords.filter(Boolean),
      feels: feels.filter(Boolean),
      brand_competitors: competitors.filter(Boolean),
    })

    if (error) {
      setError('Something went wrong. Please try again.')
      setLoading(false)
      return
    }

    setSubmitted(true)
  }

  const inputClass = "w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-400 bg-white"
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5"

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="text-green-600" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Thanks!</h1>
          <p className="text-gray-500">
            We received your information. Our team will be in touch soon to kick off your marketing strategy.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">150</span>
            </div>
            <span className="font-semibold text-gray-900">Marketing</span>
          </div>
          <span className="text-sm text-gray-400">Step {step} of {totalSteps}</span>
        </div>
        {/* Progress bar */}
        <div className="h-1 bg-gray-100">
          <div
            className="h-1 bg-black transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">

        {/* Step 1: Business Info */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tell us about your business</h1>
              <p className="text-gray-500 text-sm mt-1">Basic information to get started</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
              <div>
                <label className={labelClass}>Business name *</label>
                <input
                  className={inputClass}
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Acme Corp"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Industry</label>
                  <input
                    className={inputClass}
                    value={form.industry}
                    onChange={e => setForm(f => ({ ...f, industry: e.target.value }))}
                    placeholder="e.g. E-commerce, Retail"
                  />
                </div>
                <div>
                  <label className={labelClass}>Location</label>
                  <input
                    className={inputClass}
                    value={form.location}
                    onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                    placeholder="e.g. Miami, FL"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Target age range</label>
                  <input
                    className={inputClass}
                    value={form.age_gap}
                    onChange={e => setForm(f => ({ ...f, age_gap: e.target.value }))}
                    placeholder="e.g. 25–45"
                  />
                </div>
                <div>
                  <label className={labelClass}>Customer type</label>
                  <select
                    className={inputClass}
                    value={form.income_bracket}
                    onChange={e => setForm(f => ({ ...f, income_bracket: e.target.value }))}
                  >
                    <option value="">Select...</option>
                    <option value="High Ticket">High Ticket (premium buyers)</option>
                    <option value="Low Ticket">Low Ticket (volume buyers)</option>
                    <option value="High Vol">High Volume</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                if (!form.name) { setError('Business name is required'); return }
                setError('')
                setStep(2)
              }}
              className="w-full bg-black text-white py-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Continue →
            </button>
            {error && <p className="text-sm text-red-600 text-center">{error}</p>}
          </div>
        )}

        {/* Step 2: Brand Positioning */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Brand positioning</h1>
              <p className="text-gray-500 text-sm mt-1">Help us understand how your brand feels</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
              <div>
                <label className={labelClass}>
                  3 keywords that define your business
                  <span className="text-gray-400 font-normal ml-1">(how you want to be seen)</span>
                </label>
                <div className="space-y-2">
                  {keywords.map((k, i) => (
                    <input
                      key={i}
                      className={inputClass}
                      value={k}
                      onChange={e => setKeywords(prev => prev.map((v, idx) => idx === i ? e.target.value : v))}
                      placeholder={`Keyword ${i + 1} — e.g. Innovative`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className={labelClass}>
                  3 feelings your brand evokes
                  <span className="text-gray-400 font-normal ml-1">(how customers feel)</span>
                </label>
                <div className="space-y-2">
                  {feels.map((f, i) => (
                    <input
                      key={i}
                      className={inputClass}
                      value={f}
                      onChange={e => setFeels(prev => prev.map((v, idx) => idx === i ? e.target.value : v))}
                      placeholder={`Feel ${i + 1} — e.g. Confident`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className={labelClass}>Who are your main competitors?</label>
                <div className="space-y-2">
                  {competitors.map((c, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        className={inputClass}
                        value={c}
                        onChange={e => setCompetitors(prev => prev.map((v, idx) => idx === i ? e.target.value : v))}
                        placeholder={`Competitor ${i + 1}`}
                      />
                      {i > 0 && (
                        <button
                          type="button"
                          onClick={() => setCompetitors(prev => prev.filter((_, idx) => idx !== i))}
                          className="p-2 text-gray-300 hover:text-red-400"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  {competitors.length < 5 && (
                    <button
                      type="button"
                      onClick={() => setCompetitors(prev => [...prev, ''])}
                      className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-700"
                    >
                      <Plus size={14} /> Add competitor
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                ← Back
              </button>
              <button
                onClick={() => { setError(''); setStep(3) }}
                className="flex-1 bg-black text-white py-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Brand Design */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Brand & design</h1>
              <p className="text-gray-500 text-sm mt-1">Visual identity and voice — skip anything you don't have yet</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Brand colors</label>
                  <input
                    className={inputClass}
                    value={form.brand_colors}
                    onChange={e => setForm(f => ({ ...f, brand_colors: e.target.value }))}
                    placeholder="e.g. Navy blue, Gold"
                  />
                </div>
                <div>
                  <label className={labelClass}>Fonts</label>
                  <input
                    className={inputClass}
                    value={form.brand_fonts}
                    onChange={e => setForm(f => ({ ...f, brand_fonts: e.target.value }))}
                    placeholder="e.g. Helvetica, Garamond"
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>Brand themes / aesthetic</label>
                <input
                  className={inputClass}
                  value={form.brand_themes}
                  onChange={e => setForm(f => ({ ...f, brand_themes: e.target.value }))}
                  placeholder="e.g. Minimalist, Luxury, Bold"
                />
              </div>
              <div>
                <label className={labelClass}>Brand voice / tone</label>
                <input
                  className={inputClass}
                  value={form.brand_voice}
                  onChange={e => setForm(f => ({ ...f, brand_voice: e.target.value }))}
                  placeholder="e.g. Professional but approachable, Playful"
                />
              </div>
              <div>
                <label className={labelClass}>Anything else we should know?</label>
                <textarea
                  className={`${inputClass} min-h-[80px] resize-none`}
                  value={form.notes}
                  onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                  placeholder="Goals, challenges, things you love or hate about your current marketing..."
                />
              </div>
            </div>

            {error && <p className="text-sm text-red-600 text-center">{error}</p>}

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                ← Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 bg-black text-white py-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit →'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
