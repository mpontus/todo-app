import * as t from "io-ts";
import { ApiGateway } from "../ApiGateway";
import { sessionSchema } from "../schema/sessionSchema";
import { validateResponse } from "../utils/validateResponse";

interface Params {
  username: string;
  password: string;
}

type Result = t.TypeOf<typeof sessionSchema>;

/**
 * Authenticate using new account
 */
export const signup = async (
  api: ApiGateway,
  params: Params
): Promise<Result> =>
  api.post("/auth/signup", params).then(validateResponse(sessionSchema));
