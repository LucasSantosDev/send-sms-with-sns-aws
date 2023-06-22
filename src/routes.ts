import { SNS, SNSClientConfig } from '@aws-sdk/client-sns'
import { Router } from 'express'
import awsConfig from './config/awsConfig'
import sendSMS, { SNSSendSMS } from './utils/SNS'

const router = Router()

router.post('/send-sms', async (req, res) => {
  if (!req.body?.PhoneNumber) {
    return res.status(400).json({ message: 'Necessário número de telefone' })
  }

  if (!req.body?.Message) {
    return res
      .status(400)
      .json({ message: 'Necessário mensagem a ser enviada' })
  }

  const { PhoneNumber, Message } = req.body

  const sns = new SNS({
    apiVersion: '2010-03-31',
    credentials: awsConfig,
  } as SNSClientConfig)

  await sendSMS({
    sns,
    PhoneNumber,
    Message,
  } as SNSSendSMS)

  return res.status(201).json({ message: 'SMS enviado!' })
})

export default router
