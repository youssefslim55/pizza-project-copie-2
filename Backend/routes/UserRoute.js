const express = require('express');
const { registerUser, loginUser,getAllUsers,getUserById } = require('../controllers/Usercontroller');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', getAllUsers); // Route pour récupérer tous les utilisateurs
router.get('/user/:id',getUserById); // Route pour récupérer un utilisateur par ID

module.exports = router;