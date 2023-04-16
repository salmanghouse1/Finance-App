const { Comment, Pizza } = require('../models');

const commentController = {
 // add comment to pizza

    // add comment to pizza
    addComment({ params, body }, res) {
        console.log(body);
        Comment.create(body)
        .then(({ _id }) => {
        return Stocks.findOneAndUpdate(
        { _id: params.stocksId },
        { $push: { comments: _id } },
        { new: true }
        );
        })
        .then(stocksData => {
        if (!stocksData) {
        res.status(404).json({ message: 'No stocks found with this id!' });
        return;
        }
        res.json(stocksData);
        })
        .catch(err => res.json(err));
       },
       
removeComment({ params }, res) {
Comment.findOneAndDelete({ _id: params.commentId })
 .then(deletedComment => {
 if (!deletedComment) {
 return res.status(404).json({ message: 'No comment with this id!' });
 }
 return Pizza.findOneAndUpdate(
 { _id: params.stockId },
 { $pull: { comments: params.commentId } },
 { new: true }
 );
 })
 .then(dbStockData => {
 if (!dbStockData) {
 res.status(404).json({ message: 'No stock found with this id!' });
 return;
 }
 res.json(dbStockData);
 })
 .catch(err => res.json(err))

},

addReply({ params, body }, res) {
    Comment.findOneAndUpdate(
    { _id: params.commentId },
    { $push: { replies: body } },
    { new: true }
    )
    .then(dbStockData => {
    if (!dbStockData) {
    res.status(404).json({ message: 'No stock found with this id!' });
    return;
    }
    res.json(dbStockData);
    })
    .catch(err => res.json(err));
    },
// remove reply
removeReply({ params }, res) {
    Comment.findOneAndUpdate(
    { _id: params.commentId },
    { $pull: { replies: { replyId: params.replyId } } },
    { new: true }
    )
    .then(dbPizzaData => res.json(dbPizzaData))
    .catch(err => res.json(err));
   }
   
};
module.exports = commentController