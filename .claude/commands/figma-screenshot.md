---
description: Take a screenshot of a Figma frame or page
allowed-tools:
  - "mcp__plugin_figma_figma__*"
---

# /figma-screenshot (FUTURE — requires Figma API key)

> **Status:** PLACEHOLDER / NOT ACTIVE
> No Figma API key has been configured. This command will not function until a `FIGMA_API_KEY` is set.

When activated, this command will capture a screenshot of a Figma design and save it locally.

## Steps (planned)

1. **Get details from the user**:
   - Figma file key (from the file URL)
   - Node ID of the frame/page to screenshot
   - Output filename (default: `figma-screenshot.png`)

2. **Capture the screenshot** — Use the Figma MCP screenshot tool to download the image.

3. **Save the file** — Save it to the current working directory.

4. **Confirm** — Tell the user the screenshot was saved and where.

## To Activate

1. Obtain a Figma API key from `figma.com/developers`
2. Set `FIGMA_API_KEY` in your environment
3. Update `plugin.json` to include the key
4. Test with a real Figma file and node ID
