const Order = require("../models/Order")

exports.placeOrder = async (req, res) => {
    try {
        const { items, paymentMethod, shippingAddress, totalPrice } = req.body
        if (!items || items.length === 0) {
            return res.status(500).json({ message: 'No items in order' })
        }
        const newOrder = new Order({
            items: items.map((item) => ({
                productId: item.productId,
                name: item.name,
                image: item.image,
                price: item.price,
                quantity: item.quantity,
                size: item.size,
                color: item.color
            })),
            user: req.user.id,
            shippingAddress,
            paymentMethod,
            totalPrice
        })
        const savedOrder = await newOrder.save()
        res.status(201).json({
            message: 'Order placed successfully',
            order: savedOrder
        });
    } catch (error) { 
        res.status(500).json({ message: error.message })
    }
}

exports.getMyOrders = async (req, res) => {
    try {
        const order = Order.find({ user: req.user.id }).sort({ createdAt: -1 }) //latest first
        res.status(200).json({
            myOrders: order,
            count: order.length
        })
    } catch (error) {
        res.status(500).json({ message: 'failed to get your orders', error: error.message })
    }
}

exports.getSingleOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email')
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        const isOwner = order.user._id.toString() === req.user.id
        const isAdmin = req.user.role === 'admin' || req.user.role === 'superadmin';
        if(!isOwner || !isAdmin) {
            return res.status(403).json({ message: 'Access denied' });
        }
        res.status(200).json({ order });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch order', error: error.message });
    }
}

exports.getAllOrders = async (req, res) => { 
    try {
        const orders = await Order.find()
          .populate('user', 'name email')
          .sort({ createdAt: -1 });
    
        res.status(200).json({
          count: orders.length,
          orders
        });
      } catch (err) {
        res.status(500).json({ message: 'Failed to fetch all orders', error: err.message });
      }
};

exports.updateOrderStatus = async (req, res) => {
    try {
      const { status } = req.body;
      const allowedStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
  
      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }
  
      const order = await Order.findById(req.params.id);
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      order.status = status;
  
      // Track timestamps based on status
      if (status === 'shipped') order.shippedAt = new Date();
      if (status === 'delivered') order.deliveredAt = new Date();
      if (status === 'cancelled') order.cancelledAt = new Date();
  
      await order.save();
  
      res.status(200).json({ message: 'Order status updated', order });
    } catch (err) {
      res.status(500).json({ message: 'Failed to update order status', error: err.message });
    }
  };
  