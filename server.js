
const mongoose = require('mongoose');

const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.use(require('./routes'));

mongoose.connect(process.env.MONGO_DB_URI, {useNewUrlParser:true,useUnifiedTopology:true});


app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
