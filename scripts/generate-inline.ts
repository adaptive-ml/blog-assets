#!/usr/bin/env bun

const BASE_URL = 'https://adaptive-ml.github.io/blog-assets';

async function generateInlineEmbed(demoName: string): Promise<void> {
  const embedPath = `${demoName}/embed.html`;
  const outPath = `${demoName}/inline.html`;

  const content = await Bun.file(embedPath).text();
  const absoluteContent = content.replace(/\.\/assets\//g, `${BASE_URL}/${demoName}/assets/`);

  await Bun.write(outPath, absoluteContent);
  console.log(`Generated ${outPath}`);
}

const demoName = process.argv[2];

if (!demoName) {
  console.error('Usage: bun scripts/generate-inline.ts <demo-name>');
  console.error('Example: bun scripts/generate-inline.ts attention');
  process.exit(1);
}

await generateInlineEmbed(demoName);
