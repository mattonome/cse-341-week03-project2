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
 * tags:
 *   name: Items
 *   description: Item management
 */

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Get all items
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: Successfully retrieved all items
 */
router.get('/', itemsController.getAll);

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: Get a single item by ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the item
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved item
 */
router.get('/:id', itemsController.getSingle);

/**
 * @swagger
 * /items:
 *   post:
 *     summary: Create a new item (AUTH REQUIRED)
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       201:
 *         description: Item created successfully
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
 *     summary: Update an item (AUTH REQUIRED)
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the item to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: Item updated successfully
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
 *     summary: Delete an item (AUTH REQUIRED)
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the item to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item deleted successfully
 */
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  itemsController.deleteItem
);

module.exports = router;
