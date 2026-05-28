---
description: Review a Figma design — describe its layout, components, and styles
allowed-tools:
  - "mcp__plugin_figma_figma__*"
---

You will review a Figma design for the user.

## Steps

1. **Get the Figma file key and node ID** — Ask the user for:
   - The Figma file key (from the file URL: `figma.com/file/{fileKey}/...`)
   - The node ID to inspect (optional — defaults to the entire file)

2. **Fetch the design context** — Use the Figma MCP tools to get:
   - The file metadata (name, last modified, version)
   - The canvas/page structure
   - The requested node's layout and children

3. **Review the design** — Analyze and describe:
   - Overall layout and composition
   - Key components and their hierarchy
   - Color palette and typography
   - Spacing and alignment patterns
   - Any notable design patterns

4. **Present findings** — Give the user a clear, structured review of the design.