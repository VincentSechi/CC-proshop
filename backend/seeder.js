const mongoose = require('mongoose');
const Product = require('./src/models/Product');
const Category = require('./src/models/Category');

const slugify = (str) =>
  str
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')   // Enlève les accents
    .replace(/&/g, 'et')               // Remplace & par "et"
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')       // Remplace les caractères non alphanumériques par des tirets
    .replace(/^-+|-+$/g, '');          // Supprime les tirets en début et fin

const products = [
  {
    title: 'Écouteurs sans fil Bluetooth Airpods',
    image: '/public/images/airpods.jpg',
    description:
      'La technologie Bluetooth vous permet de le connecter sans fil à des appareils compatibles. Le son AAC de haute qualité offre une expérience d\'écoute immersive.Le microphone intégré vous permet de prendre des appels tout en travaillant.',
    brand: 'Apple',
    categories: ['Électronique', 'Audio', 'Accessoires'],
    price: 89.99,
    stock: 10,
    rating: 4.5,
    numReviews: 12,
  },
  {
    title: 'iPhone 11 Pro 256 Go',
    image: '/public/images/phone.jpg',
    description:
      'Découvrez l\'iPhone 11 Pro.Un système de triple caméra révolutionnaire qui ajoute des fonctionnalités sans complexité.Un bond en avant sans précédent en matière de durée de batterie.',
    brand: 'Apple',
    categories: ['Électronique', 'Smartphones', 'Mobilité'],
    price: 599.99,
    stock: 7,
    rating: 4.0,
    numReviews: 8,
  },
  {
    title: 'Appareil photo reflex numérique Canon EOS 80D',
    image: '/public/images/camera.jpg',
    description:
      'Caractérisé par des spécifications d\'imagerie polyvalentes, le Canon EOS 80D se distingue encore davantage grâce à une paire de systèmes de mise au point robustes et une conception intuitive.',
    brand: 'Canon',
    categories: ['Électronique', 'Photo & Vidéo', 'Caméras'],
    price: 929.99,
    stock: 5,
    rating: 3,
    numReviews: 12,
  },
  {
    title: 'Console de jeu Sony Playstation 4 Pro version blanche',
    image: '/public/images/playstation.jpg',
    description:
      'Le centre de divertissement à domicile ultime commence avec la PlayStation. Que vous soyez un joueur, que vous aimiez les films HD, la télévision ou la musique.',
    brand: 'Sony',
    categories: ['Électronique', 'Jeux vidéo', 'Divertissement'],
    price: 399.99,
    stock: 11,
    rating: 5,
    numReviews: 12,
  },
  {
    title: 'Souris de jeu Logitech série G',
    image: '/public/images/mouse.jpg',
    description:
      'Obtenez une meilleure prise en main de vos jeux avec cette souris de jeu Logitech LIGHTSYNC. Les six boutons programmables permettent une personnalisation pour une expérience de jeu fluide.',
    brand: 'Logitech',
    categories: ['Électronique', 'Accessoires', 'Périphériques', 'Gaming'],
    price: 49.99,
    stock: 7,
    rating: 3.5,
    numReviews: 10,
  },
  {
    title: 'Amazon Echo Dot 3ème génération',
    image: '/public/images/alexa.jpg',
    description:
      "Rencontrez Echo Dot - notre haut-parleur intelligent le plus populaire avec un design en tissu. C'est notre haut-parleur intelligent le plus compact qui s'adapte parfaitement aux petits espaces.",
    brand: 'Amazon',
    categories: ['Électronique', 'Maison connectée', 'Audio', 'Assistants vocaux'],
    price: 29.99,
    stock: 0,
    rating: 4,
    numReviews: 12,
  },
];

/* mongoose.connect('mongodb+srv://vincent:azertyuiop@redgi.poqfatm.mongodb.net/proshop?retryWrites=true&w=majority&appName=redgi') */
mongoose.connect('mongodb://localhost:27017/proshop', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('MongoDB connecté');

  await Product.deleteMany();
  await Category.deleteMany();

  const allCategoryNames = Array.from(
    new Set(products.flatMap(p => p.categories))
  );

  const createdCategories = await Category.insertMany(
    allCategoryNames.map(name => ({
      name,
      slug: slugify(name)
    }))
  );

  const categoryMap = {};
  createdCategories.forEach(cat => {
    categoryMap[cat.name] = cat._id;
  });

  const productsWithCategoryRefs = products.map(product => ({
    ...product,
    slug: slugify(product.title),
    categories: product.categories.map(name => categoryMap[name])
  }));

  await Product.insertMany(productsWithCategoryRefs);
  console.log('Produits et catégories insérés avec succès');
  process.exit();
})
.catch((err) => {
  console.error('Erreur de connexion MongoDB :', err);
  process.exit(1);
});
