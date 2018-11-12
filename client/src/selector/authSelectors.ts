import { Selector } from "reselect";
import { State } from "../reducer";

export const makeGetAuthToken = (): Selector<
  State,
  string | undefined
> => state => state.auth.token;
