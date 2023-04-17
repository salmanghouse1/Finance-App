const router = require('express').Router();
const path = require('path');
const {
  getAllStocks,
  getStockById,
  createStock,
  updateStock,
  deleteStock,
  createPizza
 } = require('../../controllers/stockControllers.js');
 
// router.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../../public/index.html'));
// });

router.get('/add-comments', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/stock-list.html'));
});
// router.get('/stocks', (req, res) => {
//   res.sendFile(path.join(__dirname, '../../public/index.html'));
// });

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/login.html'));
});

router.get('/add-stock', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/add-stock.html'));
});


router.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/sign-up.html'));
});


 

module.exports = router;
