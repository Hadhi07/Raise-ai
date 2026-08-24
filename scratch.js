
const fs = require('fs');

const labelHtml = \
        <!-- Social Proof -->
        <div class=\"flex flex-col items-center justify-center mb-6\">
            <div class=\"text-center text-neon font-bold text-sm md:text-base bg-neon/10 border border-neon/30 px-4 py-2 rounded-xl inline-flex items-center gap-2 shadow-[0_0_15px_rgba(163,253,0,0.2)]\">
                <span>??</span> More than 100+ members joined previously!
            </div>
        </div>
\;

const labelAndImageHtml = \
        <!-- Social Proof -->
        <div class=\"flex flex-col items-center justify-center mb-6\">
            <div class=\"text-center text-neon font-bold text-sm md:text-base bg-neon/10 border border-neon/30 px-4 py-2 rounded-xl inline-flex items-center gap-2 shadow-[0_0_15px_rgba(163,253,0,0.2)] mb-4\">
                <span>??</span> More than 100+ members joined previously!
            </div>
            <img src=\"./testimonial.png\" alt=\"Members Testimonial\" class=\"rounded-2xl max-w-full w-[350px] shadow-[0_0_20px_rgba(163,253,0,0.15)] border border-neon/20 mb-2\" />
        </div>
\;

function insertBefore(filepath, searchStr, insertStr) {
    let content = fs.readFileSync(filepath, 'utf-8');
    if (content.includes('More than 100+')) return; // already inserted
    content = content.replace(searchStr, insertStr + searchStr);
    fs.writeFileSync(filepath, content, 'utf-8');
}

insertBefore('c:/Users/hadhi/OneDrive/Desktop/Raise AI/webinar/index.html', '<!-- Standard Admission Price Badge -->', labelAndImageHtml);
insertBefore('c:/Users/hadhi/OneDrive/Desktop/Raise AI/webinar/payment/index.html', '<!-- Masterclass Details -->', labelHtml);
console.log('Inserted successfully!');
\

