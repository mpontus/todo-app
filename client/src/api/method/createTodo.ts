import * as t from "io-ts";
import { ApiGateway } from "../ApiGateway";
import { todoSchema } from "../schema/todoSchema";
import { validateResponse } from "../utils/validateResponse";

interface Params {
  title: string;
  date: string;
}

type Result = t.TypeOf<typeof todoSchema>;

/**
 * Create new task
 */
export const createTodo = async (
  api: ApiGateway,
  params: Params
): Promise<Result> =>
  api.post(`todos`, params).then(validateResponse(todoSchema));
