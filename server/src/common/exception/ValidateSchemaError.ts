/**
 * Error dispatched by `validateSchema` when object validation fails
 */
export class ValidateSchemaError extends Error {
  constructor(message = 'Object Validation Error') {
    super(message);
  }
}
