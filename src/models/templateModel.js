const Joi = require('joi')
const { columnModel } = require('./columnModel')
const { boardModel } = require('./boardModel')
const { cardModel } = require('./cardModel')
const { managementTemplate, kanbanTemplate } = require('data/template')
const { GET_DB } = require('@configs/mongodb')
const { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } = require('@utils/validators')
const TEMPLATE_COLLECTION_NAME = 'templates'

const TEMPLATE_COLLECTION_SCHEMA = boardModel.BOARD_COLLECTION_SCHEMA.keys({
  columns: Joi.array()
    .items(
      columnModel.COLUMN_COLLECTION_SCHEMA.keys({
        cards: Joi.array().items(cardModel.CARD_COLLECTION_SCHEMA.required())
      })
    )
    .required()
})

const TEMPLATE_COLLECTION_CREATE_SCHEMA = Joi.object({
  ownerId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  templateData: TEMPLATE_COLLECTION_SCHEMA.required()
})

const validateTemplate = async (data) => {
  return await TEMPLATE_COLLECTION_SCHEMA.validateAsync(data)
}

const getAllTemplates = async () => {
  const db = await GET_DB()
  return db.collection(TEMPLATE_COLLECTION_NAME).find({}).toArray()
}

const initTemplateDB = async () => {
  const db = await GET_DB()
  await db.collection(TEMPLATE_COLLECTION_NAME).insertMany([managementTemplate, kanbanTemplate])
}
const templateModel = {
  getAllTemplates,
  initTemplateDB
}

module.exports = templateModel
