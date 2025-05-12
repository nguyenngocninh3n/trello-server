import { ALLOW_COMMON_FILE_TYPES, LIMIT_COMMON_FILE_SIZE } from '@utils/validators'
import multer from 'multer'

function fileFilter(req, file, callback) {
  if (!file) callback(null, false)
  if (!ALLOW_COMMON_FILE_TYPES.includes(file.mimetype)) {
    callback('File type is invalid. Only accept jpg, jpeg and png', null)
  }
  callback(null, true)
}

const upload = multer({ fileFilter, limits: { fileSize: LIMIT_COMMON_FILE_SIZE } })

export const multerUploadFileMiddleware = {
  upload
}
