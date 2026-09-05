const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/Swipe for more \?\?/g, 'Swipe for more 👉');
html = html.replace(/<span class="text-base">\?\?\?<\/span>/g, '<span class="text-base">🗓️</span>');
html = html.replace(/<span class="text-base">\?<\/span> 8:30 PM/g, '<span class="text-base">⏰</span> 8:30 PM');
html = html.replace(/<span class="text-base">\?\?<\/span> Live Online/g, '<span class="text-base">💻</span> Live Online');

html = html.replace(/<div class="w-12 h-12 rounded-full bg-neon\/10 text-neon font-extrabold flex items-center justify-center text-xl shadow-\[0_0_15px_rgba\(163,253,0,0\.2\)\] border border-neon\/30\">\s*\?\?\s*<\/div>/g, 
'<div class="w-12 h-12 rounded-full bg-neon/10 text-neon font-extrabold flex items-center justify-center text-xl shadow-[0_0_15px_rgba(163,253,0,0.2)] border border-neon/30">\n                                🎧\n                            </div>');

html = html.replace(/<div class="flex text-neon text-sm mt-0\.5">\? \? \? \? \?<\/div>/g, '<div class="flex text-neon text-sm mt-0.5">★ ★ ★ ★ ★</div>');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed encodings in index.html!');
