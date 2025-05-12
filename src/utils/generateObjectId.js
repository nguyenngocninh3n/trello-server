import { ObjectId } from 'mongodb'
export const generateObjectId = (id) => ObjectId.createFromHexString(id.toString())
