
const $stocksForm = document.querySelector('#stocks-form');
const $customToppingsList = document.querySelector('#custom-toppings-list');


const handlePizzaSubmit = event => {
  event.preventDefault();

  const stockName = $stocksForm.querySelector('#stock-name').value;
  const createdBy = $stocksForm.querySelector('#created-by').value;
  const boughtPrice = $stocksForm.querySelector('#bought-price').value;
  const soldPrice = $stocksForm.querySelector('#sold-price').value;
  const currentPrice = $stocksForm.querySelector('#current-price').value;
 
  if (!stockName || !createdBy) {
    return;
  }

  const formData = { stockName, createdBy, boughtPrice, soldPrice,currentPrice };
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

$stocksForm.addEventListener('submit', handlePizzaSubmit);
