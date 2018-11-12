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
 * Authenticate with backend using email and password
 */
export const login = async (api: ApiGateway, params: Params): Promise<Result> =>
  api.post("/auth/login", params).then(validateResponse(sessionSchema));
