import { templateController } from '@controllers/templateController'
import express from 'express'
const Router = express.Router()

Router.route('').get(templateController.getAllTemplates)
Router.route('/init').get(templateController.initTemplateDB)

export const templateRoute = Router