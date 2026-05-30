---
description: Review a Figma design — describe its layout, components, and styles
allowed-tools:
  - "mcp__plugin_figma_figma__*"
  - "mcp__plugin_figma_Framelink_MCP_for_Figma__get_figma_data"
---

# /figma-design-review

> **Requires:** `FIGMA_API_KEY` in `.env.local` (see `docs/FIGMA_MCP_SETUP.md`)

Review a Figma design by fetching file data and analyzing layout, components, typography, and styling.

## Usage

```
/figma-design-review <file-url-or-key> [node-id]
```

Examples:
```
/figma-design-review https://www.figma.com/file/abc123/MyFile?node-id=123:456
/figma-design-review abc123 123:456
/figma-design-review abc123
```

## Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `file-url-or-key` | Yes | Figma file URL or file key (alphanumeric from `figma.com/file/{key}/...`) |
| `node-id` | No | Node ID to inspect (format: `123:456`). Extracted from URL if provided there. |

## Steps

1. **Parse input** — Extract file key and node ID from the arguments
2. **Fetch design** — Call `get_figma_data` with file key and node ID
3. **Analyze** — Describe layout, components, color palette, typography, spacing, and design patterns
4. **Present findings** — Give a structured review with observations and recommendations

## Error Handling

If Figma auth is missing or invalid, the command exits gracefully with setup instructions. Jira functionality is unaffected.
