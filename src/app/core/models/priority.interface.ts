export type Priority = 'low' | 'medium' | 'high';

export interface PriorityInterface {
  level: Priority;
  label: string;
  color: string;
}

export enum PriorityEnum {
  'low' = 'baja',
  'medium' = 'media',
  'high' = 'alta',
}

export const PRIORITY_COLORS: Record<Priority, string> = {
  low: '#4CAF50',
  medium: '#FFC107',
  high: '#F44336',
};
