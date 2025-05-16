const Category = require('../../models/Category');
const Product = require('../../models/Product');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, categories, stock, brand, rating, reviews } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

  if (!title || !description || !price || !categories || !stock || !brand) {
    return res.status(400).json({ message: "Les champs title, description, price, categories, stock et brand sont requis." });
  }

  // Générer slug à partir du title
  const slug = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, 'et')
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  try {
    // Transformer les noms des catégories en ObjectId (chercher dans la collection Category)
    const categoryDocs = await Category.find({ name: { $in: categories } });
    const categoryIds = categoryDocs.map(cat => cat._id);

    if (categoryIds.length !== categories.length) {
      return res.status(400).json({ message: "Une ou plusieurs catégories n'existent pas" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    product.title = title;
    product.description = description;
    product.price = price;
    product.slug = slug;
    if (imagePath) product.image = imagePath;
    product.categories = categoryIds;
    product.stock = stock;
    product.brand = brand;
    product.rating = rating || 0;
    product.reviews = reviews || 0;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);

  } catch (error) {
    console.error("Erreur lors de la mise à jour du produit :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
