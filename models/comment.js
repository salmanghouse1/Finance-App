const {Schema,model}= require('mongoose');




const commentSchema={
comment:{
    type:String,
}
,
date:{
    type:Date,
    default:Date.now
}

}

const Comment = model('Comment',commentSchema);


module.exports= Comment;