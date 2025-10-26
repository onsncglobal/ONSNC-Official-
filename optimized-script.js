// Defer non-critical JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Load non-critical features after main content
    setTimeout(loadNonCriticalFeatures, 1000);
});

function loadNonCriticalFeatures() {
    // Lazy load carousels, videos, etc.
    initCarousels();
    initVideoPlayers();
}

// Break long tasks into smaller chunks
function processInChunks(array, callback, chunkSize = 10) {
    let index = 0;
    
    function processChunk() {
        const end = Math.min(index + chunkSize, array.length);
        for (; index < end; index++) {
            callback(array[index]);
        }
        if (index < array.length) {
            setTimeout(processChunk, 0);
        }
    }
    
    processChunk();
}

// Optimized event handlers with debouncing
const optimizedResize = debounce(() => {
    // Handle resize events efficiently
}, 250);

window.addEventListener('resize', optimizedResize);

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
