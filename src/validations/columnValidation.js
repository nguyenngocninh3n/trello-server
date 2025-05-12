const { default: ApiError } = require('@utils/ApiError')
const { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } = require('@utils/validators')
const { StatusCodes } = require('http-status-codes')
const Joi = require('joi')

const createNewColumn = async (req, res, next) => {
  try {
    const columnValidations = Joi.object({
      boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
      title: Joi.string().required().min(3).max(50).strict(),
      description: Joi.string().min(3).max(256).strict()
    })
    await columnValidations.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(error.message, StatusCodes.UNPROCESSABLE_ENTITY))
  }
}

const updateColumn = async (req, res, next) => {
  try {
    const updateColumnValidations = Joi.object({
      _id: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
      boardId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
    })
    await updateColumnValidations.validateAsync(req.body, { abortEarly: false, allowUnknown: true })
    next()
  } catch (error) {
    next(new ApiError(error.message, StatusCodes.UNPROCESSABLE_ENTITY))
  }
}

const moveCards = async (req, res, next) => {
  try {
    const correctValidations = Joi.object({
      cardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
      preColumnId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
      nextColumnId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
      preColumnCardOrderIds: Joi.array().required(),
      nextColumnCardOrderIds: Joi.array().required()
    })
    await correctValidations.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(error.message, StatusCodes.UNPROCESSABLE_ENTITY))
  }
}

const deleteColumn = async (req, res, next) => {
  // Don't need
  next()
}

export const columnValidation = {
  createNewColumn,
  updateColumn,
  moveCards,
  deleteColumn
}
