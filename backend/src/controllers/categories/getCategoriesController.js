const Category = require('../../models/Category'); // importer et enregistrer le modèle Category

module.exports = async (req, res) => {

  try {
    const categories = await Category.find()

    if (!categories) {
      return res.status(404).json({ message: 'Aucune catégorie' });
    }

    res.status(200).json(categories);
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
