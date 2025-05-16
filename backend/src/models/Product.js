const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0 },
  reviews: { type: Number, default: 0, min: 0 },
  rating: { type: Number, default: 0, min: 0 },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
  ],
});

ProductSchema.pre('save', function (next) {
 if (this.isModified('title')) {
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

module.exports = mongoose.model('Product', ProductSchema);