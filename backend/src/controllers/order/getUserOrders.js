// controllers/order/getUserOrders.js

const Order = require('../../models/Order');

module.exports = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ user: userId })
      .populate('products.product', 'title price');

    res.status(200).json(orders);
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
