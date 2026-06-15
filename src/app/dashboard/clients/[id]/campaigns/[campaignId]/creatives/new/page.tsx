import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import NewCreativeForm from '@/components/dashboard/NewCreativeForm'
import Link from 'next/link'

export default async function NewCreativePage({
  params,
}: {
  params: Promise<{ id: string; campaignId: string }>
}) {
  const { id, campaignId } = await params
  const supabase = await createClient()

  const [{ data: campaign }, { data: client }] = await Promise.all([
    supabase.from('campaigns').select('name, type').eq('id', campaignId).single(),
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
          <span>New Creative</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">New Creative</h1>
      </div>
      <NewCreativeForm campaignId={campaignId} campaignType={campaign.type} clientId={id} />
    </div>
  )
}
