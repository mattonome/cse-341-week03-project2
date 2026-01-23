// seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Item = require('./models/item');
const Order = require('./models/order');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
  dbName: process.env.DB_NAME || 'w03project2'
})
.then(() => console.log('MongoDB connected for seeding...'))
.catch(err => console.error('MongoDB connection error:', err));

// ---------- Seed Items ----------
const seedItems = [
  { name: 'Laptop', description: '14-inch gaming laptop', price: 1200, quantity: 10, category: 'Electronics', supplier: 'TechCorp', inStock: true },
  { name: 'Headphones', description: 'Noise-cancelling over-ear headphones', price: 200, quantity: 50, category: 'Electronics', supplier: 'SoundPro', inStock: true },
  { name: 'Coffee Maker', description: 'Automatic drip coffee maker', price: 80, quantity: 30, category: 'Home Appliances', supplier: 'KitchenPlus', inStock: true },
  { name: 'Office Chair', description: 'Ergonomic office chair', price: 150, quantity: 20, category: 'Furniture', supplier: 'ComfortSeats', inStock: true },
  { name: 'Smartphone', description: 'Latest model smartphone with 128GB', price: 999, quantity: 15, category: 'Electronics', supplier: 'PhoneTech', inStock: true }
];

// ---------- Seed Orders ----------
const seedOrders = async (items) => [
  { itemId: items[0]._id, quantity: 2, customer: 'Alice Johnson', address: '123 Main St, NY', status: 'pending', totalPrice: items[0].price*2, notes: 'Deliver ASAP' },
  { itemId: items[1]._id, quantity: 1, customer: 'Bob Smith', address: '456 Oak Ave, CA', status: 'shipped', totalPrice: items[1].price*1, notes: '' },
  { itemId: items[2]._id, quantity: 3, customer: 'Charlie Brown', address: '789 Pine Rd, TX', status: 'delivered', totalPrice: items[2].price*3, notes: 'Gift wrap' }
];

// ---------- Seed function ----------
const seedDatabase = async () => {
  try {
    await Item.deleteMany({});
    await Order.deleteMany({});

    const insertedItems = await Item.insertMany(seedItems);
    console.log('Items seeded:', insertedItems);

    const ordersToSeed = await seedOrders(insertedItems);
    const insertedOrders = await Order.insertMany(ordersToSeed);
    console.log('Orders seeded:', insertedOrders);

    console.log('✅ Database seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDatabase();
