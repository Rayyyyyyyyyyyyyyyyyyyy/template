export function extractSubRoutes(path: string, layer = 1) {
  const match = path.match(/\/\w+-?\w+\b/g)
  if (!match || layer <= 0) {
    return '/'
  }

  return layer < match.length
    ? match.slice(0, layer).join('')
    : match.slice(0, match.length).join('')
}
