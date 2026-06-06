const API_URL = "https://open.er-api.com/v6/latest/USD";
const ONE_DAY = 24 * 60 * 60 * 1000;

async function updateExchangeRates() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        if (data?.rates) {
            await chrome.storage.local.set({
                exchangeRates: data.rates,
                lastUpdated: Date.now()
            });
            console.log("Exchange rates updated successfully.");
        }
    } catch (error) {
        console.error("Error fetching exchange rates:", error);
    }
}


chrome.storage.local.get(["lastUpdated", "exchangeRates"]).then((data) => {
    const isMissingData = !data.exchangeRates || !data.lastUpdated;
    const isExpired = Date.now() - data.lastUpdated > ONE_DAY;

    if (isMissingData || isExpired) {
        updateExchangeRates();
    }
});