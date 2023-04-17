// const mongoose = require('mongoose');
// const {Schema}= require('mongoose');





// const commentSchema=new Schema({

// writtenBy:{
//     type:String
// },
// createdAt:{
//     type:Date,
//     default:Date.now
// },
// commentBody:{
//     type:String,
// }


// })



// module.exports= mongoose.models.Comment||mongoose.model('Comment',commentSchema);

const mongoose = require('mongoose');
const {Schema}= require('mongoose');

const dateFormat = require('../utils/dateFormat');

const CommentSchema = new Schema({
 writtenBy: {
 type: String
 },
 commentBody: {
 type: String
 },
 createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => dateFormat(createdAtVal)
   },
},{

    toJSON:
    {
      virtuals:true,
      getters: true
  
    },id:false
  })

module.exports= mongoose.models.Comment||mongoose.model('Comment',CommentSchema);