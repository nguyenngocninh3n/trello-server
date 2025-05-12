import { invitationService } from '@services/invitationService'
import ApiError from '@utils/ApiError'
import { StatusCodes } from 'http-status-codes'

const invite = async (req, res, next) => {
  try {
    const userId = req.jwtDecoded._id
    const invitation = await invitationService.invite(userId, req.body)
    res.status(StatusCodes.OK).json(invitation)
  } catch (error) {
    next(new ApiError(error.message, error?.statusCode, error))
  }
}

const getListNotify = async (req, res, next) => {
  try {
    const { _id: userId } = req.jwtDecoded
    const listNotify = await invitationService.getListNotify(userId)
    res.status(StatusCodes.OK).json(listNotify)
  } catch (error) {
    next(new ApiError(error.message, error?.statusCode, error))
  }
}

const updateInvitationStatus = async (req, res, next) => {
  try {
    const { email } = req.jwtDecoded
    const invitation = await invitationService.updateInvitationStatus(email, req.body)
    res.status(StatusCodes.OK).json(invitation)
  } catch (error) {
    next(new ApiError(error.message, error?.statusCode, error))
  }
}

export const invitationController = {
  invite,
  getListNotify,
  updateInvitationStatus
}
