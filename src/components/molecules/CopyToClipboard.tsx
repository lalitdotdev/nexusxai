'use client'

import { Copy } from 'lucide-react'
import { toast } from 'sonner'
import { useToast } from './Toaster/use-toast'

interface CopyToClipboardProps {
    text: string
}

export const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ text }) => {
    const handleCopyClick = async () => {
        try {
            await navigator.clipboard.writeText(text)
            toast.success(`User Id copied.`, {
                description: 'Request assistance from our admins and provide your ID.',

            })
        } catch (err) {
            toast.error(`Failed to copy text: ${err}`)
        }
    }

    return (
        <div className="flex items-center bg-white justify-between px-4 py-3 rounded-md shadow-lg">
            <span className="font-mono text-gray-800">{text}</span>
            <button
                onClick={handleCopyClick}
                className="text-blue-500 hover:text-blue-700 focus:outline-none"
            >
                <Copy />
            </button>
        </div>
    )
}
