const Product = require('../../models/Product');
const slugify = require('../../../lib/index').slugify; // importer la fonction slugify
module.exports = async (req, res) => {
  const { title, description, price, category, stock, brand, rating, reviews } = req.body;
  const slug = slugify(title);
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

  if (!title || !description || !price || !category || !stock || !brand || !imagePath) {
    return res.status(400).json({ message: "Tous les champs sont requis, y compris une image." });
  }

  try {
    const product = new Product({
      title,
      description,
      price,
      slug,
      image: imagePath,
      category,
      stock,
      brand,
      rating: rating || 0,
      reviews: reviews || 0
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error("Erreur lors de la création du produit :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
