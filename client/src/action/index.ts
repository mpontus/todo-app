import { ActionType } from "typesafe-actions";
import * as authActions from "./authActions";

/**
 * Aggregate all action types for reducer and epic typing
 */
export type Action = ActionType<typeof authActions>;
