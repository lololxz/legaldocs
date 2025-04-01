'use client'

import { Bell, Search, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="h-16 border-b border-zinc-800 bg-zinc-900/50 px-8">
      <div className="flex h-full items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Buscar..."
              className="h-9 w-64 rounded-md border border-zinc-800 bg-zinc-950 pl-9 text-sm text-zinc-400 placeholder:text-zinc-500 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-zinc-100">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-zinc-100">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}