import {Router} from 'express'

import customerControllers from '../controllers/CustomerControllers'

const customerRouter = new Router()

import{upload} from '../middleware';



customerRouter.route('/')
.get(customerControllers.getCustomers)
.post(customerControllers.createCustomer)
.put(customerControllers.updateCustomer)

customerRouter.route('/:id')
  .get(customerControllers.getCustomerByPk)
  .patch(customerControllers.changeCustomer)
  .delete(customerControllers.deleteCustomer)

customerRouter.route('/:id/images')
  .patch(upload.uploadCustomerImage.single('customerImage'), customerControllers.addImage)

export default customerRouter