# Figma UI QA

**Status:** PLANNED / PLACEHOLDER

This document describes the planned Figma integration. It is not yet implemented.

## Why It's Not Available

No Figma API key has been configured. Figma MCP tools come from `figma@claude-plugins-official` which requires OAuth. The local `figma-developer-mcp` option requires a Figma API key, which has not been obtained yet.

## Planned Capabilities

When implemented, this integration will:
- Review Figma designs (layout, components, styles)
- Generate UI test cases from Figma designs
- Validate layout against Figma specs
- Generate component interaction tests
- Screenshot Figma frames for documentation

## Figma Skill

See `.claude/skills/figma-ui-qa/SKILL.md` for the skill definition.

## Commands

- `/figma-design-review` — Review a Figma design by file key
- `/figma-screenshot` — Screenshot a Figma frame

These commands are defined but require a valid Figma API key to function.