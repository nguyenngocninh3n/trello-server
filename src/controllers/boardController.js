import { boardService } from '@services/boardService'
import ApiError from '@utils/ApiError'

const { StatusCodes } = require('http-status-codes')

const getBoards = async (req, res, next) => {
  try {
    const { page, itemsPerPage, q: searchQuery } = req.query
    const userId = req.jwtDecoded._id
    const listBoards = await boardService.getBoards(userId, parseInt(page, 10), parseInt(itemsPerPage, 10), searchQuery)
    res.status(StatusCodes.OK).json(listBoards)
  } catch (error) {
    next(new ApiError(error.message, error.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR, error))
  }
}

const createNewBoard = async (req, res, next) => {
  try {
    const userId = req.jwtDecoded._id
    const getBoard = await boardService.createNewBoard(userId, req.body)
    res.status(StatusCodes.CREATED).json(getBoard)
  } catch (error) {
    next(new ApiError(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
  }
}

const getDetails = async (req, res, next) => {
  try {
    const boardId = req.params.id
    const userId = req.jwtDecoded._id
    const getDetails = await boardService.getDetails(userId, boardId)
    res.status(StatusCodes.OK).json(getDetails)
  } catch (error) {
    next(new ApiError(error.message, StatusCodes.INTERNAL_SERVER_ERROR, error))
  }
}

const update = async (req, res, next) => {
  try {
    const userId = req.jwtDecoded._id
    const boardId = req.params.id
    const updatedData = req.body
    const updatedBoard = await boardService.update(userId, boardId, updatedData)
    res.status(StatusCodes.OK).json(updatedBoard)
  } catch (error) {
    next(new ApiError(error.message, StatusCodes.INTERNAL_SERVER_ERROR, error))
  }
}

export const boardController = {
  getBoards,
  createNewBoard,
  getDetails,
  update
}
