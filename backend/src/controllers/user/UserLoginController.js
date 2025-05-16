const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const bcrypt = require('bcrypt');

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret'; // À stocker en .env

module.exports = async (req, res) => {
    const { email, password } = req.body;
    const errors = [];
    const formData = { email };

    if (!email) errors.push('L\'email est requis');
    if (!password) errors.push('Le mot de passe est requis');

    if (errors.length > 0) {
        return res.status(400).json({ errors, formData });
    }

    try {
        const userInfo = await User.findOne({ email });
        if (!userInfo) {
            errors.push('Aucun utilisateur trouvé avec cet email');
            return res.status(400).json({ errors, formData });
        }

        const isMatch = await bcrypt.compare(password, userInfo.password);
        if (!isMatch) {
            errors.push('Mot de passe incorrect');
            return res.status(400).json({ errors, formData });
        }

        
        // Génération du JWT avec quelques infos utiles
        const token = jwt.sign(
            { userId: userInfo._id, email: userInfo.email},
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        const user = {
            _id: userInfo._id,
            username: userInfo.username,
            email: userInfo.email,
            role: userInfo.role,
            address: userInfo.address,
            phoneNumber: userInfo.phoneNumber,
            postalCode: userInfo.postalCode,
            country: userInfo.country,
        };

        console.log(user)

        return res.status(200).json({ user, token });
    } catch (error) {
        console.error(error);
        errors.push('Une erreur est survenue lors de la connexion');
        return res.status(400).json({ errors, formData });
    }
};
