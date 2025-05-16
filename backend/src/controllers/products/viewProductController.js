require('../../models/Category'); // importer et enregistrer le modèle Category
const Product = require('../../models/Product');

module.exports = async (req, res) => {
  const { slug } = req.params;

  try {
    const product = await Product.findOne({ slug }).populate('categories', 'name slug');

    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Erreur lors de la récupération du produit :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
