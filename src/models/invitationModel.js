import { GET_DB } from '@configs/mongodb'
import { EMAIL_RULE, EMAIL_RULE_MESSAGE, OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '@utils/validators'
import Joi from 'joi'
import { userModel } from './userModel'
import { boardModel } from './boardModel'
import { generateObjectId } from '@utils/generateObjectId'

const INVITATION_TYPE = {
  BOARD: 'board'
}

const INVITATION_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected'
}

const INVITATION_COLLECTION_NAME = 'invitations'
const INVITATION_COLLECTION_SCHEME = Joi.object({
  boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  inviterId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  invitedId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  // inviterEmail: Joi.string().required().pattern(EMAIL_RULE).message(EMAIL_RULE_MESSAGE),
  // invitedEmail: Joi.string().required().pattern(EMAIL_RULE).message(EMAIL_RULE_MESSAGE),
  type: Joi.string()
    .valid(...Object.values(INVITATION_TYPE))
    .default(INVITATION_TYPE.BOARD),
  status: Joi.string()
    .valid(...Object.values(INVITATION_STATUS))
    .default(INVITATION_STATUS.PENDING),
  _destroy: Joi.boolean().default(false)
})

const findOneById = async (invitationId) => {
  return await GET_DB()
    .collection(INVITATION_COLLECTION_NAME)
    .findOne({ _id: generateObjectId(invitationId) })
}

const findInvitationById = async (invitationId) => {

  const result = await GET_DB()
    .collection(INVITATION_COLLECTION_NAME)
    .aggregate([
      {
        $match: {
          _id: generateObjectId(invitationId)
        }
      },
      {
        $lookup: {
          from: userModel.USER_COLLECTION_NAME,
          localField: 'inviterId',
          foreignField: '_id',
          as: 'inviter',
          pipeline: [{ $project: { password: 0, verifyToken: 0 } }]
        }
      },
      {
        $lookup: {
          from: userModel.USER_COLLECTION_NAME,
          localField: 'invitedId',
          foreignField: '_id',
          as: 'invited',
          pipeline: [{ $project: { password: 0, verifyToken: 0 } }]
        }
      },
      {
        $lookup: {
          from: boardModel.BOARD_COLLECTION_NAME,
          localField: 'boardId',
          foreignField: '_id',
          as: 'board',
          pipeline: [{ $project: { memberIds: 0, ownerIds: 0 } }]
        }
      }
    ])
    .toArray()

  const customResult = result.map((item) => ({
    ...item,
    inviter: item.inviter[0],
    invited: item.invited[0],
    board: item.board[0]
  }))
  return customResult[0]
}

const invite = async (data) => {
  const validatedData = await INVITATION_COLLECTION_SCHEME.validateAsync(data)
  const { inviterId, invitedId, boardId } = validatedData
  const invite = await GET_DB()
    .collection(INVITATION_COLLECTION_NAME)
    .insertOne({
      ...validatedData,
      invitedId: generateObjectId(invitedId),
      inviterId: generateObjectId(inviterId),
      boardId: generateObjectId(boardId)
    })
  return invite
}

const update = async (invitationId, status) => {
  const updated = await GET_DB()
    .collection(INVITATION_COLLECTION_NAME)
    .findOneAndUpdate({ _id: generateObjectId(invitationId) }, { $set: { status } }, { returnDocument: 'after' })
  return updated
}

const getList = async (userId) => {
  const queryConditions = [
    { $or: [{ invitedId: generateObjectId(userId) }, { inviterId: generateObjectId(userId) }] },
    { _destroy: false }
  ]
  const result = await GET_DB()
    .collection(INVITATION_COLLECTION_NAME)
    .aggregate([
      {
        $match: {
          $and: queryConditions
        }
      },
      {
        $lookup: {
          from: userModel.USER_COLLECTION_NAME,
          localField: 'inviterId',
          foreignField: '_id',
          as: 'inviter',
          pipeline: [{ $project: { password: 0, verifyToken: 0 } }]
        }
      },
      {
        $lookup: {
          from: userModel.USER_COLLECTION_NAME,
          localField: 'invitedId',
          foreignField: '_id',
          as: 'invited',
          pipeline: [{ $project: { password: 0, verifyToken: 0 } }]
        }
      },
      {
        $lookup: {
          from: boardModel.BOARD_COLLECTION_NAME,
          localField: 'boardId',
          foreignField: '_id',
          as: 'board',
          pipeline: [{ $project: { memberIds: 0, ownerIds: 0 } }]
        }
      }
    ])
    .toArray()

  const customResult = result.map((item) => ({
    ...item,
    inviter: item.inviter[0],
    invited: item.invited[0],
    board: item.board[0]
  }))
  return customResult
}

export const invitationModel = {
  INVITATION_TYPE,
  INVITATION_STATUS,
  INVITATION_COLLECTION_NAME,
  INVITATION_COLLECTION_SCHEME,
  invite,
  findOneById,
  findInvitationById,
  update,
  getList
}
