const router = require('express').Router();
const stockRoutes = require('./stock-routes');
// add prefix of `/pizzas` to routes created in `pizza-routes.js`
router.use('/stocks', stockRoutes);
module.exports = router;
