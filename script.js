// Fetching data using async/await
async function fetchDataWithAsyncAwait() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        const data = await response.json();
        console.log(data); // Print data to console to verify
        renderDataInTable(data); // Render the data in the table
        window.data = data;  // Store the data globally for filtering and sorting
    } catch (error) {
        console.error('Error fetching data:', error); // Handle any errors
    }
}

// Fetching data using .then() method
function fetchDataWithThen() {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
        .then(response => response.json()) // Parse the JSON response
        .then(data => {
            console.log(data); // Print data to console to verify
            renderDataInTable(data); // Render the data in the table
            window.data = data;  // Store the data globally for filtering and sorting
        })
        .catch(error => console.error('Error fetching data:', error)); // Handle any errors
}

// Render Data in the Table
function renderDataInTable(data) {
    const tableBody = document.querySelector('#crypto-table tbody');  // Select the table body
    tableBody.innerHTML = '';  // Clear any existing rows

    // Loop through the data array and create a table row for each cryptocurrency
    data.forEach(coin => {
        const row = document.createElement('tr');  // Create a new row for each coin
        row.innerHTML = `
       
        <td><img src="${coin.image}" alt="${coin.name}" width="50" height="50"></td>
         <td>${coin.name}</td>
        <td>${coin.symbol}</td>
        <td>$${coin.current_price.toLocaleString()}</td>  <!-- Format the price -->
        <td>${coin.total_volume.toLocaleString()}</td>  <!-- Format the volume -->
      `;
        tableBody.appendChild(row);  // Append the row to the table body
    });
}

// Filter the table based on the input field
document.querySelector('#search-input').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();  // Get the input value
    const filteredData = window.data.filter(coin =>
        coin.name.toLowerCase().includes(searchTerm) || coin.symbol.toLowerCase().includes(searchTerm)
    );
    renderDataInTable(filteredData);  // Render filtered data
});

// Sorting by Market Cap
document.querySelector('#sort-market-cap').addEventListener('click', () => {
    const sortedData = [...window.data].sort((a, b) => b.market_cap - a.market_cap);
    renderDataInTable(sortedData);  // Render sorted data
});

// Sorting by 24h Percentage Change
document.querySelector('#sort-percent-change').addEventListener('click', () => {
    const sortedData = [...window.data].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
    renderDataInTable(sortedData);  // Render sorted data
});

// Fetch and render data initially using async/await
fetchDataWithAsyncAwait();

// OR you can use fetchDataWithThen() instead if you prefer .then()
// fetchDataWithThen();
