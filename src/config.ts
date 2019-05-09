import dotenv from 'dotenv'

dotenv.config()

export default {
  port: process.env.SERVER_PORT,
  locals: {
    baseUrl: '',
    siteTitle: 'Express Typescript',
  },
}
