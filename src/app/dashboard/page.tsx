'use client'

import { useSession } from 'next-auth/react'
import { DashboardStats } from '@/components/dashboard/dashboard-stats'
import { ActivityChart } from '@/components/dashboard/activity-chart'

export default function DashboardPage() {
  const { data: session } = useSession()

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">
        Bem-vindo, {session?.user?.name}
      </h1>
      
      <DashboardStats />
      
      <div className="grid md:grid-cols-2 gap-8">
        <ActivityChart />
      </div>
    </div>
  )
}