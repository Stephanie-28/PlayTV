const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import des routes
const channelsRoutes = require('./routes/channels');
const videosRoutes = require('./routes/videos');
const usersRoutes = require('./routes/users');
const commentsRoutes = require('./routes/comments');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir les fichiers statiques (vidéos, images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes API
app.use('/api/channels', channelsRoutes);    // Chaînes TV
app.use('/api/videos', videosRoutes);        // Vidéos uploadées
app.use('/api/users', usersRoutes);          // Utilisateurs
app.use('/api/comments', commentsRoutes);    // Commentaires

// Route de test
app.get('/', (req, res) => {
  res.json({ 
    message: 'Bienvenue sur PlayTV API',
    endpoints: {
      channels: '/api/channels',
      videos: '/api/videos',
      users: '/api/users',
      comments: '/api/comments'
    }
  });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur backend sur http://localhost:${PORT}`);
});