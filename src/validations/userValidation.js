import ApiError from '@utils/ApiError'
import { EMAIL_RULE, EMAIL_RULE_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from '@utils/validators'
import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'

const register = async (req, res, next) => {
  try {
    const registerValidation = Joi.object({
      email: Joi.string().required().pattern(EMAIL_RULE).message(EMAIL_RULE_MESSAGE),
      password: Joi.string().required().pattern(PASSWORD_RULE).message(PASSWORD_RULE_MESSAGE)
    })

    await registerValidation.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(error.message, StatusCodes.UNPROCESSABLE_ENTITY))
  }
}

const login = async (req, res, next) => {
  try {
    const loginValidation = Joi.object({
      email: Joi.string().required().pattern(EMAIL_RULE).message(EMAIL_RULE_MESSAGE),
      password: Joi.string().required().pattern(PASSWORD_RULE).message(PASSWORD_RULE_MESSAGE)
    })

    await loginValidation.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(error.message, StatusCodes.UNPROCESSABLE_ENTITY))
  }
}

const verifyAccount = async (req, res, next) => {
  try {
    const loginValidation = Joi.object({
      email: Joi.string().required().pattern(EMAIL_RULE).message(EMAIL_RULE_MESSAGE),
      token: Joi.string().required().strict()
    })

    await loginValidation.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(error.message, StatusCodes.UNPROCESSABLE_ENTITY))
  }
}


const update = async (req, res, next) => {
  try {
    const updateValidation = Joi.object({
      displayName: Joi.string().trim().strict(),
      current_password: Joi.string().pattern(PASSWORD_RULE).message(PASSWORD_RULE_MESSAGE),
      new_password: Joi.string().pattern(PASSWORD_RULE).message(PASSWORD_RULE_MESSAGE)
    })

    await updateValidation.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(error.message, StatusCodes.UNPROCESSABLE_ENTITY))
  }
}



export const userValidation = {
  register,
  verifyAccount,
  login,
  update
}
