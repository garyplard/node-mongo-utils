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

export const mongorestore = ({removeArchive, ...props}: mongorestoreProps) => {
  const options = parseOptions(props)
  const { name } = require('../../package.json')
  const packagePath = getInstalledPathSync(name, { local: true })
  try {
    spawn(`${packagePath}/bin/mongorestore`, options)
      .on('exit', () => {
        removeArchive && spawn('rm', [props.archive])
      })
  } catch (error) {
    throw new Error(JSON.stringify({
      error,
      command: `${packagePath}/bin/mongorestore ${options.join(' ')}`
    }))
  }
}
