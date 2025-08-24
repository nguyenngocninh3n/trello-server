import { GET_DB } from '@configs/mongodb'
import { BOARD_TYPES } from '@utils/constant'
import { generateObjectId } from '@utils/generateObjectId'
import { pagingSkipValue } from '@utils/pagingSkipValue'
import slugify from '@utils/slugify'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '@utils/validators'
import Joi from 'joi'
import { cardModel } from './cardModel'
import { columnModel } from './columnModel'
import ApiError from '@utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { userModel } from './userModel'

const BOARD_COLLECTION_NAME = 'boards'

const BOARD_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().required().min(5).max(50).trim().strict(),
  description: Joi.string().optional().min(5).max(256).trim().strict(),
  slug: Joi.string().min(3).trim().strict(),
  type: Joi.string().required().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE).strict(),
  columnOrderIds: Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)).default([]),
  ownerIds: Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)).default([]),
  memberIds: Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)).default([]),
  labelId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).allow(null).default(null),
  isTemplate: Joi.boolean().default(false),
  copyLength: Joi.number().integer().min(0).default(0),
  viewLength: Joi.number().integer().min(0).default(0),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const validateBoard = async (data) => {
  return await BOARD_COLLECTION_SCHEMA.validateAsync(data)
}

const createNewBoard = async (userId, data) => {
  try {
    const insertData = { ...data, ownerIds: [generateObjectId(userId)], slug: slugify(data.title) }
    const newBoard = await GET_DB().collection(BOARD_COLLECTION_NAME).insertOne(insertData)
    return newBoard
  } catch (error) {
    throw error
  }
}

const getDetails = async (userId, boardId) => {
  try {
    const queryConditions = [
      {
        _id: generateObjectId(boardId),
        _destroy: false
      },
      {
        $or: [{ ownerIds: { $all: [generateObjectId(userId)] } }, { memberIds: { $all: [generateObjectId(userId)] } }]
      }
    ]

    const getDetails = await GET_DB()
      .collection(BOARD_COLLECTION_NAME)
      .aggregate([
        {
          $match: {
            $and: queryConditions
          }
        },
        {
          $lookup: {
            from: columnModel.COLUMN_COLLECTION_NAME,
            localField: '_id',
            foreignField: 'boardId',
            as: 'columns'
          }
        },
        {
          $lookup: {
            from: cardModel.CARD_COLLECTION_NAME,
            localField: '_id',
            foreignField: 'boardId',
            as: 'cards'
          }
        },
        {
          $lookup: {
            from: userModel.USER_COLLECTION_NAME,
            localField: 'ownerIds',
            foreignField: '_id',
            as: 'owners',
            pipeline: [{ $project: { password: 0, verifyToken: 0 } }]
          }
        },
        {
          $lookup: {
            from: userModel.USER_COLLECTION_NAME,
            localField: 'memberIds',
            foreignField: '_id',
            as: 'members',
            pipeline: [{ $project: { password: 0, verifyToken: 0 } }]
          }
        }
      ])
      .toArray()
    if (!getDetails[0]) {
      throw new ApiError('Not Found!', StatusCodes.NOT_FOUND)
    }
    return getDetails[0]
  } catch (error) {
    throw error
  }
}

const update = async (userId, boardId, updateData) => {
  const updatedBoard = await GET_DB()
    .collection(BOARD_COLLECTION_NAME)
    .updateOne({ _id: generateObjectId(boardId) }, { $set: updateData })
}

const findById = async (boardId) => {
  const getBoard = await GET_DB()
    .collection(BOARD_COLLECTION_NAME)
    .findOne({ _id: generateObjectId(boardId) })
  return getBoard
}

const pushToColumnIds = async (column) => {
  try {
    const updatedColumn = await GET_DB()
      .collection(BOARD_COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: generateObjectId(column.boardId) },
        {
          $push: {
            columnOrderIds: generateObjectId(column._id)
          }
        },
        { returnDocument: 'after' }
      )
    return updatedColumn
  } catch (error) {
    throw error
  }
}

const deleteColumn = async (boardId, columnId) => {
  const deletedBoard = await GET_DB()
    .collection(BOARD_COLLECTION_NAME)
    .findOneAndUpdate({ _id: generateObjectId(boardId) }, { $pull: { columnOrderIds: generateObjectId(columnId) } })
  return deletedBoard
}

const getBoards = async (userId, page, itemsPerPage, searchQuery) => {
  const queryConditions = [
    {
      _destroy: false
    },
    {
      $or: [{ ownerIds: { $all: [generateObjectId(userId)] } }, { memberIds: { $all: [generateObjectId(userId)] } }]
    }
  ]

  if (searchQuery) {
    Object.keys(searchQuery).forEach((key) => {
      queryConditions.push({ [key]: { $regex: new RegExp(searchQuery[key], 'i') } })
    })
  }
  console.log('query conditions: ', queryConditions)

  const query = await GET_DB()
    .collection(BOARD_COLLECTION_NAME)
    .aggregate(
      [
        { $match: { $and: queryConditions } },
        { $sort: { title: 1 } },
        {
          $facet: {
            queryBoards: [{ $skip: pagingSkipValue(page, itemsPerPage) }, { $limit: itemsPerPage }],
            queryTotalBoards: [{ $count: 'countedAllBoards' }]
          }
        }
      ],
      { locate: 'en' }
    )
    .toArray()
  const result = query[0]
  return {
    boards: result.queryBoards || [],
    totalBoards: result.queryTotalBoards[0]?.countedAllBoards || 0
  }
}

const pushMemberToBoard = async (boardId, userId) => {
  await GET_DB()
    .collection(BOARD_COLLECTION_NAME)
    .updateOne(
      { _id: generateObjectId(boardId) },
      {
        $push: {
          memberIds: generateObjectId(userId)
        }
      }
    )
}

export const boardModel = {
  BOARD_COLLECTION_NAME,
  BOARD_COLLECTION_SCHEMA,
  validateBoard,
  createNewBoard,
  findById,
  getDetails,
  pushToColumnIds,
  update,
  deleteColumn,
  getBoards,
  pushMemberToBoard
}
