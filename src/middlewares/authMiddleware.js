import ApiError from '@utils/ApiError'
import { JwtProvider } from 'providers/JwtProvider'
import { StatusCodes } from 'http-status-codes'

const isAuthorized = async (req, res, next) => {
  const accessToken = req.cookies?.accessToken
  if (!accessToken) {
    next(new ApiError('Unauthorized! Not found!', StatusCodes.UNAUTHORIZED))
  }
  try {
    const accessTokenDecoded = JwtProvider.verifyAccessToken(accessToken)
    req.jwtDecoded = accessTokenDecoded
    next()
  } catch (error) {
    if (error.message?.includes('jwt expired')) {
      next(new ApiError('Need to refresh token', StatusCodes.GONE))
    }
    next(new ApiError('Unauthorized!', StatusCodes.UNAUTHORIZED))
  }
}

export const authMiddleware = {
  isAuthorized
}
