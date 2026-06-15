import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import CampaignForm from '@/components/dashboard/CampaignForm'
import Link from 'next/link'

export default async function EditCampaignPage({
  params,
}: {
  params: Promise<{ id: string; campaignId: string }>
}) {
  const { id, campaignId } = await params
  const supabase = await createClient()

  const [{ data: campaign }, { data: client }] = await Promise.all([
    supabase.from('campaigns').select('*').eq('id', campaignId).single(),
    supabase.from('clients').select('name').eq('id', id).single(),
  ])

  if (!campaign || !client) notFound()

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
          <Link href={`/dashboard/clients/${id}`} className="hover:text-gray-900">{client.name}</Link>
          <span>/</span>
          <Link href={`/dashboard/clients/${id}/campaigns/${campaignId}`} className="hover:text-gray-900">
            {campaign.name}
          </Link>
          <span>/</span>
          <span>Edit</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Edit Campaign</h1>
      </div>
      <CampaignForm clientId={id} campaign={campaign} />
    </div>
  )
}
