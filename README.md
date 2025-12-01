# Blog Assets

Static hosting for blog visualizations. Deployed to GitHub Pages for stable URLs.

## Structure

```
demos/
├── gspo/           # GSPO explainer visualization
│   ├── embed.html  # HTML fragment for Webflow embedding
│   ├── index.html  # Standalone preview (full page)
│   └── assets/     # JS, CSS, fonts
└── <future>/       # Additional demos
```

## Usage

### Local Development

```bash
bun install
bun dev
```

### Adding a Demo

Copy built demo files from blog-components:

```bash
cp -r ~/blog-components/demos/<name>/dist demos/<name>
```

### URLs

- **Standalone preview**: https://adaptive-ml.github.io/blog-assets/demos/gspo/
- **Embed fragment**: https://adaptive-ml.github.io/blog-assets/demos/gspo/embed.html

Note: `embed.html` is an HTML fragment (no `<html>`/`<body>` tags) designed to be injected into Webflow. View `index.html` for a styled standalone preview.
