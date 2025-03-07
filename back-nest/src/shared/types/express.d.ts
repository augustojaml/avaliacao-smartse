// eslint-disable-next-line prettier/prettier
import 'express';

declare module 'express' {
  export interface Request {
    user?: { sub: string; cpf: string }
  }
}
