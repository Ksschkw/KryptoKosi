let allCoins = [];

// Fetch Top 100 Coins
async function fetchCryptoData() {
    try {
        const response = await fetch(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        );
        const data = await response.json();
        allCoins = data;
        renderCoins(allCoins);
    } catch (error) {
        console.error("Failed to fetch data:", error);
    }
}

// Render Coins
function renderCoins(coins) {
    const pricesDiv = document.getElementById("prices");
    pricesDiv.innerHTML = coins.map(coin => `
        <div class="price-item">
            <div class="coin-info">
                <img src="${coin.image}" alt="${coin.name}" class="coin-icon">
                <span>${coin.name} (${coin.symbol.toUpperCase()})</span>
            </div>
            <div class="coin-stats">
                <span>$${coin.current_price.toLocaleString()}</span>
                <span>Rank #${coin.market_cap_rank}</span>
            </div>
        </div>
    `).join("");
}

// Sorting
function sortCoins(criteria) {
    let sorted = [...allCoins];
    if (criteria === 'market_cap') {
        sorted.sort((a, b) => b.market_cap - a.market_cap);
    } else if (criteria === 'trending') {
        sorted.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
    }
    renderCoins(sorted);
}

// Search
document.getElementById("searchInput").addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = allCoins.filter(coin => 
        coin.name.toLowerCase().includes(term) || 
        coin.symbol.toLowerCase().includes(term)
    );
    renderCoins(filtered);
});

// Initial Load
fetchCryptoData();