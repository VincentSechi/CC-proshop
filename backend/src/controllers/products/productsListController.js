const Product = require('../../models/Product');
const Category = require('../../models/Category');

module.exports = async (req, res) => {
  const { categories, page = 1, limit = 5 } = req.query;

  try {
    let filter = {};

    if (categories) {
      const slugs = categories.split(',');
      const matchedCategories = await Category.find({ slug: { $in: slugs } });
      const categoryIds = matchedCategories.map(cat => cat._id);
      filter.categories = { $in: categoryIds };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const products = await Product.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('categories', 'name slug');

    const total = await Product.countDocuments(filter);

    res.status(200).json({
      products,
      total,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit))
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
