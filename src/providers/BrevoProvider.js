import { env } from '@configs/environment'
const brevo = require('@getbrevo/brevo')

let apiInstance = new brevo.TransactionalEmailsApi()
apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, env.BREVO_API_KEY)

const sendEmail = async (recipiantEmail, subject, content) => {
  let sendSmtpEmail = new brevo.SendSmtpEmail()
  sendSmtpEmail.sender = { name: env.BREVO_EMAIL_NAME, email: env.BREVO_EMAIL_ADDRESS }
  sendSmtpEmail.to = [{ email: recipiantEmail }]
  sendSmtpEmail.subject = subject
  sendSmtpEmail.htmlContent = content
  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data) {
      console.log('send mail verify successfully')
    },
    function (error) {
      console.error('error when send mail: ', error)
    }
  )
}

const sendVerifyEmail = async (recipiantEmail, verifyToken) => {
  const subject = 'Verify your trello web account!'
  const content = `
  <h1>Hi ${recipiantEmail}</h1>
  You has already register an account in trello web with email ${recipiantEmail}. 
  Please click to this url http://localhost:5173/verify?email=${recipiantEmail}&token=${verifyToken} to active your account.
  `
  await sendEmail(recipiantEmail, subject, content)
}
export const BrevoProvider = {
  sendEmail,
  sendVerifyEmail
}
