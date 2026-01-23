// controllers/orders.js
const Order = require('../models/order');
const mongoose = require('mongoose');

// Get all orders
const getAll = async (req, res) => {
  try {
    const orders = await Order.find().populate('itemId'); // include item details
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders', error: err.message });
  }
};

// Get single order
const getSingle = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid order ID' });
  }
  try {
    const order = await Order.findById(req.params.id).populate('itemId');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching order', error: err.message });
  }
};

// Create order
const createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    const result = await order.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: 'Validation error', error: err.message });
  }
};

// Update order
const updateOrder = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid order ID' });
  }
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: 'Error updating order', error: err.message });
  }
};

// Delete order
const deleteOrder = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid order ID' });
  }
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Order not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Error deleting order', error: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createOrder,
  updateOrder,
  deleteOrder
};
