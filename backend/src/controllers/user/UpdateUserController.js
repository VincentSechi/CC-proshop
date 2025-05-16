const User = require('../../models/User');

module.exports = async (req, res) => {
    const { id } = req.params;
    const { address ,country ,postalCode ,phoneNumber } = req.body;

    if (!address || !country || !postalCode || !phoneNumber) {
        return res.status(400).json({ message: "Les champs adresse, pays, code postal, numéro de téléphone sont requis." });
    }
    try {

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "Aucune utilisateur trouvé" });
        }

        user.address = address;
        user.country = country;
        user.postalCode = postalCode;
        user.phoneNumber = phoneNumber;

        const updatedUser = await user.save();
        res.status(200).json(updatedUser);

    } catch (error) {
        console.error("Erreur lors de la mise à jour du User :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};
