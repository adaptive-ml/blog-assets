#!/usr/bin/env bun

import { readdir } from 'fs/promises';

const demos = await readdir('demos', { withFileTypes: true });
const demoNames = demos.filter((d) => d.isDirectory()).map((d) => d.name);

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
${demoNames.map((name) => `    <li><a href="${name}/">${name}</a></li>`).join('\n')}
  </ul>
</body>
</html>
`;

await Bun.write('demos/index.html', html);
console.log('Generated demos/index.html');
