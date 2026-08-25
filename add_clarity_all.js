
const fs = require("fs");
const path = require("path");

const clarityScript = `<!-- Microsoft Clarity -->
<script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "y7w4qe8w9w");
</script>
</head>`;

function walkDir(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            if (!fullPath.includes(".git")) {
                results = results.concat(walkDir(fullPath));
            }
        } else if (file.endsWith(".html")) {
            results.push(fullPath);
        }
    });
    return results;
}

const htmlFiles = walkDir(".");

let updatedCount = 0;
for (const file of htmlFiles) {
    let html = fs.readFileSync(file, "utf8");
    if (!html.includes("clarity.ms/tag") && html.includes("</head>")) {
        html = html.replace("</head>", clarityScript);
        fs.writeFileSync(file, html, "utf8");
        console.log("Added to " + file);
        updatedCount++;
    }
}
console.log("Total updated: " + updatedCount);

