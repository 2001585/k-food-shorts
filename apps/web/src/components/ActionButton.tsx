'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ActionButtonProps {
  icon: LucideIcon
  onClick: () => void
  active?: boolean
  count?: string
  'data-testid'?: string
}

export function ActionButton({ 
  icon: Icon, 
  onClick, 
  active = false, 
  count,
  'data-testid': testId
}: ActionButtonProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <motion.button
        className={cn(
          "p-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30",
          "hover:bg-white/30 transition-colors",
          active && "bg-primary-red/80 text-white"
        )}
        onClick={onClick}
        whileTap={{ scale: 0.9 }}
        data-testid={testId}
      >
        <Icon 
          size={24} 
          className={cn(
            active ? "fill-white" : "stroke-white",
            "drop-shadow-sm"
          )} 
        />
      </motion.button>
      
      {count && (
        <span className="text-xs text-white/80 font-medium drop-shadow-sm">
          {count}
        </span>
      )}
    </div>
  )
}