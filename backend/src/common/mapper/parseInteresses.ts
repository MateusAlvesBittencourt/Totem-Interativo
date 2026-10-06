export function parseInteresses(query: Record<string, any>): Record<string, any> {
  const interesses: Record<string, any> = {};

  for (const key in query) {
    if (Object.prototype.hasOwnProperty.call(query, key)) {
      const value = query[key];
      const parsedValue = isNaN(Number(value)) ? value : Number(value);
      interesses[key] = parsedValue;
    }
  }

  return interesses;
}
