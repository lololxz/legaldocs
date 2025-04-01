'use client'

import { useState, useEffect, useCallback } from 'react'
import { FiPlus, FiCalendar, FiX, FiClock, FiAlertCircle, FiFileText, FiFlag } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import DatePicker, { registerLocale } from 'react-datepicker'
import { format, isBefore, isToday, addDays, isWithinInterval } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import "react-datepicker/dist/react-datepicker.css"

import { Deadline } from '@/types/deadline'
import { DeadlineCard } from '@/components/DeadlineCard'
import Sidebar from '@/components/Sidebar'

registerLocale('pt-BR', ptBR)

const initialFormData = {
  title: '',
  description: '',
  date: new Date(),
  priority: 'medium' as PriorityType
}

export default function Deadlines() {
  const [deadlines, setDeadlines] = useState<Deadline[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [formData, setFormData] = useState(initialFormData)

  useEffect(() => {
    const loadDeadlines = () => {
      setLoading(true)
      try {
        const savedDeadlines = localStorage.getItem('deadlines')
        if (savedDeadlines) {
          setDeadlines(JSON.parse(savedDeadlines).map((d: any) => ({
            ...d,
            date: new Date(d.date)
          })))
        }
      } catch (error) {
        console.error('Error loading deadlines:', error)
      } finally {
        setLoading(false)
      }
    }

    loadDeadlines()
  }, [])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    const newDeadline: Deadline = {
      id: Date.now().toString(),
      ...formData
    }
    const updatedDeadlines = [...deadlines, newDeadline]
    setDeadlines(updatedDeadlines)
    localStorage.setItem('deadlines', JSON.stringify(updatedDeadlines))
    setIsModalOpen(false)
    setFormData(initialFormData)
  }, [deadlines, formData])

  const handleDelete = useCallback((id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este prazo?')) {
      const updatedDeadlines = deadlines.filter(d => d.id !== id)
      setDeadlines(updatedDeadlines)
      localStorage.setItem('deadlines', JSON.stringify(updatedDeadlines))
    }
  }, [deadlines])

  const overdueDeadlines = deadlines.filter(d => isBefore(d.date, new Date()) && !isToday(d.date))
  const todayDeadlines = deadlines.filter(d => isToday(d.date))
  const upcomingDeadlines = deadlines.filter(d => 
    !isBefore(d.date, new Date()) && 
    !isToday(d.date) && 
    isWithinInterval(d.date, { start: addDays(new Date(), 1), end: addDays(new Date(), 7) })
  )
  const futureDeadlines = deadlines.filter(d => 
    !isBefore(d.date, new Date()) && 
    !isToday(d.date) && 
    !isWithinInterval(d.date, { start: addDays(new Date(), 1), end: addDays(new Date(), 7) })
  )

  const highlightDates = deadlines.map(d => new Date(d.date))

  return (
    <div className="flex h-screen bg-[#0f1520]">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-gradient-to-br from-[#171923] to-[#0f1520]">
        <div className="p-8 max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Gerenciamento de Prazos</h1>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg flex items-center gap-2 text-white font-medium"
            >
              <FiPlus className="stroke-2" /> Adicionar Prazo
            </motion.button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {overdueDeadlines.length > 0 && (
                <div className="bg-[#1e2736] rounded-xl shadow-xl border border-gray-700/30 p-6">
                  <h2 className="text-xl font-semibold mb-4 text-red-400 flex items-center gap-2">
                    <FiAlertCircle /> Prazos Atrasados
                  </h2>
                  <div className="space-y-4">
                    {overdueDeadlines.map((deadline, index) => (
                      <DeadlineCard 
                        key={deadline.id} 
                        deadline={deadline} 
                        onDelete={handleDelete}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-[#1e2736] rounded-xl shadow-xl border border-gray-700/30 p-6">
                <h2 className="text-xl font-semibold mb-4 text-yellow-400 flex items-center gap-2">
                  <FiClock /> Prazos de Hoje
                </h2>
                <div className="space-y-4">
                  {todayDeadlines.length > 0 ? (
                    todayDeadlines.map((deadline, index) => (
                      <DeadlineCard 
                        key={deadline.id} 
                        deadline={deadline} 
                        onDelete={handleDelete}
                        index={index}
                      />
                    ))
                  ) : (
                    <p className="text-gray-400 text-center py-4">Nenhum prazo para hoje</p>
                  )}
                </div>
              </div>

              <div className="bg-[#1e2736] rounded-xl shadow-xl border border-gray-700/30 p-6">
                <h2 className="text-xl font-semibold mb-4 text-blue-400 flex items-center gap-2">
                  <FiCalendar /> Próximos 7 Dias
                </h2>
                <div className="space-y-4">
                  {upcomingDeadlines.length > 0 ? (
                    upcomingDeadlines.map((deadline, index) => (
                      <DeadlineCard 
                        key={deadline.id} 
                        deadline={deadline} 
                        onDelete={handleDelete}
                        index={index}
                      />
                    ))
                  ) : (
                    <p className="text-gray-400 text-center py-4">Nenhum prazo para os próximos 7 dias</p>
                  )}
                </div>
              </div>

              {futureDeadlines.length > 0 && (
                <div className="bg-[#1e2736] rounded-xl shadow-xl border border-gray-700/30 p-6">
                  <h2 className="text-xl font-semibold mb-4 text-green-400 flex items-center gap-2">
                    <FiFlag /> Prazos Futuros
                  </h2>
                  <div className="space-y-4">
                    {futureDeadlines.map((deadline, index) => (
                      <DeadlineCard 
                        key={deadline.id} 
                        deadline={deadline} 
                        onDelete={handleDelete}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              )}

              {deadlines.length === 0 && !loading && (
                <div className="bg-[#1e2736] rounded-xl shadow-xl border border-gray-700/30 p-8 text-center">
                  <FiCalendar className="mx-auto text-gray-500 mb-3" size={40} />
                  <h3 className="text-xl font-medium text-gray-300 mb-2">Nenhum prazo cadastrado</h3>
                  <p className="text-gray-500 mb-6">Adicione seu primeiro prazo para começar a gerenciar seus compromissos.</p>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-all inline-flex items-center gap-2"
                  >
                    <FiPlus /> Adicionar Prazo
                  </motion.button>
                </div>
              )}

              {loading && (
                <div className="bg-[#1e2736] rounded-xl shadow-xl border border-gray-700/30 p-8 flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-[#1e2736] rounded-xl shadow-xl border border-gray-700/30 p-6">
                <h2 className="text-xl font-semibold mb-4 text-white">Calendário</h2>
                <div className="bg-[#0f1520] p-4 rounded-lg border border-gray-700/30">
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date || new Date())}
                    inline
                    locale="pt-BR"
                    dateFormat="dd/MM/yyyy"
                    highlightDates={highlightDates}
                    calendarClassName="!bg-transparent !border-0"
                    dayClassName={(date) => 
                      deadlines.some(d => isToday(new Date(d.date)) && isToday(date)) 
                        ? "bg-yellow-500/20 text-yellow-300 rounded-full" 
                        : ""
                    }
                  />
                </div>
              </div>

              <div className="bg-[#1e2736] rounded-xl shadow-xl border border-gray-700/30 p-6">
                <h2 className="text-xl font-semibold mb-4 text-white">Resumo</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-red-900/10 rounded-lg border border-red-500/20">
                    <span className="text-red-400 flex items-center gap-2">
                      <FiAlertCircle /> Atrasados
                    </span>
                    <span className="text-white font-bold">{overdueDeadlines.length}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-900/10 rounded-lg border border-yellow-500/20">
                    <span className="text-yellow-400 flex items-center gap-2">
                      <FiClock /> Hoje
                    </span>
                    <span className="text-white font-bold">{todayDeadlines.length}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-900/10 rounded-lg border border-blue-500/20">
                    <span className="text-blue-400 flex items-center gap-2">
                      <FiCalendar /> Próximos
                    </span>
                    <span className="text-white font-bold">{upcomingDeadlines.length}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-900/10 rounded-lg border border-green-500/20">
                    <span className="text-green-400 flex items-center gap-2">
                      <FiFlag /> Futuros
                    </span>
                    <span className="text-white font-bold">{futureDeadlines.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-[#1e2736] rounded-xl p-6 w-full max-w-md shadow-2xl border border-gray-700/30"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-white">
                    Adicionar Novo Prazo
                  </h2>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
                  >
                    <FiX className="text-gray-400 hover:text-white" />
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Título</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiFileText className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="w-full bg-[#0f1520] rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-gray-700/50"
                        placeholder="Título do prazo"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Descrição</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full bg-[#0f1520] rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-gray-700/50"
                      placeholder="Detalhes adicionais sobre este prazo"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Data</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiCalendar className="text-gray-400" />
                      </div>
                      <DatePicker
                        selected={formData.date}
                        onChange={(date) => setFormData({...formData, date: date || new Date()})}
                        className="w-full bg-[#0f1520] rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-gray-700/50"
                        dateFormat="dd/MM/yyyy"
                        locale="pt-BR"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Prioridade</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiFlag className="text-gray-400" />
                      </div>
                      <select
                        value={formData.priority}
                        onChange={(e) => setFormData({...formData, priority: e.target.value as PriorityType})}
                        className="w-full bg-[#0f1520] rounded-lg pl-10 pr-4 py-2.5 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-gray-700/50"
                      >
                        <option value="low">Baixa</option>
                        <option value="medium">Média</option>
                        <option value="high">Alta</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg text-white font-medium"
                    >
                      Adicionar Prazo
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}