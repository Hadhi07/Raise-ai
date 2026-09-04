(function() {
    function getNextWebinarDate() {
        const now = new Date();
        let day = now.getDay();
        let daysUntilSunday = (7 - day) % 7;
        
        // If it is Sunday and the time is 8:00 PM (20:00) or later, jump to next Sunday
        if (day === 0 && now.getHours() >= 20) {
            daysUntilSunday = 7;
        }
        
        const nextSunday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + daysUntilSunday);
        return nextSunday;
    }

    function formatDate(date, formatType) {
        const monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthsLong = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        
        const day = date.getDate();
        const monthShort = monthsShort[date.getMonth()];
        const monthLong = monthsLong[date.getMonth()];
        const year = date.getFullYear();

        switch (formatType) {
            case "short": // e.g., "6 Sep"
                return `${day} ${monthShort}`;
            case "long": // e.g., "6 September"
                return `${day} ${monthLong}`;
            case "long_year": // e.g., "6 September 2026"
                return `${day} ${monthLong} ${year}`;
            case "full": // e.g., "Sunday, 6 September 2026"
                return `Sunday, ${day} ${monthLong} ${year}`;
            default:
                return `${day} ${monthLong}`;
        }
    }

    function updateWebinarDates() {
        const nextWebinarDate = getNextWebinarDate();
        
        // 1. Update elements with class 'dynamic-date'
        const dynamicElements = document.querySelectorAll('.dynamic-date');
        dynamicElements.forEach(el => {
            const format = el.getAttribute('data-format') || 'long';
            el.textContent = formatDate(nextWebinarDate, format);
        });

        // 2. Update the document title if it needs updating
        if (document.title.includes("Learn Flow AI Video Creation")) {
            document.title = `Raise AI | Learn Flow AI Video Creation (${formatDate(nextWebinarDate, "short")}, 8:30 - 10:30 PM)`;
        }
    }

    // Run when DOM is loaded, and also observe for dynamic additions (like add_banner.js)
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateWebinarDates);
    } else {
        updateWebinarDates();
    }

    // MutationObserver to handle elements added dynamically
    if (typeof MutationObserver !== 'undefined' && document.body) {
        const observer = new MutationObserver((mutations) => {
            let shouldUpdate = false;
            for (const mutation of mutations) {
                if (mutation.addedNodes.length > 0) {
                    shouldUpdate = true;
                    break;
                }
            }
            if (shouldUpdate) {
                updateWebinarDates();
            }
        });

        document.addEventListener('DOMContentLoaded', () => {
            observer.observe(document.body, { childList: true, subtree: true });
        });
    }
})();
