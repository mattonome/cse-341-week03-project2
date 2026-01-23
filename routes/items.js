// routes/items.js
const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/items');

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Get all items
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
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved item
 *       404:
 *         description: Item not found
 */
router.get('/:id', itemsController.getSingle);

/**
 * @swagger
 * /items:
 *   post:
 *     summary: Create a new item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               description: { type: string }
 *               price: { type: number }
 *               quantity: { type: number }
 *               category: { type: string }
 *               supplier: { type: string }
 *               inStock: { type: boolean }
 *     responses:
 *       201:
 *         description: Item created successfully
 */
router.post('/', itemsController.createItem);

/**
 * @swagger
 * /items/{id}:
 *   put:
 *     summary: Update an existing item
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Item updated successfully
 *       404:
 *         description: Item not found
 */
router.put('/:id', itemsController.updateItem);

/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     summary: Delete an item
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Item deleted successfully
 */
router.delete('/:id', itemsController.deleteItem);

module.exports = router;
