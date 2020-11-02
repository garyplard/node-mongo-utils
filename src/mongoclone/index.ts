import { mongodump, mongodumpProps } from "../mongodump"
import { mongorestore, mongorestoreProps } from "../mongorestore"

export interface mongocloneProps {
  source: Omit<mongodumpProps, 'archive'>;
  target: Omit<mongorestoreProps, 'archive' | 'removeArchive'>;
}

export const mongoclone = ({ source, target }: mongocloneProps) => {
  const archive = Date.now().toString()
  mongodump({ ...source, archive })
    .on('exit', (code, signal) => {
      if (!code && !signal) {
        mongorestore({ ...target, archive, removeArchive: true })
      }
    })
}