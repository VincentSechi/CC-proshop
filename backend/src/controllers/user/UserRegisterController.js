const User = require('../../models/User');

module.exports = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = new User({ username, email, password });
        await user.save();
        
        return res.status(200).json()
    } catch (err) {
        console.error('Erreur complète :', JSON.stringify(err, Object.getOwnPropertyNames(err), 2));
        return res.status(400).json({ err });
    }
};
