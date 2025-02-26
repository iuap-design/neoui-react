
export type DateRange = [Date, Date] | null
export type Page = { month: number; year: number }
export function convertValueToRange(
  selectionMode: 'single' | 'range' | undefined,
  value: Date | [Date, Date] | null
): DateRange {
  if (selectionMode === undefined || value === null) return null

  if (Array.isArray(value)) {
    return value
  }
  return [value, value]
}
export function convertPageToDate(page: Page) {
  return new Date(page.year, page.month - 1)
}
