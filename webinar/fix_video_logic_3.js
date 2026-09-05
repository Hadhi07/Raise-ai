const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const regex = /const videos = document\.querySelectorAll\('\.showcase-video'\);[\s\S]*?video\.play\(\);\s*}\);\s*}\);/;

const newScript = `const videos = document.querySelectorAll('.showcase-video');
                    const overlays = document.querySelectorAll('.showcase-overlay');

                    // iOS/Mobile thumbnail extraction hack: jump to 2 seconds to force rendering a frame
                    videos.forEach((v) => {
                        v.addEventListener('loadedmetadata', () => {
                            v.currentTime = 2.0; 
                        });
                    });

                    overlays.forEach((overlay, index) => {
                        overlay.addEventListener('click', () => {
                            const video = videos[index];

                            // Stop all other videos and reset overlays
                            videos.forEach((v, i) => {
                                if(i !== index) {
                                    v.pause();
                                    v.removeAttribute('controls');
                                    overlays[i].style.opacity = '1';
                                    overlays[i].style.pointerEvents = 'auto';
                                }
                            });

                            // Play selected video automatically MUTED
                            overlay.style.opacity = '0';
                            overlay.style.pointerEvents = 'none';
                            video.muted = true; // Force mute on start
                            video.currentTime = 0; // Restart video from beginning when played
                            video.setAttribute('controls', 'controls');
                            
                            // Play the video
                            const playPromise = video.play();
                            if (playPromise !== undefined) {
                                playPromise.catch(error => {
                                    console.log("Autoplay prevented:", error);
                                });
                            }
                        });
                    });`;

if(regex.test(html)) {
    html = html.replace(regex, newScript);
    fs.writeFileSync('index.html', html, 'utf8');
    console.log('Successfully replaced via Regex!');
} else {
    console.log('Regex did not match.');
}
