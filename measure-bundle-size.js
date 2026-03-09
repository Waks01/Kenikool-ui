const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

function getGzipSize(filePath) {
  try {
    const content = fs.readFileSync(filePath);
    const gzipped = zlib.gzipSync(content);
    return {
      raw: content.length,
      gzipped: gzipped.length,
    };
  } catch (err) {
    return null;
  }
}

function formatSize(bytes) {
  return (bytes / 1024).toFixed(2);
}

console.log('📦 Bundle Size Analysis\n');

// Vanilla bundle
const vanillaPath = 'packages/vanilla/dist/index.mjs';
const vanillaSize = getGzipSize(vanillaPath);

if (vanillaSize) {
  console.log('Vanilla Bundle:');
  console.log(`  Raw: ${formatSize(vanillaSize.raw)} KB`);
  console.log(`  Gzipped: ${formatSize(vanillaSize.gzipped)} KB`);
  console.log(`  Limit: 50 KB`);
  console.log(`  Status: ${vanillaSize.gzipped / 1024 <= 50 ? '✅ PASS' : '❌ FAIL'}\n`);
} else {
  console.log('Vanilla Bundle: ❌ Not found\n');
}

// React bundle
const reactPath = 'packages/react/dist/index.mjs';
const reactSize = getGzipSize(reactPath);

if (reactSize) {
  console.log('React Bundle:');
  console.log(`  Raw: ${formatSize(reactSize.raw)} KB`);
  console.log(`  Gzipped: ${formatSize(reactSize.gzipped)} KB`);
  console.log(`  Limit: 75 KB`);
  console.log(`  Status: ${reactSize.gzipped / 1024 <= 75 ? '✅ PASS' : '❌ FAIL'}\n`);
} else {
  console.log('React Bundle: ❌ Not found\n');
}

// Summary
console.log('Summary:');
if (vanillaSize && reactSize) {
  const vanillaPass = vanillaSize.gzipped / 1024 <= 50;
  const reactPass = reactSize.gzipped / 1024 <= 75;
  console.log(
    `  Vanilla: ${vanillaPass ? '✅' : '❌'} ${formatSize(vanillaSize.gzipped)} KB / 50 KB`
  );
  console.log(`  React: ${reactPass ? '✅' : '❌'} ${formatSize(reactSize.gzipped)} KB / 75 KB`);
  console.log(`\n  Overall: ${vanillaPass && reactPass ? '✅ ALL PASS' : '❌ SOME FAIL'}`);
}
