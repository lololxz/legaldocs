"use client"

import Link from 'next/link';
import { FiHome, FiFile, FiUsers, FiCalendar, FiSettings } from 'react-icons/fi';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  
  const menuItems = [
    { icon: FiHome, label: 'Dashboard', href: '/dashboard' },
    { icon: FiFile, label: 'Documentos', href: '/documentos' },
    { icon: FiUsers, label: 'Clientes', href: '/clients' },
    { icon: FiCalendar, label: 'Prazos', href: '/deadlines' },
    { icon: FiSettings, label: 'Configurações', href: '/settings' },
  ];

  return (
    <div className="bg-[#0f1520] w-64 py-8 px-4 min-h-screen shadow-[0_0_20px_rgba(0,0,0,0.3)] border-r border-[#1e2736]/30 relative overflow-hidden">
      {/* Efeito de gradiente no fundo */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-purple-900/5 pointer-events-none" />
      
      {/* Efeito de luz no topo */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500" />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-10 px-2">
          <div className="relative">
            <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 bg-clip-text text-transparent">
              Legal Docs
            </h1>
            <div className="mt-1 h-0.5 w-24 bg-gradient-to-r from-blue-500/0 via-purple-500/50 to-blue-500/0 mx-auto" />
          </div>
        </div>
        
        <nav className="space-y-1.5 flex-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center py-3 px-4 rounded-lg transition-all duration-200 relative group
                  ${isActive 
                    ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white' 
                    : 'text-gray-400 hover:text-gray-100'
                  }`}
              >
                {/* Indicador de item ativo */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-500 rounded-r-full" />
                )}
                
                {/* Efeito de hover */}
                <div className={`absolute inset-0 rounded-lg transition-opacity duration-300 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-600/10 to-purple-600/10 pointer-events-none ${isActive ? 'opacity-0' : ''}`} />
                
                <item.icon className={`mr-4 h-5 w-5 transition-all duration-200 ${isActive ? 'text-blue-400' : 'group-hover:text-blue-400'}`} />
                
                <span className="text-md font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        
        {/* Seção de perfil no rodapé */}
        <div className="mt-auto pt-6 border-t border-gray-800/50">
          <div className="flex items-center px-4 py-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
              JD
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">João Advogado</p>
              <p className="text-xs text-gray-400">Administrador</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}