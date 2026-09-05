const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// We only want to replace the src URLs, not the type="video/mp4"
// The URLs are like src="/webinar/...mp4"
html = html.replace(/(\/webinar\/Webinar[^"]+\.mp4)"/g, '#t=0.5"');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Appended #t=0.5 to video URLs');
