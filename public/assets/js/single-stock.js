const $backBtn = document.querySelector('#back-btn');
const $stockName = document.querySelector('#stock-name');
const $createdBy = document.querySelector('#created-by');
const $createdAt = document.querySelector('#created-at');
const $currentPrice = document.querySelector('#cPrice');
const $soldPrice = document.querySelector('#sPrice');
const $boughtPrice = document.querySelector('#bPrice');
const $commentSection = document.querySelector('#comment-section');
const $newCommentForm = document.querySelector('#new-comment-form');

let stockId;
function getStocks() {
  // get id of pizza
  const searchParams = new URLSearchParams(document.location.search.substring(1));
  const stocksId = searchParams.get('id');
  // get pizzaInfo
  fetch(`/api/stocks/${stocksId}`)
  .then(response => {
  console.log(response);
  return response.json();
  })
  .then(printStock).catch(err => {
    console.log(err);
    alert('Cannot find a stock with this id! Taking you back.');
    window.history.back();
    });
 }
function printStock(stockData) {
  console.log(stockData);

  stockId = stockData._id;

  const { stockName, createdBy, createdAt, currentPrice,soldPrice,boughtPrice, comments } = stockData;

  $stockName.textContent = stockName;
  $createdBy.textContent = createdBy;
  $createdAt.textContent = createdAt;
  $boughtPrice.textContent=boughtPrice;
  $currentPrice.textContent=currentPrice;
  $soldPrice.textContent=soldPrice;
// $size.textContent = size;


  // $toppingsList.innerHTML = toppings
  //   .map(topping => `<span class="col-auto m-2 text-center btn">${topping}</span>`)
  //   .join('');

  if (comments && comments.length) {
    comments.forEach(printComment);
  } else {
    $commentSection.innerHTML = '<h4 class="bg-dark p-3 rounded">No comments yet!</h4>';
  }
}

function printComment(comment) {
  // make div to hold comment and subcomments
  const commentDiv = document.createElement('div');
  commentDiv.classList.add('my-2', 'card', 'p-2', 'w-100', 'text-dark', 'rounded');

  const commentContent = `
      <h5 class="text-dark">${comment.writtenBy} commented on ${comment.createdAt}:</h5>
      <p>${comment.commentBody}</p>
      <div class="bg-dark ml-3 p-2 rounded" >
        ${
          comment.replies && comment.replies.length
            ? `<h5>${comment.replies.length} ${
                comment.replies.length === 1 ? 'Reply' : 'Replies'
              }</h5>
        ${comment.replies.map(printReply).join('')}`
            : '<h5 class="p-1">No replies yet!</h5>'
        }
      </div>
      <form class="reply-form mt-3" data-commentid='${comment._id}'>
        <div class="mb-3">
          <label for="reply-name">Leave Your Name</label>
          <input class="form-input" name="reply-name" required />
        </div>
        <div class="mb-3">
          <label for="reply">Leave a Reply</label>
          <textarea class="form-textarea form-input"  name="reply" required></textarea>
        </div>

        <button class="mt-2 btn display-block w-100">Add Reply</button>
      </form>
  `;

  commentDiv.innerHTML = commentContent;
  $commentSection.prepend(commentDiv);
}

function printReply(reply) {
  return `
  <div class="card p-2 rounded bg-secondary">
    <p>${reply.writtenBy} replied on ${reply.createdAt}:</p>
    <p>${reply.replyBody}</p>
  </div>
`;
}

function handleNewCommentSubmit(event) {
  event.preventDefault();
  const commentBody = $newCommentForm.querySelector('#comment').value;
  const writtenBy = $newCommentForm.querySelector('#written-by').value;
  if (!commentBody || !writtenBy) {
  return false;
  }
  const formData = { commentBody, writtenBy };
  fetch(`/api/comments/${stockId}`, {
  method: 'POST',
  headers: {
  Accept: 'application/json',
  'Content-Type': 'application/json'
  },
  body: JSON.stringify(formData)
  })
  .then(response => {
  if (!response.ok) {
  throw new Error('Something went wrong!');
  }
  response.json();
  })
  .then(commentResponse => {
  console.log(commentResponse);
  location.reload();
  })
  .catch(err => {
  console.log(err);
  });
 }
 

 function handleNewReplySubmit(event) {
  event.preventDefault();
  if (!event.target.matches('.reply-form')) {
  return false;
  }
  const commentId = event.target.getAttribute('data-commentid');
  const writtenBy = event.target.querySelector('[name=reply-name]').value;
  const replyBody = event.target.querySelector('[name=reply]').value;
  if (!replyBody || !writtenBy) {
  return false;
  }
  const formData = { writtenBy, replyBody };
  fetch(`/api/comments/${stockId}/${commentId}`, {
  method: 'PUT',
  headers: {
  Accept: 'application/json',
  'Content-Type': 'application/json'
  },
  body: JSON.stringify(formData)
  })
  .then(response => {
  if (!response.ok) {
  throw new Error('Something went wrong!');
  }
  response.json();
  })
  .then(commentResponse => {
  console.log(commentResponse);
  location.reload();
  })
  .catch(err => {
  console.log(err);
  });
 }
 
$backBtn.addEventListener('click', function() {
  window.history.back();
} 
);

$newCommentForm.addEventListener('submit', handleNewCommentSubmit);
$commentSection.addEventListener('submit', handleNewReplySubmit);
getStocks();