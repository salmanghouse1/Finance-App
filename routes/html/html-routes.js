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
  res.sendFile(path.join(__dirname, '../../public/stock.html'));
});
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/stock-list.html'));
});
// router.get('/stocks', (req, res) => {
//   res.sendFile(path.join(__dirname, '../../public/index.html'));
// });

router.get('/latest-stocks', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/latest-stocks.html'));
});

router.get('/add-stock', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/add-stock.html'));
});



 

module.exports = router;
