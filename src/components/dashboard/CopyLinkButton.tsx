'use client'

import { useState } from 'react'
import { Share2, Check } from 'lucide-react'

export default function CopyLinkButton() {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    const url = `${window.location.origin}/onboarding`
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
    >
      {copied ? <Check size={16} className="text-green-500" /> : <Share2 size={16} />}
      {copied ? 'Copied!' : 'Share Onboarding'}
    </button>
  )
}
