
const {
    addComment,
    removeComment,
    addReply,
    removeReply
   } = require('../../controllers/commentController');




const router = require("express").Router();


router.route('/:stockId').post(addComment);



router
.route('/:stockId/:commentId')
.delete(removeComment);



// router.route('/:stockId/:commentId/:replyId').delete(removeReply)




// router.route("/login/:username/:password")
// .post();

// router.route("/signup/:username/:password")
// .post();


module.exports = router;