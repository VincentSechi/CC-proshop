const express = require('express');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 4000;
const upload = require('./middleware/upload');

global.loggedIn = null;

app.use(cors({
    origin: 'http://localhost:3000', // ton frontend
    credentials: true,               // si tu utilises les cookies/sessions
}));

app.use(fileUpload());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json()); // Pour parser le JSON
app.use(express.urlencoded({ extended: true })); // Pour les données de formulaires (si besoin)
app.use(expressSession({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))

app.use((req, res, next) => {
    if (req.session) {
        loggedIn = req.session.userId;
    }
    next()
});


app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/proshop', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connexion à MongoDB_proshop réussie'))
    .catch(err => console.error(err));

/* mongoose.connect('mongodb+srv://vincent:azertyuiop@redgi.poqfatm.mongodb.net/proshop?retryWrites=true&w=majority&appName=redgi') */

const UserRegisterController = require('./src/controllers/user/UserRegisterController')
const UserLoginController = require('./src/controllers/user/UserLoginController');
const UpdateUserController = require('./src/controllers/user/updateUserController');

const ProductsListController = require('./src/controllers/products/productsListController');
const ViewProductController = require('./src/controllers/products/viewProductController');
const ProductCreateController = require('./src/controllers/products/storeProductController');
const deleteProductController = require('./src/controllers/products/deleteProductController');

const GetCategoriesController = require('./src/controllers/categories/getCategoriesController');
const StoreCategoryController = require('./src/controllers/categories/storeCategory');
const DeleteCategoryController = require('./src/controllers/categories/deleteCategory');
const GetSingleCategoryController = require('./src/controllers/categories/getSingleCategory');
const UpdateProductController = require('./src/controllers/products/updateProductController');

const CreateOrder = require('./src/controllers/order/createOrder');
const GetOrder = require('./src/controllers/order/getOrder');
const GetUserOrders = require('./src/controllers/order/getUserOrders');

app.post('/api/auth/register', UserRegisterController);
app.post('/api/auth/login', UserLoginController);
app.put('/api/user/:id', UpdateUserController);

app.get('/api/products', ProductsListController);
app.get('/api/products/:slug', ViewProductController);
app.post('/api/create-product', upload.single('image'), ProductCreateController);
app.delete('/api/products/:id', deleteProductController);
app.put('/api/products/:id', upload.single('image'), UpdateProductController);

app.get('/api/categories', GetCategoriesController);
app.get('/api/categories/:id', GetSingleCategoryController);
app.post('/api/categories', StoreCategoryController);
app.delete('/api/categories/:id', DeleteCategoryController);

app.get('/api/orders/:id', GetOrder)
app.get('/api/orders/user/:id', GetUserOrders)
app.post('/api/orders', CreateOrder)

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});