import { columnController } from '@controllers/columnController'
import { authMiddleware } from '@middlewares/authMiddleware'
import { columnValidation } from '@validations/columnValidation'
import express from 'express'
const Router = express.Router()

Router.route('/supports/move_cards').put(
  authMiddleware.isAuthorized,
  columnValidation.moveCards,
  columnController.moveCards
)

Router.route('/:id')
  .put(authMiddleware.isAuthorized, columnValidation.updateColumn, columnController.updateColumn)
  .delete(authMiddleware.isAuthorized, columnValidation.deleteColumn, columnController.deleteColumn)

Router.route('/').post(authMiddleware.isAuthorized, columnValidation.createNewColumn, columnController.createNewColumn)

export const columnRoute = Router
