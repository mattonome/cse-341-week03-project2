// models/item.js
const mongoose = require('mongoose');

// Define Item schema
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  quantity: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
  supplier: { type: String, required: true },
  inStock: { type: Boolean, default: true }
}, { timestamps: true });

// Export Item model
module.exports = mongoose.model('Item', itemSchema);
