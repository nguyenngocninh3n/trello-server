import { GET_DB } from '@configs/mongodb'
import { generateObjectId } from '@utils/generateObjectId'
import { EMAIL_RULE, EMAIL_RULE_MESSAGE, OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '@utils/validators'
import Joi from 'joi'
import { ObjectId } from 'mongodb'

const CARD_COLLECTION_NAME = 'cards'
const CARD_COLLECTION_SCHEMA = Joi.object({
  boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  columnId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),

  title: Joi.string().required().min(3).max(50).trim().strict(),
  description: Joi.string().default(null),
  cover: Joi.string().default(null),
  memberIds: Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)).default([]),
  comments: Joi.array()
    .items({
      userId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
      userEmail: Joi.string().pattern(EMAIL_RULE).message(EMAIL_RULE_MESSAGE),
      userAvatar: Joi.string(),
      useDisplayName: Joi.string(),
      content: Joi.string(),
      commentedAt: Joi.date().timestamp('javascript')
    })
    .default([]),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const validateCard = async (data) => {
  return await CARD_COLLECTION_SCHEMA.validateAsync(data)
}

const createNewCard = async (data) => {
  try {
    const newCard = await GET_DB().collection(CARD_COLLECTION_NAME).insertOne(data)
    return newCard
  } catch (error) {
    throw error
  }
}

const updateCard = async (userId, cardId, updatedData) => {
  if (updatedData['columnId']) {
    updatedData.columnId = ObjectId.createFromHexString(updatedData.columnId.toString())
  }
  updatedData['updatedAt'] = Date.now()

  const updatedCard = await GET_DB()
    .collection(CARD_COLLECTION_NAME)
    .findOneAndUpdate({ _id: generateObjectId(cardId) }, { $set: updatedData }, { returnDocument: 'after' })
  return updatedCard
}

const findById = async (id) => {
  const getCard = await GET_DB()
    .collection(CARD_COLLECTION_NAME)
    .findOne({ _id: ObjectId.createFromHexString(id.toString()) })
  return getCard
}

const deleteManyByColumnId = async (columnId) => {
  const deletedList = await GET_DB()
    .collection(CARD_COLLECTION_NAME)
    .deleteMany({ columnId: generateObjectId(columnId) })
  return deletedList
}

const pushCommentToCard = async (cardId, commentData) => {
  const updatedCard = await GET_DB()
    .collection(CARD_COLLECTION_NAME)
    .findOneAndUpdate(
      { _id: generateObjectId(cardId) },
      {
        $push: {
          comments: commentData
        }
      },
      { returnDocument: 'after' }
    )
  return updatedCard
}

const pushMemberToCard = async (cardId, memberId) => {
  const updatedCard = await GET_DB()
    .collection(CARD_COLLECTION_NAME)
    .findOneAndUpdate(
      { _id: generateObjectId(cardId) },
      { $push: { memberIds: generateObjectId(memberId) } },
      { returnDocument: 'after' }
    )
  return updatedCard
}

const pullMemberFromCard = async (cardId, memberId) => {
  const updatedCard = await GET_DB()
    .collection(CARD_COLLECTION_NAME)
    .findOneAndUpdate(
      { _id: generateObjectId(cardId) },
      { $pull: { memberIds: generateObjectId(memberId) } },
      { returnDocument: 'after' }
    )
  return updatedCard
}

export const cardModel = {
  CARD_COLLECTION_NAME,
  CARD_COLLECTION_SCHEMA,
  createNewCard,
  updateCard,
  findById,
  deleteManyByColumnId,
  validateCard,
  pushCommentToCard,
  pushMemberToCard,
  pullMemberFromCard
}
