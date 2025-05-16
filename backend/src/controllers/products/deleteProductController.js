const Product = require('../../models/Product');
module.exports = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "ID du produit requis." });
    }

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Produit non trouvé." });
        }

        res.status(200).json({ message: "Produit supprimé avec succès." });
    } catch (error) {
        console.error("Erreur lors de la suppression du produit :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
}