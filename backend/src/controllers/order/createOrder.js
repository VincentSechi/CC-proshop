// controllers/order/createOrder.js

const Order = require('../../models/Order');

module.exports = async (req, res) => {
  const { userId, products, totalAmount } = req.body;

  if (!userId || !products || !totalAmount) {
    return res.status(400).json({ message: "Tous les champs sont requis" });
  }

  try {
    const order = await Order.create({
      user: userId,
      products,
      totalAmount,
    });

    res.status(200).json(order);
  } catch (error) {
    console.error("Erreur lors de la création de la commande :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
