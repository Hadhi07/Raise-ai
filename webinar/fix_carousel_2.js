const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const newVideos = [
    'Character_wearing_clothes_discus._202608302136.mp4',
    'Create_sunscreen_commercial_B-roll_1080p_202609021711_erasio.mp4',
    'Creating_sunscreen_product_comme._202609020459.mp4',
    'Video Project 2 (1).mp4',
    'Video Project 5.mp4',
    'Video Project editing in real .mp4'
];

let itemsHtml = '';
newVideos.forEach((videoFile, i) => {
    const encodedVideoUrl = "/webinar/Webinar%20videos/" + encodeURIComponent(videoFile).replace(/'/g, "%27");
    itemsHtml += `
                    <!-- Item ${i+1} -->
                    <div class="snap-center shrink-0 w-[240px] md:w-[280px] aspect-[9/16] relative rounded-2xl overflow-hidden group/card border border-[#222] hover:border-neon/50 transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(163,253,0,0.15)] bg-black">
                        <!-- Video Element -->
                        <video class="showcase-video absolute inset-0 w-full h-full object-cover" playsinline preload="metadata">
                            <source src="${encodedVideoUrl}#t=0.5" type="video/mp4">
                        </video>
                        
                        <!-- Play Overlay -->
                        <div class="showcase-overlay absolute inset-0 flex flex-col justify-center items-center cursor-pointer transition-opacity duration-300 z-10">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 group-hover/card:opacity-60 transition-opacity pointer-events-none"></div>
                            <div class="relative w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover/card:bg-neon group-hover/card:border-neon group-hover/card:scale-110 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] flex">
                                <span class="material-symbols-outlined text-white group-hover/card:text-black text-3xl ml-1">play_arrow</span>
                            </div>
                        </div>
                    </div>`;
});

// Replace the broken items inside showcase-carousel
const replaceRegex = /(<div id="showcase-carousel"[^>]*>[\s\S]*?<style>[\s\S]*?<\/style>)[\s\S]*?(<\/div>\s*<\/div>\s*<script>)/;

if(replaceRegex.test(html)) {
    html = html.replace(replaceRegex, '$1\n' + itemsHtml + '\n                $2');
    fs.writeFileSync('index.html', html, 'utf8');
    console.log('Successfully rebuilt carousel items with #t=0.5!');
} else {
    console.log('Regex did not match.');
}
