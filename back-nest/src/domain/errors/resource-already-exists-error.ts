import { BaseError, ErrorCodes } from '../abstracts/base-error'

export class ResourceAlreadyExistsError extends BaseError {
  constructor() {
    super('Resource already exists', 409, ErrorCodes.RESOURCE_ALREADY_EXISTS)
    this.name = 'ResourceAlreadyExistsError'
  }
}
