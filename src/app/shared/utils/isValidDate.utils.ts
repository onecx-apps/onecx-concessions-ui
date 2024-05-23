export function isValidDate(value: unknown): value is Date {
  return value instanceof Date && !isNaN(value as never);
}
