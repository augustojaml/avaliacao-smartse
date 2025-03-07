import { BaseError, ErrorCodes } from '../abstracts/base-error'

export class ResourceNotFoundError extends BaseError {
  constructor() {
    super('Resource not found', 404, ErrorCodes.RESOURCE_NOT_FOUND)
    this.name = 'ResourceNotFoundError'
  }
}
