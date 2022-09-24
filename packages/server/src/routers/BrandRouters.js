import { Router } from 'express'
//================================
import brandControllers from '../controllers/BrandControllers'

const BrandRouter = new Router()

BrandRouter.route('/')
  .get(brandControllers.getBrands)
  .post(brandControllers.createBrand)
  .put(brandControllers.updateBrand)

BrandRouter.route('/:id')
  .get(brandControllers.getOneBrand)
  .patch(brandControllers.changeBrand)
  .delete(brandControllers.deleteBrand)

export default BrandRouter
