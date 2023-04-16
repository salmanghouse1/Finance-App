const mongoose = require('mongoose');
const {Schema}= require('mongoose');





const stockSchema = new Schema({
stockName: {
    type: String
  },
  createdBy: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
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
//   comments:[{
// type:Schema.Types.ObjectId,
// ref:'Comment'
//   }]
    
}
// ,{

//   toJSON:
//   {
//     virtuals:true
//   },id:false
// }
);

// stockSchema.virtual('commentCount').get({
// function(){
//   return this.comments.length
// }
// })

module.exports = mongoose.models.Stocks||mongoose.model('Stocks',stockSchema);





