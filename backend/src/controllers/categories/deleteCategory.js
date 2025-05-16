const Category = require('../../models/Category');

module.exports = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "ID de la catégorie requis." });
  }

  try {
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Catégorie non trouvée." });
    }

    res.status(200).json({ message: "Catégorie supprimée avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression de la catégorie :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
}
