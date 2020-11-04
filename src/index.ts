import { getInstalledPathSync } from 'get-installed-path'
import { name } from '../package.json'

export * from './mongorestore'
export * from './mongodump'
export * from './mongoclone'
export * from './utils'

const rootFolder = getInstalledPathSync(name, { paths: process.mainModule?.paths })
const binariesList = ['mongodump', 'mongorestore'] as const

export const binaries = binariesList.reduce(
  (acc, filename) => { 
    acc[filename] = `${rootFolder}/bin/${filename}`
    return acc
  }, 
  {} as Record<typeof binariesList[number], string>
)
