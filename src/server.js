import { corsOptions } from '@configs/cors'
import { env } from '@configs/environment'
import { CONNECT_DB } from '@configs/mongodb'
import { errorHanler } from '@middlewares/errorHandler'
import { API_V1 } from '@routes/v1'
import exitHook from 'async-exit-hook'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import http from 'http'
import socketIo from 'socket.io'
const START_SERVER = () => {
  const app = express()
  app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store')
    next()
  })
  app.use(cookieParser())
  app.use(cors(corsOptions))
  app.use(express.json())

  app.use('/v1', API_V1)
  app.use(errorHanler)
  const server = http.createServer(app, cors(corsOptions))
  const socketServer = socketIo(server, { cors:corsOptions })
  socketServer.on('connection', (socket) => {
    socket.on('FE_INVITATION_BOARD_UPDATE', (data) => {
      socket.broadcast.emit('BE_INVITATION_BOARD_UPDATE', data)
    })
    socket.on('FE_INVITATION_BOARD_INVITE', (data) => {
      socket.broadcast.emit('BE_INVITATION_BOARD_INVITE', data)
    })
  })

  if (env.BUILD_MODE === 'dev') {
    server.listen(env.LOCAL_PORT, env.LOCAL_HOST, () => {
      console.log(`server is running at: http://${env.LOCAL_HOST}:${env.LOCAL_PORT}`)
      exitHook(() => console.log('exit server'))
    })
  } else if (env.BUILD_MODE === 'production') {
    server.listen(env.PRODUCTION_PORT, () => {
      console.log(`server is running at: http://${env.PRODUCTION_HOST}:${env.PRODUCTION_PORT}`)
      exitHook(() => console.log('exit server'))
    })
  }
}
console.log('start')
CONNECT_DB()
  .then(() => console.log('Connect to database successfully'))
  .then(() => START_SERVER())
  .catch((error) => console.log('error when start server: ', error))
