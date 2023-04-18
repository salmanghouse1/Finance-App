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
  <div class="column is-1"></div>
  <div class="column is-2 notification is-warning">
   
          <p class="title">${stockName}.</p>
          <p class="subtitle">${createdBy}-${createdAt}</p>
          <p class="subtitle"># of Comments:${commentCount}</p>
          <p class="subtitle"><b>currentPrice:</b>${currentPrice}</p>
          <p class="subtitle"> <b>Sold Price:</b>${soldPrice}</p>
          <p class="subtitle"><b>Bought Price:</b>${boughtPrice}</p>    
          <a class="btn display-block w-100 mt-auto" href="/stock?id=${_id}">See the discussion.</a>
          </div>

          <div class="column is-1"></div>

  `;

  $stocksList.innerHTML += stocksCard;

};


getStocksList();
