export const isBlank = (v: string) => v.trim() === '';

export const isPhone = (v: string) => /^01[016789]\d{7,8}$/.test(v);

export const emailRegex =
  /^[0-9a-zA-Z]([.-]?[0-9a-zA-Z])*@[0-9a-zA-Z]([.-]?[0-9a-zA-Z])*\.[a-zA-Z]{2,}$/;
export const MIN_PASSWORD_LENGTH = 8;
