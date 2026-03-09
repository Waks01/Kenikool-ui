#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const packages = ['core', 'vanilla', 'react'];

console.log('Building TypeScript type definitions...\n');

for (const pkg of packages) {
  const pkgPath = path.join(__dirname, 'packages', pkg);
  const tsconfigPath = path.join(pkgPath, 'tsconfig.json');

  if (!fs.existsSync(tsconfigPath)) {
    console.log(`⚠️  Skipping ${pkg}: tsconfig.json not found`);
    continue;
  }

  console.log(`📦 Building ${pkg}...`);

  try {
    // Run TypeScript compiler
    execSync(`npx tsc --project "${tsconfigPath}"`, {
      stdio: 'inherit',
      cwd: __dirname,
    });
    console.log(`✅ ${pkg} built successfully\n`);
  } catch (error) {
    console.error(`❌ Error building ${pkg}:`, error.message);
    process.exit(1);
  }
}

console.log('✅ All type definitions generated successfully!');
