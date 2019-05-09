import express from 'express'
import config from './config'
import renderer from './renderer'
import routes from './routes'
import error from './error'
import { promisify } from 'util'

const app = express()

app.render = promisify(app.render)
app.locals = config.locals

app.engine('html', renderer)
app.set('views', 'src/views')
app.set('view engine', 'html')
app.use(express.static('public'))
app.use(routes)
app.use(error)

app.listen(config.port, () => {
  console.log('🚀 Server launch on port', config.port)
})
