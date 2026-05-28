# my-first-plugin (LEGACY — preserved for backward compatibility)

> **This directory is kept for backward compatibility only.**
> **Do not use this directory for new work.** See `docs/QA_TEAM_USAGE.md`.

## Current Active Structure

The active plugin structure uses:
- **Skills:** `skills/` at repo root (mirrored to `.claude-plugin/skills/`)
- **Commands:** `commands/` at repo root (mirrored to `.claude-plugin/commands/`)
- **Plugin manifest:** `.claude-plugin/plugin.json`
- **Scripts:** `scripts/`

## Quick Reference

For setup and usage, see:
- `docs/QA_TEAM_USAGE.md` — QA team quick start
- `docs/JIRA_MCP_SETUP.md` — MCP configuration and troubleshooting
- `docs/FUTURE_INTEGRATIONS.md` — Roadmap for Confluence and Figma

## Files in This Directory (LEGACY — do not modify)

| File | Notes |
|------|-------|
| `plugin.json` | Legacy plugin manifest — `.claude-plugin/plugin.json` is active |
| `skills/SKILL.md` | Legacy skill — `skills/jira-qa-testcase-generator/SKILL.md` is active |
| `setup-atlassian-mcp.js` | Legacy patch script — `scripts/setup-atlassian-mcp.js` is active |
| `commands/figma-design-review.md` | Legacy Figma command — `commands/figma-design-review.md` is active |
| `commands/figma-screenshot.md` | Legacy Figma command — `commands/figma-screenshot.md` is active |
| `README.md` | This file |

## Why This Directory Exists

`~/.claude/settings.json` may reference `my-first-plugin@local: true`. This directory must remain at `my-first-plugin/` for as long as that reference exists on any machine using this repo. Once all machines have migrated to `.claude-plugin@local: true`, this directory can be safely removed.

## Skill Location Update

The original `skills/SKILL.md` has been split into:
- `skills/jira-qa-testcase-generator/SKILL.md` — Jira QA test case generator (ACTIVE)
- `skills/confluence-extraction/SKILL.md` — Confluence extraction (FUTURE)
- `skills/figma-ui-qa/SKILL.md` — Figma UI QA (FUTURE)

See `skills/` at the repo root for the active skill directory.
