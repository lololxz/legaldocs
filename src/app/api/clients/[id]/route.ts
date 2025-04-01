import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'clients.json')

async function getClients() {
  const data = await fs.readFile(dataFilePath, 'utf8')
  return JSON.parse(data)
}

async function saveClients(clients: any[]) {
  await fs.writeFile(dataFilePath, JSON.stringify(clients, null, 2))
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const clients = await getClients()
    const body = await request.json()
    const index = clients.findIndex(client => client.id === params.id)
    
    if (index !== -1) {
      clients[index] = { ...clients[index], ...body }
      await saveClients(clients)
      return NextResponse.json(clients[index])
    }
    
    return NextResponse.json({ error: 'Client not found' }, { status: 404 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const clients = await getClients()
    const index = clients.findIndex(client => client.id === params.id)
    
    if (index !== -1) {
      const deletedClient = clients[index]
      clients.splice(index, 1)
      await saveClients(clients)
      return NextResponse.json(deletedClient)
    }
    
    return NextResponse.json({ error: 'Client not found' }, { status: 404 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const clients = await getClients()
    const client = clients.find(client => client.id === params.id)
    
    if (client) {
      return NextResponse.json(client)
    }
    
    return NextResponse.json({ error: 'Client not found' }, { status: 404 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}