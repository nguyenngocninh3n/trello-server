import { boardModel } from '@models/boardModel'
import { cardModel } from '@models/cardModel'
import { columnModel } from '@models/columnModel'
import { ObjectId } from 'mongodb'

const createNewColumn = async (reqBody) => {
  try {
    const validatedData = await columnModel.validateColumn(reqBody)
    const customData = {
      ...validatedData,
      boardId: ObjectId.createFromHexString(validatedData.boardId.toString())
    }
    const newColumn = await columnModel.createNewColumn(customData)
    const getColumn = await columnModel.findById(newColumn.insertedId)
    if (getColumn) {
      getColumn.cards = []
      await boardModel.pushToColumnIds(getColumn)
    }
    return getColumn
  } catch (error) {
    throw error
  }
}

const updateColumn = async (userId, columnId, boardId, updatedData) => {
  await columnModel.updateColumn(columnId, updatedData)
  const updatedBoard = await boardModel.getDetails(userId, boardId)
  return updatedBoard
}

const moveCards = async ({ cardId, preColumnId, preColumnCardOrderIds, nextColumnId, nextColumnCardOrderIds }) => {
  const updatedPre = await columnModel.updateColumn(preColumnId, {
    cardOrderIds: preColumnCardOrderIds
  })
  const updatedNext = await columnModel.updateColumn(nextColumnId, {
    cardOrderIds: nextColumnCardOrderIds
  })

  const updatedCard = await cardModel.updateCard(cardId, { columnId: nextColumnId })
}

const deleteColumn = async (columnId) => {
  const getColumn = await columnModel.findById(columnId)
  if (getColumn) {
    await columnModel.deleteColumn(columnId)
    await boardModel.deleteColumn(getColumn.boardId, columnId)
    await cardModel.deleteManyByColumnId(columnId)
  } else {
    throw new Error('Column is not exist')
  }
}

export const columnService = {
  createNewColumn,
  updateColumn,
  moveCards,
  deleteColumn
}
