
const fs = require("fs");
const clarityScript = `<!-- Microsoft Clarity -->
<script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "y7w4qe8w9w");
</script>
</head>`;

const files = [
    "webinar/payment/index.html",
    "index.html",
    "replay/index.html"
];

for (const file of files) {
    if (fs.existsSync(file)) {
        let html = fs.readFileSync(file, "utf8");
        if (!html.includes("clarity.ms/tag")) {
            html = html.replace("</head>", clarityScript);
            fs.writeFileSync(file, html, "utf8");
            console.log("Added to " + file);
        }
    }
}

