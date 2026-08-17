const fs = require('fs');

function analyzeFile(filename) {
  if (!fs.existsSync(filename)) return;
  const content = fs.readFileSync(filename, 'utf8');
  const parts = content.split(/["']/);
  const matches = parts.filter(p => 
    p.length > 2 && p.length < 100 && 
    (p.includes('venue') || p.includes('slot') || p.includes('book') || p.includes('cart') || p.includes('api') || p.includes('sport') || p.includes('http'))
  );
  console.log(`=== ${filename} ===`);
  const unique = Array.from(new Set(matches));
  console.log('Matches:', unique.slice(0, 50));
}

['venue_detail.js', 'venue_search.js', 'app.js', 'commons.js', 'chunk80e.js'].forEach(analyzeFile);
