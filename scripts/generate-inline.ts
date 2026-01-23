#!/usr/bin/env bun

const BASE_URL = 'https://adaptive-ml.github.io/blog-assets';

async function generateInlineEmbed(postName: string): Promise<void> {
  const webflowPath = `${postName}/webflow/index.html`;
  const outPath = `${postName}/inline.html`;

  const content = await Bun.file(webflowPath).text();

  // Extract body content (strip full HTML wrapper)
  const bodyMatch = content.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  let fragment = bodyMatch ? bodyMatch[1].trim() : content;

  // Extract head scripts/styles that should be included
  const headMatch = content.match(/<head[^>]*>([\s\S]*)<\/head>/i);
  let headContent = '';
  if (headMatch) {
    const scripts = headMatch[1].match(/<script[^>]*>[\s\S]*?<\/script>|<script[^>]*\/>/g) || [];
    const links = headMatch[1].match(/<link[^>]*>/g) || [];
    headContent = [...scripts, ...links].join('\n');
  }

  // Combine head assets + body content
  fragment = headContent + '\n' + fragment;

  // Fix asset paths (from webflow/ subdirectory to root)
  fragment = fragment.replace(/\.\.\/assets\//g, `${BASE_URL}/${postName}/assets/`);
  fragment = fragment.replace(/\.\.\/demos\//g, `${BASE_URL}/${postName}/demos/`);

  await Bun.write(outPath, fragment);
  console.log(`Generated ${outPath}`);
}

async function generateRedirectIndex(postName: string): Promise<void> {
  const outPath = `${postName}/index.html`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0;url=blog/">
  <link rel="canonical" href="blog/">
  <title>Redirecting...</title>
</head>
<body>
  <p>Redirecting to <a href="blog/">blog post</a>...</p>
</body>
</html>
`;

  await Bun.write(outPath, html);
  console.log(`Generated ${outPath}`);
}

const postName = process.argv[2];

if (!postName) {
  console.error('Usage: bun scripts/generate-inline.ts <post-name>');
  console.error('Example: bun scripts/generate-inline.ts attention');
  process.exit(1);
}

await generateInlineEmbed(postName);
await generateRedirectIndex(postName);
