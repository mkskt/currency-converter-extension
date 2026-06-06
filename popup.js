const currencies = {
    "AED": "UAE Dirham", "AFN": "Afghan Afghani", "ALL": "Albanian Lek", "AMD": "Armenian Dram", "ANG": "Netherlands Antillian Guilder", 
    "AOA": "Angolan Kwanza", "ARS": "Argentine Peso", "AUD": "Australian Dollar", "AWG": "Aruban Florin", "AZN": "Azerbaijani Manat", 
    "BAM": "Bosnia-Herzegovina Mark", "BBD": "Barbados Dollar", "BDT": "Bangladeshi Taka", "BGN": "Bulgarian Lev", "BHD": "Bahraini Dinar", 
    "BIF": "Burundian Franc", "BMD": "Bermudian Dollar", "BND": "Brunei Dollar", "BOB": "Bolivian Boliviano", "BRL": "Brazilian Real", 
    "BSD": "Bahamian Dollar", "BTN": "Bhutanese Ngultrum", "BWP": "Botswana Pula", "BYN": "Belarusian Ruble", "BZD": "Belize Dollar", 
    "CAD": "Canadian Dollar", "CDF": "Congolese Franc", "CHF": "Swiss Franc", "CLP": "Chilean Peso", "CNY": "Chinese Renminbi", 
    "COP": "Colombian Peso", "CRC": "Costa Rican Colon", "CUP": "Cuban Peso", "CVE": "Cape Verdean Escudo", "CZK": "Czech Koruna", 
    "DJF": "Djiboutian Franc", "DKK": "Danish Krone", "DOP": "Dominican Peso", "DZD": "Algerian Dinar", "EGP": "Egyptian Pound", 
    "ERN": "Eritrean Nakfa", "ETB": "Ethiopian Birr", "EUR": "Euro", "FJD": "Fiji Dollar", "FKP": "Falkland Islands Pound", 
    "FOK": "Faroese Króna", "GBP": "British Pound", "GEL": "Georgian Lari", "GGP": "Guernsey Pound", "GHS": "Ghanaian Cedi", 
    "GIP": "Gibraltar Pound", "GMD": "Gambian Dalasi", "GNF": "Guinean Franc", "GTQ": "Guatemalan Quetzal", "GYD": "Guyanese Dollar", 
    "HKD": "Hong Kong Dollar", "HNL": "Honduran Lempira", "HRK": "Croatian Kuna", "HTG": "Haitian Gourde", "HUF": "Hungarian Forint", 
    "IDR": "Indonesian Rupiah", "ILS": "Israeli New Shekel", "IMP": "Manx Pound", "INR": "Indian Rupee", "IQD": "Iraqi Dinar", 
    "ISK": "Icelandic Króna", "JEP": "Jersey Pound", "JMD": "Jamaican Dollar", "JOD": "Jordanian Dinar", "JPY": "Japanese Yen", 
    "KES": "Kenyan Shilling", "KGS": "Kyrgyzstani Som", "KHR": "Cambodian Riel", "KID": "Kiribati Dollar", "KMF": "Comorian Franc", 
    "KRW": "South Korean Won", "KWD": "Kuwaiti Dinar", "KYD": "Cayman Islands Dollar", "KZT": "Kazakhstani Tenge", "LAK": "Lao Kip", 
    "LBP": "Lebanese Pound", "LKR": "Sri Lanka Rupee", "LRD": "Liberian Dollar", "LSL": "Lesotho Loti", "LYD": "Libyan Dinar", 
    "MAD": "Moroccan Dirham", "MDL": "Moldovan Leu", "MGA": "Malagasy Ariary", "MKD": "Macedonian Denar", "MMK": "Burmese Kyat", 
    "MNT": "Mongolian Tögrög", "MOP": "Macanese Pataca", "MRU": "Mauritanian Ouguiya", "MUR": "Mauritian Rupee", "MVR": "Maldivian Rufiyaa", 
    "MWK": "Malawian Kwacha", "MXN": "Mexican Peso", "MYR": "Malaysian Ringgit", "MZN": "Mozambican Metical", "NAD": "Namibian Dollar", 
    "NGN": "Nigerian Naira", "NIO": "Nicaraguan Córdoba", "NOK": "Norwegian Krone", "NPR": "Nepalese Rupee", "NZD": "New Zealand Dollar", 
    "OMR": "Omani Rial", "PAB": "Panamanian Balboa", "PEN": "Peruvian Sol", "PGK": "Papua New Guinean Kina", "PHP": "Philippine Peso", 
    "PKR": "Pakistani Rupee", "PLN": "Polish Złoty", "PYG": "Paraguayan Guaraní", "QAR": "Qatari Riyal", "RON": "Romanian Leu", 
    "RSD": "Serbian Dinar", "RUB": "Russian Ruble", "RWF": "Rwandan Franc", "SAR": "Saudi Riyal", "SBD": "Solomon Islands Dollar", 
    "SCR": "Seychellois Rupee", "SDG": "Sudanese Pound", "SEK": "Swedish Krona", "SGD": "Singapore Dollar", "SHP": "Saint Helena Pound", 
    "SLE": "Sierra Leonean Leone", "SOS": "Somali Shilling", "SRD": "Surinamese Dollar", "SSP": "South Sudanese Pound", "STN": "São Tomé Dobra", 
    "SYP": "Syrian Pound", "SZL": "Eswatini Lilangeni", "THB": "Thai Baht", "TJS": "Tajikistani Somoni", "TMT": "Turkmenistan Manat", 
    "TND": "Tunisian Dinar", "TOP": "Tongan Paʻanga", "TRY": "Turkish Lira", "TTD": "Trinidad Dollar", "TVD": "Tuvaluan Dollar", 
    "TWD": "New Taiwan Dollar", "TZS": "Tanzanian Shilling", "UAH": "Ukrainian Hryvnia", "UGX": "Ugandan Shilling", "USD": "United States Dollar", 
    "UYU": "Uruguayan Peso", "UZS": "Uzbekistani Som", "VES": "Venezuelan Bolívar", "VND": "Vietnamese Đồng", "VUV": "Vanuatu Vatu", 
    "WST": "Samoan Tala", "XAF": "Central African CFA", "XCD": "East Caribbean Dollar", "XDR": "Special Drawing Rights", "XOF": "West African CFA", 
    "XPF": "CFP Franc", "YER": "Yemeni Rial", "ZAR": "South African Rand", "ZMW": "Zambian Kwacha", "ZWL": "Zimbabwean Dollar"
};

