import { userModel } from '@models/userModel'
import ApiError from '@utils/ApiError'
import { BrevoProvider } from 'providers/BrevoProvider'
import { pickUser } from '@utils/formatter'
import { JwtProvider } from 'providers/JwtProvider'
import bcrypt from 'bcryptjs'
import { StatusCodes } from 'http-status-codes'
import { v4 } from 'uuid'
import { CloudinaryProvider } from 'providers/CloudinaryProvider'

const register = async (reqBody) => {
  const { email, password } = reqBody
  const checkExisting = await userModel.findOneByEmail(email)
  if (checkExisting) {
    throw new ApiError('Email is existed', StatusCodes.CONFLICT)
  }
  const getUserName = email.split('@')[0]
  const newUser = {
    email,
    password: bcrypt.hashSync(password, 8),
    username: getUserName,
    displayName: getUserName,
    verifyToken: v4()
  }
  const created_user = await userModel.createNewUser(newUser)
  const getUser = await userModel.findOneById(created_user.insertedId)
  BrevoProvider.sendVerifyEmail(getUser.email, getUser.verifyToken)
  return pickUser(getUser)
}

const verifyAccount = async (reqBody) => {
  const { email, token } = reqBody
  const user = await userModel.findOneByEmail(email)

  if (!user) {
    throw new ApiError('Email haven not registered ever!', StatusCodes.INTERNAL_SERVER_ERROR)
  }
  if (user.isActive) {
    throw new ApiError('Your account has been active!', StatusCodes.INTERNAL_SERVER_ERROR)
  }
  if (user.verifyToken !== token) {
    throw new Error('Token is invalid!')
  }

  const updateUser = await userModel.update(user._id, { isActive: true, verifyToken: null })
  return pickUser(updateUser)
}

const login = async (reqBody) => {
  const { email, password } = reqBody
  const user = await userModel.findOneByEmail(email)

  if (!user) {
    throw new ApiError('Email haven not registered ever!', StatusCodes.NOT_FOUND)
  }
  if (!user.isActive) {
    throw new ApiError('Your account has not been active!', StatusCodes.NOT_ACCEPTABLE)
  }
  if (!bcrypt.compareSync(password, user.password)) {
    throw new ApiError('Your password is incorrect.Please login again!', StatusCodes.INTERNAL_SERVER_ERROR)
  }

  const userData = { _id: user._id, email }
  const accessToken = JwtProvider.generateAccessToken(userData)
  const refreshToken = JwtProvider.generateRefreshToken(userData)
  const customUserData = { accessToken, refreshToken, ...pickUser(user) }
  return customUserData
}

const refreshToken = (clientRefreshToken) => {
  const result = JwtProvider.verifyRefreshToken(clientRefreshToken)
  const { _id, email } = result
  const accessToken = JwtProvider.generateAccessToken({ _id, email })
  return { accessToken }
}

export const update = async (userId, reqBody, userAvatarFile) => {
  const user = await userModel.findOneById(userId)
  if (!user) throw new ApiError('User not found', StatusCodes.NOT_FOUND)
  if (!user.isActive) throw new ApiError('Please active your account!', StatusCodes.NOT_ACCEPTABLE)
  if (reqBody?.current_password && reqBody?.new_password) {
    const isCorrect = bcrypt.compareSync(reqBody.current_password, user.password)
    if (!isCorrect) {
      throw new ApiError('Your password is incorrect', StatusCodes.NOT_ACCEPTABLE)
    }
    const updatedUser = await userModel.update(userId, { password: bcrypt.hashSync(reqBody.new_password) })
    return pickUser(updatedUser)
  }

  if (userAvatarFile) {
    const updatedFile = await CloudinaryProvider.uploadFile('users', userAvatarFile.buffer)
    const updatedUser = await userModel.update(userId, { avatar: updatedFile.secure_url })
    return pickUser(updatedUser)
  }

  const updatedUser = await userModel.update(userId, reqBody)
  return pickUser(updatedUser)
}

export const userService = {
  register,
  verifyAccount,
  login,
  refreshToken,
  update
}
