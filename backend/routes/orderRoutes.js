const express = require("express");
const Order = require("../models/order");

const router = express.Router();

// Place an order
router.post("/", async (req, res) => {
    try {
        const {
            name,
            address,
            phone,
            paymentMethod,
            items,
            total
        } = req.body;

        const order = new Order({
            name,
            address,
            phone,
            paymentMethod,
            items,
            total
        });

        const savedOrder = await order.save();

        res.status(201).json({
            message: "Order placed successfully",
            order: savedOrder
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to place order",
            error: error.message
        });
    }
});

module.exports = router;