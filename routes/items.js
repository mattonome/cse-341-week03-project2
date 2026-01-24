const express = require('express');
const router = express.Router();
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
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
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         description: Item not found
 */
router.get('/:id', itemsController.getSingle);

/**
 * @swagger
 * /items:
 *   post:
 *     summary: Create a new item
 *     tags: [Items]
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
router.post('/', itemsController.createItem);

/**
 * @swagger
 * /items/{id}:
 *   put:
 *     summary: Update an existing item
 *     tags: [Items]
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
 *             $ref: '#/components/schemas/Item'
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
 *     tags: [Items]
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
