'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Users, Clock, CheckCircle } from "lucide-react"

interface StatsData {
  total: number
  change: number
}

interface Stats {
  documents: StatsData
  clients: StatsData
  deadlines: StatsData
  tasks: StatsData
}

export function DashboardStats() {
  const [stats, setStats] = useState<Stats>({
    documents: { total: 0, change: 0 },
    clients: { total: 0, change: 0 },
    deadlines: { total: 0, change: 0 },
    tasks: { total: 0, change: 0 }
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [docResponse, clientsResponse, deadlinesResponse] = await Promise.all([
          fetch('/api/documents'),
          fetch('/api/clients'),
          fetch('/api/deadlines')
        ])

        if (!docResponse.ok || !clientsResponse.ok || !deadlinesResponse.ok) {
          throw new Error('One or more API requests failed')
        }

        const [documents, clients, deadlines] = await Promise.all([
          docResponse.json(),
          clientsResponse.json(),
          deadlinesResponse.json()
        ])

        // Verificar se documents é um array antes de filtrar
        const completedTasks = Array.isArray(documents) 
          ? documents.filter(doc => doc.status === 'completed')
          : [];
          
        const previousTasks = Array.isArray(documents)
          ? documents.filter(doc => 
              doc.status === 'completed' && 
              doc.completedAt && // Verificar se completedAt existe
              new Date(doc.completedAt) < new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
            )
          : [];

        setStats({
          documents: { 
            total: Array.isArray(documents) ? documents.length : 0,
            change: calculateChange(documents)
          },
          clients: { 
            total: Array.isArray(clients) ? clients.length : 0,
            change: calculateChange(clients)
          },
          deadlines: { 
            total: Array.isArray(deadlines) ? deadlines.length : 0,
            change: calculateChange(deadlines)
          },
          tasks: { 
            total: completedTasks.length,
            change: calculateTasksChange(completedTasks.length, previousTasks.length)
          }
        })
      } catch (error) {
        console.error('Error in fetchStats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const calculateChange = (data: any[]): number => {
    if (!Array.isArray(data)) return 0;
    
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const recentItems = data.filter(item => item.createdAt && new Date(item.createdAt) > thirtyDaysAgo);
    const previousItems = data.filter(item => item.createdAt && new Date(item.createdAt) <= thirtyDaysAgo);
    
    if (previousItems.length === 0) {
      return recentItems.length > 0 ? 100 : 0;
    }
    
    return Math.round(((recentItems.length - previousItems.length) / previousItems.length) * 100);
  }

  const calculateTasksChange = (current: number, previous: number): number => {
    if (previous === 0) {
      return current > 0 ? 100 : 0;
    }
    return Math.round(((current - previous) / previous) * 100);
  }

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-[#1e2736] rounded-xl shadow-xl border border-gray-700/30">
            <CardContent className="p-6">
              <div className="animate-pulse flex items-center gap-4">
                <div className="p-2 bg-[#0f1520] rounded-lg h-10 w-10" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-[#0f1520] rounded w-20" />
                  <div className="h-6 bg-[#0f1520] rounded w-16" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const statsConfig = [
    {
      icon: FileText,
      label: "Documentos Ativos",
      value: stats.documents.total,
      change: `${stats.documents.change}%`,
    },
    {
      icon: Users,
      label: "Clientes",
      value: stats.clients.total,
      change: `${stats.clients.change}%`,
    },
    {
      icon: Clock,
      label: "Prazos Pendentes",
      value: stats.deadlines.total,
      change: `${stats.deadlines.change}%`,
    },
    {
      icon: CheckCircle,
      label: "Tarefas Concluídas",
      value: stats.tasks.total,
      change: `${stats.tasks.change}%`,
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {statsConfig.map((stat) => (
        <Card key={stat.label} className="bg-[#1e2736] rounded-xl shadow-xl border border-gray-700/30 hover:border-gray-600/50 transition-all">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-[#0f1520] rounded-lg">
                <stat.icon className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-300">{stat.label}</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-semibold text-white">{stat.value}</p>
                  <span className={`text-xs ${
                    Number(stat.change.replace('%', '')) >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}