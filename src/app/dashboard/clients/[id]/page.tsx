import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Edit, Plus, Tag, MapPin, Users, TrendingUp, Mail, BarChart3 } from 'lucide-react'
import DeleteClientButton from '@/components/dashboard/DeleteClientButton'
import CampaignStatusBadge from '@/components/dashboard/CampaignStatusBadge'

export default async function ClientProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: client } = await supabase
    .from('clients')
    .select('*')
    .eq('id', id)
    .single()

  if (!client) notFound()

  const { data: campaigns } = await supabase
    .from('campaigns')
    .select('*')
    .eq('client_id', id)
    .order('created_at', { ascending: false })

  const campaignsByType = {
    paid_media: campaigns?.filter(c => c.type === 'paid_media') ?? [],
    organic_media: campaigns?.filter(c => c.type === 'organic_media') ?? [],
    email: campaigns?.filter(c => c.type === 'email') ?? [],
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
            <Link href="/dashboard/clients" className="hover:text-gray-900">Clients</Link>
            <span>/</span>
            <span>#{client.client_num}</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{client.name}</h1>
          <div className="flex items-center gap-3 mt-2">
            {client.industry && (
              <span className="flex items-center gap-1 text-sm text-gray-500">
                <Tag size={12} />
                {client.industry}
              </span>
            )}
            {client.location && (
              <span className="flex items-center gap-1 text-sm text-gray-500">
                <MapPin size={12} />
                {client.location}
              </span>
            )}
            {client.income_bracket && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                {client.income_bracket}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <DeleteClientButton clientId={client.id} />
          <Link
            href={`/dashboard/clients/${id}/edit`}
            className="flex items-center gap-2 border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            <Edit size={14} />
            Edit
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left column: client info */}
        <div className="space-y-4">
          {/* Client Info */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h2 className="font-semibold text-gray-900 mb-4 text-sm">Client Info</h2>
            <dl className="space-y-3">
              <div>
                <dt className="text-xs text-gray-400 uppercase tracking-wide">Age Gap</dt>
                <dd className="text-sm text-gray-900 mt-0.5">{client.age_gap || '—'}</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-400 uppercase tracking-wide">NAICS</dt>
                <dd className="text-sm text-gray-900 mt-0.5">{client.naics || '—'}</dd>
              </div>
              {client.keywords?.length > 0 && (
                <div>
                  <dt className="text-xs text-gray-400 uppercase tracking-wide mb-1">Keywords</dt>
                  <dd className="flex flex-wrap gap-1">
                    {client.keywords.map((k: string, i: number) => (
                      <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs">{k}</span>
                    ))}
                  </dd>
                </div>
              )}
              {client.feels?.length > 0 && (
                <div>
                  <dt className="text-xs text-gray-400 uppercase tracking-wide mb-1">Feels</dt>
                  <dd className="flex flex-wrap gap-1">
                    {client.feels.map((f: string, i: number) => (
                      <span key={i} className="px-2 py-0.5 bg-purple-50 text-purple-700 rounded text-xs">{f}</span>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          {/* Brand Guidelines */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h2 className="font-semibold text-gray-900 mb-4 text-sm">Brand & Design</h2>
            <dl className="space-y-3">
              {[
                { label: 'Themes', value: client.brand_themes },
                { label: 'Colors', value: client.brand_colors },
                { label: 'Fonts', value: client.brand_fonts },
                { label: 'Voice', value: client.brand_voice },
              ].map(({ label, value }) => (
                <div key={label}>
                  <dt className="text-xs text-gray-400 uppercase tracking-wide">{label}</dt>
                  <dd className="text-sm text-gray-900 mt-0.5">{value || '—'}</dd>
                </div>
              ))}
              {client.brand_competitors?.length > 0 && (
                <div>
                  <dt className="text-xs text-gray-400 uppercase tracking-wide mb-1">Competitors</dt>
                  <dd className="space-y-0.5">
                    {client.brand_competitors.map((c: string, i: number) => (
                      <p key={i} className="text-sm text-gray-900">• {c}</p>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          {/* Notes */}
          {client.notes && (
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h2 className="font-semibold text-gray-900 mb-3 text-sm">Notes</h2>
              <p className="text-sm text-gray-600 whitespace-pre-wrap">{client.notes}</p>
            </div>
          )}
        </div>

        {/* Right: Campaigns */}
        <div className="col-span-2 space-y-4">
          {/* Paid Media */}
          <CampaignSection
            title="Paid Media"
            icon={<TrendingUp size={14} />}
            campaigns={campaignsByType.paid_media}
            type="paid_media"
            clientId={id}
          />
          {/* Organic Media */}
          <CampaignSection
            title="Organic Media"
            icon={<Users size={14} />}
            campaigns={campaignsByType.organic_media}
            type="organic_media"
            clientId={id}
          />
          {/* Email */}
          <CampaignSection
            title="Email Campaigns"
            icon={<Mail size={14} />}
            campaigns={campaignsByType.email}
            type="email"
            clientId={id}
          />
        </div>
      </div>
    </div>
  )
}

function CampaignSection({
  title,
  icon,
  campaigns,
  type,
  clientId,
}: {
  title: string
  icon: React.ReactNode
  campaigns: any[]
  type: string
  clientId: string
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
          {icon}
          {title}
        </h2>
        <Link
          href={`/dashboard/clients/${clientId}/campaigns/new?type=${type}`}
          className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-900 transition-colors"
        >
          <Plus size={12} />
          New
        </Link>
      </div>

      {campaigns.length > 0 ? (
        <div className="space-y-2">
          {campaigns.map(campaign => (
            <Link
              key={campaign.id}
              href={`/dashboard/clients/${clientId}/campaigns/${campaign.id}`}
              className="flex items-center justify-between p-3 rounded-lg border border-gray-50 hover:border-gray-200 hover:bg-gray-50 transition-colors group"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">{campaign.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {campaign.start_date ? new Date(campaign.start_date).toLocaleDateString() : 'No date set'}
                  {campaign.budget ? ` · $${campaign.budget.toLocaleString()}` : ''}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <CampaignStatusBadge status={campaign.status} />
                <span className="text-gray-300 group-hover:text-gray-500 text-xs">→</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-xs text-gray-400 text-center py-4">No campaigns yet</p>
      )}
    </div>
  )
}
