import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import ClientForm from '@/components/dashboard/ClientForm'
import Link from 'next/link'

export default async function EditClientPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: client } = await supabase
    .from('clients')
    .select('*')
    .eq('id', id)
    .single()

  if (!client) notFound()

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
          <Link href="/dashboard/clients" className="hover:text-gray-900">Clients</Link>
          <span>/</span>
          <Link href={`/dashboard/clients/${id}`} className="hover:text-gray-900">{client.name}</Link>
          <span>/</span>
          <span>Edit</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Edit Client</h1>
      </div>
      <ClientForm client={client} />
    </div>
  )
}
