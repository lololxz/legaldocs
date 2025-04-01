import { NextResponse } from 'next/server'
import { documents } from '../route'

interface DocumentUpdate {
  title?: string
  status?: 'active' | 'completed' | 'archived'
  updatedAt?: string
  completedAt?: string
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body: DocumentUpdate = await request.json()
    const index = documents.findIndex(doc => doc.id === id)
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Document not found' }, 
        { status: 404 }
      )
    }

    const updatedDoc = {
      ...documents[index],
      ...body,
      updatedAt: new Date().toISOString(),
      completedAt: body.status === 'completed' 
        ? new Date().toISOString() 
        : documents[index].completedAt
    }

    documents[index] = updatedDoc
    return NextResponse.json(updatedDoc)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update document' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const index = documents.findIndex(doc => doc.id === id)
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      )
    }

    const deletedDoc = documents[index]
    documents.splice(index, 1)
    return NextResponse.json(deletedDoc)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete document' },
      { status: 500 }
    )
  }
}