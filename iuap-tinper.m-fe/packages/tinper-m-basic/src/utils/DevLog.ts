import { isDev } from './IsDev'

export function devWarning(component: string, message: string): void {
  if (isDev) {
    console.warn(`[tinper-m: ${component}] ${message}`)
  }
}

export function devError(component: string, message: string) {
  if (isDev) {
    console.error(`[tinper-m: ${component}] ${message}`)
  }
}
