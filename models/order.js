// models/order.js
const mongoose = require('mongoose');

// Define Order schema
const orderSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  quantity: { type: Number, required: true, min: 1 },
  customer: { type: String, required: true },
  address: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], 
    default: 'pending' 
  },
  totalPrice: { type: Number, required: true, min: 0 },
  notes: { type: String, default: '' }
}, { timestamps: true });

// Export Order model
module.exports = mongoose.model('Order', orderSchema);
