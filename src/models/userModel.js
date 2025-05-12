import { GET_DB } from '@configs/mongodb'
import { generateObjectId } from '@utils/generateObjectId'
import { EMAIL_RULE, EMAIL_RULE_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from '@utils/validators'
import Joi from 'joi'

const USER_ROLES = {
  CLIENT: 'client',
  ADMIN: 'admin'
}

const USER_COLLECTION_NAME = 'users'
const USER_COLLECTION_SCHEMA = Joi.object({
  email: Joi.string().required().pattern(EMAIL_RULE).message(EMAIL_RULE_MESSAGE),
  password: Joi.string().required().pattern(PASSWORD_RULE).message(PASSWORD_RULE_MESSAGE),
  username: Joi.string().trim().strict(),
  displayName: Joi.string().trim().strict(),
  avatar: Joi.string().default(null),
  role: Joi.string().valid(USER_ROLES.ADMIN, USER_ROLES.CLIENT).default(USER_ROLES.CLIENT),
  isActive: Joi.boolean().default(true),
  verifyToken: Joi.string(),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(Date.now),
  _destroy: Joi.boolean().default(false)
})

const INVALID_UPDATE_FIELDS = ['_id', 'email', 'username', 'createdAt']

const validateBeforeCreate = async (data) => {
  return await USER_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNewUser = async (userInfo) => {
  const validateData = await validateBeforeCreate(userInfo)
  const createdUser = GET_DB().collection(USER_COLLECTION_NAME).insertOne(validateData)
  return createdUser
}

const findOneById = async (userId) => {
  const getUser = await GET_DB()
    .collection(USER_COLLECTION_NAME)
    .findOne({ _id: generateObjectId(userId) })
  return getUser
}
const findOneByEmail = async (email) => {
  const getUser = await GET_DB().collection(USER_COLLECTION_NAME).findOne({ email })
  return getUser
}

const login = async (email, bcryptPassword) => {
  const getUser = await GET_DB().collection(USER_COLLECTION_NAME).findOne({ email, password: bcryptPassword })
  return getUser
}

const update = async (userId, updateData) => {
  Object.keys(update).forEach((keyName) => {
    if (INVALID_UPDATE_FIELDS.includes(keyName)) {
      delete updateData[keyName]
    }
  })
  const updatedUser = await GET_DB()
    .collection(USER_COLLECTION_NAME)
    .findOneAndUpdate({ _id: generateObjectId(userId) }, { $set: updateData }, { returnDocument: 'after' })
  return updatedUser
}

export const userModel = {
  USER_COLLECTION_NAME,
  USER_COLLECTION_SCHEMA,
  USER_ROLES,
  createNewUser,
  findOneById,
  findOneByEmail,
  update,
  login
}
