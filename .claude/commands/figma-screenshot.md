---
description: Take a screenshot of a Figma frame or page and save it locally
allowed-tools:
  - "mcp__plugin_figma_figma__*"
  - "mcp__plugin_figma_Framelink_MCP_for_Figma__get_figma_data"
  - "mcp__plugin_figma_Framelink_MCP_for_Figma__download_figma_images"
---

# /figma-screenshot

> **Requires:** `FIGMA_API_KEY` in `.env.local` (see `docs/FIGMA_MCP_SETUP.md`)

Capture a screenshot of a Figma frame or page and save it to the project directory.

## Usage

```
/figma-screenshot <file-url-or-key> [node-id] [output-filename]
```

Examples:
```
/figma-screenshot https://www.figma.com/file/abc123/MyFile?node-id=123:456
/figma-screenshot abc123 123:456 my-frame.png
/figma-screenshot abc123 123:456
```

## Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `file-url-or-key` | Yes | Figma file URL or file key |
| `node-id` | Yes | Node ID of the frame/page to screenshot (format: `123:456`) |
| `output-filename` | No | Output filename (default: `figma-screenshot.png`) |

## Steps

1. **Parse input** — Extract file key and node ID from arguments
2. **Download image** — Use `download_figma_images` to fetch the frame as PNG/SVG
3. **Save** — Save to project root (images directory if present)
4. **Confirm** — Report the saved file path to the user

## Error Handling

If Figma auth is missing or invalid, the command exits gracefully with setup instructions. Jira functionality is unaffected.
