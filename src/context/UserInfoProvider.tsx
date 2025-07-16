import { useState, type ReactNode } from "react";
import { UserInfoContext } from "@/context/UserInfoContext";
import type { User } from "@/context/UserInfoContext";

export function UserInfoProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  return (
    <UserInfoContext.Provider value={{ user, setUser }}>
      {children}
    </UserInfoContext.Provider>
  );
}
