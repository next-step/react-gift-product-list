let navigateFn: ((path: string) => void) | null = null;

export const setNavigate = (fn: typeof navigateFn) => {
  navigateFn = fn;
};

export const navigate = (path: string) => {
  if (!navigateFn) {
    console.error("네비게이터가 설정되지 않았습니다.");
    return;
  }
  navigateFn(path);
};
