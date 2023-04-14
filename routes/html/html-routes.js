const router = require('express').Router();
const path = require('path');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

router.get('/add-comments', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

router.get('/stocks', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/login.html'));
});


router.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/sign-up.html'));
});

module.exports = router;