import { Router } from 'express'
//================================
import storeControllers from '../controllers/StoreControllers'

const StoreRouter = new Router()

StoreRouter.route('/')
  .get(storeControllers.getStores)
  .post(storeControllers.createStore)
  .put(storeControllers.updateStore)

StoreRouter.route('/:id')
  .get(storeControllers.getOneStore)
  .patch(storeControllers.changeStore)
  .delete(storeControllers.deleteStore)

export default StoreRouter
