#!/usr/bin/env bun

import * as fs from 'fs';

const BASE_URL = 'https://adaptive-ml.github.io/blog-assets';

async function generateInlineEmbed(demoName: string): Promise<void> {
  const demoDir = `demos/${demoName}`;
  const flatPath = `${demoDir}/embed.html`;
  const nestedPath = `${demoDir}/blog/embed.html`;
  const outPath = `${demoDir}/inline.html`;

  let embedPath: string;
  let isNested = false;

  if (fs.existsSync(nestedPath)) {
    embedPath = nestedPath;
    isNested = true;
  } else if (fs.existsSync(flatPath)) {
    embedPath = flatPath;
  } else {
    console.error(`Error: embed.html not found at ${flatPath} or ${nestedPath}`);
    process.exit(1);
  }

  const content = await Bun.file(embedPath).text();
  const pattern = isNested ? /\.\.\/assets\//g : /\.\/assets\//g;
  const absoluteContent = content.replace(pattern, `${BASE_URL}/${demoName}/assets/`);

  await Bun.write(outPath, absoluteContent);
  console.log(`Generated ${outPath} (from ${embedPath})`);
}

const demoName = process.argv[2];

if (!demoName) {
  console.error('Usage: bun scripts/generate-inline.ts <demo-name>');
  console.error('Example: bun scripts/generate-inline.ts attention');
  process.exit(1);
}

await generateInlineEmbed(demoName);
