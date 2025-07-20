import { userSchema, type User } from "./userSchema";
import { STORAGE_KEY } from "@/constants/storage";

export function getUserFromSession(): User | null {
  try {
    const userInfo = sessionStorage.getItem(STORAGE_KEY.USER_INFO);
    if (!userInfo) return null;

    const parsed = JSON.parse(userInfo);
    const validated = userSchema.safeParse(parsed);

    if (!validated.success) return null;
    return validated.data;
  } catch {
    return null;
  }
}