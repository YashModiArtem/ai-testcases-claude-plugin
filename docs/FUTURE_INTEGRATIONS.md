# Future Integrations

**Date:** 2026-05-29
**Status:** Jira is active. Confluence and Figma are planned/future.

---

## Status Overview

| Integration | Status | Verified |
|-------------|--------|---------|
| **Jira QA Test Generation** | **ACTIVE** | Yes — natural language command works |
| **Plugin Slash Commands** | **PENDING** | Not yet validated |
| **Confluence Extraction** | **PARTIAL / FUTURE** | Not connected |
| **Figma UI QA** | **PLANNED / FUTURE** | No API key configured |

---

## Jira QA Test Generation — ACTIVE

This is the primary active workflow. See `docs/QA_TEAM_USAGE.md` for daily usage.

---

## Plugin Slash Commands — PENDING VALIDATION

Slash command invocation for `/jira-qa-testcase-generator` is still being validated. Until resolved, use the natural language form:

```
Generate test cases for BH-5474
```

See `docs/KNOWN_ISSUES.md` for details.

---

## Confluence Extraction

**Status:** PARTIAL / FUTURE — Not connected.

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

See `.claude/skills/confluence-extraction/SKILL.md` for the placeholder skill.

---

## Figma UI QA

**Status:** PLANNED / FUTURE — No API key configured.

### Current State

- **No Figma API key is configured anywhere** — this integration is a placeholder
- Figma MCP tools come from `figma@claude-plugins-official` (globally enabled)
- Command definitions exist: `/figma-design-review`, `/figma-screenshot`
- No actual Figma integration has been tested with this project
- Figma OAuth auth warning in Claude Code is **expected** and does not affect Jira functionality

### What Would Enable It

1. Obtain a Figma API key from `figma.com/developers`
2. Set `FIGMA_API_KEY` environment variable in `.env.local`
3. Update MCP configuration to include Figma developer MCP
4. Test with a real Figma file
5. Add Figma QA skill reference to the plugin manifest

### Intended Capabilities (when enabled)

- Generate UI test cases from Figma designs
- Validate layout against Figma specs
- Generate component interaction tests
- Accessibility validation from design contrast/spacing

### IMPORTANT

**Do not claim Figma is active.** It is a planned/placeholder integration. The Figma OAuth warning in Claude Code is expected — it does not indicate a problem with the Jira MCP.

---

## Repository Architecture

```
repo-root/
├── skills/                  # ACTIVE skill locations
│   ├── jira-qa-testcase-generator/SKILL.md   # ACTIVE
│   ├── confluence-extraction/SKILL.md           # FUTURE — placeholder
│   └── figma-ui-qa/SKILL.md                   # FUTURE — placeholder
├── commands/
│   ├── jira-qa-testcase-generator.md   # PENDING validation
│   ├── figma-design-review.md   # FUTURE — placeholder
│   └── figma-screenshot.md      # FUTURE — placeholder
├── scripts/
│   ├── setup-atlassian-mcp.js
│   ├── load-env.ps1
│   └── jira-docker-test/
├── docs/
│   ├── QA_TEAM_USAGE.md
│   ├── JIRA_MCP_SETUP.md
│   ├── CREDENTIALS_SETUP.md
│   ├── INSTALLATION_CHECKLIST.md
│   ├── FUTURE_INTEGRATIONS.md  # ← You are here
│   ├── KNOWN_ISSUES.md
│   └── legacy/
│       └── claude-plugin-skills-backup/
├── .claude-plugin/
│   ├── plugin.json            # Plugin manifest only
│   ├── skills/               # Mirrors root-level skills/
│   └── commands/             # Mirrors root-level commands/
```

**Active convention:** `skills/` and `commands/` at the repo root are the canonical locations.

---

## Development Notes

### MCP Server Discovery

Claude Code auto-detects plugins in:
1. `~/.claude/plugins/` (global)
2. `.claude-plugin/` in project root (local)
3. `.claude-plugin/` in project root (local)

### Confluence MCP Limitation

`@xuandev/atlassian-mcp` uses the Atlassian `config.domain` field for the base URL. Both Jira and Confluence cannot be configured simultaneously with the same package instance. A separate MCP server or a reverse proxy is required.

### Figma Authentication

Figma MCP via `figma@claude-plugins-official` (globally enabled) uses OAuth. A local developer MCP (`figma-developer-mcp`) would use API key auth. Neither is active for QA test generation — Figma is a future placeholder.

### User-Level Settings

User-level settings (`~/.claude/settings.json`) are machine-specific and must never be committed to Git. They are configured manually per machine by each QA team member. The repo provides documentation for what to set but does not generate or commit these files.
