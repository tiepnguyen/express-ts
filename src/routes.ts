import { Router, Application } from 'express'
import Home from './controllers/Home'
import About from './controllers/About'
import NotFound from './controllers/NotFound'
import Post from './controllers/Post'

const router = Router()
const routes: Route[] = [
  {
    path: '/about',
    controller: About,
  },
  {
    path: '/post',
    controller: Post,
  },
  {
    path: '/',
    controller: Home,
  },
  {
    path: '*',
    controller: NotFound,
  },
]

export default (app: Application) => {
  routes.map((route: Route) => {
    const controller = new route.controller(app)
    router.all(route.path, (req, res, next) => controller.main(req, res, next))
  })

  return router
}
