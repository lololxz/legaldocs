import { NextResponse } from 'next/server'

const deadlines = [
  {
    id: '1',
    title: 'Prazo Processual',
    date: '2024-02-20',
    createdAt: '2024-01-20',
  },
  {
    id: '2',
    title: 'Audiência',
    date: '2024-03-15',
    createdAt: '2024-02-01',
  },
  // Add more sample deadlines
]

export async function GET() {
  return NextResponse.json(deadlines)
}