import { userController } from '@controllers/userController'
import { authMiddleware } from '@middlewares/authMiddleware'
import { multerUploadFileMiddleware } from '@middlewares/multerUploadFileMiddleware'
import { userValidation } from '@validations/userValidation'
import express from 'express'
const Router = express.Router()

Router.route('/register').post(userValidation.register, userController.register)
Router.route('/verify').post(userValidation.verifyAccount, userController.verifyAccount)
Router.route('/login').post(userValidation.login, userController.login)
Router.route('/logout').delete(userController.logout)
Router.route('/refresh_token').get(userController.refreshToken)
Router.route('/update').put(
  authMiddleware.isAuthorized,
  multerUploadFileMiddleware.upload.single('avatar'),
  userValidation.update,
  userController.update
)
export const userRoute = Router
