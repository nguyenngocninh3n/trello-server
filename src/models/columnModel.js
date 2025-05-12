import { GET_DB } from '@configs/mongodb'
import { generateObjectId } from '@utils/generateObjectId'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '@utils/validators'
import Joi from 'joi'
import { ObjectId } from 'mongodb'

const COLUMN_COLLECTION_NAME = 'columns'
const COLUMN_COLLECTION_SCHEMA = Joi.object({
  boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  title: Joi.string().required().min(3).max(50).trim().strict(),
  description: Joi.string().optional().min(3).max(256).trim().strict(),
  cardOrderIds: Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)).default([]),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const INVALID_UPDATE_FIELDS = ['boardId', 'createdAt']

const validateColumn = async (data) => {
  return await COLUMN_COLLECTION_SCHEMA.validateAsync(data)
}

const createNewColumn = async (data) => {
  try {
    const newColumn = await GET_DB().collection(COLUMN_COLLECTION_NAME).insertOne(data)
    return newColumn
  } catch (error) {
    throw error
  }
}

const updateColumn = async (columnId, updatedData) => {
  Object.keys(updatedData).forEach((keyname) => {
    if (INVALID_UPDATE_FIELDS.includes(keyname)) {
      delete updatedData[keyname]
    }
  })
  if (updatedData.cardOrderIds) {
    updatedData.cardOrderIds = updatedData.cardOrderIds.map((cardId) => ObjectId.createFromHexString(cardId.toString()))
  }
  await GET_DB()
    .collection(COLUMN_COLLECTION_NAME)
    .updateOne({ _id: ObjectId.createFromHexString(columnId.toString()) }, { $set: updatedData })
}

const findById = async (id) => {
  const getColumn = await GET_DB()
    .collection(COLUMN_COLLECTION_NAME)
    .findOne({ _id: ObjectId.createFromHexString(id.toString()) })
  return getColumn
}

const pushToCardIds = async (card) => {
  try {
    const updatedColumn = await GET_DB()
      .collection(COLUMN_COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: card.columnId },
        {
          $push: {
            cardOrderIds: ObjectId.createFromHexString(card._id.toString())
          }
        },
        { returnDocument: 'after' }
      )
    return updatedColumn
  } catch (error) {
    throw new Error(error)
  }
}

const deleteColumn = async (columnId) => {
  const deletedColumn = await GET_DB()
    .collection(COLUMN_COLLECTION_NAME)
    .deleteOne({ _id: generateObjectId(columnId) })
  return deletedColumn
}

export const columnModel = {
  COLUMN_COLLECTION_NAME,
  COLUMN_COLLECTION_SCHEMA,
  createNewColumn,
  updateColumn,
  findById,
  validateColumn,
  pushToCardIds,
  deleteColumn
}
