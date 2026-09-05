const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Fix the Prev button
html = html.replace(
    'opacity-0 group-hover/wrapper:opacity-100 transition-all duration-300 hover:bg-neon hover:text-black hover:border-neon shadow-xl hover:scale-110 hidden sm:flex',
    'opacity-80 hover:opacity-100 transition-all duration-300 hover:bg-neon hover:text-black hover:border-neon shadow-xl hover:scale-110 flex'
);

// Fix the Next button
html = html.replace(
    'opacity-0 group-hover/wrapper:opacity-100 transition-all duration-300 hover:bg-neon hover:text-black hover:border-neon shadow-xl hover:scale-110 hidden sm:flex',
    'opacity-80 hover:opacity-100 transition-all duration-300 hover:bg-neon hover:text-black hover:border-neon shadow-xl hover:scale-110 flex'
);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed carousel buttons visibility for mobile!');
