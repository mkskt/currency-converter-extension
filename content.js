const symbolMap = {
    '$': 'USD', '€': 'EUR', '£': 'GBP', 'ZŁ': 'PLN', '¥': 'JPY',
    '₹': 'INR', '₩': 'KRW', 'A$': 'AUD', 'C$': 'CAD'
};

const currencyRegex = /(?:(\$|€|£|zł|¥|₹|₩|A\$|C\$|[A-Z]{3})\s*([0-9]+(?:(?:[\s\xA0\u202F]+|[.,])[0-9]+)*))|(([0-9]+(?:(?:[\s\xA0\u202F]+|[.,])[0-9]+)*)\s*(\$|€|£|zł|¥|₹|₩|A\$|C\$|[A-Z]{3}))/i;
let tooltip = null;

function parseGlobalFloat(numStr) {
    let cleaned = numStr.replace(/[\s\xA0\u202F]/g, '');
    const commaIdx = cleaned.lastIndexOf(',');
    const dotIdx = cleaned.lastIndexOf('.');
    
    if (commaIdx > dotIdx) {
        cleaned = cleaned.replace(/\./g, '').replace(',', '.');
    } else {
        cleaned = cleaned.replace(/,/g, '');
    }
    return parseFloat(cleaned);
}

function animateNumbers(container) {
    const elements = container.querySelectorAll('.currency-stack-val');
    elements.forEach(el => {
        const target = parseFloat(el.getAttribute('data-value'));
        const duration = 400;
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutQuad = progress * (2 - progress);
            const currentVal = easeOutQuad * target;
            
            el.textContent = currentVal.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        requestAnimationFrame(update);
    });
}

document.addEventListener('mousedown', (e) => {
    if (tooltip && !tooltip.contains(e.target)) {
        tooltip.remove();
        tooltip = null;
    }
});

document.addEventListener('mouseup', (e) => {
    setTimeout(() => {
        const selectedText = window.getSelection().toString().trim();
        if (!selectedText) {
            if (tooltip && !tooltip.contains(e.target)) {
                tooltip.remove();
                tooltip = null;
            }
            return;
        }

        const match = selectedText.match(currencyRegex);
        if (!match) return;

        const currentHost = window.location.hostname.toLowerCase();
        const currentUrl = window.location.href.toLowerCase();

        chrome.storage.sync.get({targetCurrencies: ['EUR'], modifierKey: 'none', blacklist: []}, (settings) => {
            if (settings.modifierKey === 'ctrl' && !e.ctrlKey) return;
            if (settings.modifierKey === 'alt' && !e.altKey) return;
            if (settings.modifierKey === 'shift' && !e.shiftKey) return;

            if (settings.blacklist) {
                // Read array chips cleanly; migrate string split seamlessly if old configuration structure exists
                const entries = Array.isArray(settings.blacklist)
                    ? settings.blacklist.map(d => d.trim().toLowerCase()).filter(Boolean)
                    : settings.blacklist.split('\n').map(d => d.trim().toLowerCase()).filter(Boolean);
                
                const isBlocked = entries.some(entry => {
                    if (entry.startsWith('http://') || entry.startsWith('https://')) {
                        return currentUrl.startsWith(entry);
                    }
                    
                    const domainPart = entry.split('/')[0];
                    if (currentHost === domainPart || currentHost.endsWith('.' + domainPart)) {
                        if (entry.includes('/')) {
                            return currentUrl.includes(entry);
                        }
                        return true; 
                    }
                    return false;
                });

                if (isBlocked) return;
            }

            const rawCurrency = (match[1] || match[5]).toUpperCase();
            const rawAmount = match[2] || match[4];
            
            const amount = parseGlobalFloat(rawAmount);
            if (isNaN(amount)) return;

            const fromCurrency = symbolMap[rawCurrency] || rawCurrency;

            chrome.storage.local.get(["exchangeRates", "lastUpdated"], (localData) => {
                const rates = localData.exchangeRates;
                const targetList = settings.targetCurrencies;

                if (!rates || !rates[fromCurrency]) return;

                let outputHTML = `<div class="currency-stack-container">`;
                let convertedCount = 0;

                targetList.forEach(toCurrency => {
                    if (!rates[toCurrency] || fromCurrency === toCurrency) return;

                    const amountInUSD = amount / rates[fromCurrency];
                    const finalAmount = amountInUSD * rates[toCurrency];

                    outputHTML += `
                        <div class="currency-stack-row">
                            <span class="currency-stack-val" data-value="${finalAmount}">0.00</span>
                            <span class="currency-stack-code">${toCurrency}</span>
                        </div>
                    `;
                    convertedCount++;
                });

                if (convertedCount === 0) return;

                const ONE_DAY = 24 * 60 * 60 * 1000;
                if (localData.lastUpdated && (Date.now() - localData.lastUpdated > ONE_DAY)) {
                    outputHTML += `<div class="currency-stack-warning">⚠️ Outdated rates</div>`;
                }

                outputHTML += `</div>`;
                showTooltip(e.pageX, e.pageY, outputHTML);
            });
        });
    }, 10); 
});

function showTooltip(x, y, htmlContent) {
    if (tooltip) tooltip.remove();
    
    tooltip = document.createElement('div');
    tooltip.className = 'currency-converter-tooltip';
    tooltip.innerHTML = htmlContent;
    
    document.body.appendChild(tooltip);

    tooltip.addEventListener('click', (ev) => {
        const row = ev.target.closest('.currency-stack-row');
        if (!row) return;

        const valEl = row.querySelector('.currency-stack-val');
        const codeEl = row.querySelector('.currency-stack-code');
        if (!valEl || !codeEl) return;

        const targetVal = parseFloat(valEl.getAttribute('data-value')).toFixed(2);
        
        navigator.clipboard.writeText(targetVal).then(() => {
            const oldText = codeEl.textContent;
            const oldBg = codeEl.style.background;
            const oldColor = codeEl.style.color;
            
            codeEl.textContent = 'Copied!';
            codeEl.style.background = '#16a34a';
            codeEl.style.color = '#ffffff';
            
            setTimeout(() => {
                codeEl.textContent = oldText;
                codeEl.style.background = oldBg;
                codeEl.style.color = oldColor;
            }, 1000);
        });
    });

    const rect = tooltip.getBoundingClientRect();
    let calculatedLeft = x + 10;
    let calculatedTop = y - rect.height - 10;

    if (calculatedLeft + rect.width > window.innerWidth + window.scrollX) {
        calculatedLeft = x - rect.width - 10;
    }
    if (calculatedTop < window.scrollY) {
        calculatedTop = y + 15;
    }

    tooltip.style.left = `${Math.max(10, calculatedLeft)}px`;
    tooltip.style.top = `${Math.max(10, calculatedTop)}px`;
    
    setTimeout(() => tooltip.classList.add('visible'), 10);
    animateNumbers(tooltip);
}