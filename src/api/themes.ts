export interface Theme {
  themeId: number
  name: string
  image: string
}

export interface ThemeProductsResponse {
  list: import('../type').Product[]
  cursor: number
  hasMoreList: boolean
}

export interface ThemeInfo {
  themeId: number
  name: string
  title: string
  description: string
  backgroundColor: string
}

import { fetchApi } from './client'

export async function fetchThemes(): Promise<Theme[]> {
  const data = await fetchApi<Theme[]>('/api/themes')

  if (!Array.isArray(data)) {
    throw new Error('Invalid response from /api/themes')
  }
  return data
}

export async function fetchThemeInfo(themeId: number): Promise<ThemeInfo> {
  const data = await fetchApi<ThemeInfo>(`/api/themes/${themeId}/info`)

  if (
    typeof data !== 'object' ||
    typeof data.themeId !== 'number' ||
    typeof data.name !== 'string'
  ) {
    throw new Error('Invalid response from /api/themes/:themeId/info')
  }

  return data
}

export async function fetchThemeProducts(
  themeId: number,
  { cursor = 0, limit = 10 }: { cursor?: number; limit?: number } = {},
): Promise<ThemeProductsResponse> {
  const data = await fetchApi<ThemeProductsResponse>(
    `/api/themes/${themeId}/products`,
    { cursor: String(cursor), limit: String(limit) },
  )
  if (typeof data !== 'object' || !Array.isArray(data.list)) {
    throw new Error('Invalid response from /api/themes/:themeId/products')
  }

  return data
}