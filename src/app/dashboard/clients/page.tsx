import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus, Search, Share2 } from 'lucide-react'
import CopyLinkButton from '@/components/dashboard/CopyLinkButton'

export default async function ClientsPage() {
  const supabase = await createClient()

  const { data: clients } = await supabase
    .from('clients')
    .select('id, client_num, name, industry, location, income_bracket, created_at')
    .order('client_num', { ascending: true })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-500 text-sm mt-1">{clients?.length ?? 0} total clients</p>
        </div>
        <div className="flex items-center gap-2">
          <CopyLinkButton />
          <Link
            href="/dashboard/clients/new"
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            <Plus size={16} />
            Add Client
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100">
        {clients && clients.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">#</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">Client</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">Industry</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">Location</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">Bracket</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">Added</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {clients.map(client => (
                <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-400 font-mono">{client.client_num}</td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">{client.name}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{client.industry || '—'}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{client.location || '—'}</td>
                  <td className="px-6 py-4">
                    {client.income_bracket ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        {client.income_bracket}
                      </span>
                    ) : '—'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {new Date(client.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/dashboard/clients/${client.id}`}
                      className="text-sm text-gray-400 hover:text-gray-900 transition-colors"
                    >
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-16 text-gray-400">
            <Search size={32} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm font-medium">No clients yet</p>
            <p className="text-xs mt-1 mb-4">Add your first client to get started</p>
            <Link
              href="/dashboard/clients/new"
              className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              <Plus size={14} />
              New Client
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
