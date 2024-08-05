const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');

const PORT = process.env.PORT || 3000;

// Configuration de multer pour le téléchargement d'images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Définir le moteur de vue
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Définir le dossier public pour les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Charger la page principale
app.get('/', (req, res) => {
    res.render('index');
});

// Route pour les fichiers uploadés
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/upload', upload.single('image'), (req, res) => {
    // Après le téléchargement, vous pouvez faire quelque chose avec le fichier, par exemple enregistrer le chemin dans la base de données
    // Puis, afficher la vue "result.ejs"
    res.render('result', { imagePath: `/uploads/${req.file.filename}` });
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
