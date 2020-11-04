import { spawn } from 'child_process'
import { binaries, parseOptions } from '..'

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

export const mongorestore = ({removeArchive, ...props}: mongorestoreProps, onError?: (error: any) => void) => {
  const options = parseOptions(props)
  spawn(binaries.mongorestore, options)
    .on('exit', () => {
      removeArchive && spawn('rm', [props.archive])
    })
    .on('error', (err) => onError?.(err))
}
