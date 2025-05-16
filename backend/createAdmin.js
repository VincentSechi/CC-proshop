const mongoose = require('mongoose');
const User = require('./src/models/User'); // adapte le chemin si besoin
require('dotenv').config(); // si tu utilises un .env pour MONGO_URI

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/proshop');
    /* await mongoose.connect('mongodb+srv://vincent:azertyuiop@redgi.poqfatm.mongodb.net/proshop?retryWrites=true&w=majority&appName=redgi') */
    const existingAdmin = await User.findOne({ email: 'admin@admin.com' });
    if (existingAdmin) {
      console.log('Un administrateur existe déjà.');
      return;
    }

    const admin = new User({
      email: 'admin@admin.com',
      username: 'admin',
      password: 'admin', // ce sera hashé automatiquement
      role: 'admin',
      phoneNumber:'0202020202',
      address: '1 rue test',
      country: 'France',
      postalCode: '51100',
    });

    await admin.save();
    console.log('Admin créé avec succès !');
  } catch (err) {
    console.error('Erreur lors de la création de l’admin :', err);
  } finally {
    await mongoose.disconnect();
  }
}

createAdmin();
