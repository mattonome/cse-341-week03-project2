const express = require('express');
const router = express.Router();
const passport = require('passport');
const itemsController = require('../controllers/items');

/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         quantity:
 *           type: number
 *         category:
 *           type: string
 *         supplier:
 *           type: string
 *         inStock:
 *           type: boolean
 */

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Get all items
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: Successfully retrieved items
 */
router.get('/', itemsController.getAll);

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: Get a single item by ID
 *     tags: [Items]
 */
router.get('/:id', itemsController.getSingle);

/**
 * @swagger
 * /items:
 *   post:
 *     summary: Create a new item
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: Item created successfully
 *       401:
 *         description: Unauthorized
 */
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  itemsController.createItem
);

/**
 * @swagger
 * /items/{id}:
 *   put:
 *     summary: Update an existing item
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 */
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  itemsController.updateItem
);

/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     summary: Delete an item
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 */
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  itemsController.deleteItem
);

module.exports = router;
