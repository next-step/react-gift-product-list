import z from 'zod';

const kakaoEmailRegex = /^[^\s@]+@kakao\.com$/;

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'ID를 입력해주세요')
    .regex(kakaoEmailRegex, 'ID는 kakao.com 이메일 형식으로 입력해주세요'),
  password: z
    .string()
    .min(1, 'PW를 입력해주세요.')
    .min(8, 'PW는 최소 8글자 이상이어야 합니다.'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
