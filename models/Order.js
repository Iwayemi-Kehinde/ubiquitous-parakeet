const mongoose = require('mongoose')


const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        name: String,
        image: String,
        price: Number,
        quantity: Number,
        size: String,
        color: String
    }],
    shippingAddress: {
        addressLine: String,
        city: String,
        state: String,
        postalCode: String,
        country: String
    },
    paymentMethod: {
        type: String,
        enum: ['card', 'paypal', 'bank', 'cash'],
        default: 'card'
    },
    paymentResult: {
        id: String,
        status: String,
        update_time: String,
        email_address: String
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    deliveredAt: Date,
    shippedAt: Date,
    cancelledAt: Date,
    isPaid: {
        type: Boolean,
        default: false
    },
    paidAt: Date
}, {timestamps: true})

module.exports = mongoose.model('Order', OrderSchema)