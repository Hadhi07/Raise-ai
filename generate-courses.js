
const fs = require("fs");
const template = fs.readFileSync("course/day-1.html", "utf8");

const titles = [
    "Introduction to Editing in Flow",
    "Structuring Advanced Prompts",
    "Controlling Camera Angles",
    "Mastering Motion Physics",
    "Generating Consistent Characters",
    "Lip Syncing & Audio Fundamentals",
    "Advanced Visual Effects",
    "Upscaling and Enhancing Details",
    "Creating the Final Compilation",
    "Monetization & Client Delivery"
];

for (let day = 2; day <= 10; day++) {
    let html = template;
    
    // Update title tag
    html = html.replace(/<title>.*?<\/title>/, `<title>Day ${day}: ${titles[day-1]} | Raise AI Course</title>`);
    
    // Update Day text
    html = html.replace(/<div class="text-neon.*?">Day 1<\/div>/, `<div class="text-neon text-sm font-extrabold tracking-widest uppercase mb-2">Day ${day}</div>`);
    
    // Update H1 title
    html = html.replace(/<h1 class="text-2xl.*?<\/h1>/, `<h1 class="text-2xl md:text-4xl font-headline font-black mb-6">${titles[day-1]}</h1>`);
    
    // Update Intro text
    html = html.replace(/Welcome to Day 1!/, `Welcome to Day ${day}!`);
    
    // Update Nav Buttons
    const prevBtn = `<a href="/course/day-${day-1}.html" class="flex-1 bg-white text-slate-900 py-2 rounded border border-slate-300 hover:border-neon text-xs font-bold text-center transition">Previous Day</a>`;
    html = html.replace(/<button class="flex-1 bg-white.*?Previous Day\s*<\/button>/s, prevBtn);
    
    let nextBtn = "";
    if (day < 10) {
        nextBtn = `<a href="/course/day-${day+1}.html" class="flex-1 bg-neon text-white py-2 rounded text-xs font-bold text-center hover:bg-blue-700 transition">Next Day</a>`;
    } else {
        nextBtn = `<button class="flex-1 bg-white text-slate-400 py-2 rounded border border-slate-200 text-xs font-bold cursor-not-allowed">End of Course</button>`;
    }
    
    html = html.replace(/<a href="\/course\/day-2\.html".*?Next Day\s*<\/a>/s, nextBtn);
    
    fs.writeFileSync(`course/day-${day}.html`, html, "utf8");
    console.log(`Generated course/day-${day}.html`);
}

