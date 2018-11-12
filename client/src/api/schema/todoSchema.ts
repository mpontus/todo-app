import * as t from "io-ts";

/**
 * Describes a single task
 */
export const todoSchema = t.type({
  id: t.string,
  title: t.string,
  date: t.string
});
