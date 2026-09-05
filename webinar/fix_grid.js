const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const audioFiles = [
    { file: 'ScreenRecording_08-30-2026 23-43-25_1 (4).m4a', name: 'Hear from an Attendee' },
    { file: 'jithin-recording.m4a', name: 'Hear from Jithin' },
    { file: 'vishnu-recording.m4a', name: 'Hear from Vishnu' },
    { file: 'ScreenRecording_08-30-2026 23-43-25_1 (1).m4a', name: 'Hear from an Attendee' },
    { file: 'ScreenRecording_08-30-2026 23-43-25_1 (2).m4a', name: 'Hear from an Attendee' },
    { file: 'ScreenRecording_08-30-2026 23-43-25_1 (3).m4a', name: 'Hear from an Attendee' },
    { file: 'ScreenRecording_08-30-2026 23-56-01_1.m4a', name: 'Hear from an Attendee' }
];

let gridHtml = '';
audioFiles.forEach((audio, i) => {
    gridHtml += `
                <!-- Audio Testimonial -->
                <div class="tool-card p-5 md:p-6 rounded-2xl flex flex-col justify-between border border-[#222] shadow-[0_0_20px_rgba(163,253,0,0.05)] bg-[#0a0a0a]">
                    <div class="flex flex-col gap-4 w-full">
                        <div>
                            <p class="font-bold text-base md:text-lg text-white">${audio.name}</p>
                        </div>
                        
                        <div class="custom-audio-player bg-[#1a1a1a] border border-[#333] rounded-xl p-2.5 flex items-center gap-3 relative z-50 w-full shadow-inner">
                            <button class="play-btn w-10 h-10 rounded-full bg-neon text-black flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(163,253,0,0.4)] transition-transform active:scale-95">
                                <span class="material-symbols-outlined font-black text-xl">play_arrow</span>
                            </button>
                            
                            <div class="flex-grow flex flex-col gap-1 w-full overflow-hidden">
                                <div class="progress-bar-container bg-[#333] h-1.5 rounded-full cursor-pointer relative overflow-hidden">
                                    <div class="progress-bar bg-neon h-full w-0 rounded-full pointer-events-none"></div>
                                </div>
                                <div class="flex justify-between text-[10px] text-neutral-400 font-mono">
                                    <span class="time-current">0:00</span>
                                    <span class="time-duration">0:00</span>
                                </div>
                            </div>
                            
                            <audio playsinline preload="metadata" class="hidden-audio hidden">
                                <source src="/webinar/${audio.file}" type="audio/mp4">
                            </audio>
                        </div>
                    </div>
                </div>`;
});

// The wrapper is <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto px-4 z-10 relative">
// We need to replace everything inside it up to the end of the 7 items.
// To do this safely, we will find the wrapper, and replace its contents.
const gridRegex = /(<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto px-4 z-10 relative">)[\s\S]*?(<\/div>\s*<\/section>)/;

if(gridRegex.test(html)) {
    html = html.replace(gridRegex, '$1\n' + gridHtml + '\n            $2');
    fs.writeFileSync('index.html', html, 'utf8');
    console.log('Successfully completely rebuilt grid layout exactly as requested!');
} else {
    console.log('Grid wrapper not found.');
}
