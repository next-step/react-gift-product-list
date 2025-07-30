import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'ID를 입력해주세요.')
    .email('ID는 이메일 형식으로 입력해주세요.'),
  password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다.'),
});

export type LoginFormInputs = z.infer<typeof loginSchema>;
