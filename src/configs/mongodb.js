import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from './environment'

let trelloDBClientInstance = null

const mongoDBClientInstance = new MongoClient(env.DATABASE_CONNECTION_STRING, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

export const CONNECT_DB = async () => {
  await mongoDBClientInstance.connect()
  trelloDBClientInstance = mongoDBClientInstance.db(env.DATABASE_NAME)
}

export const GET_DB = () => {
  if (trelloDBClientInstance) {
    return trelloDBClientInstance
  }
  throw new Error('Do not connect to any database')
}
