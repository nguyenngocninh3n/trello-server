import { env } from '@configs/environment'
import Jwt from 'jsonwebtoken'

const generateToken = (data, secretKey, timelife) => {
  return Jwt.sign(data, secretKey, { algorithm: 'HS256', expiresIn: timelife })
}
const generateAccessToken = (data) => {
  return Jwt.sign(data, env.JWT_ACCESS_TOKEN_SECRET_KEY, {
    algorithm: 'HS256',
    // expiresIn: 5
    expiresIn: env.JWT_ACCESS_TOKEN_TIMELIFE
  })
}

const generateRefreshToken = (data) => {
  return Jwt.sign(data, env.JWT_REFRESH_TOKEN_SECRET_KEY, {
    algorithm: 'HS256',
    // expiresIn: 15
    expiresIn: env.JWT_REFRESH_TOKEN_TIMELIFE
  })
}

const verifyToken = (token, secretKey) => Jwt.verify(token, secretKey, { algorithms: 'HS256' })
const verifyAccessToken = (token) => Jwt.verify(token, env.JWT_ACCESS_TOKEN_SECRET_KEY, { algorithms: 'HS256' })
const verifyRefreshToken = (token) => Jwt.verify(token, env.JWT_REFRESH_TOKEN_SECRET_KEY, { algorithms: 'HS256' })

export const JwtProvider = {
  generateToken,
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  verifyAccessToken,
  verifyRefreshToken
}
