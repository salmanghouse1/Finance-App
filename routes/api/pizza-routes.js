const {getPizzaById,getAllPizzas} = require('./controllers/pizza-controller');





const router = require("express").Router();

router.route("/")
.get(getPizzaAllPizzas)
.post();


router.route("/:id")
.get(getPizzaById)
.put()
.delete();


module.exports = router;