import { userService } from '@services/userService'
import ApiError from '@utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import ms from 'ms'

const register = async (req, res, next) => {
  try {
    const newUser = await userService.register(req.body)
    res.status(StatusCodes.CREATED).json(newUser)
  } catch (error) {
    next(new ApiError(error.message, StatusCodes.INTERNAL_SERVER_ERROR, error))
  }
}

const verifyAccount = async (req, res, next) => {
  try {
    await userService.verifyAccount(req.body)
    res.status(StatusCodes.CREATED).json('Verify account successfully')
  } catch (error) {
    next(new ApiError(error.message, StatusCodes.INTERNAL_SERVER_ERROR, error))
  }
}

const login = async (req, res, next) => {
  try {
    const user = await userService.login(req.body)
    res.cookie('accessToken', user.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms('14 days')
    })
    res.cookie('refreshToken', user.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms('14 days')
    })
    res.status(StatusCodes.CREATED).json(user)
  } catch (error) {
    next(new ApiError(error.message, StatusCodes.INTERNAL_SERVER_ERROR, error))
  }
}

const logout = async (req, res, next) => {
  try {
    res.clearCookie('accessToken')
    res.clearCookie('refreshToken')
    res.status(StatusCodes.OK).json({ loggedOut: true })
  } catch (error) {
    next(new ApiError(error.message, StatusCodes.INTERNAL_SERVER_ERROR, error))
  }
}

const refreshToken = async (req, res, next) => {
  try {
    const result = userService.refreshToken(req.cookies.refreshToken)
    res.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms('14 days')
    })
    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    next(new ApiError('Please login again!', StatusCodes.FORBIDDEN, error))
  }
}

const update = async (req, res, next) => {
  try {
    const { _id } = req.jwtDecoded
    const userAvatarFile = req.file ?? null
    const updatedUser = await userService.update(_id, req.body, userAvatarFile)
    res.status(StatusCodes.OK).json(updatedUser)
  } catch (error) {
    next(new ApiError(error.message, error?.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR, error))
  }
}

export const userController = {
  register,
  verifyAccount,
  login,
  logout,
  refreshToken,
  update
}
