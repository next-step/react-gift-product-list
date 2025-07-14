import type { UserInfo } from '@/contexts/auth'

// * 유저 정보 암호화
export const encodeUserInfo = (userInfo: UserInfo) => {
  return btoa(JSON.stringify(userInfo))
}

// * 유저 정보 복호화
export const decodeUserInfo = (encodedInfo: string): UserInfo | null => {
  try {
    return JSON.parse(atob(encodedInfo))
  } catch {
    return null
  }
}
