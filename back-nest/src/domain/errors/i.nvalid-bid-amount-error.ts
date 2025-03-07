import { BaseError, ErrorCodes } from '../abstracts/base-error'

export class InvalidBidAmountError extends BaseError {
  constructor() {
    super('Invalid bid amount', 400, ErrorCodes.INVALID_BID_AMOUNT)
    this.name = 'InvalidStatusTypeError'
  }
}
