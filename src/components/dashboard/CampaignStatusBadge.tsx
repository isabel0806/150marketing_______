import { cn } from '@/lib/utils'
import type { CampaignStatus } from '@/lib/types'

const styles: Record<CampaignStatus, string> = {
  draft: 'bg-gray-100 text-gray-600',
  review: 'bg-yellow-50 text-yellow-700',
  approved: 'bg-blue-50 text-blue-700',
  running: 'bg-green-50 text-green-700',
  completed: 'bg-gray-100 text-gray-500',
  paused: 'bg-orange-50 text-orange-700',
}

export default function CampaignStatusBadge({ status }: { status: CampaignStatus }) {
  return (
    <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize', styles[status])}>
      {status}
    </span>
  )
}
