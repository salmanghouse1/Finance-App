const router = require('express').Router();
const htmlRoutes = require('./html/html-routes');
// const commentRoutes = require('./api/comment-routes');
const apiRoutes = require('./api');


router.use('/api', apiRoutes);

// const stockRoutes = require('./html/index.js');


router.use('/', htmlRoutes);
// router.use('/api/comments/', commentRoutes);
// router.use('/api/stocks/', htmlRoutes);


router.use((req, res) => {
  res.status(404).send('<h1>😝 404 Error!</h1>');
});

module.exports = router;
