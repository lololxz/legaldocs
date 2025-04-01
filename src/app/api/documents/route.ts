import { NextResponse } from 'next/server'
import { Document } from '@/types/document'

export const documents: Document[] = [
  {
    id: '1',
    title: 'Contrato de Prestação de Serviços',
    status: 'active',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'Petição Inicial',
    status: 'completed',
    createdAt: '2024-02-01',
    completedAt: '2024-02-10',
  },
  {
    id: '3',
    title: 'Recurso Administrativo',
    status: 'active',
    createdAt: '2024-02-15',
  }
]

export async function GET() {
  return NextResponse.json(documents)
}

export async function POST(request: Request) {
  try {
    const body: Omit<Document, 'id' | 'createdAt'> = await request.json()
    
    const newDocument: Document = {
      ...body,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    
    documents.push(newDocument)
    return NextResponse.json(newDocument, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create document' },
      { status: 500 }
    )
  }
}