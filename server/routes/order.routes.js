const express = require('express')
const { verifyToken, requireRole } = require('../middlewares/auth')
const { placeOrder, getMyOrders, getSingleOrder, getAllOrders, updateOrderStatus } = require('../controllers/order.controller')

const orderRouter = express.Router()


//User Routes
orderRouter.post('/', verifyToken, placeOrder)
orderRouter.get('/my', verifyToken, getMyOrders)
orderRouter.get('/:id', verifyToken, getSingleOrder)

//Admin Routes
orderRouter.get('/', verifyToken, requireRole('admin', 'superAdmin'), getAllOrders)
orderRouter.put('/:id/status', verifyToken, requireRole('admin', 'superadmin'), updateOrderStatus);


module.exports = orderRouter