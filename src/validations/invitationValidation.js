import ApiError from '@utils/ApiError'
import { EMAIL_RULE, EMAIL_RULE_MESSAGE, OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '@utils/validators'
import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'

const invite = async (req, res, next) => {
  try {
    const correctValidations = Joi.object({
      boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
      invitedEmail: Joi.string().required().pattern(EMAIL_RULE).message(EMAIL_RULE_MESSAGE).trim().strict()
    })
    correctValidations.validate(req.body)
    next()
  } catch (error) {
    next(new ApiError(error.message, StatusCodes.UNPROCESSABLE_ENTITY))
  }
}
const update = async (req, res, next) => {
  try {
    const correctValidations = Joi.object({
      invitationId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
      status: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
    })
    correctValidations.validate(req.body)
    next()
  } catch (error) {
    next(new ApiError(error.message, StatusCodes.UNPROCESSABLE_ENTITY))
  }
}

export const invitationValidation = { invite, update }
