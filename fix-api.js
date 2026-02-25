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

    // Fix imports
    content = content.replace(/import \{ verifyAuth \} from '@\/lib\/middleware\/auth';/g, "import { authenticateToken } from '@/lib/middleware/auth';");
    content = content.replace(/import \{ successResponse, errorResponse \} from '@\/lib\/utils\/response';/g, "import { createSuccessResponse, createErrorResponse } from '@/lib/utils/response';");

    // Fix auth call
    content = content.replace(/verifyAuth\(request\)/g, 'authenticateToken(request)');

    // Fix auth condition
    content = content.replace(/!authResult\.success \|\| !authResult\.userId/g, '!authResult || !authResult.userId');

    // Fix response calls
    content = content.replace(/successResponse\(/g, 'createSuccessResponse(');
    content = content.replace(/errorResponse\(/g, 'createErrorResponse(');

    fs.writeFileSync(file, content);
});

console.log('All files fixed!');
