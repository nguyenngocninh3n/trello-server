import express from 'express'
import { boardRoute } from './boardRoute'
import { cardRoute } from './cardRoute'
import { columnRoute } from './columnRoute'
import { userRoute } from './userRoute'
import { invitationRoute } from './invitationRoute'
const Router = express.Router()

Router.get('/', (req, res) => {
  res.send('<h1>Server is running </h1>')
})
Router.use('/boards', boardRoute)
Router.use('/cards', cardRoute)
Router.use('/columns', columnRoute)
Router.use('/users', userRoute)
Router.use('/invitations', invitationRoute)

export const API_V1 = Router
