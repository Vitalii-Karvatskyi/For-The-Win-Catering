import fs from 'fs';

const h = fs.readFileSync(
  'c:/Users/wital/OneDrive/Рабочий стол/Event Catering _ Smash Burgers for Your Event _ For The Win.html',
  'utf8',
);
const b = h.match(/<body[^>]*>([\s\S]*)<\/body>/i)[1];

const imageFiles = new Set();
for (const m of b.matchAll(/\/images\/([a-zA-Z0-9-]+\.(?:webp|jpeg|jpg|png))/g)) {
  imageFiles.add(m[1]);
}
for (const m of b.matchAll(/_files\/([a-zA-Z0-9-]+\.(?:webp|jpeg|jpg|png))/g)) {
  imageFiles.add(m[1]);
}
console.log('IMAGES:', [...imageFiles].sort().join('\n'));

const sections = [];
let idx = 0;
while (true) {
  const s = b.indexOf('<section', idx);
  if (s < 0) break;
  const e = b.indexOf('</section>', s);
  const chunk = b.slice(s, e + 10);
  const h2 = chunk.match(/<h2[^>]*>([^<]+)/);
  sections.push(h2 ? h2[1] : chunk.slice(0, 80).replace(/\s+/g, ' '));
  idx = e + 10;
}
console.log('\nSECTIONS:', sections.join(' | '));

const footerStart = b.indexOf('<footer');
console.log('\nFOOTER NAV:');
const foot = b.slice(footerStart, footerStart + 5000);
for (const m of foot.matchAll(/href="([^"]+)"[^>]*>([^<]+)</g)) {
  console.log(m[2].trim(), '->', m[1]);
}

const grid = b.indexOf('grid grid-cols-3');
const gridChunk = b.slice(grid, grid + 4000);
for (const m of gridChunk.matchAll(/alt="([^"]+)"[^>]*src="\.\/[^"]+\/([^"]+)"/g)) {
  console.log('GRID:', m[2], '|', m[1]);
}
for (const m of gridChunk.matchAll(/src="\.\/[^"]+\/([^"]+\.jpeg)"/g)) {
  console.log('GRID file:', m[1]);
}

const testi = b.indexOf('What Our Guests Say');
console.log('\nTESTI section open:', b.slice(testi - 450, testi + 100).replace(/\s+/g, ' '));

const occ = b.indexOf('Catering for Every Occasion');
console.log('\nOCC:', b.slice(occ, occ + 2200).replace(/\s+/g, ' '));

for (const name of ['e1ee9f26-91eb-4225-a0fb-a843c8dcf387.jpeg']) {
  const i = b.indexOf(name);
  if (i > 0) console.log('\nIMG ctx', name, b.slice(i - 120, i + 80).replace(/\s+/g, ' '));
}
