---
name: figma-ui-qa
description: FUTURE placeholder skill for generating UI QA test cases from Figma screens/designs.
---

# Figma UI QA (FUTURE / NOT YET IMPLEMENTED)

> **Status:** FUTURE
> No Figma API key is configured. See `docs/FUTURE_INTEGRATIONS.md`.

Figma MCP tools come from `figma@claude-plugins-official` (globally enabled). The `/figma-design-review` and `/figma-screenshot` commands are defined in `commands/` but require a valid Figma API key to function.

## Planned Workflow

### Step 1 — Capture Figma Design
When Figma API key is configured, use Figma MCP tools to fetch design layouts and component specifications.

### Step 2 — Analyze UI Elements
Extract buttons, forms, labels, layout structure, and styling from the Figma design.

### Step 3 — Generate UI Test Cases
Generate test cases covering UI elements, interactions, responsive behavior, and accessibility.

## Current State

This is a placeholder. Do not attempt to use Figma tools without a valid `FIGMA_API_KEY`.

## To Activate

1. Obtain a Figma API key from `figma.com/developers`
2. Set `FIGMA_API_KEY` in your environment
3. Update relevant configuration
4. Test with a real Figma file and node ID

## Roadmap

See `docs/FUTURE_INTEGRATIONS.md` for the Figma integration roadmap.
