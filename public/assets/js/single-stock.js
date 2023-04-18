
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


function getStock() {
  // get id of pizza

  const searchParams = new URLSearchParams(document.location.search.substring(1));
  
  console.log(JSON.stringify(searchParams));
  const stockId = searchParams.get('id');
  // get pizzaInfo
  fetch(`/api/stocks/${stockId}`)
  .then(response => {
  
  if (!response.ok) {
    throw new Error({ message: 'Something went wrong!' });
    }
   return response.json();
    })
    .then(printStock)
    .catch(err => {
      console.log(err);
      alert('Cannot find a stock with this id! Taking you back.');
      
 window.history.back();

      });
     
}

function printStock(pizzaData) {
  console.log(pizzaData);

  pizzaId = pizzaData._id;

  const { pizzaName, createdBy, createdAt,currentPrice,soldPrice,boughtPrice,comments } = pizzaData;

  $stockName.textContent = pizzaName;
  $createdBy.textContent = createdBy;
  $createdAt.textContent = createdAt;
  $currentPrice.textContent = currentPrice;
  $soldPrice.textContent = soldPrice;
  $boughtPrice.textContent = boughtPrice;
  

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
  <article class="media">
  <figure class="media-left">
    <p class="image is-64x64">
      <img src="https://bulma.io/images/placeholders/128x128.png">
    </p>
  </figure>
  <div class="media-content">
    <div class="content">
      <p>
        <strong>${comment.writtenBy} commented on ${comment.createdAt}:</strong>
        <br>
       ${comment.commentBody}
        <br>
        <small><a>Like</a> · <a>Reply</a> · 3 hrs</small>
      </p>
      ${
        comment.replies && comment.replies.length
          ? `<h5>${comment.replies.length} ${
              comment.replies.length === 1 ? 'Reply' : 'Replies'
            }</h5>
      ${comment.replies.map(printReply).join('')}`
          : '<h5 class="p-1">No replies yet!</h5>'
      }
    </div>
</article>
<article class="media">
  <figure class="media-left">
    <p class="image is-64x64">
      <img src="https://bulma.io/images/placeholders/128x128.png">
    </p>
  </figure>
  <div class="media-content">
  <form class="reply-form mt-3" data-commentid='${comment._id}'>
  <div class="field">
    <label for="reply-name">Leave Your Name</label>
    <input class="form-input" name="reply-name" required />
  </div>
  <div class="field">
  <p class="control">
    <label for="reply">Leave a Reply</label>
    <textarea class="form-textarea form-input"  name="reply" required></textarea>
  </p>
    </div>
    <div class="field">
      <p class="control">
        <button class="button">Add A Reply</button>
      </p>
    </div>
  </div>
</form>

</article>
    


      <h5 class="text-dark">${comment.writtenBy} commented on ${comment.createdAt}:</h5>
      <p>${comment.commentBody}</p>
      <div class="bg-dark ml-3 p-2 rounded" >
        
      </div>
     
  `;

  commentDiv.innerHTML = commentContent;
  $commentSection.prepend(commentDiv);
}

function printReply(reply) {
  return `
  <article class="media">
      <figure class="media-left">
        <p class="image is-48x48">
          <img src="https://bulma.io/images/placeholders/96x96.png">
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <p>
            <strong>${reply.writtenBy} replied on ${reply.createdAt}:</strong>
            <br>
            ${reply.replyBody}
            <br>
            <small><a>Like</a> · <a>Reply</a> · 2 hrs</small>
          </p>
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
getStock();