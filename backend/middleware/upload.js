const multer = require('multer');
const path = require('path');

// Configuration du stockage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // dossier où enregistrer les images
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // nom unique
  }
});

// Filtre pour accepter seulement les images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Format d’image non supporté'), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
