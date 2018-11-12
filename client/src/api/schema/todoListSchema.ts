import * as t from "io-ts";
import { todoSchema } from "./todoSchema";

/**
 * Describes a listing in task pagination
 */
export const todoListSchema = t.type({
  total: t.number,
  items: t.array(todoSchema)
});
