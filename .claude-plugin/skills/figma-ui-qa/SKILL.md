---
description: Generate UI test cases from Figma designs and screenshots (PLACEHOLDER — not yet implemented)
disable-model-invocation: true
---

# Figma UI QA (PLANNED / PLACEHOLDER)

> **Status:** PLANNED / PLACEHOLDER
> No Figma API key is configured. This skill defines intended behavior once Figma integration is available.

## Intended Workflow

1. Receive a Figma file key and node ID from the user
2. Use Figma MCP tools to fetch design layout, components, and styles
3. Generate UI test cases that map Figma elements to test scenarios

## Current State

Figma MCP tools come from **`figma@claude-plugins-official`**, which is globally enabled in `~/.claude/settings.json`. The tools are available but:
- No `FIGMA_API_KEY` has been configured
- No Figma designs have been connected to this plugin yet
- Commands are defined (`/figma-design-review`, `/figma-screenshot`) but require valid credentials

## Planned MCP Tools

- `mcp__plugin_figma_figma__get_file` — fetch Figma file structure
- `mcp__plugin_figma_figma__get_node` — fetch specific node details
- `mcp__plugin_figma_figma__get_screenshot` — capture screenshot of frame/page

## Commands (Already Defined)

### `/figma-design-review`
Review a Figma design — describe its layout, components, and styles.
Path: `.claude-plugin/commands/figma-design-review.md`

### `/figma-screenshot`
Take a screenshot of a Figma frame or page and save it locally.
Path: `.claude-plugin/commands/figma-screenshot.md`

## Setup Required to Activate

1. Obtain a Figma API key from `figma.com/developers`
2. Store it as `FIGMA_API_KEY` in environment
3. Test with: `/figma-design-review` (provide file key)
4. Once working: add `figma-ui-qa` skill to the test case generation flow

## Planned Test Case Categories

- Layout validation against Figma specs
- Component interaction (buttons, inputs, modals)
- Responsive behavior (desktop, tablet, mobile breakpoints)
- Accessibility (contrast, focus order from design)
- Visual regression (compare rendered vs Figma design)