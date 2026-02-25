const fs = require('fs');
const path = require('path');

function getFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(getFiles(file));
        } else if (file.endsWith('.ts')) {
            results.push(file);
        }
    });
    return results;
}

const dir = 'e:/smartFarmeProject/app/api/livestock';
const files = getFiles(dir);

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Fix connectDB -> connectToDatabase
    content = content.replace(/connectDB/g, 'connectToDatabase');

    fs.writeFileSync(file, content);
});

console.log('Fixed connectDB!');
