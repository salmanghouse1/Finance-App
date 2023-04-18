const mongoose = require('mongoose');
const {Schema}= require('mongoose');
const dateFormat = require('../utils/dateFormat');





const stockSchema = new Schema({
stockName: {
    type: String,
    required: true,
    trim: true
  },
  createdBy: {
    type: String,
    required: true,
    trim: true
   
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => dateFormat(createdAtVal)
   },
  currentPrice: {
    type: String,
    default: '0'
  },
  soldPrice: {
    type: String,
    default: '2'
  },
  boughtPrice: {
    type: String,
    default: '2'
  },
  comments:[{
type:Schema.Types.ObjectId,
ref:'Comment'
  }]
    
}
,{

  toJSON:
  {
    virtuals:true,
    getters: true

  },id:false
}
);

stockSchema.virtual('commentCount').get(function() {
  return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
 });

module.exports = mongoose.models.Stocks||mongoose.model('Stocks',stockSchema);





