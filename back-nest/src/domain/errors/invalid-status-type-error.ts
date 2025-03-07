import { BaseError, ErrorCodes } from '../abstracts/base-error'

export class InvalidStatusTypeError extends BaseError {
  constructor() {
    super('Invalid status type', 400, ErrorCodes.INVALID_STATUS_TYPE)
    this.name = 'InvalidStatusTypeError'
  }
}
