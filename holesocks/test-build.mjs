import fs from 'fs';
import path from 'path';

// Simulate what getStaticParams should return
const products = [
  { id: "le-philosophe" },
  { id: "le-drole" },
  { id: "le-coquin" },
  { id: "le-bricoleur" },
  { id: "le-minimal" },
  { id: "le-extreme" },
  { id: "le-zen" },
  { id: "le-poete" },
];

console.log("Expected static params:", products);
console.log("\nFiles in /out/produit/:");
const outDir = './out/produit/';
const files = fs.readdirSync(outDir);
files.forEach(f => {
  if (f.includes('philosophe')) {
    console.log(`- ${f}`);
  }
});

// Check HTML content
const htmlPath = path.join(outDir, 'le-philosophe.html');
const content = fs.readFileSync(htmlPath, 'utf8');
if (content.includes('404')) {
  console.log("\n❌ ERROR: le-philosophe.html contains '404'");
  console.log("First 200 chars:", content.substring(0, 200));
} else {
  console.log("\n✅ le-philosophe.html does NOT contain 404");
}
