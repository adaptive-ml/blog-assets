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

### Generate Inline Embed for Webflow

After copying a demo, generate the inline embed with absolute URLs:

```bash
bun run inline gspo
```

This creates `demos/gspo/inline.html` with absolute URLs ready to paste into Webflow.

### URLs

- **Standalone preview**: https://adaptive-ml.github.io/blog-assets/demos/gspo/
- **Inline embed**: https://adaptive-ml.github.io/blog-assets/demos/gspo/inline.html

Copy the contents of `inline.html` into a Webflow HTML Embed element.
