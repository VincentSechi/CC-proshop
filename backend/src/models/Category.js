const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
});

CategorySchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .normalize('NFD')                   // décompose accents
      .replace(/[\u0300-\u036f]/g, '')   // enlève les accents
      .replace(/&/g, 'et')               // remplace & par "et"
      .trim()
      .replace(/[^a-z0-9]+/g, '-')       // remplace les caractères non alphanumériques par des tirets
      .replace(/^-+|-+$/g, '');          // supprime tirets début/fin
  }
  next();
});


module.exports = mongoose.model('Category', CategorySchema);