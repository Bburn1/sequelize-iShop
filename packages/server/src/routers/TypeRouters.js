import { Router } from 'express'
//================================
import typeControllers from '../controllers/TypeControllers'

const TypeRouter = new Router()

TypeRouter.route('/')
  .get(typeControllers.getTypes)
  .post(typeControllers.createType)
  .put(typeControllers.updateType)

TypeRouter.route('/:id')
  .get(typeControllers.getOneType)
  .patch(typeControllers.changeType)
  .delete(typeControllers.deleteType)

export default TypeRouter
