import templateModel from '@models/templateModel'

const getAllTemplates = async (req, res) => {
  const templates = await templateModel.getAllTemplates()
  res.status(200).json(templates)
}

const initTemplateDB = async (req, res) => {
  await templateModel.initTemplateDB()
  res.status(200).json({ message: 'Template DB initialized' })
}

export const templateController = {
  getAllTemplates,
  initTemplateDB
}
