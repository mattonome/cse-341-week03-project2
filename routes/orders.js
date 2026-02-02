const express = require('express');
const router = express.Router();
const passport = require('passport');
const ordersController = require('../controllers/orders');

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 */
router.get('/', ordersController.getAll);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get a single order
 *     tags: [Orders]
 */
router.get('/:id', ordersController.getSingle);

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create an order (AUTH REQUIRED)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  ordersController.createOrder
);

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Update an order (AUTH REQUIRED)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  ordersController.updateOrder
);

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete an order (AUTH REQUIRED)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  ordersController.deleteOrder
);

module.exports = router;
