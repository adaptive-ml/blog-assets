# Blog Assets

Static hosting for blog visualizations. Deployed to GitHub Pages for stable URLs.

## Structure

```
demos/
├── gspo/           # GSPO explainer visualization
│   ├── embed.html  # Embeddable content for Webflow
│   ├── index.html  # Standalone preview
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

### Embedding in Webflow

Use the GitHub Pages URL:
```
https://<user>.github.io/blog-assets/gspo/embed.html
```
