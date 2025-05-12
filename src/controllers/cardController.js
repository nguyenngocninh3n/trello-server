import { cardService } from '@services/cardService'
import ApiError from '@utils/ApiError'

const { StatusCodes } = require('http-status-codes')

const createNewCard = async (req, res, next) => {
  try {
    const getCard = await cardService.createNewCard(req.body)
    res.status(StatusCodes.CREATED).json(getCard)
  } catch (error) {
    next(new ApiError(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
  }
}

const update = async (req, res, next) => {
  try {
    const userInfo = req.jwtDecoded
    const { cardId } = req.params
    const cardCoverFile = req.file ?? null
    const updatedCard = await cardService.update(cardId, cardCoverFile, req.body, userInfo)
    res.status(StatusCodes.OK).json(updatedCard)
  } catch (error) {
    next(new ApiError(error.message, error?.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR, error))
  }
}

export const cardController = {
  createNewCard,
  update
}
