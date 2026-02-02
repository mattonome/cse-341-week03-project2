const express = require('express');
const router = express.Router();
const passport = require('passport');
const ordersController = require('../controllers/orders');

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         items:
 *           type: array
 *           items:
 *             type: string
 *         total:
 *           type: number
 *         customer:
 *           type: string
 *         status:
 *           type: string
 */

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Successfully retrieved all orders
 */
router.get('/', ordersController.getAll);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get a single order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved order
 */
router.get('/:id', ordersController.getSingle);

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order (AUTH REQUIRED)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Order created successfully
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
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: Order updated successfully
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
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order deleted successfully
 */
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  ordersController.deleteOrder
);

module.exports = router;
