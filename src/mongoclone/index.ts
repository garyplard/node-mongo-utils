import { mongodump, mongodumpProps } from "../mongodump"
import { mongorestore, mongorestoreProps } from "../mongorestore"

export const mongoclone = (
  source: Omit<mongodumpProps, 'archive'>, 
  target: Omit<mongorestoreProps, 'archive' | 'removeArchive' | 'nsFrom'>,
  onError?: (error: any) => void
) => {
  const archive = Date.now().toString()
  mongodump({ 
    ...source,
    archive
  }, onError).on('exit', (code, signal) => {
      if (!code && !signal) {
        mongorestore({ 
          ...target,
          archive,
          nsFrom: `${source.db}.*`,
          removeArchive: true
        }, onError)
      } else {
        onError?.({ code, signal })
      }
    })
}
