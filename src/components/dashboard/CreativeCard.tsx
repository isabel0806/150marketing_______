'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { CheckCircle, XCircle, Clock, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CampaignCreative } from '@/lib/types'

const platformLabels: Record<string, string> = {
  meta_ads: 'Meta Ads',
  facebook: 'Facebook',
  instagram: 'Instagram',
  pinterest: 'Pinterest',
  google: 'Google',
  reddit: 'Reddit',
  email: 'Email',
}

const statusIcon = {
  approved: <CheckCircle size={14} className="text-green-500" />,
  review: <Clock size={14} className="text-yellow-500" />,
  rejected: <XCircle size={14} className="text-red-500" />,
  draft: <Clock size={14} className="text-gray-400" />,
}

export default function CreativeCard({
  creative,
  clientId,
  campaignId,
}: {
  creative: CampaignCreative
  clientId: string
  campaignId: string
}) {
  const [status, setStatus] = useState(creative.status)
  const [reviewNotes, setReviewNotes] = useState(creative.reviewer_notes ?? '')
  const [editingNotes, setEditingNotes] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function updateStatus(newStatus: string) {
    setLoading(true)
    await supabase
      .from('campaign_creatives')
      .update({ status: newStatus })
      .eq('id', creative.id)
    setStatus(newStatus as any)
    setLoading(false)
    router.refresh()
  }

  async function saveNotes() {
    await supabase
      .from('campaign_creatives')
      .update({ reviewer_notes: reviewNotes })
      .eq('id', creative.id)
    setEditingNotes(false)
  }

  async function handleDelete() {
    if (!confirm('Delete this creative?')) return
    await supabase.from('campaign_creatives').delete().eq('id', creative.id)
    router.refresh()
  }

  const borderColor = {
    approved: 'border-green-200',
    review: 'border-yellow-200',
    rejected: 'border-red-200',
    draft: 'border-gray-100',
  }[status]

  return (
    <div className={cn('border rounded-xl p-4 space-y-3', borderColor)}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          {statusIcon[status]}
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            {platformLabels[creative.platform] ?? creative.platform}
          </span>
          {creative.ai_generated && (
            <span className="px-1.5 py-0.5 bg-purple-50 text-purple-600 rounded text-xs">AI</span>
          )}
        </div>
        <button onClick={handleDelete} className="text-gray-300 hover:text-red-400 transition-colors">
          <Trash2 size={12} />
        </button>
      </div>

      {creative.title && (
        <p className="text-sm font-medium text-gray-900">{creative.title}</p>
      )}
      {creative.body && (
        <p className="text-sm text-gray-600 line-clamp-3">{creative.body}</p>
      )}
      {creative.image_url && (
        <img
          src={creative.image_url}
          alt={creative.title ?? 'Creative'}
          className="w-full h-32 object-cover rounded-lg"
        />
      )}

      {/* Reviewer notes */}
      <div>
        {editingNotes ? (
          <div className="space-y-2">
            <textarea
              className="w-full px-2 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-none resize-none"
              value={reviewNotes}
              onChange={e => setReviewNotes(e.target.value)}
              rows={2}
              placeholder="Reviewer notes..."
            />
            <div className="flex gap-2">
              <button onClick={saveNotes} className="text-xs text-black hover:underline">Save</button>
              <button onClick={() => setEditingNotes(false)} className="text-xs text-gray-400 hover:underline">Cancel</button>
            </div>
          </div>
        ) : reviewNotes ? (
          <p
            className="text-xs text-gray-500 italic cursor-pointer hover:text-gray-700"
            onClick={() => setEditingNotes(true)}
          >
            "{reviewNotes}"
          </p>
        ) : (
          <button
            onClick={() => setEditingNotes(true)}
            className="text-xs text-gray-300 hover:text-gray-500"
          >
            + Add review note
          </button>
        )}
      </div>

      {/* Status actions */}
      <div className="flex gap-2 pt-1 border-t border-gray-50">
        <button
          onClick={() => updateStatus('approved')}
          disabled={loading || status === 'approved'}
          className={cn(
            'flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors',
            status === 'approved'
              ? 'bg-green-100 text-green-700'
              : 'hover:bg-green-50 text-gray-400 hover:text-green-700'
          )}
        >
          Approve
        </button>
        <button
          onClick={() => updateStatus('review')}
          disabled={loading || status === 'review'}
          className={cn(
            'flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors',
            status === 'review'
              ? 'bg-yellow-100 text-yellow-700'
              : 'hover:bg-yellow-50 text-gray-400 hover:text-yellow-700'
          )}
        >
          Review
        </button>
        <button
          onClick={() => updateStatus('rejected')}
          disabled={loading || status === 'rejected'}
          className={cn(
            'flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors',
            status === 'rejected'
              ? 'bg-red-100 text-red-700'
              : 'hover:bg-red-50 text-gray-400 hover:text-red-700'
          )}
        >
          Reject
        </button>
      </div>
    </div>
  )
}
