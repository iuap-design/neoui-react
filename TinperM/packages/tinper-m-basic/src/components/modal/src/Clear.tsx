import { closeFnSet } from './Show'

export function clear() {
  closeFnSet.forEach(close => {
    close()
  })
}
