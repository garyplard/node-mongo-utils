import { spawn } from 'child_process'
import { binaries, parseOptions } from '..'

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

export const mongodump = (props: mongodumpProps, onError?: (error: any) => void) => (
  spawn(binaries.mongodump, parseOptions(props)).on('error', (err) => onError?.(err))
)
