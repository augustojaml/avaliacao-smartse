import { BaseError } from '@/domain/abstracts/base-error'
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { Response } from 'express'

interface HttpExceptionResponse {
  message: string | string[]
  errorCode?: string
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    let status = HttpStatus.INTERNAL_SERVER_ERROR
    let message: string | string[] = 'Internal server error'
    let errorCode = 'INTERNAL_SERVER_ERROR'

    if (exception instanceof BaseError) {
      status = exception.statusCode
      message = exception.message
      errorCode = exception.errorCode
    } else if (exception instanceof HttpException) {
      status = exception.getStatus()
      const responseBody = exception.getResponse() as HttpExceptionResponse

      message = Array.isArray(responseBody.message)
        ? responseBody.message.join(', ')
        : responseBody.message

      errorCode = responseBody.errorCode || errorCode
    } else {
      console.error(exception)
    }

    response.status(status).json({
      statusCode: status,
      message,
      errorCode,
    })
  }
}
