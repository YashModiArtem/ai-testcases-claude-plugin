# Future Integrations

**Date:** 2026-05-28

Roadmap for planned and partial integrations beyond Jira.

---

## Status Overview

| Integration | Status | ETA |
|-------------|--------|-----|
| **Jira QA Test Generation** | **ACTIVE** | Now |
| **Confluence Extraction** | **PARTIAL / FUTURE** | TBD |
| **Figma UI QA** | **PLANNED / FUTURE** | TBD |

---

## Confluence Extraction

**Status:** PARTIAL / FUTURE

### Current State

Confluence tools (`confluence_search`, `confluence_get_page`, etc.) exist in `@xuandev/atlassian-mcp` but are **not functional** because:

- The MCP package connects to a single domain
- That domain is configured as Jira Data Center (`jira.artem.internal`)
- Confluence is on a separate host (`confluence.artem.internal`)
- There is no reverse proxy to route Confluence through the same domain

### What Would Enable It

**Option A — Reverse Proxy (Recommended)**
Set up `api.artem.internal` that routes:
- `/wiki/*` → `confluence.artem.internal`
- All other paths → `jira.artem.internal`

Jira Data Center supports this via `server.xml` configuration.

**Option B — Separate MCP Package**
Use a different MCP server for Confluence, configured to `confluence.artem.internal` with its own PAT.

**Option C — Data Center Confluence Integration**
If your Jira and Confluence instances are already on the same Data Center deployment, the single-domain limitation may not apply. Test with the existing MCP.

### Skill Location

See `skills/confluence-extraction/SKILL.md` for the placeholder skill.

---

## Figma UI QA

**Status:** PLANNED / FUTURE

### Current State

- No Figma API key is configured anywhere
- Figma MCP tools come from `figma@claude-plugins-official` (globally enabled)
- Command definitions exist: `/figma-design-review`, `/figma-screenshot`
- No actual Figma integration has been tested

### What's Defined

**Commands** (`commands/`):
- `commands/figma-design-review.md` — Review a Figma design by file key (PLACEHOLDER)
- `commands/figma-screenshot.md` — Screenshot a Figma frame (PLACEHOLDER)

**Skill** (`skills/`):
- `skills/figma-ui-qa/SKILL.md` — Placeholder defining intended behavior

### What Would Enable It

1. Obtain a Figma API key from `figma.com/developers`
2. Set `FIGMA_API_KEY` environment variable
3. Update `plugin.json` to include `figma-developer-mcp` with the API key
4. Test with a real Figma file
5. Add `figma-ui-qa` skill reference to the plugin manifest

### Intended Capabilities

- Generate UI test cases from Figma designs
- Validate layout against Figma specs
- Generate component interaction tests
- Accessibility validation from design contrast/spacing
- Visual regression setup

---

## Plugin Architecture

The repository supports three integrations:

```
repo-root/
├── skills/                  # ACTIVE skill locations (root-level)
│   ├── jira-qa-testcase-generator/SKILL.md   # ACTIVE
│   ├── confluence-extraction/SKILL.md           # FUTURE
│   └── figma-ui-qa/SKILL.md                   # FUTURE
├── commands/
│   ├── figma-design-review.md   # FUTURE / PLACEHOLDER
│   └── figma-screenshot.md      # FUTURE / PLACEHOLDER
├── scripts/
│   ├── setup-atlassian-mcp.js
│   └── jira-docker-test/
├── .claude-plugin/           # Mirrors root-level for plugin discovery
│   ├── plugin.json
│   ├── skills/               # Identical to root-level skills/
│   └── commands/             # Identical to root-level commands/
├── my-first-plugin/          # LEGACY — preserved, do not modify
└── docs/
    ├── JIRA_MCP_SETUP.md
    ├── QA_TEAM_USAGE.md
    └── FUTURE_INTEGRATIONS.md
```

**Active convention:** `skills/` and `commands/` at the repo root are the canonical locations. `.claude-plugin/` mirrors them for plugin auto-discovery.

**Legacy convention:** `my-first-plugin/` is the old structure, kept for backward compatibility.

---

## Development Notes

### MCP Server Discovery

Claude Code auto-detects plugins in:
1. `~/.claude/plugins/` (global)
2. `.claude-plugin/` in project root (local)
3. `my-first-plugin/` (legacy local)

This repo uses `.claude-plugin/` as the active local plugin. `my-first-plugin/` is kept for backward compat.

### Confluence MCP Limitation

`@xuandev/atlassian-mcp` uses the Atlassian `config.domain` field for the base URL. Both Jira and Confluence cannot be configured simultaneously with the same package instance. A separate MCP server or a reverse proxy is required.

### Figma Authentication

Figma MCP via `figma@claude-plugins-official` (globally enabled) uses OAuth. A local developer MCP (`figma-developer-mcp`) would use API key auth. Neither is active for QA test generation — Figma is a future placeholder.

### User-Level Settings

User-level settings (`~/.claude/settings.json`) are machine-specific and must never be committed to Git. They are configured manually per machine by each QA team member. The repo provides documentation for what to set but does not generate or commit these files.
