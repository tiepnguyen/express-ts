import { Router, Request, Response, ErrorRequestHandler } from 'express'
import Home from './controllers/Home'
import About from './controllers/About'
import NotFound from './controllers/NotFound'

const router = Router()
const routes: Route[] = [
  {
    path: '/about',
    controller: About,
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

routes.map((route: Route) => {
  const controller = new route.controller()
  router.all(route.path, controller.main)
})

export default router
