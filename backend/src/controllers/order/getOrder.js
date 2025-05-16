// controllers/order/getOrder.js

const Order = require('../../models/Order');

module.exports = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id)
      .populate('user', 'username email')
      .populate('products.product', 'title price');

    if (!order) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Erreur lors de la récupération de la commande :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
