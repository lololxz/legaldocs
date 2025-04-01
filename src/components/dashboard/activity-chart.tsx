'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface ActivityData {
  date: string
  documents: number
  deadlines: number
}

export function ActivityChart() {
  const [data, setData] = useState<ActivityData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        const [documents, deadlines] = await Promise.all([
          fetch('/api/documents').then(res => res.json()),
          fetch('/api/deadlines').then(res => res.json())
        ])

        const activityData = processActivityData(documents, deadlines)
        setData(activityData)
      } catch (error) {
        console.error('Error fetching activity data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchActivityData()
  }, [])

  const processActivityData = (documents: any[], deadlines: any[]): ActivityData[] => {
    const days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (6 - i))
      return date.toISOString().split('T')[0]
    })

    return days.map(day => ({
      date: day,
      documents: documents.filter(doc => 
        new Date(doc.createdAt).toISOString().split('T')[0] === day
      ).length,
      deadlines: deadlines.filter(deadline => 
        new Date(deadline.date).toISOString().split('T')[0] === day
      ).length
    }))
  }

  if (loading) {
    return (
      <Card className="bg-zinc-900/50 border-zinc-800/50">
        <CardHeader>
          <CardTitle>Atividade Semanal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <p className="text-zinc-400">Carregando dados...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-zinc-900/50 border-zinc-800/50">
      <CardHeader>
        <CardTitle>Atividade Semanal</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis 
                dataKey="date" 
                stroke="#71717a"
                tickFormatter={(value) => new Date(value).toLocaleDateString('pt-BR', {
                  weekday: 'short',
                  day: '2-digit',
                  month: '2-digit'
                })}
              />
              <YAxis stroke="#71717a" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#18181b',
                  border: '1px solid #27272a',
                  borderRadius: '8px',
                  padding: '8px'
                }}
                labelFormatter={(value) => new Date(value).toLocaleDateString('pt-BR')}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="documents" 
                stroke="#3b82f6" 
                name="Documentos"
                strokeWidth={2}
                dot={{ strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="deadlines" 
                stroke="#10b981" 
                name="Prazos"
                strokeWidth={2}
                dot={{ strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}