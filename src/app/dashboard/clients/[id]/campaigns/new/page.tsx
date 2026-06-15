import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import CampaignForm from '@/components/dashboard/CampaignForm'
import Link from 'next/link'

export default async function NewCampaignPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ type?: string }>
}) {
  const { id } = await params
  const { type } = await searchParams
  const supabase = await createClient()

  const { data: client } = await supabase.from('clients').select('name, client_num').eq('id', id).single()
  if (!client) notFound()

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
          <Link href="/dashboard/clients" className="hover:text-gray-900">Clients</Link>
          <span>/</span>
          <Link href={`/dashboard/clients/${id}`} className="hover:text-gray-900">{client.name}</Link>
          <span>/</span>
          <span>New Campaign</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">New Campaign</h1>
      </div>
      <CampaignForm clientId={id} defaultType={type} />
    </div>
  )
}
