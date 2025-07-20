import { z } from "zod";

export const userInfoSchema = z.object({
  email: z.string(),
  authToken: z.string(),
  name: z.string(),
});

export type UserInfo = z.infer<typeof userInfoSchema>;
