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
  const options = Object.entries(props).map(([key, value]) => {
    if (value) return key === 'ssl' ? `--${key}` : `--${key}="${value}"`
    else return ''
  }).filter(option => Boolean(option))
  const { name } = require('../../package.json')
  return spawn(`${process.cwd()}/node_modules/${name}/bin/mongodump`, options)
}
