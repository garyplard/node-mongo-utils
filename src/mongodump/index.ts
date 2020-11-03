import { spawn } from 'child_process'
import { getInstalledPathSync } from 'get-installed-path'
import { parseOptions } from '../utils'

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

export const mongodump = (props: mongodumpProps, onError?: (error: any) => void) => {
  const options = parseOptions(props)
  const { name } = require('../../package.json')
  const packagePath = getInstalledPathSync(name, { local: true })
  return spawn(`${packagePath}/bin/mongodump`, options).on('error', (err) => onError?.(err))
}
