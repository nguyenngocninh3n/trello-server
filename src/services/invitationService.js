import { invitationModel } from '@models/invitationModel'

const { boardModel } = require('@models/boardModel')
const { userModel } = require('@models/userModel')
const { default: ApiError } = require('@utils/ApiError')
const { StatusCodes } = require('http-status-codes')

const invite = async (inviterId, reqBody) => {
  const { boardId, invitedEmail } = reqBody
  const inviterUser = await userModel.findOneById(inviterId)
  const invitedUser = await userModel.findOneByEmail(invitedEmail)
  const board = await boardModel.findById(boardId)
  if (!inviterUser || !invitedUser || !board) {
    throw new ApiError('Invitation is invalid', StatusCodes.NOT_ACCEPTABLE)
  }
  const customInvitationData = {
    // inviterEmail: inviterUser.email,
    // invitedEmail,
    inviterId: inviterUser._id.toString(),
    invitedId: invitedUser._id.toString(),
    boardId,
    type: invitationModel.INVITATION_TYPE.BOARD
  }
  const insert = await invitationModel.invite(customInvitationData)
  const getInvitation = invitationModel.findInvitationById(insert.insertedId)
  return getInvitation
}

const getListNotify = async (userId) => {
  const listNotify = await invitationModel.getList(userId)
  return listNotify
}

const updateInvitationStatus = async (userEmail, reqBody) => {
  const { invitationId, status } = reqBody
  const invitation = await invitationModel.findOneById(invitationId)
  if (!invitation) throw new ApiError('Not found Invitation', StatusCodes.NOT_FOUND)
  if (invitation.invitedEmail === userEmail) throw new ApiError('Not found Invitation', StatusCodes.NOT_FOUND)
  if (!Object.values(invitationModel.INVITATION_STATUS).includes(status))
    throw new ApiError('Status is invalid', StatusCodes.NOT_FOUND)
  const updated = await invitationModel.update(invitationId, status)
  const getInvitation = await invitationModel.findInvitationById(updated._id)
  if (status === invitationModel.INVITATION_STATUS.ACCEPTED) {
    await boardModel.pushMemberToBoard(getInvitation.boardId, getInvitation.invitedId)
  }
  return getInvitation
}

export const invitationService = {
  invite,
  getListNotify,
  updateInvitationStatus
}
