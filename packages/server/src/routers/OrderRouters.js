import { Router } from 'express'
//================================
import orderControllers from '../controllers/OrderControllers'

const OrderRouter = new Router()

OrderRouter
  .route('/')
  .get(orderControllers.getOrders)
  .post(orderControllers.createOrder)
  .put(orderControllers.updateOrder)

OrderRouter
  .route('/:id')
  .get(orderControllers.getOneOrder)
  .patch(orderControllers.changeOrder)
  .delete(orderControllers.deleteOrder)

export default OrderRouter
