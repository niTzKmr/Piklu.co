const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const configPath = path.join(__dirname, '../config.json');
const csvPath = path.join(__dirname, '../catalog.csv');

async function main() {
  try {
    if (!fs.existsSync(configPath)) {
      console.error(`Error: config.json not found at ${configPath}. Please make sure it is configured.`);
      process.exit(1);
    }

    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    const url = config.spreadsheetUrl;

    if (!url) {
      console.error('Error: spreadsheetUrl is not configured in config.json.');
      process.exit(1);
    }

    console.log(`Fetching latest catalog from Google Sheets: ${url}`);
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`Error fetching spreadsheet: ${response.statusText} (${response.status})`);
      process.exit(1);
    }

    const csvContent = await response.text();
    
    // Simple check to see if we got HTML instead of CSV (e.g. login page / publish to web required)
    if (csvContent.trim().startsWith('<!DOCTYPE html>') || csvContent.trim().includes('<html')) {
      console.error('Error: Received HTML content instead of CSV. Please make sure the Google Spreadsheet is shared with "Anyone with the link can view".');
      process.exit(1);
    }

    fs.writeFileSync(csvPath, csvContent, 'utf8');
    console.log('Successfully updated local catalog.csv');

    // Run the parsing script
    console.log('Running catalog parser...');
    execSync('node scripts/parse-catalog.cjs', { stdio: 'inherit', cwd: path.join(__dirname, '..') });

  } catch (err) {
    console.error('Error during catalog pull:', err.message);
    process.exit(1);
  }
}

main();
