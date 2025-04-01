export type PriorityType = 'low' | 'medium' | 'high';

export interface Deadline {
  id: string;
  title: string;
  description: string;
  date: Date;
  priority: PriorityType;
}