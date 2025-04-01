'use client'

import { useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import Sidebar from '@/components/Sidebar'
import { FiUser, FiMail, FiLock, FiLogOut, FiBell } from 'react-icons/fi'

export default function Configuracoes() {
  const { data: session } = useSession()
  const [notificationPreferences, setNotificationPreferences] = useState({
    emailNotifications: true,
    documentUpdates: true,
    deadlineReminders: true
  })

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' })
  }

  const handleNotificationChange = (key: keyof typeof notificationPreferences) => {
    setNotificationPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  return (
    <div className="flex h-screen bg-[#0f1520]">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <h1 className="text-3xl font-bold mb-8 text-white">Configurações</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Settings Section */}
          <div className="bg-[#0f1520] rounded-lg p-6 border border-gray-700/30 hover:border-gray-600/50 transition-all shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-white">Configurações do Perfil</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Nome</label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    defaultValue={session?.user?.name || ''}
                    className="w-full bg-[#171923] rounded pl-10 pr-4 py-2 text-white border border-gray-700/50 focus:border-blue-500/50 focus:outline-none"
                    disabled
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Email</label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="email"
                    defaultValue={session?.user?.email || ''}
                    className="w-full bg-[#171923] rounded pl-10 pr-4 py-2 text-white border border-gray-700/50 focus:border-blue-500/50 focus:outline-none"
                    disabled
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Senha</label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="password"
                    value="********"
                    className="w-full bg-[#171923] rounded pl-10 pr-4 py-2 text-white border border-gray-700/50 focus:border-blue-500/50 focus:outline-none"
                    disabled
                  />
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="w-full mt-6 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all"
              >
                <FiLogOut />
                Sair da Conta
              </button>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="bg-[#0f1520] rounded-lg p-6 border border-gray-700/30 hover:border-gray-600/50 transition-all shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <FiBell className="text-xl text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Notificações</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Notificações por Email</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificationPreferences.emailNotifications}
                    onChange={() => handleNotificationChange('emailNotifications')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500/50"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-300">Atualizações de Documentos</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificationPreferences.documentUpdates}
                    onChange={() => handleNotificationChange('documentUpdates')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500/50"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-300">Lembretes de Prazos</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificationPreferences.deadlineReminders}
                    onChange={() => handleNotificationChange('deadlineReminders')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500/50"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}