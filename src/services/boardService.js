import { boardModel } from '@models/boardModel'
import { DEFAULT_ITEMS_PER_PAGE_GETBOARDS, DEFAULT_PAGE_GETBOARDS } from '@utils/constant'
import { cloneDeep } from 'lodash'

const transformDataBeforeSend = (boardData) => {
  const customBoard = cloneDeep(boardData)
  customBoard?.columns?.forEach((column) => {
    column.cards = customBoard?.cards?.filter((card) => card.columnId.toString() === column._id.toString())
  })
  delete customBoard?.cards
  return customBoard
}

const createNewBoard = async (userId, reqBody) => {
  try {
    const customBoard = { ...reqBody }
    const validatedData = await boardModel.validateBoard(customBoard)
    const newBoard = await boardModel.createNewBoard(userId, validatedData)
    const getBoard = await boardModel.findById(newBoard.insertedId)
    return getBoard
  } catch (error) {
    throw error
  }
}

const getDetails = async (userId, boardID) => {
  try {
    const getDetails = await boardModel.getDetails(userId, boardID)
    const customDetails = transformDataBeforeSend(getDetails)
    return customDetails
  } catch (error) {
    throw error
  }
}
const update = async (userId, boardId, updatedData) => {
  await boardModel.update(userId, boardId, updatedData)
  const getDetails = await boardModel.getDetails(userId, boardId)
  const transfromData = transformDataBeforeSend(getDetails)
  return transfromData
}

const getBoards = async (userId, page, itemsPerPage, searchQuery) => {
  if (!page) page = DEFAULT_PAGE_GETBOARDS
  if (!itemsPerPage) itemsPerPage = DEFAULT_ITEMS_PER_PAGE_GETBOARDS
  const data = await boardModel.getBoards(userId, page, itemsPerPage, searchQuery)
  return data
}

export const boardService = {
  createNewBoard,
  getDetails,
  update,
  getBoards
}
