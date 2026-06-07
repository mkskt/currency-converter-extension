document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('url-input');
    const addBtn = document.getElementById('add-btn');
    const chipsContainer = document.getElementById('chips-container');
    
    let blacklist = [];

    // 1. Fetch current metrics and theme options on load
    chrome.storage.sync.get({ blacklist: [], theme: "light" }, (settings) => {
        // Apply saved system UI profile inheritance 
        if (settings.theme === 'dark') {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }

        // Keep legacy text configurations safe during migrations
        if (typeof settings.blacklist === 'string') {
            blacklist = settings.blacklist.split('\n').map(d => d.trim()).filter(Boolean);
        } else if (Array.isArray(settings.blacklist)) {
            blacklist = settings.blacklist;
        }
        renderChips();
    });

    // 2. Render configuration components
    function renderChips() {
        chipsContainer.innerHTML = '';
        
        if (blacklist.length === 0) {
            chipsContainer.innerHTML = '<div class="empty-state">Your blacklist is empty. The converter is globally active.</div>';
            return;
        }

        blacklist.forEach((url, index) => {
            const chip = document.createElement('div');
            chip.className = 'chip';
            chip.textContent = url;

            const removeBtn = document.createElement('span');
            removeBtn.className = 'remove-btn';
            removeBtn.textContent = '×';
            removeBtn.addEventListener('click', () => {
                removeUrl(index);
            });

            chip.appendChild(removeBtn);
            chipsContainer.appendChild(chip);
        });
    }

    // 3. Append matching entries
    function addUrl() {
        const value = urlInput.value.trim();
        if (!value) return;

        if (!blacklist.includes(value)) {
            blacklist.push(value);
            chrome.storage.sync.set({ blacklist: blacklist }, () => {
                renderChips();
                urlInput.value = '';
            });
        } else {
            urlInput.value = '';
        }
    }

    // 4. Drop indices dynamically
    function removeUrl(index) {
        blacklist.splice(index, 1);
        chrome.storage.sync.set({ blacklist: blacklist }, () => {
            renderChips();
        });
    }

    // Connect local processing listeners
    addBtn.addEventListener('click', addUrl);
    urlInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            addUrl();
        }
    });
});