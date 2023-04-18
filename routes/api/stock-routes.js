const router = require('express').Router();

const {
    getAllStocks,
    getStockById,
    createStock,
    updateStock,
    deleteStock,
    
   } = require('../../controllers/stockControllers.js');
   

// Set up GET all and POST at /api/pizzas
router
 .route('/')
 .get(getAllStocks)
 .post(createStock);
// Set up GET one, PUT, and DELETE at /api/pizzas/:id
router
 .route('/:id')
 .get(getStockById)
 .put(updateStock)
 .delete(deleteStock);
 


module.exports = router;
