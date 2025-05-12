import { columnService } from '@services/columnService'
import ApiError from '@utils/ApiError'

const { StatusCodes } = require('http-status-codes')

const createNewColumn = async (req, res, next) => {
  try {
    const getColumn = await columnService.createNewColumn(req.body)
    res.status(StatusCodes.CREATED).json(getColumn)
  } catch (error) {
    next(new ApiError(error.message, StatusCodes.INTERNAL_SERVER_ERROR, error))
  }
}

const updateColumn = async (req, res, next) => {
  try {
    const columnId = req.params.id
    const userId = req.jwtDecoded._id
    const { boardId, ...updateData } = req.body
    const updatedColumn = await columnService.updateColumn(userId, columnId, boardId, updateData)
    res.status(StatusCodes.CREATED).json(updatedColumn)
  } catch (error) {
    next(new ApiError(error.message, StatusCodes.INTERNAL_SERVER_ERROR, error))
  }
}

const moveCards = async (req, res, next) => {
  try {
    const updateData = req.body
    await columnService.moveCards(updateData)
    res.status(StatusCodes.CREATED).json({ status: 'Successfully' })
  } catch (error) {
    next(new ApiError(error.message, StatusCodes.INTERNAL_SERVER_ERROR, error))
  }
}

const deleteColumn = async (req, res, next) => {
  try {
    const columnId = req.params.id
    await columnService.deleteColumn(columnId)
    res.status(StatusCodes.OK).json({ deleteStatus: 'Delete column successfully' })
  } catch (error) {
    next(ApiError(error.message, StatusCodes.INTERNAL_SERVER_ERROR, error))
  }
}

export const columnController = {
  createNewColumn,
  updateColumn,
  moveCards,
  deleteColumn
}
