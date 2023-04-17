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
    <div class="col-12 col-lg-6 flex-row box" style="border:20px solid black;border-radius:7px;">
      <div class="card w-100 flex-column">
        <h3 class="card-header">${stockName}</h3>
        <div class="card-body flex-column col-auto">
          <h4 class="text-dark">By <b>${createdBy}</b></h4>
          <p>${createdAt}</p>
          
          <p><b>${commentCount}</b> Comments</p>
          <p><b>currentPrice:</b>${currentPrice}</p>
          <p><b>Sold Price:</b>${soldPrice}</p>
          <p><b>Bought Price:</b>${boughtPrice}</p>  
          <ul>
          </ul>
          <a class="btn display-block w-100 mt-auto" href="/stock?id=${_id}" style="font-weight:bold;text-decoration:underline">See the discussion.</a>
        </div>
      </div>
    </div>
  `;

  $stocksList.innerHTML += stocksCard;
};


getStocksList();
