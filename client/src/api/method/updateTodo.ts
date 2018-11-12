import * as t from "io-ts";
import { ApiGateway } from "../ApiGateway";
import { todoSchema } from "../schema/todoSchema";
import { validateResponse } from "../utils/validateResponse";

interface Params {
  id: string;
  title?: string;
  date?: string;
}

type Result = t.TypeOf<typeof todoSchema>;

/**
 * Update task details
 */
export const updateTodo = async (
  api: ApiGateway,
  { id, ...params }: Params
): Promise<Result> =>
  api.post(`todos/${id}`, params).then(validateResponse(todoSchema));
