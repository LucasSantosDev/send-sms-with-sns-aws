import { SNS } from '@aws-sdk/client-sns'

export type SNSSendSMS = {
  sns: SNS
  Message: string
  PhoneNumber: string
}

export default async function sendSMS({
  sns,
  Message,
  PhoneNumber,
}: SNSSendSMS) {
  await sns.publish({
    Message,
    PhoneNumber,
  })
}
