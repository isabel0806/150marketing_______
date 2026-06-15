'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Trash2 } from 'lucide-react'

export default function DeleteClientButton({ clientId }: { clientId: string }) {
  const [confirming, setConfirming] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleDelete() {
    setLoading(true)
    await supabase.from('clients').delete().eq('id', clientId)
    router.push('/dashboard/clients')
    router.refresh()
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500">Are you sure?</span>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="text-xs text-red-600 hover:text-red-800 font-medium"
        >
          {loading ? 'Deleting...' : 'Yes, delete'}
        </button>
        <button onClick={() => setConfirming(false)} className="text-xs text-gray-400 hover:text-gray-600">
          Cancel
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="flex items-center gap-2 border border-gray-200 text-red-400 hover:text-red-600 hover:border-red-200 px-3 py-2 rounded-lg text-sm transition-colors"
    >
      <Trash2 size={14} />
      Delete
    </button>
  )
}
