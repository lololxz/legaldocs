'use client'

import { useState, useEffect, useRef } from 'react'
import Sidebar from '@/components/Sidebar'
import { FiPlus, FiSearch, FiDownload, FiTrash2, FiX, FiFile, FiCalendar, FiCheckCircle, FiUpload } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

interface Document {
  id: string
  title: string
  date: string
  status: 'active' | 'inactive'
  fileUrl?: string
}

export default function Documentos() {
  const [searchTerm, setSearchTerm] = useState('')
  const [documents, setDocuments] = useState<Document[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    status: 'active'
  })

  useEffect(() => {
    fetchDocuments()
  }, [])

  const fetchDocuments = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/documents')
      const data = await response.json()
      setDocuments(data)
    } catch (error) {
      console.error('Error fetching documents:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Em um cenário real, você faria upload do arquivo primeiro
      // e então salvaria o documento com a URL do arquivo
      
      await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          date: new Date().toISOString().split('T')[0],
          fileUrl: selectedFile ? `/uploads/${selectedFile.name}` : undefined
        })
      })
      
      closeModal()
      fetchDocuments()
    } catch (error) {
      console.error('Error saving document:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este documento?')) {
      try {
        await fetch(`/api/documents/${id}`, {
          method: 'DELETE'
        })
        fetchDocuments()
      } catch (error) {
        console.error('Error deleting document:', error)
      }
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setFormData({ title: '', status: 'active' })
    setSelectedFile(null)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0])
      
      // Auto-preencher o título com o nome do arquivo se o campo estiver vazio
      if (!formData.title) {
        const fileName = e.target.files[0].name.split('.')[0]
        setFormData({...formData, title: fileName})
      }
    }
  }

  const filteredDocuments = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Função para formatar a data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  return (
    <div className="flex h-screen bg-[#0f1520]">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-gradient-to-br from-[#171923] to-[#0f1520]">
        <div className="p-8 max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Documentos</h1>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg flex items-center gap-2 text-white font-medium"
            >
              <FiPlus className="stroke-2" /> Novo Documento
            </motion.button>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative flex-1 max-w-2xl">
              <FiSearch className="absolute left-4 top-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Pesquisar documentos por título..."
                className="w-full bg-[#1e2736] rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-md border border-gray-700/30"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Documents Grid */}
          <div className="bg-[#1e2736] rounded-xl shadow-xl border border-gray-700/30 overflow-hidden">
            {loading ? (
              <div className="p-8 flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : filteredDocuments.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                {searchTerm ? 'Nenhum documento encontrado para esta pesquisa.' : 'Nenhum documento cadastrado.'}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-gray-700/50">
                      <th className="px-6 py-4 font-medium text-gray-300">Nome do Documento</th>
                      <th className="px-6 py-4 font-medium text-gray-300">Data</th>
                      <th className="px-6 py-4 font-medium text-gray-300">Status</th>
                      <th className="px-6 py-4 font-medium text-gray-300">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDocuments.map((doc, index) => (
                      <motion.tr 
                        key={doc.id} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`border-b border-gray-700/30 hover:bg-gray-700/20 transition-colors`}
                      >
                        <td className="px-6 py-4 text-white flex items-center">
                          <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center mr-3">
                            <FiFile />
                          </div>
                          {doc.title}
                        </td>
                        <td className="px-6 py-4 text-gray-300">{formatDate(doc.date)}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            doc.status === 'active' 
                              ? 'bg-green-900/30 text-green-400 border border-green-500/30' 
                              : 'bg-red-900/30 text-red-400 border border-red-500/30'
                          }`}>
                            {doc.status === 'active' ? 'Ativo' : 'Inativo'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-3">
                            {doc.fileUrl && (
                              <motion.button 
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => window.open(doc.fileUrl, '_blank')}
                                className="p-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors" 
                                title="Download"
                              >
                                <FiDownload size={16} />
                              </motion.button>
                            )}
                            <motion.button 
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDelete(doc.id)}
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
                    Novo Documento
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
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Nome do Documento</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiFile className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
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
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Arquivo</label>
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className={`w-full bg-[#0f1520] rounded-lg p-4 border border-dashed ${
                        selectedFile ? 'border-blue-500/50 bg-blue-500/5' : 'border-gray-700/50'
                      } cursor-pointer hover:bg-gray-800/50 transition-colors text-center`}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      
                      {selectedFile ? (
                        <div className="flex flex-col items-center">
                          <FiFile className="text-blue-400 mb-2" size={24} />
                          <p className="text-sm text-white font-medium">{selectedFile.name}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <FiUpload className="text-gray-400 mb-2" size={24} />
                          <p className="text-sm text-gray-300">Clique para selecionar um arquivo</p>
                          <p className="text-xs text-gray-500 mt-1">PDF, DOCX, XLSX (Máx. 10MB)</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg text-white font-medium"
                    >
                      Criar Documento
                      </motion.button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Visualizador de PDF (pode ser implementado quando necessário) */}
        {/* <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-[#1e2736] w-full max-w-4xl h-5/6 rounded-xl p-4 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">document-name.pdf</h3>
              <button className="p-2 hover:bg-gray-700 rounded-lg">
                <FiX />
              </button>
            </div>
            <div className="flex-1 bg-white rounded-lg">
              {/* PDF Viewer component would go here */}
            {/* </div>
          </div>
        </div> */}
      </main>
    </div>
  )
}
                