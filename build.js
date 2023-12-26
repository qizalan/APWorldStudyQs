const fs = require('fs');

const data = {};

fs.writeFileSync('./questions.json', JSON.stringify(data), 'utf-8');