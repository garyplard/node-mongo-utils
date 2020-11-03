import { spawn } from 'child_process'
import { getInstalledPathSync } from 'get-installed-path'
import { parseOptions } from '../utils'

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
  const { name } = require('../../package.json')
  const packagePath = getInstalledPathSync(name, { local: true })
  spawn(`${packagePath}/bin/mongorestore`, options)
    .on('exit', () => {
      removeArchive && spawn('rm', [props.archive])
    })
    .on('error', (err) => onError?.(err))
}
