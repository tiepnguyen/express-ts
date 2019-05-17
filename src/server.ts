import express from 'express'
import config from './config'
import routes from './routes'
import error from './error'
import renderer from './renderer'
import { promisify } from 'util'

const app = express()

app.render = promisify(app.render)
app.locals = config.locals

app.engine('html', renderer)
app.set('view engine', 'html')
app.use(express.static('public'))
app.use(routes(app))
app.use(error)

app.listen(config.port, () => {
  console.log('🚀 Server launch on port', config.port, process.env.NODE_ENV || 'development')
})
