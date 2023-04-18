
const Stocks = require('../models/stocks.js');



const stockController={
// createPizza
createStock({ body }, res) {
    Stocks.create(body)
    .then(dbStockData => res.json(dbStockData))
    .catch(err => res.status(400).json(err));
   },
getAllStocks(req,res) {
    Stocks.find({})
    .populate({path: 'comments',
    select: '-__v'
    })
    .select('-__v')
    .sort({ _id: -1 })
    .then(dbPizzaData => res.json(dbPizzaData))
    .catch(err => {
    console.log(err);
    res.status(400).json(err);
    });
},
   
        getStockById({ params }, res) {
        Stocks.findOne({ _id: params.id })
        .then(dbStockData => {
        // If no pizza is found, send 404
        if (!dbStockData) {
        res.status(404).json({ message: 'No pizza found with this id!' });
        return;
        }
        res.json(dbStockData);
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