import createError from 'http-errors'

import {
 Order,
 Customer,
  sequelize,
} from '../db/models'

class OrderController {
  async getOrders(req, res, next) {
    try {
      const allOrders = await Order.findAll({
        include: [
          {
            model: Customer,
            attributes: ['id', 'name'],
            required: true,
          },
          
        ],
        attributes: ['id','code', 'date', 'paid'],
      })

      if (allOrders) {
        console.log('Result found' + JSON.stringify(allOrders, null, 2))
        res.status(200).json(allOrders)
      } else {
        
        next(createError(404, 'Order not found'))
      }
    } catch (error) {
      next(error)
      console.log(error.massage)
    }
  }

  async getOneOrder(req, res, next) {
    try {
      const id = req.params.id
      const OrderByPk = await Order.findByPk(id, {
        include: [
          {
            model: Customer,
            attributes: ['id', 'name'],
            required: true,
          },
        ],
        attributes: ['id', 'code', 'date', 'paid'],
      })
      
      if (OrderByPk) {
        console.log('Result found' + JSON.stringify(OrderByPk, null, 2))
        res.status(200).json(OrderByPk)
      } else {
        next(createError(404, 'Order not found'))
      }
    } catch (error) {
      next(error)

      console.log(error.massage)
    }
  }

  async createOrder(req, res, next) {
    const t = await sequelize.transaction()

    try {
      const body = req.body
      const createdOrder = await Order.create(body, { transaction: t })

      if (createdOrder) {
        console.log(JSON.stringify(createdOrder, null, 2))
        res.status(200).json(createdOrder)
      } else {
        next(createError(404, 'Order not found'))
      }
      t.commit()
    } catch (error) {
      t.rollback()
      next(error)

      console.log(error.massage)
    }
  }

  async updateOrder(req, res, next) {
    const t = await sequelize.transaction()

    try {
      const body = req.body
      const updatedOrder = await Order.update(body, {
        transaction: t,
        where: {
          id: body.id,
        },
        returning: true,
        raw: true,
      })
      if (updatedOrder) {
        console.log(JSON.stringify(updatedOrder, null, 2))
        res.status(200).json(updatedOrder)
      } else {
        next(createError(404, 'Order not found'))
      }
      t.commit()
    } catch (error) {
      t.rollback()

      next(error)

      console.log(error.massage)
    }
  }

  async changeOrder(req, res, next) {
    const t = await sequelize.transaction()

    try {
      const {
        params: { id },
        body,
      } = req
      const [rowsCount, [updatedOrder]] = await Order.update(body, {
        raw: true,
        transaction: t,
        returning: true,
        where: { id },
      })

      if (rowsCount > 0) {
        console.log(updatedOrder)
        res.status(200).json(updatedOrder)
      } else {
        next(createError(404, 'Order not found'))
      }
      t.commit()
    } catch (error) {
      t.rollback()

      next(error)

      console.log(error.massage)
    }
  }

  async deleteOrder(req, res, next) {
    const t = await sequelize.transaction()

    try {
      const id = req.params.id

      const deleteOrder = await Order.destroy({ where: { id } })

      if (deleteOrder) {
        res.status(200).json(deleteOrder)
      } else {
        next(createError(404, 'Order not found'))
      }
      t.commit()
    } catch (error) {
      t.rollback()

      next(error)

      console.log(error.massage)
    }
  }
}

export default new OrderController()
