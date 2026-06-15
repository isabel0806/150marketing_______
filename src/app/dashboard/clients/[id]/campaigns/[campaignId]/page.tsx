import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Edit, Plus, CheckCircle, XCircle, Clock, TrendingUp } from 'lucide-react'
import CampaignStatusBadge from '@/components/dashboard/CampaignStatusBadge'
import CreativeCard from '@/components/dashboard/CreativeCard'
import CampaignStatusUpdater from '@/components/dashboard/CampaignStatusUpdater'

export default async function CampaignPage({
  params,
}: {
  params: Promise<{ id: string; campaignId: string }>
}) {
  const { id, campaignId } = await params
  const supabase = await createClient()

  const [{ data: campaign }, { data: client }, { data: creatives }, { data: performance }] =
    await Promise.all([
      supabase.from('campaigns').select('*').eq('id', campaignId).single(),
      supabase.from('clients').select('name, client_num').eq('id', id).single(),
      supabase.from('campaign_creatives').select('*').eq('campaign_id', campaignId).order('created_at'),
      supabase
        .from('campaign_performance')
        .select('*')
        .eq('campaign_id', campaignId)
        .order('date', { ascending: false })
        .limit(30),
    ])

  if (!campaign || !client) notFound()

  const typeLabel = {
    paid_media: 'Paid Media',
    organic_media: 'Organic Media',
    email: 'Email',
  }[campaign.type as string] ?? campaign.type

  const totalSpend = performance?.reduce((s, p) => s + (p.spend ?? 0), 0) ?? 0
  const totalRevenue = performance?.reduce((s, p) => s + (p.revenue ?? 0), 0) ?? 0
  const totalImpressions = performance?.reduce((s, p) => s + (p.impressions ?? 0), 0) ?? 0
  const totalClicks = performance?.reduce((s, p) => s + (p.clicks ?? 0), 0) ?? 0
  const totalConversions = performance?.reduce((s, p) => s + (p.conversions ?? 0), 0) ?? 0

  const approvedCount = creatives?.filter(c => c.status === 'approved').length ?? 0
  const reviewCount = creatives?.filter(c => c.status === 'review').length ?? 0
  const draftCount = creatives?.filter(c => c.status === 'draft').length ?? 0

  return (
    <div className="p-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
        <Link href="/dashboard/clients" className="hover:text-gray-900">Clients</Link>
        <span>/</span>
        <Link href={`/dashboard/clients/${id}`} className="hover:text-gray-900">{client.name}</Link>
        <span>/</span>
        <span>{campaign.name}</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{campaign.name}</h1>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-sm text-gray-500">{typeLabel}</span>
            <CampaignStatusBadge status={campaign.status} />
            {campaign.start_date && (
              <span className="text-sm text-gray-400">
                {new Date(campaign.start_date).toLocaleDateString()}
                {campaign.end_date ? ` → ${new Date(campaign.end_date).toLocaleDateString()}` : ''}
              </span>
            )}
            {campaign.budget && (
              <span className="text-sm text-gray-500">
                Budget: <strong>${campaign.budget.toLocaleString()}</strong>
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <CampaignStatusUpdater campaignId={campaignId} currentStatus={campaign.status} />
          <Link
            href={`/dashboard/clients/${id}/campaigns/${campaignId}/edit`}
            className="flex items-center gap-2 border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            <Edit size={14} />
            Edit
          </Link>
        </div>
      </div>

      {/* Performance stats */}
      {performance && performance.length > 0 && (
        <div className="grid grid-cols-5 gap-3 mb-6">
          {[
            { label: 'Impressions', value: totalImpressions.toLocaleString() },
            { label: 'Clicks', value: totalClicks.toLocaleString() },
            { label: 'Conversions', value: totalConversions.toLocaleString() },
            { label: 'Spend', value: `$${totalSpend.toLocaleString()}` },
            { label: 'Revenue', value: `$${totalRevenue.toLocaleString()}` },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white rounded-xl border border-gray-100 p-4">
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{label}</p>
              <p className="text-lg font-bold text-gray-900">{value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Creatives section */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-semibold text-gray-900">Creatives & Content</h2>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs text-green-600 flex items-center gap-1">
                <CheckCircle size={12} /> {approvedCount} approved
              </span>
              <span className="text-xs text-yellow-600 flex items-center gap-1">
                <Clock size={12} /> {reviewCount} in review
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <XCircle size={12} /> {draftCount} draft
              </span>
            </div>
          </div>
          <Link
            href={`/dashboard/clients/${id}/campaigns/${campaignId}/creatives/new`}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            <Plus size={14} />
            Add Creative
          </Link>
        </div>

        {creatives && creatives.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {creatives.map(creative => (
              <CreativeCard
                key={creative.id}
                creative={creative}
                clientId={id}
                campaignId={campaignId}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400">
            <TrendingUp size={32} className="mx-auto mb-3 opacity-20" />
            <p className="text-sm">No creatives yet</p>
            <Link
              href={`/dashboard/clients/${id}/campaigns/${campaignId}/creatives/new`}
              className="mt-3 inline-block text-sm text-black hover:underline"
            >
              Add first creative
            </Link>
          </div>
        )}
      </div>

      {campaign.notes && (
        <div className="mt-4 bg-white rounded-xl border border-gray-100 p-5">
          <h2 className="font-semibold text-gray-900 mb-2 text-sm">Notes</h2>
          <p className="text-sm text-gray-600 whitespace-pre-wrap">{campaign.notes}</p>
        </div>
      )}
    </div>
  )
}
