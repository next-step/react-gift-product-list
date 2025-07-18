export const ERROR_MESSAGES = {
  LOGIN: {
    ID_EMPTY: "아이디를 입력해주세요.",
    ID_INVALID: "아이디는 이메일 형식으로 입력해주세요.",
    PW_EMPTY: "비밀번호를 입력해주세요.",
    PW_TOO_SHORT: (min: number) =>
      `비밀번호는 최소 ${min}자 이상이어야 합니다.`,
    SUCCESS: "로그인에 성공했습니다.",
  },

  SYSTEM: {
    USER_LOAD_ERROR: "유저 정보 로드 중 오류가 발생했습니다.",
    UNKNOWN: "알 수 없는 오류가 발생했습니다.",
  },

  VALIDATE: {
    NAME: "이름을 입력해주세요.",
    MESSGE: "메시지를 입력해주세요.",
    PHONE: "전화번호를 입력해주세요.",
    PHONE_TYPE: "올바른 전화번호 형식이 아닙니다. (예: 01012341234)",
    QUANTITY: "수량은 최소 1개 이상이어야 합니다.",
    SELECT_RECEIVER: "받는 사람을 선택해주세요.",
    DUPLICATE_PHONE: "중복된 전화번호입니다.",
    MAX_RECEIVER_NUMBER: "최대 10명까지 등록할 수 있습니다.",
  },
  THEME: {
    FAIL_TO_LOAD: "테마 정보를 불러오지 못했습니다.",
    LOAD: "테마 정보를 불러오고 있습니다.",
    NONE: "테마가 없습니다.",
  },
  PRODUCT: {
    FAIL_TO_LOAD: "상품 정보를 불러오지 못했습니다.",
    LOAD: "상품 정보를 불러오고 있습니다.",
    NONE: "상품이 없습니다,",
  },
};
