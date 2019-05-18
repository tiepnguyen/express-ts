import dotenv from 'dotenv'

dotenv.config()

export default {
  port: process.env.PORT || 3000,
  locals: {
    baseUrl: '',
    siteTitle: 'Express Typescript',
  },
}
