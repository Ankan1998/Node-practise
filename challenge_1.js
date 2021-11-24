const fs = require('fs');
// Lessson 1

fs.writeFileSync('notes.txt', "Hello! my first node usage.")

//Challenge 1

fs.appendFileSync('notes.txt', " Appending to node file")