const sortedCurrencyArray = Object.keys(currencies).map(code => ({
    code: code,
    name: currencies[code]
})).sort((a, b) => a.name.localeCompare(b.name));

let selectedCurrencies = ["EUR"];
let currentView = "currencies";
let activeTutorialStep = 0;

document.addEventListener('DOMContentLoaded', () => {
    const listContainer = document.getElementById('currencyList');
    const searchInput = document.getElementById('searchInput');
    const saveCurrenciesBtn = document.getElementById('saveCurrenciesBtn');
    const saveSettingsBtn = document.getElementById('saveSettingsBtn');
    const themeToggle = document.getElementById('themeToggle');
    const infoToggle = document.getElementById('infoToggle');
    const settingsToggle = document.getElementById('settingsToggle');
    const viewTitle = document.getElementById('viewTitle');
    const navActions = document.getElementById('navActions');
    const updateTimestamp = document.getElementById('updateTimestamp');
    
    const currenciesView = document.getElementById('currenciesView');
    const infoView = document.getElementById('infoView');
    const settingsView = document.getElementById('settingsView');
    const tutorialView = document.getElementById('tutorialView');
    
    const modifierKeySelect = document.getElementById('modifierKey');
    const blacklistTextarea = document.getElementById('blacklistDomains');
    const restartTutorialBtn = document.getElementById('restartTutorialBtn');
    
    const backTutorialBtn = document.getElementById('backTutorialBtn');
    const skipTutorialBtn = document.getElementById('skipTutorialBtn');
    const nextTutorialBtn = document.getElementById('nextTutorialBtn');
    const tutorialIndicator = document.getElementById('tutorialIndicator');
    const steps = document.querySelectorAll('.tutorial-step');

    chrome.storage.sync.get({
        targetCurrencies: ["EUR"], 
        theme: "light",
        modifierKey: "none",
        blacklist: "",
        onboarded: false,
        lastUpdated: new Date().toLocaleString()
    }, (data) => {
        selectedCurrencies = data.targetCurrencies;
        modifierKeySelect.value = data.modifierKey;
        blacklistTextarea.value = data.blacklist;
        updateTimestamp.innerText = `Rates updated: ${data.lastUpdated}`;
        
        if (data.theme === 'dark') {
            document.body.classList.add('dark');
            themeToggle.innerText = "☀️";
        }
        
        if (!data.onboarded) {
            launchOnboarding();
        } else {
            renderList(""); 
        }
    });

    themeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark');
        themeToggle.innerText = isDark ? "☀️" : "🌙";
        chrome.storage.sync.set({ theme: isDark ? 'dark' : 'light' });
    });

    function switchView(target) {
        if (currentView === "tutorial") return;
        
        if (currentView === target) {
            currenciesView.style.display = 'block';
            infoView.style.display = 'none';
            settingsView.style.display = 'none';
            viewTitle.innerText = 'Target Currencies';
            infoToggle.innerText = 'ℹ️';
            settingsToggle.innerText = '⚙️';
            currentView = "currencies";
        } else {
            currenciesView.style.display = target === 'currencies' ? 'block' : 'none';
            infoView.style.display = target === 'info' ? 'block' : 'none';
            settingsView.style.display = target === 'settings' ? 'block' : 'none';
            
            infoToggle.innerText = target === 'info' ? '⬅️' : 'ℹ️';
            settingsToggle.innerText = target === 'settings' ? '⬅️' : '⚙️';
            
            if (target === 'info') viewTitle.innerText = 'About';
            else if (target === 'settings') viewTitle.innerText = 'Advanced';
            else viewTitle.innerText = 'Target Currencies';
            
            currentView = target;
        }
    }

    infoToggle.addEventListener('click', () => switchView('info'));
    settingsToggle.addEventListener('click', () => switchView('settings'));
    restartTutorialBtn.addEventListener('click', () => launchOnboarding());

    function launchOnboarding() {
        currentView = "tutorial";
        currenciesView.style.display = 'none';
        infoView.style.display = 'none';
        settingsView.style.display = 'none';
        tutorialView.style.display = 'block';
        navActions.style.visibility = 'hidden';
        viewTitle.innerText = 'Welcome Tour';
        displayStep(0);
    }

    function displayStep(index) {
        activeTutorialStep = index;
        steps.forEach((step, i) => {
            step.style.display = i === index ? 'block' : 'none';
        });
        
        if (index === 0) {
            backTutorialBtn.style.display = 'none';
        } else {
            backTutorialBtn.style.display = 'inline-block';
        }
        
        tutorialIndicator.innerText = `Feature ${index + 1} of 4`;
        nextTutorialBtn.innerText = index === 3 ? 'Finish' : 'Next';
    }

    nextTutorialBtn.addEventListener('click', () => {
        if (activeTutorialStep < 3) {
            displayStep(activeTutorialStep + 1);
        } else {
            completeOnboarding();
        }
    });

    backTutorialBtn.addEventListener('click', () => {
        if (activeTutorialStep > 0) {
            displayStep(activeTutorialStep - 1);
        }
    });

    skipTutorialBtn.addEventListener('click', completeOnboarding);

    function completeOnboarding() {
        chrome.storage.sync.set({ onboarded: true }, () => {
            currentView = "currencies";
            tutorialView.style.display = 'none';
            currenciesView.style.display = 'block';
            navActions.style.visibility = 'visible';
            infoToggle.innerText = 'ℹ️';
            settingsToggle.innerText = '⚙️';
            viewTitle.innerText = 'Target Currencies';
            renderList("");
        });
    }

    function renderList(filterText) {
        listContainer.innerHTML = "";
        const lowerFilter = filterText.toLowerCase();

        const selectedGroup = [];
        const unselectedGroup = [];

        sortedCurrencyArray.forEach(currency => {
            if (!currency.code.toLowerCase().includes(lowerFilter) && 
                !currency.name.toLowerCase().includes(lowerFilter)) {
                return; 
            }

            if (selectedCurrencies.includes(currency.code)) {
                selectedGroup.push(currency);
            } else {
                unselectedGroup.push(currency);
            }
        });

        [...selectedGroup, ...unselectedGroup].forEach(currency => {
            const div = document.createElement('div');
            div.className = 'currency-item';
            
            if (selectedCurrencies.includes(currency.code)) {
                div.classList.add('selected');
            }

            div.innerHTML = `
                <span class="currency-name">${currency.name}</span>
                <span class="currency-code">${currency.code}</span>
            `;

            div.addEventListener('click', () => {
                if (selectedCurrencies.includes(currency.code)) {
                    selectedCurrencies = selectedCurrencies.filter(c => c !== currency.code);
                } else {
                    selectedCurrencies.push(currency.code);
                }
                renderList(searchInput.value); 
            });

            listContainer.appendChild(div);
        });
    }

    searchInput.addEventListener('input', (e) => renderList(e.target.value));

    saveCurrenciesBtn.addEventListener('click', () => {
        if (selectedCurrencies.length === 0) selectedCurrencies = ["EUR"];
        chrome.storage.sync.set({targetCurrencies: selectedCurrencies}, () => {
            saveCurrenciesBtn.innerText = "Changes Saved";
            saveCurrenciesBtn.style.background = "#16a34a"; 
            setTimeout(() => {
                saveCurrenciesBtn.innerText = "Save Preferences";
                saveCurrenciesBtn.style.background = "#2563eb"; 
            }, 1500);
        });
    });

    saveSettingsBtn.addEventListener('click', () => {
        chrome.storage.sync.set({
            modifierKey: modifierKeySelect.value,
            blacklist: blacklistTextarea.value
        }, () => {
            saveSettingsBtn.innerText = "Settings Saved";
            saveSettingsBtn.style.background = "#16a34a"; 
            setTimeout(() => {
                saveSettingsBtn.innerText = "Save Advanced Settings";
                saveSettingsBtn.style.background = "#2563eb"; 
            }, 1500);
        });
    });
});