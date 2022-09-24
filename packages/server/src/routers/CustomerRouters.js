import {Router} from 'express'

import customerControllers from '../controllers/CustomerControllers'

const customerRouter = new Router()


customerRouter.route('/')
.get(customerControllers.getCustomers)
.post(customerControllers.createCustomer)
.put(customerControllers.updateCustomer)

customerRouter.route('/:id')
  .get(customerControllers.getCustomerByPk)
  .patch(customerControllers.changeCustomer)
  .delete(customerControllers.deleteCustomer)


export default customerRouter