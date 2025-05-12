import { env } from '@configs/environment'
import { StatusCodes } from 'http-status-codes'

export const errorHanler = (error, req, res, next) => {
  if (!error.statusCode) {
    error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR
  }
  // console.log('this is handler error: ', error.message)
  const customError = {
    statusCode: error.statusCode,
    message: error.message ?? StatusCodes[error.statusCode],
    stack: error.originError?.stack ?? error.stack
  }
  if (env.BUILD_MODE !== 'dev') {
    delete customError.stack
  }
  res.status(error.statusCode).json(customError)
}
