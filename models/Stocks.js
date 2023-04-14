const {Schema,model}= require('mongoose');


const Stocks = model('Stocks',stockSchema);


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
  price: {
    type: String,
    default: '0'
  },
  sellPrice: {
    type: String,
    default: '2'
  },
  buyPrice: {
    type: String,
    default: '2'
  },
  wishlist: [],
  comments:[{
type:Schema.Types.ObjectId,
ref:'Comment'
  }]
    
},{

  toJSON:
  {
    virtuals:true
  },id:false
});

stockSchema.virtual('commentCount').get({
function(){
  return this.comments.length
}
})

module.exports = Stocks;





