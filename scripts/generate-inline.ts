#!/usr/bin/env bun

const BASE_URL = 'https://adaptive-ml.github.io/blog-assets';

async function generateInlineEmbed(demoName: string): Promise<void> {
  const demoDir = `demos/${demoName}`;
  const embedPath = `${demoDir}/embed.html`;
  const outPath = `${demoDir}/inline.html`;

  const content = await Bun.file(embedPath).text();

  const absoluteContent = content.replace(
    /(?:src|href)="\.\/assets\//g,
    (match) => match.replace('./assets/', `${BASE_URL}/${demoName}/assets/`)
  );

  await Bun.write(outPath, absoluteContent);
  console.log(`Generated ${outPath}`);
}

const demoName = process.argv[2];

if (!demoName) {
  console.error('Usage: bun scripts/generate-inline.ts <demo-name>');
  console.error('Example: bun scripts/generate-inline.ts gspo');
  process.exit(1);
}

await generateInlineEmbed(demoName);
