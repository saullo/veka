import { User } from "./user.type";

export interface Token {
  access_token: string;
}

export interface TokenCreateResponse {
  user: User;
  token: Token;
}
