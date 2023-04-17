const router = require('express').Router();
const stockRoutes = require('./stock-routes');
const commentRoutes = require('./comment-routes');

router.use('/comments', commentRoutes);
// add prefix of `/pizzas` to routes created in `pizza-routes.js`
router.use('/stocks', stockRoutes);
module.exports = router;
