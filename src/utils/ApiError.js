class ApiError extends Error {
  constructor(message, statusCode, originError) {
    super(message)
    this.message = message
    this.name = 'ApiError'
    this.statusCode = statusCode
    this.originError = originError

    Error.captureStackTrace(this, this.constructor)
  }
}
export default ApiError
