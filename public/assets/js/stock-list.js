const $stocksList = document.querySelector('#stocks-list');

const getStocksList = () => {
  fetch('/api/stocks')
  .then(response => response.json())
  .then(pizzaListArr => {
  pizzaListArr.forEach(printStock);
  })
  .catch(err => {
  console.log(err);
  });
}
//  

/* <h5 class="text-dark">Bought Price: ${boughtPrice}</h5>
          
<h5 class="text-dark">Sold Price: ${SoldPrice}</h5>

<h5 class="text-dark">Current Price: ${CurrentPrice}</h5> */

const printStock = ({ _id, stockName, createdBy, createdAt,currentPrice,soldPrice,boughtPrice,commentCount}) => {
  const stocksCard = `
    <div class="col-12 col-lg-6 flex-row">
      <div class="card w-100 flex-column">
        <h3 class="card-header">${stockName}</h3>
        <div class="card-body flex-column col-auto">
          <h4 class="text-dark">By ${createdBy}</h4>
          <p>On ${createdAt}</p>
          
          <p>${commentCount} Comments</p>
          <p>${currentPrice}</p>
          <p>${soldPrice}</p>
          <p>${boughtPrice}</p>  
          <ul>
          </ul>
          <a class="btn display-block w-100 mt-auto" href="/stock?id=${_id}">See the discussion.</a>
        </div>
      </div>
    </div>
  `;

  $stocksList.innerHTML += stocksCard;
};


getStocksList();
