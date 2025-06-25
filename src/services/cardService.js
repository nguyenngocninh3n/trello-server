import { cardModel } from '@models/cardModel'
import { columnModel } from '@models/columnModel'
import ApiError from '@utils/ApiError'
import { CARD_ACTIONS } from '@utils/constant'
import { StatusCodes } from 'http-status-codes'
import { ObjectId } from 'mongodb'
import { CloudinaryProvider } from 'providers/CloudinaryProvider'

const createNewCard = async (reqBody) => {
  try {
    const validatedData = await cardModel.validateCard(reqBody)
    const customData = {
      ...validatedData,
      boardId: ObjectId.createFromHexString(validatedData.boardId),
      columnId: ObjectId.createFromHexString(validatedData.columnId)
    }
    const newCard = await cardModel.createNewCard(customData)
    const getCard = await cardModel.findById(newCard.insertedId)

    if (getCard) {
      await columnModel.pushToCardIds(getCard)
    }
    return getCard
  } catch (error) {
    throw error
  }
}

const update = async (cardId, cardCoverFile, updateData, userInfo) => {
  const { _id: userId, email: userEmail } = userInfo
  let card = {}
  console.log('card cover file: ', cardCoverFile)
  if (cardCoverFile) {
    const uploadFile = await CloudinaryProvider.uploadFile('cards', cardCoverFile.buffer)
    const customData = { ...update, cover: uploadFile.secure_url }
    card = await cardModel.updateCard(cardId, customData)
  } else if (updateData.commentToCard) {
    const customComment = {
      ...updateData.commentToCard,
      userEmail,
      userId,
      commentedAt: Date.now()
    }
    card = await cardModel.pushCommentToCard(cardId, customComment)
  } else if (updateData.action) {
    if (updateData.action === CARD_ACTIONS.ADD_MEMBER) {
      card = await cardModel.pushMemberToCard(cardId, updateData.memberId)
    } else if (updateData.action === CARD_ACTIONS.DELETE_MEMBER) {
      card = await cardModel.pushMemberToCard(cardId, updateData.memberId)
    } else {
      throw new ApiError('Invid action of card!', StatusCodes.BAD_REQUEST)
    }
  } else {
    card = await cardModel.updateCard(cardId, updateData)
  }
  return card
}

export const cardService = {
  createNewCard,
  update
}
