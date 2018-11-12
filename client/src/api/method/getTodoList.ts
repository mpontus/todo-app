import * as t from "io-ts";
import * as qs from "querystring";
import { ApiGateway } from "../ApiGateway";
import { todoListSchema } from "../schema/todoListSchema";
import { validateResponse } from "../utils/validateResponse";

interface Params {
  date?: string;
  skip?: number;
  take?: number;
}

type Result = t.TypeOf<typeof todoListSchema>;

/**
 * Fetch list of todos from the server
 */
export const getTodoList = async (
  api: ApiGateway,
  params: Params
): Promise<Result> =>
  api
    .get(`todos?${qs.stringify(params)}`)
    .then(validateResponse(todoListSchema));
