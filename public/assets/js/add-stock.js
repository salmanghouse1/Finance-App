

const $stockForm = document.querySelector('#stock-form');



const handleStockSubmit = event => {
  event.preventDefault();

  const stockName = $stockForm.querySelector('#stock-name').value;
  const createdBy = $stockForm.querySelector('#created-by').value;
  const currentPrice = $stockForm.querySelector('#current-price').value;
  const soldPrice = $stockForm.querySelector('#sold-price').value;
  const boughtPrice = $stockForm.querySelector('#bought-price').value;
  

  if (!stockName || !createdBy) {
    return;
  }

  const formData = { stockName, createdBy, currentPrice,soldPrice, boughtPrice };
  fetch('/api/stocks', {
    method: 'POST',
    headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
   })
    .then(response => response.json())
    .then(postResponse => {
    alert('Stock created successfully!');
    console.log(postResponse);
    })
    .catch(err => {
    console.log(err);
    })   
};

$stockForm.addEventListener('submit', handleStockSubmit);

