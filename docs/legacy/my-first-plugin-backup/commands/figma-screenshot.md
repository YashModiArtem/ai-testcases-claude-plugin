---
description: Take a screenshot of a Figma frame or page
allowed-tools:
  - "mcp__plugin_figma_figma__*"
  - "mcp__plugin_figma_Framelink_MCP_for_Figma__*"
---

You will capture a screenshot of a Figma design and save it locally.

## Steps

1. **Get details from the user**:
   - Figma file key (from the file URL)
   - Node ID of the frame/page to screenshot
   - Output filename (default: `figma-screenshot.png`)

2. **Capture the screenshot** — Use the Figma MCP screenshot tool to download the image.

3. **Save the file** — Save it to the current working directory with the requested filename.

4. **Confirm** — Tell the user the screenshot was saved and where.
