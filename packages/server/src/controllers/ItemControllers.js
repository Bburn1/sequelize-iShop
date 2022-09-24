import createError from 'http-errors';

import {Item, Type, Category, IModel, Brand, Store, Order,  sequelize } from  '../db/models';


class ItemController {

  async getItems(req, res, next) {
    try {
      const allItems = await Item.findAll({
        include: [
          {
            model: Category,
            attributes: ['id', 'title'],
            required: true,
          },
          {
            model: Type,
            attributes: ['id', 'title'],
            required: true,
          },
          {
            model: IModel,
            required: true,
            attributes: ['id', 'title'],
          },
          {
            model: Brand,
            attributes: ['id', 'title'],
            required: true,
          },
          {
            model: Store,
            attributes: ['id', 'title'],
            required: true,
          },
        ],
        attributes: ['id', 'price'],
      })

      if (allItems) {
        console.log('Result found' + JSON.stringify(allItems, null, 2))
        res.status(200).json(allItems)
      } else {
        next(createError(404, 'Item not found'))
      }
    } catch (error) {
      next(error)
      console.log(error.massage)
    }
  }

  async getOneItem(req, res, next) {
    try {
      const id = req.params.id
      const itemByPk = await Item.findByPk(id, {
        include: [
          {
            model: Category,
            attributes: ['id', 'title'],
            required: true,
          },
          {
            model: Type,
            attributes: ['id', 'title'],
            required: true,
          },
          {
            model: IModel,
            required: true,
            attributes: ['id', 'title'],
          },
          {
            model: Brand,
            attributes: ['id', 'title'],
            required: true,
          },
          {
            model: Store,
            attributes: ['id', 'title'],
            required: true,
          },
        ],
        attributes: ['id', 'price'],
      })
      if (itemByPk) {
        console.log('Result found' + JSON.stringify(itemByPk, null, 2))
        res.status(200).json(itemByPk)
      } else {
        next(createError(404, 'Item not found'))
      }
    } catch (error) {
      next(error)

      console.log(error.massage)
    }
  }

  async createItem(req, res, next) {
    const t = await sequelize.transaction()

    try {
      const body = req.body
      const createdItem = await Item.create(body, { transaction: t })

      if (createdItem) {
        console.log(JSON.stringify(createdItem, null, 2))
        res.status(200).json(createdItem)
      } else {
        next(createError(404, 'Item not found'))
      }
      t.commit()
    } catch (error) {
      t.rollback()
      next(error)

      console.log(error.massage)
    }
  }

  async updateItem(req, res, next) {
    const t = await sequelize.transaction()

    try {
      const body = req.body
      const updatedItem = await Item.update(body, {
        transaction: t,
        where: {
          id: body.id,
        },
        returning: true,
        raw: true,
      })
      if (updatedItem) {
        console.log(JSON.stringify(updatedItem, null, 2))
        res.status(200).json(updatedItem)
      } else {
        next(createError(404, 'Item not found'))
      }
      t.commit()
    } catch (error) {
      t.rollback()

      next(error)

      console.log(error.massage)
    }
  }

  async changeItem(req, res, next) {
    const t = await sequelize.transaction()

    try {
      const {
        params: { id },
        body,
      } = req
      const [rowsCount, [updatedItem]] = await Item.update(body, {
        raw: true,
        transaction: t,
        returning: true,
        where: { id },
      })

      if (rowsCount > 0) {
        console.log(updatedItem)
        res.status(200).json(updatedItem)
      } else {
        next(createError(404, 'Item not found'))
      }
      t.commit()
    } catch (error) {
      t.rollback()

      next(error)

      console.log(error.massage)
    }
  }

  async deleteItem(req, res, next) {
    const t = await sequelize.transaction()

    try {
      const id = req.params.id

      const deleteItem = await Item.destroy({ where: { id } })

      if (deleteItem) {
        res.status(200).json(deleteItem)
      } else {
        next(createError(404, 'Item not found'))
      }
      t.commit()
    } catch (error) {
      t.rollback()

      next(error)

      console.log(error.massage)
    }
  }
}

export default new ItemController