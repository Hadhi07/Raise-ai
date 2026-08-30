
const fs = require("fs");

function convertToLight(html) {
    // Tailwind Config
    html = html.replace(/background: "#000000"/, `background: "#f8fafc"`);
    html = html.replace(/surface: "#080808"/, `surface: "#ffffff"`);
    html = html.replace(/"surface-card": "#0d0d0d"/, `"surface-card": "#ffffff"`);
    html = html.replace(/"surface-card-hover": "#141414"/, `"surface-card-hover": "#f1f5f9"`);
    html = html.replace(/neon: "#a3fd00"/, `neon: "#2563eb"`);
    html = html.replace(/"neon-glow": "rgba\(163, 253, 0, 0\.4\)"/, `"neon-glow": "rgba(37, 99, 235, 0.4)"`);
    
    // Global Styles
    html = html.replace(/body \{ background-color: #000; color: #fff; \}/g, `body { background-color: #f8fafc; color: #0f172a; }`);
    html = html.replace(/border: 1px solid #222;/g, `border: 1px solid #e2e8f0;`);
    html = html.replace(/background: #080808;/g, `background: #ffffff;`);
    html = html.replace(/border-color: #a3fd00;/g, `border-color: #2563eb;`);
    html = html.replace(/rgba\(163,253,0,0\.1\)/g, `rgba(37,99,235,0.1)`);
    html = html.replace(/rgba\(163,253,0,0\.05\)/g, `rgba(37,99,235,0.05)`);
    html = html.replace(/background: #0a0a0a;/g, `background: #f1f5f9;`);
    
    // HTML Classes Replacement
    html = html.replace(/class="dark scroll-smooth"/g, `class="scroll-smooth"`);
    html = html.replace(/bg-black\/90/g, `bg-white/90`);
    html = html.replace(/border-\[\#1a1a1a\]/g, `border-slate-200`);
    html = html.replace(/text-neutral-400/g, `text-slate-500`);
    html = html.replace(/text-neutral-300/g, `text-slate-600`);
    html = html.replace(/text-neutral-500/g, `text-slate-400`);
    html = html.replace(/hover:text-white/g, `hover:text-slate-900`);
    html = html.replace(/text-white/g, `text-slate-900`);
    html = html.replace(/bg-\[\#222\]/g, `bg-slate-100`);
    html = html.replace(/bg-\[\#111\]/g, `bg-white`);
    html = html.replace(/bg-\[\#0a0a0a\]/g, `bg-white`);
    html = html.replace(/bg-\[\#050505\]/g, `bg-slate-50`);
    html = html.replace(/border-\[\#222\]/g, `border-slate-200`);
    html = html.replace(/border-\[\#333\]/g, `border-slate-300`);
    html = html.replace(/border-\[\#111\]/g, `border-slate-200`);
    html = html.replace(/text-\[\#333\]/g, `text-slate-400`);
    html = html.replace(/text-\[\#444\]/g, `text-slate-500`);
    html = html.replace(/hover:bg-\[\#1a1a1a\]/g, `hover:bg-slate-50`);
    
    // Fix buttons
    html = html.replace(/bg-neon text-black/g, `bg-neon text-white`);
    html = html.replace(/hover:bg-\[\#b5ff1a\]/g, `hover:bg-blue-700`);
    html = html.replace(/bg-white text-black/g, `bg-slate-900 text-white`);
    html = html.replace(/hover:bg-neutral-200/g, `hover:bg-slate-800`);
    
    // Fix logo for light mode (from brightness-110 to maybe invert or something?)
    // If the logo is white text, we need it dark. Assuming Raise AI has a dark logo or we can invert it.
    html = html.replace(/brightness-110/g, `invert`);
    
    return html;
}

let index = fs.readFileSync("course/index.html", "utf8");
fs.writeFileSync("course/index.html", convertToLight(index), "utf8");

let day1 = fs.readFileSync("course/day-1.html", "utf8");
fs.writeFileSync("course/day-1.html", convertToLight(day1), "utf8");

console.log("Converted index and day-1 to light theme.");

