/**
 * Error dispatched when the token payload is unprocessable.
 */
export class InvalidPayloadError extends Error {
  constructor(message: string = 'Invalid Payload') {
    super(message);
  }
}
