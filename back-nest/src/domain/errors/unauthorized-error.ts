import { BaseError, ErrorCodes } from '../abstracts/base-error'

export class UnauthorizedError extends BaseError {
  constructor() {
    super('Unauthorized', 401, ErrorCodes.UNAUTHORIZED)
    this.name = 'UnauthorizedError'
  }
}
