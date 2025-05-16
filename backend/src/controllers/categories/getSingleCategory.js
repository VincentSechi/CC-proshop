const Category = require('../../models/Category');

module.exports = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "ID de la catégorie requis." });
  }

  try {
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Catégorie non trouvée." });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error("Erreur lors de la récupération de la catégorie :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
}