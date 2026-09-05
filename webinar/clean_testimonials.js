const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove the images for Jithin and Vishnu in the Carousel
html = html.replace(/<img src="\/webinar\/jithin-profile\.png"[^>]+>\s*/g, '');
html = html.replace(/<img src="\/webinar\/vishnu-profile\.png"[^>]+>\s*/g, '');

// 2. Clean the Grid Cards: Remove 🎧 logo, stars, and quote text
const gridRegex = /<div class="flex items-center gap-4">[\s\S]*?<p class="font-bold text-base md:text-lg text-white">([^<]+)<\/p>[\s\S]*?<\/div>\s*<\/div>\s*<p class="text-neutral-300 text-sm italic leading-relaxed">[^<]+<\/p>/g;

html = html.replace(gridRegex, '<div>\n                            <p class="font-bold text-base md:text-lg text-white"></p>\n                        </div>');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Cleaned up testimonial layouts!');
