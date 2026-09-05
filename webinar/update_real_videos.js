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

let replacedCount = 0;
newVideos.forEach((videoFile) => {
    const videoRegex = /<video class="showcase-video[^>]*>[\s\S]*?<source src="https:\/\/storage\.googleapis\.com\/gtv-videos-bucket\/sample\/ForBiggerMeltdowns\.mp4" type="video\/mp4">\s*<\/video>/;
    
    const encodedVideoUrl = "/webinar/Webinar%20videos/" + encodeURIComponent(videoFile).replace(/'/g, "%27");
    
    const replacement = `<video class="showcase-video absolute inset-0 w-full h-full object-cover" playsinline preload="metadata">
                            <source src="${encodedVideoUrl}" type="video/mp4">
                        </video>`;
    
    if (videoRegex.test(html)) {
        html = html.replace(videoRegex, replacement);
        replacedCount++;
    }
});

fs.writeFileSync('index.html', html);
console.log(`Successfully updated HTML with ${replacedCount} real videos`);
