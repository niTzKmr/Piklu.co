const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, '../catalog.csv');
const productsDirPath = path.join(__dirname, '../public/Products');

// Directories to explicitly ignore as they are legacy category folders
const ignoreDirs = ['Frame', 'Hamper', 'Keychain', 'Mug', 'Pixellated collection'];

// Map specific folders to existing catalog entry IDs (overriding standard lower-cased mapping)
const folderToIdOverrides = {
  'pixel-frame-4x4': 'pixelated-frame',
  'pixel-frame-6x4': 'pixelated-frame',
  'pixel-cutom-keychain': 'pixelated-keychain'
};

// Utility to parse a single CSV line into cells
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

// Utility to escape a cell value for CSV writing
function escapeCSVValue(val) {
  if (val === undefined || val === null) return '';
  let str = String(val);
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    str = '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

try {
  // 1. Read existing CSV catalog rows
  if (!fs.existsSync(csvPath)) {
    console.error(`Error: catalog.csv not found at ${csvPath}`);
    process.exit(1);
  }

  const csvContent = fs.readFileSync(csvPath, 'utf8');
  const lines = csvContent.split(/\r?\n/).filter(line => line.trim() !== '');
  
  if (lines.length === 0) {
    console.error("Error: catalog.csv is empty.");
    process.exit(1);
  }

  const headers = parseCSVLine(lines[0]);
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const cells = parseCSVLine(lines[i]);
    if (cells.length < 5) continue; // Skip malformed rows
    
    const row = {};
    headers.forEach((header, idx) => {
      row[header] = cells[idx] || '';
    });
    rows.push(row);
  }

  console.log(`Loaded ${rows.length} existing catalog entries from catalog.csv.`);

  // 2. Scan public/Products/ subdirectories
  if (!fs.existsSync(productsDirPath)) {
    console.error(`Error: public/Products directory not found at ${productsDirPath}`);
    process.exit(1);
  }

  const dirItems = fs.readdirSync(productsDirPath);
  let foldersFound = 0;
  let productsUpdated = 0;
  let productsAdded = 0;
  const warnings = [];
  const addedDetails = [];
  const updatedDetails = [];

  dirItems.forEach(item => {
    const itemPath = path.join(productsDirPath, item);
    const stat = fs.statSync(itemPath);

    // Skip ignored legacy folders and non-directories
    if (!stat.isDirectory() || ignoreDirs.includes(item)) {
      return;
    }

    foldersFound++;

    // Find direct image files inside the directory
    const files = fs.readdirSync(itemPath);
    const images = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.png', '.jpg', '.jpeg', '.webp', '.gif'].includes(ext);
    });

    if (images.length === 0) {
      warnings.push(`Folder "${item}" contains 0 images. Skipping sync for this item.`);
      return;
    }

    // Sort files naturally/numerically (e.g. 1.webp, 2.webp, 10.webp sorted naturally)
    images.sort((a, b) => {
      const aNum = parseInt(a.match(/\d+/)?.[0] || '0', 10);
      const bNum = parseInt(b.match(/\d+/)?.[0] || '0', 10);
      if (aNum !== bNum) return aNum - bNum;
      return a.localeCompare(b);
    });

    // Construct image paths column value
    const relativeImagePaths = images.map(img => `/Products/${item}/${img}`);
    const imageStringValue = relativeImagePaths.join(' | ');

    // Generate slug and match with existing catalog entry
    let slug = item.toLowerCase();
    const folderSlug = slug;
    if (folderToIdOverrides[slug]) {
      slug = folderToIdOverrides[slug];
    }
    const existingIndex = rows.findIndex(row => row.id.toLowerCase() === slug);

    if (existingIndex > -1) {
      // Catalog entry exists - UPDATE ONLY the image information
      if (folderToIdOverrides[folderSlug]) {
        // For overridden folders, merge/append unique images rather than overwriting
        const existingImages = rows[existingIndex].image ? rows[existingIndex].image.split(' | ').filter(Boolean) : [];
        // Clean out legacy paths referencing 'Pixellated collection'
        const cleanedExisting = existingImages.filter(img => !img.includes('Pixellated collection'));
        const newImages = imageStringValue.split(' | ');
        const combined = Array.from(new Set([...cleanedExisting, ...newImages]));
        rows[existingIndex].image = combined.join(' | ');
      } else {
        rows[existingIndex].image = imageStringValue;
      }
      productsUpdated++;
      updatedDetails.push({ id: rows[existingIndex].id, imagesCount: rows[existingIndex].image.split(' | ').length });
    } else {
      // Catalog entry does NOT exist - CREATE a new row dynamically
      // Infer category from suffix
      let category = 'Unique Gifts';
      let tag = 'gifts';
      const itemLower = item.toLowerCase();
      if (itemLower.endsWith('-keychain')) {
        category = 'Keychain';
        tag = 'keychains';
      } else if (itemLower.endsWith('-frame')) {
        category = 'Frame';
        tag = 'frames';
      } else if (itemLower.endsWith('-mug')) {
        category = 'Mug';
        tag = 'mugs';
      }

      // Format human-readable title name from folder name
      const cleanName = item
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      const newProduct = {
        id: slug,
        name: cleanName,
        price: '99', // Default base price placeholder
        category: category,
        description: `A beautiful handcrafted ${cleanName.toLowerCase()}.`,
        image: imageStringValue,
        recommended: 'false',
        collection: '',
        specifications: '',
        faqs: '',
        varieties: '',
        tags: tag,
        sku: slug,
        stock: '-1', // Unlimited/custom
        weight: '0',
        meta_title: cleanName,
        meta_description: `A beautiful handcrafted ${cleanName.toLowerCase()}.`,
        instagram_url: ''
      };

      rows.push(newProduct);
      productsAdded++;
      addedDetails.push({ id: slug, name: cleanName, category });
    }
  });

  // 3. Write updated catalog back to CSV
  const csvHeadersString = headers.join(',');
  const csvLines = [csvHeadersString];

  rows.forEach(row => {
    const line = headers.map(h => escapeCSVValue(row[h])).join(',');
    csvLines.push(line);
  });

  fs.writeFileSync(csvPath, csvLines.join('\n') + '\n', 'utf8');

  // 4. Output Summary Execution Report
  console.log('\n=============================================');
  console.log('CATALOG SYNC OPERATION COMPLETE');
  console.log('=============================================');
  console.log(`Discovered Product Folders : ${foldersFound}`);
  console.log(`Updated Catalog Entries    : ${productsUpdated}`);
  console.log(`Added New Catalog Entries  : ${productsAdded}`);
  
  if (addedDetails.length > 0) {
    console.log('\n--> ADDED PRODUCTS:');
    addedDetails.forEach(p => {
      console.log(`  * [NEW] ID: "${p.id}" | Name: "${p.name}" | Category: "${p.category}"`);
    });
  }

  if (warnings.length > 0) {
    console.log('\n--> WARNINGS / MISSING IMAGES:');
    warnings.forEach(w => {
      console.log(`  * ${w}`);
    });
  }

  // Generate warning list for products that are newly added and need custom metadata populated
  if (addedDetails.length > 0) {
    console.log('\n--> ACTION REQUIRED (Missing Metadata Report):');
    console.log('The products listed above are populated with placeholder descriptions, tags, and prices.');
    console.log('Please open and edit d:\\Piklu.Co\\catalog.csv to specify actual prices, custom FAQs, specifications, or Instagram URLs.');
  }
  console.log('=============================================\n');

} catch (err) {
  console.error("Error running catalog sync:", err.message);
  process.exit(1);
}
