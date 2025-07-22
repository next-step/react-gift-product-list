export const withError = <T extends (...args: any[]) => Promise<Response>>(
  call: T,
  defaultError = '',
) => {
  return async (...args: Parameters<T>) => {
    const res = await call(...args);

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.message ?? defaultError);
    }

    const data = await res.json();
    return data.data;
  };
};

export const fetchThemeInfo = withError(
  (themeId: number) => fetch(`/api/themes/${themeId}/info`),
  '테마 정보를 불러오는 데 실패했습니다.',
);

export const fetchThemeProducts = withError(
  (themeId: number, cursor = 0, limit = 10) =>
    fetch(
      `/api/themes/${themeId}/products?${new URLSearchParams({
        cursor,
        limit,
      })}`,
    ),
  '상품 목록을 불러오는 데 실패했습니다.',
);
