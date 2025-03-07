export enum ErrorCodes {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',
  UNAUTHORIZED = 'UNAUTHORIZED',
  GENERIC_ERROR = 'GENERIC_ERROR',
  RESOURCE_ALREADY_EXISTS = 'RESOURCE_ALREADY_EXISTS',
  INVALID_STATUS_TYPE = 'INVALID_STATUS_TYPE',
  INVALID_BID_AMOUNT = 'INVALID_BID_AMOUNT',
}

/**
 * Classe base para erros personalizados no sistema.
 * Todos os erros devem estender esta classe para padronização.
 */
export class BaseError extends Error {
  public readonly statusCode: number
  public readonly errorCode: ErrorCodes

  constructor(
    message: string,
    statusCode = 400,
    errorCode: ErrorCodes = ErrorCodes.GENERIC_ERROR,
  ) {
    super(message)
    this.statusCode = statusCode
    this.errorCode = errorCode
    this.name = this.constructor.name

    Error.captureStackTrace(this, this.constructor)
  }
}
