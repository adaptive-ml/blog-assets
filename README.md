# Blog Assets

**⚠️ PRODUCTION ASSETS — DO NOT MODIFY WITHOUT APPROVAL**

Static hosting for blog visualizations. Deployed to GitHub Pages for stable URLs. These assets are embedded in live Webflow blog posts.

**Rules:**
- Do not modify, rename, or delete existing files
- Asset filenames contain content hashes — changing them breaks live embeds
- Safe: Adding new content, regenerating `inline.html` for same build

## Structure

```
blog-assets/
├── attention/              # Attention explainer
├── speculative-decoding/   # Speculative decoding explainer
├── <post-name>/            # Future posts
│   ├── embed.html          # HTML fragment for Webflow embedding
│   ├── index.html          # Standalone preview (full page)
│   ├── inline.html         # embed.html with absolute URLs
│   ├── assets/             # JS, CSS, fonts
│   ├── demos/              # Iframe demos (optional)
│   └── scenes/             # Shallot scene files (optional)
└── scripts/                # Build utilities
```

## Usage

### Adding a Post

From blog-components:

```bash
cd content/<post-name> && bun run build
cp -r dist/* ../blog-assets/<post-name>/
cd ../blog-assets && bun run inline <post-name>
```

### Generate Inline Embed for Webflow

```bash
bun run inline <post-name>
```

This creates `<post-name>/inline.html` with absolute URLs ready to paste into Webflow.

### URLs

- **Standalone preview**: https://adaptive-ml.github.io/blog-assets/<post-name>/
- **Inline embed**: https://adaptive-ml.github.io/blog-assets/<post-name>/inline.html

Copy the contents of `inline.html` into a Webflow HTML Embed element.
