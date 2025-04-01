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

export async function GET() {
  try {
    const clients = await getClients()
    return NextResponse.json(clients)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const clients = await getClients()
    const body = await request.json()
    
    const newClient = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...body
    }
    
    clients.push(newClient)
    await saveClients(clients)
    
    return NextResponse.json(newClient, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}