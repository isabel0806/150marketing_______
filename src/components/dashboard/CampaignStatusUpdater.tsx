'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { CampaignStatus } from '@/lib/types'

export default function CampaignStatusUpdater({
  campaignId,
  currentStatus,
}: {
  campaignId: string
  currentStatus: CampaignStatus
}) {
  const [status, setStatus] = useState(currentStatus)
  const router = useRouter()
  const supabase = createClient()

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value as CampaignStatus
    setStatus(newStatus)
    await supabase.from('campaigns').update({ status: newStatus }).eq('id', campaignId)
    router.refresh()
  }

  return (
    <select
      value={status}
      onChange={handleChange}
      className="border border-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
    >
      <option value="draft">Draft</option>
      <option value="review">Review</option>
      <option value="approved">Approved</option>
      <option value="running">Running</option>
      <option value="paused">Paused</option>
      <option value="completed">Completed</option>
    </select>
  )
}
