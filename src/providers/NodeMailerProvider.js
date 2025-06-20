import { env } from '@configs/environment'
import nodemailer from 'nodemailer'

const subject = 'Verify your trello web account!'
const generateVerificationEmailContent = (recipientEmail, verifyToken) => {
  const customPath = env.BUILD_MODE === 'production' ? env.PRODUCTION_CLIENT_HOST : env.LOCAL_CLIENT_HOST
  return `
  <h1>Hi ${recipientEmail}</h1>
  You has already register an account in trello web with email ${recipientEmail}. 
  Please click to this url ${customPath}/verify?email=${recipientEmail}&token=${verifyToken} to active your account.
  `
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: env.NODEMAILER_EMAIL,
    pass: env.NODEMAILER_APP_PASSWORD
  }
})

const sendEmail = async (recipientEmail, verifyToken) => {
  try {
    const info = await transporter.sendMail({
      from: `"Trello Web" <${env.NODEMAILER_EMAIL}>`,
      to: recipientEmail,
      subject,
      html: generateVerificationEmailContent(recipientEmail, verifyToken)
    })

    console.log('Email sent successfully:', info.response)
  } catch (error) {
    console.error('Error sending email:', error)
  }
}

export const NodeMailerProvider = {
  sendEmail
}
