---
description: Review a Figma design — describe its layout, components, and styles
allowed-tools:
  - "mcp__plugin_figma_figma__*"
---

# /figma-design-review (FUTURE — requires Figma API key)

> **Status:** PLACEHOLDER / NOT ACTIVE
> No Figma API key has been configured. This command will not function until a `FIGMA_API_KEY` is set.

When activated, this command will review a Figma design by file key and node ID.

## Steps (planned)

1. **Get the Figma file key and node ID** — Ask the user for:
   - The Figma file key (from the file URL: `figma.com/file/{fileKey}/...`)
   - The node ID to inspect (optional — defaults to the entire file)

2. **Fetch the design context** — Use Figma MCP tools to get file metadata, canvas structure, and node layout.

3. **Review the design** — Analyze layout, components, color palette, typography, spacing, and design patterns.

4. **Present findings** — Give the user a structured review.

## To Activate

1. Obtain a Figma API key from `figma.com/developers`
2. Set `FIGMA_API_KEY` in your environment
3. Update `plugin.json` to include the key
4. Test with a real Figma file key
