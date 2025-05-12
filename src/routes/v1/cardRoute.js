import { cardController } from '@controllers/cardController'
import { authMiddleware } from '@middlewares/authMiddleware'
import { multerUploadFileMiddleware } from '@middlewares/multerUploadFileMiddleware'
import { cardValidation } from '@validations/cardValidation'
import express from 'express'
const Router = express.Router()

Router.route('/:cardId').put(
  authMiddleware.isAuthorized,
  multerUploadFileMiddleware.upload.single('cardCover'),
  cardValidation.update,
  cardController.update
)
Router.route('/').post(authMiddleware.isAuthorized, cardValidation.createNewCard, cardController.createNewCard)

export const cardRoute = Router
