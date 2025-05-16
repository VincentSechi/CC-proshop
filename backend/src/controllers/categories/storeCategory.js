//store category
const Category = require('../../models/Category'); // importer et enregistrer le modèle Category
const slugify = require('../../../lib/index').slugify; // importer la fonction slugify

module.exports = async (req, res) => {
    const { name } = req.body;

    const slug = slugify(name);
    if (!name) {
        return res.status(400).json({ message: "Tous les champs sont requis." });
    }

    try {
        const category = new Category({
            name,
            slug
        });

        const createdCategory = await category.save();
        res.status(201).json(createdCategory);
    } catch (error) {
        console.error("Erreur lors de la création de la catégorie :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
}