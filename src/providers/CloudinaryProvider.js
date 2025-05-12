import { env } from '@configs/environment'
import { v2 as cloudinary } from 'cloudinary'
import streamifier from 'streamifier'
cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET
})

const uploadFile = (folderName, bufferFile) => {
  return new Promise((resolve, reject) => {
    const updatedFile = cloudinary.uploader.upload_stream({ folder: folderName }, (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
    streamifier.createReadStream(bufferFile).pipe(updatedFile)
  })
}

export const CloudinaryProvider = {
  uploadFile
}
