
const Stocks = require('../models/stocks.js');



const stockController={
// createPizza
createStock({ body }, res) {
    Stocks.create(body)
    .then(dbPizzaData => res.json(dbPizzaData))
    .catch(err => res.status(400).json(err));
   },

   getStockById({ params }, res) {
    Stocks.findOne({ _id: params.id })
    .then(dbPizzaData => {
    // If no pizza is found, send 404
    if (!dbPizzaData) {
    res.status(404).json({ message: 'No pizza found with this id!' });
    return;
    }
    res.json(dbPizzaData);
    })
    .catch(err => {
    console.log(err);
    res.status(400).json(err);
    });
    },
   
    getAllStocks(req, res) {
        Stocks.find({})
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => {
        console.log(err);
        res.status(400).json(err);
        });
        },
        // get one pizza by id
        getStockById({ params }, res) {
        Stocks.findOne({ _id: params.id })
        .then(dbPizzaData => {
        // If no pizza is found, send 404
        if (!dbPizzaData) {
        res.status(404).json({ message: 'No pizza found with this id!' });
        return;
        }
        res.json(dbPizzaData);
        })
        .catch(err => {
        console.log(err);
        res.status(400).json(err);
        });
        },


   updateStock({ params, body }, res) {
    Stocks.findOneAndUpdate({ _id: params.id }, body, { new: true })
    .then(dbPizzaData => {
    if (!dbPizzaData) {
    res.status(404).json({ message: 'No pizza found with this id!' });
    return;
    }
    res.json(dbPizzaData);
    })
    .catch(err => res.status(400).json(err));
   },
   deleteStock({ params }, res) {
    Stocks.findOneAndDelete({ _id: params.id })
    .then(dbPizzaData => {
    if (!dbPizzaData) {
    res.status(404).json({ message: 'No pizza found with this id!' });
    return;
    }
    res.json(dbPizzaData);
 })
 .catch(err => res.status(400).json(err));
}  

}
module.exports = stockController;