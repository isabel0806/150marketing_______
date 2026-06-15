import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Users, TrendingUp, PlayCircle, Clock } from 'lucide-react'

export default async function DashboardHome() {
  const supabase = await createClient()

  const [{ count: totalClients }, { count: activeCampaigns }, { count: pendingReview }] =
    await Promise.all([
      supabase.from('clients').select('*', { count: 'exact', head: true }),
      supabase.from('campaigns').select('*', { count: 'exact', head: true }).eq('status', 'running'),
      supabase.from('campaign_creatives').select('*', { count: 'exact', head: true }).eq('status', 'review'),
    ])

  const { data: recentClients } = await supabase
    .from('clients')
    .select('id, client_num, name, industry, created_at')
    .order('created_at', { ascending: false })
    .limit(5)

  const stats = [
    { label: 'Total Clients', value: totalClients ?? 0, icon: Users, color: 'bg-blue-50 text-blue-600' },
    { label: 'Active Campaigns', value: activeCampaigns ?? 0, icon: PlayCircle, color: 'bg-green-50 text-green-600' },
    { label: 'Pending Review', value: pendingReview ?? 0, icon: Clock, color: 'bg-yellow-50 text-yellow-600' },
    { label: 'Growth', value: '—', icon: TrendingUp, color: 'bg-purple-50 text-purple-600' },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Overview of your marketing operations</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500">{label}</span>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color}`}>
                <Icon size={16} />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">Recent Clients</h2>
          <Link
            href="/dashboard/clients"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            View all →
          </Link>
        </div>

        {recentClients && recentClients.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-100">
                <th className="pb-3 text-xs font-medium text-gray-400 uppercase tracking-wide">#</th>
                <th className="pb-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Name</th>
                <th className="pb-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Industry</th>
                <th className="pb-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Added</th>
                <th className="pb-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentClients.map(client => (
                <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 text-sm text-gray-400">{client.client_num}</td>
                  <td className="py-3 text-sm font-medium text-gray-900">{client.name}</td>
                  <td className="py-3 text-sm text-gray-500">{client.industry || '—'}</td>
                  <td className="py-3 text-sm text-gray-400">
                    {new Date(client.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-3 text-right">
                    <Link
                      href={`/dashboard/clients/${client.id}`}
                      className="text-xs text-gray-400 hover:text-gray-900"
                    >
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-12 text-gray-400">
            <Users size={32} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">No clients yet</p>
            <Link
              href="/dashboard/clients/new"
              className="mt-3 inline-block text-sm text-black hover:underline"
            >
              Add your first client
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
