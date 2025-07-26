export async function fetchThemeProducts(
  themeId: string,
  cursor: number | null,
  limit = 12
) {
  const base = import.meta.env.VITE_BASE_URL
  const url = new URL(`/api/themes/${themeId}/products`, base)
  if (cursor !== null) url.searchParams.append("cursor", String(cursor))
  url.searchParams.append("limit", String(limit))

  const res = await fetch(url.toString()).then((r) => r.json())
  return res.data
}
