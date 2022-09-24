import createError from 'http-errors'

import { Category,  sequelize } from '../db/models'

class CategoryController {
  async getCategorys(req, res, next) {
    try {
      const allCategorys = await Category.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      })
      if (allCategorys) {
        console.log('Result found' + JSON.stringify(allCategorys, null, 2))
        res.status(200).json(allCategorys)
      } else {
        
        next(createError(404, 'Category not found'))
      }
    } catch (error) {
      next(error)
      console.log(error.massage)
    }
  }

  async getOneCategory(req, res, next) {
    try {
      const id = req.params.id
      const CategoryByPk = await Category.findByPk(id, {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      })

      if (CategoryByPk) {
        console.log('Result found' + JSON.stringify(CategoryByPk, null, 2))
        res.status(200).json(CategoryByPk)
      } else {
        
        next(createError(404, 'Category not found'))
      }
    } catch (error) {
      next(error)

      console.log(error.massage)
    }
  }

  async createCategory(req, res, next) {
    const t = await sequelize.transaction()

    try {
      const body = req.body
      const createdCategory = await Category.create(body, { transaction: t })

      if (createdCategory) {
        console.log(JSON.stringify(createdCategory, null, 2))
        res.status(200).json(createdCategory)
      } else {
        
        next(createError(404, 'Category not found'))
      }
      t.commit()
    } catch (error) {
      t.rollback()
      next(error)

      console.log(error.massage)
    }
  }

  async updateCategory(req, res, next) {
    const t = await sequelize.transaction()

    try {
      const body = req.body
      const updatedCategory = await Category.update(body, {
        transaction: t,
        where: {
          id: body.id,
        },
        returning: true,
        raw: true,
      })
      if (updatedCategory) {
        console.log(JSON.stringify(updatedCategory, null, 2))
        res.status(200).json(updatedCategory)
      } else {
        
        next(createError(404, 'Category not found'))
      }
      t.commit()
    } catch (error) {
      t.rollback()

      next(error)

      console.log(error.massage)
    }
  }

  async changeCategory(req, res, next) {
    const t = await sequelize.transaction()

    try {
      const {
        params: { id },
        body,
      } = req
      const [rowsCount, [updatedCategory]] = await Category.update(body, {
        raw: true,
        transaction: t,
        returning: true,
        where: { id },
      })

      if (rowsCount > 0) {
        console.log(updatedCategory)
        res.status(200).json(updatedCategory)
      } else {
        
        next(createError(404, 'Category not found'))
      }
      t.commit()
    } catch (error) {
      t.rollback()

      next(error)

      console.log(error.massage)
    }
  }

  async deleteCategory(req, res, next) {
    const t = await sequelize.transaction()

    try {
      const id = req.params.id

      const deleteCategory = await Category.destroy({ where: { id } })

      if (deleteCategory) {
        res.status(200).json(deleteCategory)
      } else {
        
        next(createError(404, 'Category not found'))
      }
      t.commit()
    } catch (error) {
      t.rollback()

      next(error)

      console.log(error.massage)
    }
  }
}

export default new CategoryController()
