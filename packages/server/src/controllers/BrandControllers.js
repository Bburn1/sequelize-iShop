import createError from 'http-errors'

import { Brand, sequelize } from '../db/models'

class BrandController {
  async getBrands(req, res, next) {
    try {
      const allBrands = await Brand.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      })
      if (allBrands) {
        console.log('Result found' + JSON.stringify(allBrands, null, 2))
        res.status(200).json(allBrands)
      } else {
        next(createError(404, 'Brand not found'))
      }
    } catch (error) {
      next(error)
      console.log(error.massage)
    }
  }

  async getOneBrand(req, res, next) {
    try {
      const id = req.params.id
      const BrandByPk = await Brand.findByPk(id, {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      })

      if (BrandByPk) {
        console.log('Result found' + JSON.stringify(BrandByPk, null, 2))
        res.status(200).json(BrandByPk)
      } else {
        next(createError(404, 'Brand not found'))
      }
    } catch (error) {
      next(error)

      console.log(error.massage)
    }
  }

  async createBrand(req, res, next) {
    const t = await sequelize.transaction()

    try {
      const body = req.body
      const createdBrand = await Brand.create(body, { transaction: t })

      if (createdBrand) {
        console.log(JSON.stringify(createdBrand, null, 2))
        res.status(200).json(createdBrand)
      } else {
        next(createError(404, 'Brand not found'))
      }
      t.commit()
    } catch (error) {
      t.rollback()
      next(error)

      console.log(error.massage)
    }
  }

  async updateBrand(req, res, next) {
    const t = await sequelize.transaction()

    try {
      const body = req.body
      const updatedBrand = await Brand.update(body, {
        transaction: t,
        where: {
          id: body.id,
        },
        returning: true,
        raw: true,
      })
      if (updatedBrand) {
        console.log(JSON.stringify(updatedBrand, null, 2))
        res.status(200).json(updatedBrand)
      } else {
        next(createError(404, 'Brand not found'))
      }
      t.commit()
    } catch (error) {
      t.rollback()

      next(error)

      console.log(error.massage)
    }
  }

  async changeBrand(req, res, next) {
    const t = await sequelize.transaction()

    try {
      const {
        params: { id },
        body,
      } = req
      const [rowsCount, [updatedBrand]] = await Brand.update(body, {
        raw: true,
        transaction: t,
        returning: true,
        where: { id },
      })

      if (rowsCount > 0) {
        console.log(updatedBrand)
        res.status(200).json(updatedBrand)
      } else {
        next(createError(404, 'Brand not found'))
      }
      t.commit()
    } catch (error) {
      t.rollback()

      next(error)

      console.log(error.massage)
    }
  }

  async deleteBrand(req, res, next) {
    const t = await sequelize.transaction()

    try {
      const id = req.params.id

      const deleteBrand = await Brand.destroy({ where: { id } })

      if (deleteBrand) {
        res.status(200).json(deleteBrand)
      } else {
        next(createError(404, 'Brand not found'))
      }
      t.commit()
    } catch (error) {
      t.rollback()

      next(error)

      console.log(error.massage)
    }
  }
}

export default new BrandController()
