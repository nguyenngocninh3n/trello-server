import ApiError from '@utils/ApiError'
import { BOARD_TYPES } from '@utils/constant'
import { StatusCodes } from 'http-status-codes'
import Joi, { allow } from 'joi'
const boardValidations = Joi.object({
  title: Joi.string().required().min(5).max(50).trim().strict().messages({
    'any.required': 'title is required! nguyenngocninh.3n',
    'string.empty': 'title can not be empty! nguyenngocninh.3n',
    'string.min': 'title need to be euqal or more than 5 characters! nguyenngocninh.3n',
    'string.max': 'title has maximum 50 characters! nguyenngocninh.3n'
  }),
  description: Joi.string().optional().min(5).max(256).trim().strict(),
  type: Joi.string().required().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE).strict()
})

const createNewBoard = async (req, res, next) => {
  try {
    await boardValidations.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(error.message, StatusCodes.UNPROCESSABLE_ENTITY))
  }
}

const updateBoardDetail = async (req, res, next) => {
  const updateBoardValidations = Joi.object({
    title: Joi.string().min(5).max(50).trim().strict(),
    description: Joi.string().min(5).max(256).trim().strict(),
    type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE).strict()
  })

  try {
    await updateBoardValidations.validateAsync(req.body, { abortEarly: false, allowUnknown: true })
    next()
  } catch (error) {
    next(new ApiError(error.message, StatusCodes.UNPROCESSABLE_ENTITY))
  }
}

export const boardValidation = {
  createNewBoard,
  updateBoardDetail
}
