const fs = require('fs');
const csv = require('csv-parser');

// Delete files if they exist
const deleteFile = (fileName) => {
    if (fs.existsSync(fileName)) {
        fs.unlinkSync(fileName);
        console.log(`${fileName} has been deleted.`);
    }
};

deleteFile('canada.txt');
deleteFile('usa.txt');

// File paths
const inputFile = 'input_countries.csv';
const canadaFile = 'canada.txt';
const usaFile = 'usa.txt';

// Stream to read the CSV file and filter data
fs.createReadStream(inputFile)
    .pipe(csv())
    .on('data', (row) => {
        if (row.country.toLowerCase() === 'canada') {
            fs.appendFileSync(canadaFile, `${row.country},${row.year},${row.population}\n`);
        } else if (row.country.toLowerCase() === 'united states') {
            fs.appendFileSync(usaFile, `${row.country},${row.year},${row.population}\n`);
        }
    })
    .on('end', () => {
        console.log('CSV file successfully processed.');
    });
