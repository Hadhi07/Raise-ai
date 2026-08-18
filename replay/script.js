let player;

// Wait for API to load
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '100%',
        width: '100%',
        videoId: 'rQ7Wf8xlKxU', // Actual Video ID
        playerVars: {
            'autoplay': 1,
            'controls': 1, // Enable controls for zooming
            'disablekb': 1, // Disable keyboard controls
            'modestbranding': 1,
            'rel': 0,
            'showinfo': 0,
            'fs': 1, // Enable full screen button in iframe logic
            'iv_load_policy': 3
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    console.log("Player ready");
    event.target.playVideo();
}

// Full Screen Logic
document.addEventListener('DOMContentLoaded', () => {
    const fsBtn = document.getElementById('custom-fullscreen-btn');
    if (fsBtn) {
        fsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const videoWrapper = document.getElementById('main-video-wrapper');
            
            if (!document.fullscreenElement) {
                if (videoWrapper.requestFullscreen) {
                    videoWrapper.requestFullscreen();
                } else if (videoWrapper.webkitRequestFullscreen) { /* Safari */
                    videoWrapper.webkitRequestFullscreen();
                } else if (videoWrapper.msRequestFullscreen) { /* IE11 */
                    videoWrapper.msRequestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) { /* Safari */
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) { /* IE11 */
                    document.msExitFullscreen();
                }
            }
        });
    }
});

// SPA navigation removed as we now use standard physical links.
// --- Mockup Video Player Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const resultsVideo = document.getElementById('results-video');
    const resultsPlayBtn = document.getElementById('results-play-btn');
    const resultsCaption = document.getElementById('results-text-caption');

    if (resultsVideo && resultsPlayBtn) {
        resultsPlayBtn.addEventListener('click', () => {
            resultsVideo.play().then(() => {
                resultsPlayBtn.style.display = 'none';
                if(resultsCaption) resultsCaption.style.display = 'none';
                resultsVideo.setAttribute('controls', 'true');
            }).catch(e => {
                console.error("Video play failed:", e);
            });
        });
    }
});

// --- Countdown Timer & Reveal Logic ---
let countdownInterval;

function startCountdownTimer() {
    const TIMER_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in ms
    let endTime = localStorage.getItem('webinarTimerEndTime');
    
    if (!endTime) {
        endTime = Date.now() + TIMER_DURATION;
        localStorage.setItem('webinarTimerEndTime', endTime);
    }
    
    const daysEl = document.getElementById('timer-days');
    const hoursEl = document.getElementById('timer-hours');
    const minutesEl = document.getElementById('timer-minutes');
    const secondsEl = document.getElementById('timer-seconds');
    
    if(countdownInterval) clearInterval(countdownInterval);
    
    countdownInterval = setInterval(() => {
        const now = Date.now();
        let remaining = endTime - now;
        
        if (remaining < 0) remaining = 0;
        
        let d = Math.floor(remaining / (1000 * 60 * 60 * 24));
        let h = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let m = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        let s = Math.floor((remaining % (1000 * 60)) / 1000);
        
        if(daysEl) daysEl.textContent = d.toString().padStart(2, '0');
        if(hoursEl) hoursEl.textContent = h.toString().padStart(2, '0');
        if(minutesEl) minutesEl.textContent = m.toString().padStart(2, '0');
        if(secondsEl) secondsEl.textContent = s.toString().padStart(2, '0');
        
        if (remaining <= 0) {
            clearInterval(countdownInterval);
        }
    }, 1000);
}

// Copy UPI Function
function copyUPI() {
    const upiText = document.getElementById('upi-text-to-copy').innerText;
    
    function showTooltip() {
        const tooltip = document.getElementById('copy-tooltip');
        if (tooltip) {
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'scale(1.1)';
            setTimeout(() => {
                tooltip.style.opacity = '0';
                tooltip.style.transform = 'scale(0)';
            }, 2000);
        }
    }

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(upiText).then(showTooltip).catch(err => console.error('Copy failed: ', err));
    } else {
        let textArea = document.createElement("textarea");
        textArea.value = upiText;
        textArea.style.position = "absolute";
        textArea.style.left = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            showTooltip();
        } catch (err) {
            console.error('Fallback copy failed', err);
        }
        textArea.remove();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Start timer immediately since it is always visible
    startCountdownTimer();

    const revealBtn = document.getElementById('reveal-qr-btn');
    const offerSection = document.getElementById('offer-section');
    
    if(revealBtn && offerSection) {
        revealBtn.addEventListener('click', () => {
            // Hide the reveal button
            revealBtn.style.display = 'none';
            // Show the actual payment details
            offerSection.classList.remove('hidden');
        });
    }
});
