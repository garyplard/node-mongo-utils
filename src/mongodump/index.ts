import { spawn } from 'child_process'

export interface mongodumpProps {
  host?: string;
  port?: number;
  archive: string;
  db: string;
  authenticationDatabase?: string;
  ssl?: boolean;
  username?: string;
  password?: string;
}

export const mongodump = (props: mongodumpProps) => {
  const options = Object.entries(props).map(([key, value]) => key === 'ssl' && value ? `--${key}` : `--${key}="${value}"`)
  return spawn('mongodump', options)
}