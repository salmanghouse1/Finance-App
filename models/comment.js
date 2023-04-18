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
const {Schema,Types}= require('mongoose');

const dateFormat = require('../utils/dateFormat');

const ReplySchema = new Schema(
  {
    replyId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
      },
      replyBody: {
      type: String,
      required: true
      },
      writtenBy: {
      type: String,
      required: true,
      },
      createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
  },
  },
{
toJSON: {
getters: true
}
}

 );

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
   replies: [ReplySchema]
},{

    toJSON:
    {
      virtuals:true,
      getters: true
  
    },id:false
  })
  
CommentSchema.virtual('replyCount').get(function() {
    return this.replies.length;
   });

module.exports= mongoose.models.Comment||mongoose.model('Comment',CommentSchema);