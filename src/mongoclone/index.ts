import { getInstalledPathSync } from "get-installed-path"
import { mongodump, mongodumpProps } from "../mongodump"
import { mongorestore, mongorestoreProps } from "../mongorestore"
import { parseOptions } from "../utils"

export const mongoclone = (
  source: Omit<mongodumpProps, 'archive'>, 
  target: Omit<mongorestoreProps, 'archive' | 'removeArchive' | 'nsFrom'>
) => {
  const archive = Date.now().toString()
  mongodump({ 
    ...source,
    archive
  }).on('exit', (code, signal) => {
      if (!code && !signal) {
        mongorestore({ 
          ...target,
          archive,
          nsFrom: `${source.db}.*`,
          removeArchive: true
        })
      } else {
        const { name } = require('../../package.json')
        const packagePath = getInstalledPathSync(name, { local: true })
        console.log({ code, signal })
        throw new Error(JSON.stringify({ 
          commands: [
            `${packagePath}/bin/mongodump ${parseOptions({ ...source, archive }).join(' ')}`,
            `${packagePath}/bin/mongorestore ${parseOptions({ ...target, archive, nsFrom: `${source.db}.*` }).join(' ')}`
          ],
          code, 
          signal
        }))
      }
    })
}
