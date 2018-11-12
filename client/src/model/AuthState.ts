import { UserSelectProperty } from "csstype";
import { User } from "./User";

export interface AuthState {
  token: string;
  user?: User;
}
