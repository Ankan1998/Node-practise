const fs = require('fs');
const json_string = fs.readFileSync('sample.json').toString();
const json_data = JSON.parse(json_string);
json_data.Name = 'Ankan';
json_data.Planet = 'Earth';
json_data.Age = '23';

const dataJSON = JSON.stringify(json_data);
fs.writeFileSync('updated.json',dataJSON);
