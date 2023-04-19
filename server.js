require('dotenv').config();
const mongoose = require('mongoose');

const express = require('express');
const Stock = require('./models/index');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

mongoose.connect(process.env.STARTING_VAR+encodeURIComponent(process.env.MONGO_DB_URI), {useNewUrlParser:true,useUnifiedTopology:true});

// const seedStocks =[
//         {
//         "stockName": "Bitcoin",
//         "createdBy": "Salman",
//            "currentPrice":"5",
//            "soldPrice":"6",
//            "boughtPrice":"3",
//            "comments":[{
//                "writtenBy":"Salman",
//                "commentBody":"Great"
//            }]
        
//        }
//     ]

// const seedDB = async () => {
//     await Stock.deleteMany({});
//     await Stock.insertMany(seedStocks);
// };

// seedDB().then(() => {
//     mongoose.connection.close();
// })

// mongoose.set(debug,true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
