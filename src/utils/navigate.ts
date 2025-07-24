let navigator: ((path: string) => void) | null = null;

export const setNavigator = (navFn: (path: string) => void) => {
  navigator = navFn;
};

export const navigate = (path: string) => {
  if (navigator) {
    navigator(path);
  } else {
    console.warn('navigate 호출 실패: navigator가 설정되지 않았습니다.');
  }
};
