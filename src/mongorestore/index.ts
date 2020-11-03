import { spawn } from 'child_process'
import { getInstalledPathSync } from 'get-installed-path'

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
  const options = Object.entries(props).map(([key, value]) => {
    if (value) return key === 'ssl' ? `--${key}` : `--${key}="${value}"`
    else return ''
  }).filter(option => Boolean(option))
  const { name } = require('../../package.json')
  const packagePath = getInstalledPathSync(name, { local: true })
  spawn(`${packagePath}/bin/mongorestore`, options)
    .on('exit', () => {
      removeArchive && spawn('rm', [props.archive])
    })
}
