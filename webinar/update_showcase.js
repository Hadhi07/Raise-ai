const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const startMarker = '<!-- Showcase Carousel Section -->';
const endMarker = '</section>'; // The one right after <!-- Date Banner --> ... wait, there are multiple </section>. Let's do a better regex.

const sectionRegex = /(<!-- Showcase Carousel Section -->[\s\S]*?<!-- Date Banner -->[\s\S]*?<\/div>\s*<\/section>)/;

const images = [
    'https://images.unsplash.com/photo-1604681630513-69474a4e253f?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1599643478514-4a4204128bd1?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop'
];

const dummyVideo = 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4';

let itemsHtml = '';
images.forEach((imgUrl, i) => {
    itemsHtml += `
                    <!-- Item ${i+1} -->
                    <div class="snap-center shrink-0 w-[240px] md:w-[280px] aspect-[9/16] relative rounded-2xl overflow-hidden group/card border border-[#222] hover:border-neon/50 transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(163,253,0,0.15)] bg-black">
                        <!-- Video Element -->
                        <video class="showcase-video absolute inset-0 w-full h-full object-cover" poster="${imgUrl}" playsinline preload="none">
                            <source src="${dummyVideo}" type="video/mp4">
                        </video>
                        
                        <!-- Play Overlay -->
                        <div class="showcase-overlay absolute inset-0 flex flex-col justify-center items-center cursor-pointer transition-opacity duration-300 z-10">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 group-hover/card:opacity-60 transition-opacity pointer-events-none"></div>
                            <div class="relative w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover/card:bg-neon group-hover/card:border-neon group-hover/card:scale-110 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                                <span class="material-symbols-outlined text-white group-hover/card:text-black text-3xl ml-1">play_arrow</span>
                            </div>
                        </div>
                    </div>`;
});

const newSection = `<!-- Showcase Carousel Section -->
    <section class="py-16 md:py-24 bg-black border-t border-[#1a1a1a] relative overflow-hidden">
        <div class="max-w-[1400px] mx-auto px-4 md:px-8">
            <!-- Header -->
            <div class="text-center mb-10 md:mb-14">
                <span class="text-[10px] md:text-xs font-black text-neon uppercase tracking-[0.25em] mb-4 block">Video Ads You'll Create</span>
                <h2 class="font-headline font-black text-3xl md:text-5xl text-white mb-5 tracking-tight">
                    Here's What You'll Be Able to <span class="text-neon italic font-serif font-medium tracking-normal">Create</span>
                </h2>
                <p class="text-neutral-400 text-sm md:text-base font-medium">Real output. Not mockups. This is what the workflow produces.</p>
            </div>

            <!-- Carousel Wrapper -->
            <div class="relative w-full group/wrapper">
                <!-- Navigation Buttons -->
                <button id="showcase-prev" class="absolute -left-2 md:-left-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#111] border border-[#333] text-white flex items-center justify-center opacity-0 group-hover/wrapper:opacity-100 transition-all duration-300 hover:bg-neon hover:text-black hover:border-neon shadow-xl hover:scale-110 hidden sm:flex">
                    <span class="material-symbols-outlined font-bold text-xl">chevron_left</span>
                </button>
                <button id="showcase-next" class="absolute -right-2 md:-right-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#111] border border-[#333] text-white flex items-center justify-center opacity-0 group-hover/wrapper:opacity-100 transition-all duration-300 hover:bg-neon hover:text-black hover:border-neon shadow-xl hover:scale-110 hidden sm:flex">
                    <span class="material-symbols-outlined font-bold text-xl">chevron_right</span>
                </button>

                <!-- Carousel Track -->
                <div id="showcase-carousel" class="flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-6 pb-8 pt-4 px-2 scroll-smooth" style="scrollbar-width: none; -ms-overflow-style: none;">
                    <style>
                        #showcase-carousel::-webkit-scrollbar { display: none; }
                        /* Ensure native video controls don't look broken */
                        video::-webkit-media-controls-enclosure {
                            border-radius: 0;
                            background: rgba(0,0,0,0.5);
                        }
                    </style>
${itemsHtml}
                </div>
            </div>
            
            <script>
                document.addEventListener("DOMContentLoaded", () => {
                    const showcaseCarousel = document.getElementById("showcase-carousel");
                    const prevBtn = document.getElementById("showcase-prev");
                    const nextBtn = document.getElementById("showcase-next");

                    // Horizontal scrolling logic
                    if(prevBtn && nextBtn && showcaseCarousel) {
                        const scrollAmount = window.innerWidth > 768 ? 600 : 280;
                        prevBtn.addEventListener('click', () => {
                            showcaseCarousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                        });
                        nextBtn.addEventListener('click', () => {
                            showcaseCarousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                        });
                    }

                    // Video Play & Native Controls logic
                    const videos = document.querySelectorAll('.showcase-video');
                    const overlays = document.querySelectorAll('.showcase-overlay');

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

                            // Play this video
                            overlay.style.opacity = '0';
                            overlay.style.pointerEvents = 'none'; // allow clicking the video underneath
                            video.setAttribute('controls', 'controls');
                            
                            // Let the user unmute via controls if they want, but try playing first
                            video.play().catch(err => {
                                console.log("Autoplay blocked, user interaction required:", err);
                                // Since this is inside a click handler, it should succeed, 
                                // but if it fails, mute it to ensure it starts visually
                                video.muted = true;
                                video.play();
                            });
                        });
                    });
                });
            </script>

            <!-- Date Banner -->
            <div class="max-w-2xl mx-auto mt-6 md:mt-10 border border-[#222] bg-[#0a0a0a] rounded-2xl py-4 px-6 flex flex-wrap items-center justify-center gap-4 text-xs md:text-sm font-bold text-neutral-300 shadow-xl">
                <span class="flex items-center gap-1.5 text-white"><span class="text-base">???</span> <span class="dynamic-date" data-format="full">Sunday, 6 September 2026</span></span>
                <span class="text-[#333] hidden md:inline">|</span>
                <span class="flex items-center gap-1.5 text-white"><span class="text-base">?</span> 8:30 PM - 10:30 PM IST</span>
                <span class="text-[#333] hidden md:inline">|</span>
                <span class="flex items-center gap-1.5 text-neon"><span class="text-base">??</span> Live Online (Google Meet)</span>
            </div>
        </div>
    </section>`;

html = html.replace(sectionRegex, newSection);
fs.writeFileSync('index.html', html);
console.log('Successfully updated showcase section with video controls.');
