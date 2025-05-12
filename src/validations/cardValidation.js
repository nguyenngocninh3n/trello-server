const { default: ApiError } = require('@utils/ApiError')
const { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } = require('@utils/validators')
const { StatusCodes } = require('http-status-codes')
const Joi = require('joi')

const createNewCard = async (req, res, next) => {
  try {
    const cardValidations = Joi.object({
      boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
      columnId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
      title: Joi.string().required().min(3).max(50).strict(),
      description: Joi.string().optional().min(3).max(256).strict()
    })
    await cardValidations.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(error.message, StatusCodes.UNPROCESSABLE_ENTITY))
  }
}

const update = async (req, res, next) => {
  try {
    const updateValidations = Joi.object({
      title: Joi.string().min(3).max(50).strict(),
      description: Joi.string().min(3).max(256).strict(),
      cover: Joi.string(),
      memberIds: Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
    })
    await updateValidations.validateAsync(req.body, { abortEarly: false, allowUnknown: true })
    next()
  } catch (error) {
    next(new ApiError(error.message, StatusCodes.UNPROCESSABLE_ENTITY))
  }
}

export const cardValidation = {
  createNewCard,
  update
}
