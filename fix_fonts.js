
const fs = require("fs");
let html = fs.readFileSync("webinar/index.html", "utf-8");

// Fix audio extensions and mimes
html = html.replace(/jithin-recording\.mp3/g, "jithin-recording.m4a");
html = html.replace(/vishnu-recording\.mp3/g, "vishnu-recording.m4a");
html = html.replace(/type="audio\/mpeg"/g, "type=\"audio/mp4\"");

// Fix Jithin hero
html = html.replace(
    `<span class="text-neon text-xl">🎧</span> Hear from Jithin:`,
    `<img src="/webinar/jithin-profile.png" class="w-8 h-8 rounded-full object-cover border border-neon/50 shadow-[0_0_10px_rgba(163,253,0,0.2)] shrink-0" alt="Jithin"> Hear from Jithin:`
);

// Fix Vishnu hero
html = html.replace(
    `<span class="text-neon text-xl">🎧</span> Hear from Vishnu:`,
    `<img src="/webinar/vishnu-profile.png" class="w-8 h-8 rounded-full object-cover border border-neon/50 shadow-[0_0_10px_rgba(163,253,0,0.2)] shrink-0" alt="Vishnu"> Hear from Vishnu:`
);

// Fix Jithin bottom
html = html.replace(
    `<div class="w-12 h-12 rounded-full bg-neon/10 text-neon font-extrabold flex items-center justify-center text-xl shadow-[0_0_15px_rgba(163,253,0,0.2)] border border-neon/30">
                                🎧
                            </div>`,
    `<img src="/webinar/jithin-profile.png" class="w-14 h-14 rounded-full object-cover shadow-[0_0_15px_rgba(163,253,0,0.2)] border-2 border-neon/30 shrink-0" alt="Jithin">`
);

// Fix Vishnu bottom
html = html.replace(
    `<div class="w-12 h-12 rounded-full bg-neon/10 text-neon font-extrabold flex items-center justify-center text-xl shadow-[0_0_15px_rgba(163,253,0,0.2)] border border-neon/30">
                                🎧
                            </div>`,
    `<img src="/webinar/vishnu-profile.png" class="w-14 h-14 rounded-full object-cover shadow-[0_0_15px_rgba(163,253,0,0.2)] border-2 border-neon/30 shrink-0" alt="Vishnu">`
);

fs.writeFileSync("webinar/index.html", html, "utf-8");
console.log("All fixed cleanly.");

