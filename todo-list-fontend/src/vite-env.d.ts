/// <reference types="vite/client" />
interface ProcessEnv {
    DB_PORT: number;
    DB_USER: string;
    ENV: 'test' | 'dev' | 'prod';
  }
