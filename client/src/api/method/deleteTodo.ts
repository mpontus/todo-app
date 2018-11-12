import * as t from "io-ts";
import { ApiGateway } from "../ApiGateway";
import { todoSchema } from "../schema/todoSchema";
import { validateResponse } from "../utils/validateResponse";

interface Params {
  id: string;
}

/**
 * Update task details
 */
export const deleteTodo = async (
  api: ApiGateway,
  { id }: Params
): Promise<void> => api.delete(`todos/${id}`).then(() => undefined);
