const fs = require('fs');
const path = require('path');

const csvPath = 'c:/Users/patil/Downloads/master_reviews.csv';
const jsonPath = path.join(__dirname, '../public/data/reviews.json');

const csvRaw = fs.readFileSync(csvPath, 'utf-8');
const reviewsRaw = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

function parseCSV(text) {
  const lines = text.split(/\r?\n/);
  const rows = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;
    
    let cur = '';
    let inQuotes = false;
    const cols = [];
    
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === '"') {
        if (inQuotes && line[j+1] === '"') {
          cur += '"';
          j++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        cols.push(cur);
        cur = '';
      } else {
        cur += char;
      }
    }
    cols.push(cur);
    
    rows.push({
      source: cols[0] ? cols[0].trim() : '',
      text: cols[1] ? cols[1].trim() : ''
    });
  }
  return rows;
}

const master = parseCSV(csvRaw);

const correctedReviews = reviewsRaw.map((r) => {
  // row_number is 1-indexed row number from CSV
  const masterRow = master[r.row_number - 1] || {};
  
  let source = masterRow.source || "Google Play";
  if (source === "YouTube") source = "YouTube comments";

  let quote = masterRow.text || "";
  // Strip outer quotes if doubled
  if (quote.startsWith('"') && quote.endsWith('"')) {
    quote = quote.slice(1, -1);
  }

  return {
    ...r,
    source,
    quote
  };
});

fs.writeFileSync(jsonPath, JSON.stringify(correctedReviews, null, 2));

const correctedPath = path.join(__dirname, '../public/data/reviews_data_corrected.json');
fs.writeFileSync(correctedPath, JSON.stringify(correctedReviews, null, 2));

console.log('Successfully created corrected dataset with', correctedReviews.length, 'records.');

const spotRows = [10, 14, 20, 40, 47, 52, 77];
spotRows.forEach(rn => {
  const found = correctedReviews.find(r => r.row_number === rn);
  console.log(`Row #${rn}: [${found?.source}] "${found?.quote}"`);
});
