import apiClient from '@/apis/apiClient';
import type { LoginRequestDTO, LoginResponseDto } from '@/types/DTO/loginDTO';

export async function postLogin(data: LoginRequestDTO): Promise<LoginResponseDto> {
  const response = await apiClient.post<{ data: LoginResponseDto }>('/login', data);
  return response.data.data;
}