import { spawn } from 'child_process'

export interface mongorestoreProps {
  host?: string;
  port?: number;
  archive: string;
  nsFrom?: string;
  nsTo?: string;
  authenticationDatabase?: string;
  ssl?: boolean;
  username?: string;
  password?: string;
  removeArchive?: boolean;
}

export const mongorestore = ({removeArchive, ...props}: mongorestoreProps) => {
  const options = Object.entries(props).map(([key, value]) => key === 'ssl' && value ? `--${key}` : `--${key}="${value}"`)
  spawn('mongorestore', options)
    .on('exit', () => {
      removeArchive && spawn('rm', [props.archive])
    })
}