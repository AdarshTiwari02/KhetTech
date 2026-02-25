const fs = require('fs');

const files = [
    'e:/smartFarmeProject/app/api/livestock/[id]/health/route.ts',
    'e:/smartFarmeProject/app/api/livestock/[id]/milk/route.ts',
    'e:/smartFarmeProject/app/api/livestock/[id]/route.ts'
];

files.forEach(f => {
    let c = fs.readFileSync(f, 'utf8');

    // Replace param type signature
    c = c.replace(/\{ params \}: \{ params: \{ id: string \} \}/g, 'context: { params: Promise<{ id: string }> }');

    // Replace params.id with (await context.params).id
    c = c.replace(/params\.id/g, '(await context.params).id');

    fs.writeFileSync(f, c);
});

console.log('Fixed dynamic route sync params!');
