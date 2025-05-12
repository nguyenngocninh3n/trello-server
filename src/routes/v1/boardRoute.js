import { boardController } from '@controllers/boardController'
import { authMiddleware } from '@middlewares/authMiddleware'
import { boardValidation } from '@validations/boardValidation'
import express from 'express'
const Router = express.Router()

Router.route('/:id')
  .get(authMiddleware.isAuthorized, boardController.getDetails)
  .put(authMiddleware.isAuthorized, boardValidation.updateBoardDetail, boardController.update)


Router.route('/')
  .get(authMiddleware.isAuthorized, boardController.getBoards)
  .post(authMiddleware.isAuthorized, boardValidation.createNewBoard, boardController.createNewBoard)

export const boardRoute = Router
