import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { FiTrash2 } from 'react-icons/fi'
import { Deadline } from '@/types/deadline'

interface DeadlineCardProps {
  deadline: Deadline
  onDelete: (id: string) => void
  index: number
}

export function DeadlineCard({ deadline, onDelete, index }: DeadlineCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-[#0f1520] p-4 rounded-lg border border-gray-700/30 hover:border-gray-600/50 transition-all shadow-md group hover:bg-[#141b2b]"
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1 flex-1">
          <h3 className="font-medium text-white group-hover:text-blue-400 transition-colors">
            {deadline.title}
          </h3>
          <p className="text-sm text-gray-400">{deadline.description}</p>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400">
              {format(deadline.date, "dd/MM/yyyy")}
            </span>
            <span className="text-gray-500">•</span>
            <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-gray-800/50 text-gray-300 border border-gray-700/50">
              {deadline.priority === 'high' ? 'Alta' : deadline.priority === 'medium' ? 'Média' : 'Baixa'}
            </span>
          </div>
        </div>
        
        <button
          onClick={() => onDelete(deadline.id)}
          className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
        >
          <FiTrash2 />
        </button>
      </div>
    </motion.div>
  )
}