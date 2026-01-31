const express = require('express');
const router = express.Router();
const passport = require('passport');
const ordersController = require('../controllers/orders');

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     responses:
 *       200:
 *         description: Successfully retrieved orders
 */
router.get('/', ordersController.getAll);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get a single order by ID
 */
router.get('/:id', ordersController.getSingle);

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Order created successfully
 *       401:
 *         description: Unauthorized
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
 *     summary: Update an existing order
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
 *     summary: Delete an order
 *     security:
 *       - bearerAuth: []
 */
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  ordersController.deleteOrder
);

module.exports = router;
