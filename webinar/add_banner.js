const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// I will just replace the end of the showcase section to include the banner.
// Let's find the closing tag of the script I just injected and add the banner before the closing section tag.
const searchStr = `</script>
        </div>
    </section>`;

const bannerHtml = `</script>

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

if(html.includes(searchStr)) {
    html = html.replace(searchStr, bannerHtml);
    fs.writeFileSync('index.html', html);
    console.log('Successfully added date banner.');
} else {
    console.log('Could not find the end of the section.');
}
