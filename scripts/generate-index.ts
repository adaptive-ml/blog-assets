#!/usr/bin/env bun

import { readdir, stat } from 'node:fs/promises';

const EXCLUDED = new Set(['.git', '.github', 'scripts', 'node_modules']);

async function getPosts(): Promise<string[]> {
  const entries = await readdir('.');
  const posts: string[] = [];

  for (const entry of entries) {
    if (EXCLUDED.has(entry) || entry.startsWith('.')) continue;
    const stats = await stat(entry);
    if (stats.isDirectory()) {
      posts.push(entry);
    }
  }

  return posts.sort();
}

async function generateIndex(): Promise<void> {
  const posts = await getPosts();

  const listItems = posts.map((post) => `    <li><a href="${post}/">${post}</a></li>`).join('\n');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog Assets</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      max-width: 600px;
      margin: 40px auto;
      padding: 0 20px;
      line-height: 1.6;
    }
    h1 { margin-bottom: 32px; }
    ul { list-style: none; padding: 0; }
    li { margin: 12px 0; }
    a { color: #0066cc; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <h1>Blog Assets</h1>
  <ul>
${listItems}
  </ul>
</body>
</html>
`;

  await Bun.write('index.html', html);
  console.log(`Generated index.html with ${posts.length} posts: ${posts.join(', ')}`);
}

await generateIndex();
