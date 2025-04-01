'use client'

import { useState, useEffect } from 'react'
import Sidebar from '@/components/Sidebar'
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiX, FiUser, FiMail, FiPhone, FiCheckCircle } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

interface Client {
  id: string
  name: string
  email: string
  phone: string
  status: 'active' | 'inactive'
}

export default function Clients() {
  const [searchTerm, setSearchTerm] = useState('')
  const [clients, setClients] = useState<Client[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentClient, setCurrentClient] = useState<Client | null>(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'active'
  })

  useEffect(() => {
    fetchClients()
  }, [])

  const fetchClients = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/clients')
      const data = await response.json()
      setClients(data)
    } catch (error) {
      console.error('Error fetching clients:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = currentClient 
        ? `/api/clients/${currentClient.id}`
        : '/api/clients'
      
      const method = currentClient ? 'PUT' : 'POST'
      
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      setIsModalOpen(false)
      setCurrentClient(null)
      setFormData({ name: '', email: '', phone: '', status: 'active' })
      fetchClients()
    } catch (error) {
      console.error('Error saving client:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      try {
        await fetch(`/api/clients/${id}`, {
          method: 'DELETE'
        })
        fetchClients()
      } catch (error) {
        console.error('Error deleting client:', error)
      }
    }
  }

  const openEditModal = (client: Client) => {
    setCurrentClient(client)
    setFormData(client)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentClient(null)
    setFormData({ name: '', email: '', phone: '', status: 'active' })
  }

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex h-screen bg-[#0f1520]">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-gradient-to-br from-[#171923] to-[#0f1520]">
        <div className="p-8 max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Clientes</h1>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg flex items-center gap-2 text-white font-medium"
            >
              <FiPlus className="stroke-2" /> Novo Cliente
            </motion.button>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative flex-1 max-w-2xl">
              <FiSearch className="absolute left-4 top-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Pesquisar clientes por nome ou email..."
                className="w-full bg-[#1e2736] rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-md border border-gray-700/30"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Clients Table */}
          <div className="bg-[#1e2736] rounded-xl shadow-xl border border-gray-700/30 overflow-hidden">
            {loading ? (
              <div className="p-8 flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : filteredClients.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                {searchTerm ? 'Nenhum cliente encontrado para esta pesquisa.' : 'Nenhum cliente cadastrado.'}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-gray-700/50">
                      <th className="px-6 py-4 font-medium text-gray-300">Nome</th>
                      <th className="px-6 py-4 font-medium text-gray-300">Email</th>
                      <th className="px-6 py-4 font-medium text-gray-300">Telefone</th>
                      <th className="px-6 py-4 font-medium text-gray-300">Status</th>
                      <th className="px-6 py-4 font-medium text-gray-300">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredClients.map((client, index) => (
                      <motion.tr 
                        key={client.id} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`border-b border-gray-700/30 hover:bg-gray-700/20 transition-colors`}
                      >
                        <td className="px-6 py-4 text-white">{client.name}</td>
                        <td className="px-6 py-4 text-gray-300">{client.email}</td>
                        <td className="px-6 py-4 text-gray-300">{client.phone}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            client.status === 'active' 
                              ? 'bg-green-900/30 text-green-400 border border-green-500/30' 
                              : 'bg-red-900/30 text-red-400 border border-red-500/30'
                          }`}>
                            {client.status === 'active' ? 'Ativo' : 'Inativo'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-3">
                            <motion.button 
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => openEditModal(client)}
                              className="p-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors" 
                              title="Editar"
                            >
                              <FiEdit2 size={16} />
                            </motion.button>
                            <motion.button 
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDelete(client.id)}
                              className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors" 
                              title="Excluir"
                            >
                              <FiTrash2 size={16} />
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Modal Form */}
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
                    {currentClient ? 'Editar Cliente' : 'Novo Cliente'}
                  </h2>
                  <button 
                    onClick={closeModal}
                    className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
                  >
                    <FiX className="text-gray-400 hover:text-white" />
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Nome</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiUser className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-[#0f1520] rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-gray-700/50"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-[#0f1520] rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-gray-700/50"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Telefone</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiPhone className="text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-[#0f1520] rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-gray-700/50"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Status</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiCheckCircle className="text-gray-400" />
                      </div>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({...formData, status: e.target.value as 'active' | 'inactive'})}
                        className="w-full bg-[#0f1520] rounded-lg pl-10 pr-4 py-2.5 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-gray-700/50"
                      >
                        <option value="active">Ativo</option>
                        <option value="inactive">Inativo</option>
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
                      {currentClient ? 'Salvar Alterações' : 'Criar Cliente'}
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