
const { execSync } = require('child_process');
const commits = execSync('git log --format=%H -- webinar/index.html').toString().trim().split('\n');
for (let commit of commits) {
    try {
        const content = execSync('git show ' + commit + ':webinar/index.html').toString();
        if (content.includes('★')) {
            console.log('Last good commit:', commit);
            break;
        }
    } catch (e) {}
}

