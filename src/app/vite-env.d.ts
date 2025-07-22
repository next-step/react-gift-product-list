/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  // 여기에 다른 환경변수 추가 가능
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
