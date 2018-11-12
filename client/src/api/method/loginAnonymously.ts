import * as t from "io-ts";
import { ApiGateway } from "../ApiGateway";
import { sessionSchema } from "../schema/sessionSchema";
import { validateResponse } from "../utils/validateResponse";

type Result = t.TypeOf<typeof sessionSchema>;

/**
 * Authenticate user anonymously
 */
export const loginAnonymously = async (api: ApiGateway): Promise<Result> =>
  api.post("/auth/anonymous").then(validateResponse(sessionSchema));
