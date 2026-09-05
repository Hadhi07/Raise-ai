const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Extract the three original slides
const rImage = /(<!-- Item 1: Image -->[\s\S]*?<\/div>)\s*<!-- Item 2: Jithin -->/;
const imageMatch = html.match(rImage);
let imageSlide = imageMatch ? imageMatch[1] : '';

const rJithin = /(<!-- Item 2: Jithin -->[\s\S]*?<\/div>\s*<\/div>)\s*<!-- Item 3: Vishnu -->/;
const jithinMatch = html.match(rJithin);
let jithinSlide = jithinMatch ? jithinMatch[1] : '';

const rVishnu = /(<!-- Item 3: Vishnu -->[\s\S]*?<\/div>\s*<\/div>)\s*<\/div>\s*<div class="flex gap-2 justify-center mt-1" id="carousel-dots">/;
const vishnuMatch = html.match(rVishnu);
let vishnuSlide = vishnuMatch ? vishnuMatch[1] : '';

// Function to create Attendee slide
const createSlide = (filename, isFirst) => `
                <!-- Item Attendee -->
                <div class="snap-center shrink-0 w-full flex flex-col justify-center px-1 carousel-slide">
                    <div class="bg-[#111] border border-[#222] p-5 rounded-2xl shadow-lg w-full text-left">
                        <span class="text-sm text-neutral-300 font-bold mb-4 flex items-center gap-2">Hear from an Attendee:</span>
                        
                        <div class="custom-audio-player bg-[#1a1a1a] border border-[#333] rounded-xl p-2.5 flex items-center gap-3 relative z-50 w-full shadow-inner">
                            <button class="play-btn w-10 h-10 rounded-full bg-neon text-black flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(163,253,0,0.4)] transition-transform active:scale-95">
                                <span class="material-symbols-outlined font-black text-xl">play_arrow</span>
                            </button>
                            <div class="flex-1">
                                <div class="w-full bg-[#333] h-1.5 rounded-full overflow-hidden relative progress-container cursor-pointer">
                                    <div class="progress-bar absolute top-0 left-0 h-full bg-neon w-0 transition-all duration-75"></div>
                                </div>
                                <div class="flex justify-between text-[10px] text-neutral-400 mt-1.5 font-mono tracking-wider font-semibold">
                                    <span class="current-time">0:00</span>
                                    <span class="total-time">0:00</span>
                                </div>
                            </div>
                            <audio playsinline preload="metadata" class="hidden-audio hidden">
                                <source src="/webinar/${filename}" type="audio/mp4">
                            </audio>
                        </div>
                        ${isFirst ? '<p class="text-[10px] text-neutral-500 mt-3 text-center">Swipe for more ??</p>' : ''}
                    </div>
                </div>`;

const createCard = (filename) => `
                <!-- Audio Testimonial -->
                <div class="tool-card p-5 md:p-6 rounded-2xl flex flex-col justify-between border border-[#222] shadow-[0_0_20px_rgba(163,253,0,0.05)] bg-[#0a0a0a]">
                    <div class="flex flex-col gap-4 w-full">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 rounded-full bg-neon/10 text-neon font-extrabold flex items-center justify-center text-xl shadow-[0_0_15px_rgba(163,253,0,0.2)] border border-neon/30">
                                ??
                            </div>
                            <div>
                                <p class="font-bold text-base md:text-lg text-white">Hear from an Attendee</p>
                                <div class="flex text-neon text-sm mt-0.5">? ? ? ? ?</div>
                            </div>
                        </div>
                        <p class="text-neutral-300 text-sm italic leading-relaxed">"Another amazing success story from our recent webinar."</p>
                        
                        <div class="custom-audio-player bg-[#1a1a1a] border border-[#333] rounded-xl p-2.5 flex items-center gap-3 relative z-50 w-full shadow-inner">
                            <button class="play-btn w-10 h-10 rounded-full bg-neon text-black flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(163,253,0,0.4)] transition-transform active:scale-95">
                                <span class="material-symbols-outlined font-black text-xl">play_arrow</span>
                            </button>
                            <div class="flex-1">
                                <div class="w-full bg-[#333] h-1.5 rounded-full overflow-hidden relative progress-container cursor-pointer">
                                    <div class="progress-bar absolute top-0 left-0 h-full bg-neon w-0 transition-all duration-75"></div>
                                </div>
                                <div class="flex justify-between text-[10px] text-neutral-400 mt-1.5 font-mono tracking-wider font-semibold">
                                    <span class="current-time">0:00</span>
                                    <span class="total-time">0:00</span>
                                </div>
                            </div>
                            <audio playsinline preload="metadata" class="hidden-audio hidden">
                                <source src="/webinar/${filename}" type="audio/mp4">
                            </audio>
                        </div>
                    </div>
                </div>`;

const files = [
    'ScreenRecording_08-30-2026 23-43-25_1 (4).m4a',
    'ScreenRecording_08-30-2026 23-43-25_1 (1).m4a',
    'ScreenRecording_08-30-2026 23-43-25_1 (2).m4a',
    'ScreenRecording_08-30-2026 23-43-25_1 (3).m4a',
    'ScreenRecording_08-30-2026 23-56-01_1.m4a'
];

let slides = '';
slides += createSlide(files[0], true);
slides += '\n' + imageSlide;
slides += '\n' + jithinSlide.replace('<p class="text-[10px] text-neutral-500 mt-3 text-center">Swipe for more ??</p>', '');
slides += '\n' + vishnuSlide;
slides += '\n' + createSlide(files[1], false);
slides += '\n' + createSlide(files[2], false);
slides += '\n' + createSlide(files[3], false);
slides += '\n' + createSlide(files[4], false);

let dots = '';
for (let i = 0; i < 8; i++) {
    dots += `\n                <span class="w-2 h-2 rounded-full bg-${i === 0 ? 'neon/80' : 'neutral-600'} transition-colors duration-300"></span>`;
}

const replaceCarousel = /(<!-- Item 1: Image -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>)(\s*<\/div>\s*<div class="flex gap-2 justify-center mt-1" id="carousel-dots">)/;
html = html.replace(replaceCarousel, slides + '$2');

const replaceDots = /(<div class="flex gap-2 justify-center mt-1" id="carousel-dots">)[\s\S]*?(<\/div>)/;
html = html.replace(replaceDots, '$1' + dots + '\n            $2');

const rJithinCard = /(<!-- Jithin Audio Testimonial -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>)\s*<!-- Vishnu Audio Testimonial -->/;
const jithinCardMatch = html.match(rJithinCard);
let jithinCard = jithinCardMatch ? jithinCardMatch[1] : '';

const rVishnuCard = /(<!-- Vishnu Audio Testimonial -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>)\s*<\/div>\s*<\/section>/;
const vishnuCardMatch = html.match(rVishnuCard);
let vishnuCard = vishnuCardMatch ? vishnuCardMatch[1] : '';

let gridCards = '';
gridCards += createCard(files[0]);
gridCards += '\n' + jithinCard;
gridCards += '\n' + vishnuCard;
gridCards += '\n' + createCard(files[1]);
gridCards += '\n' + createCard(files[2]);
gridCards += '\n' + createCard(files[3]);
gridCards += '\n' + createCard(files[4]);

const replaceGrid = /(<!-- Jithin Audio Testimonial -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>)(\s*<\/div>\s*<\/section>)/;
html = html.replace(replaceGrid, gridCards + '$2');

fs.writeFileSync('index.html', html);
console.log('Modified index.html');
