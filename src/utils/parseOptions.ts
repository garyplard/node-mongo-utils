import { mongodumpProps, mongorestoreProps } from ".."

export const parseOptions = (props: mongodumpProps | mongorestoreProps) => {
  return Object.entries(props).map(([key, value]) => {
    if (value) return key === 'ssl' ? `--${key}` : `--${key}="${value}"`
    else return ''
  }).filter(option => Boolean(option))
}