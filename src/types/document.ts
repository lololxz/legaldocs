export interface Document {
  id: string
  title: string
  status: 'active' | 'completed' | 'archived'
  createdAt: string
  updatedAt?: string
  completedAt?: string
}