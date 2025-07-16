import { useEffect, useState, type ReactNode } from "react";
import { UserInfoContext } from "@/context/UserInfoContext";
import type { User } from "@/context/UserInfoContext";

export function UserInfoProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const s = sessionStorage.getItem("userInfo");
    if (s) {
      return JSON.parse(s);
    } else {
      return null;
    }
  });
  useEffect(() => {
    if (user) {
      sessionStorage.setItem("userInfo", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("userInfo");
    }
  }, [user]);

  return (
    <UserInfoContext.Provider value={{ user, setUser }}>
      {children}
    </UserInfoContext.Provider>
  );
}
