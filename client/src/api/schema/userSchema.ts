import * as t from "io-ts";

/**
 * Describes shape of session response
 */
export const userSchema = t.type({
  id: t.string,
  username: t.string
});
