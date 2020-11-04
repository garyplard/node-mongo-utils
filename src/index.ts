import { getInstalledPathSync } from 'get-installed-path'

export * from './mongorestore'
export * from './mongodump'
export * from './mongoclone'
export * from './utils'

const binFolderPath = `${getInstalledPathSync(require('../package.json').name, { local: true })}/bin`
const binariesList = ['mongodump', 'mongorestore'] as const

export const binaries = binariesList.reduce(
  (acc, filename) => { 
    acc[filename] = `${binFolderPath}/${filename}`
    return acc
  }, 
  {} as Record<typeof binariesList[number], string>
)
