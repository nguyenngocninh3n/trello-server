import { invitationController } from '@controllers/invitationController'
import { authMiddleware } from '@middlewares/authMiddleware'
import { invitationValidation } from '@validations/invitationValidation'
import express from 'express'
const Router = express.Router()

Router.route('/board')
  .get(authMiddleware.isAuthorized, invitationController.getListNotify)
  .post(authMiddleware.isAuthorized, invitationValidation.invite, invitationController.invite)
  .put(authMiddleware.isAuthorized, invitationValidation.update, invitationController.updateInvitationStatus)
export const invitationRoute = Router
