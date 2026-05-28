# Migration Plan — Claude Code QA Plugin

**Date:** 2026-05-28
**Repository:** `c:\Users\LENOVO\AI TestCases`

## Repository Analysis Summary

### Current State

The repository is a working Claude Code plugin with Atlassian Jira MCP integration for QA test case generation. The primary active workflow (Jira via patched `@xuandev/atlassian-mcp`) is operational and has been tested successfully.

### Status Matrix

| Integration | Status | Notes |
|-------------|--------|-------|
| **Jira QA Generation** | **ACTIVE** | Patched `@xuandev/atlassian-mcp`, Bearer auth, API v2, Data Center |
| **Confluence Extraction** | **PARTIAL / FUTURE** | Package-level tools exist but not connected (separate host) |
| **Figma UI QA** | **PLACEHOLDER / PLANNED** | Commands defined, no API key configured yet |
| **Playwright** | **LEGACY** | `.playwright-mcp/` folder present (not used for this plugin) |

---

## 1. Existing Files Found

```
AI TestCases/
├── .claude/
│   └── settings.json          # Project-level settings + env vars
├── .playwright-mcp/           # Legacy playwright artifacts (ignore)
├── ai-testcases/
│   └── jira-docker-test/
│       ├── jira-test.js       # Docker Jira connectivity test (axios + Bearer)
│       ├── Dockerfile         # Node 18 slim + axios
│       └── package.json
├── docs/
│   └── superpowers/
│       └── specs/
│           └── 2026-05-27-atlassian-mcp-integration-design.md
├── my-first-plugin/
│   ├── plugin.json            # ACTIVE plugin manifest
│   ├── README.md              # Setup guide
│   ├── setup-atlassian-mcp.js # Patch script for Data Center
│   ├── commands/
│   │   ├── figma-design-review.md
│   │   └── figma-screenshot.md
│   └── skills/
│       └── SKILL.md           # ACTIVE Jira QA skill
```

---

## 2. Existing Working Integrations

### Jira MCP (ACTIVE — Production)
- **Package:** `@xuandev/atlassian-mcp` (globally installed via `npm install -g`)
- **Command:** `atlassian-mcp` (invoked via `cmd atlassian-mcp` in plugin.json)
- **Auth:** Bearer token (PAT) — patched from Basic Auth
- **API:** Jira REST API v2 — patched from v3
- **Env vars:** `ATLASSIAN_DOMAIN`, `ATLASSIAN_EMAIL`, `ATLASSIAN_API_TOKEN`, `NODE_TLS_REJECT_UNAUTHORIZED`
- **Env source:** `.claude/settings.json` for domain/email/TLS; shell for PAT
- **Patch script:** `setup-atlassian-mcp.js` (must re-run after npm reinstalls)
- **Tool names:** `jira_get_issue`, `jira_search_issues`, `jira_list_projects`, `jira_get_transitions`, `jira_add_comment`, and 40+ more

### Docker Jira Test (ACTIVE — Validation)
- `ai-testcases/jira-docker-test/` — raw axios test of Jira API v2 + Bearer auth
- Works independently of MCP for connectivity validation

### Official Figma Plugin (ACTIVE — via global config)
- `figma@claude-plugins-official` enabled in `~/.claude/settings.json`
- Provides `mcp__plugin_figma_figma__*` tools

---

## 3. Existing Placeholder Integrations

### Figma Commands (PLACEHOLDER — No API Key)
- `my-first-plugin/commands/figma-design-review.md` — defines `/figma-design-review` command
- `my-first-plugin/commands/figma-screenshot.md` — defines `/figma-screenshot` command
- Both reference `FIGMA_API_KEY` which does not exist in any config
- These are valid command definitions but Figma tools come from global plugin, not local config

### Confluence Tools (PARTIAL — Package-level, Not Connected)
- `confluence_search`, `confluence_get_page` etc. exist in `@xuandev/atlassian-mcp`
- Not functional: Jira and Confluence are on separate hosts; MCP connects to Jira only
- Listed in `plugin.json`? **No** — `plugin.json` only registers `figma` (http) and `mcp-atlassian` (cmd)

---

## 4. Files to Create

| Path | Purpose | Status |
|------|---------|--------|
| `.claude-plugin/plugin.json` | New canonical plugin manifest (replaces `my-first-plugin/plugin.json`) | NEW |
| `.claude-plugin/skills/jira-qa-testcase-generator/SKILL.md` | Cleaned/structured main skill | NEW |
| `docs/JIRA_MCP_SETUP.md` | Jira MCP setup and troubleshooting guide | NEW |
| `docs/QA_TEAM_USAGE.md` | QA team quick-start and examples | NEW |
| `docs/FUTURE_INTEGRATIONS.md` | Confluence and Figma roadmap | NEW |
| `docs/CONFLUENCE_EXTRACTION/skills/SKILL.md` | Confluence skill (placeholder) | NEW |
| `docs/FIGMA_UI_QA/skills/SKILL.md` | Figma skill (placeholder) | NEW |
| `scripts/setup-atlassian-mcp.js` | Moved from `my-first-plugin/` | NEW |

---

## 5. Files to Move

| From | To | Reason |
|------|----|--------|
| `my-first-plugin/setup-atlassian-mcp.js` | `scripts/setup-atlassian-mcp.js` | Centralize setup scripts under `scripts/` |
| `my-first-plugin/skills/SKILL.md` | `.claude-plugin/skills/jira-qa-testcase-generator/SKILL.md` | Target structure per spec |
| `my-first-plugin/commands/` | `.claude-plugin/commands/` | Part of canonical plugin structure |
| `ai-testcases/jira-docker-test/` | `scripts/jira-docker-test/` | Docker test is a setup/validation tool, not a user-facing artifact |

---

## 6. Files to Remain Unchanged

| Path | Reason |
|------|--------|
| `.claude/settings.json` | Working project-level config with env vars |
| `my-first-plugin/plugin.json` | Keep as-is for backward compat until new manifest is validated |
| `my-first-plugin/README.md` | Keep until `.claude-plugin/` README is ready |
| `docs/superpowers/specs/2026-05-27-atlassian-mcp-integration-design.md` | Historical reference — do not modify |

---

## 7. Files to Deprecate (Keep, Mark as Legacy)

| Path | Action |
|------|--------|
| `my-first-plugin/plugin.json` | After migration: mark as `legacy-plugin.json.bak` or leave in place as reference |
| `my-first-plugin/skills/` | Keep `skills/SKILL.md` as `skills/SKILL.md.legacy` |
| `my-first-plugin/README.md` | Keep as `my-first-plugin/README.legacy.md` |

> **Note:** The user's spec says "DO NOT delete old plugin.json" — legacy configs will be renamed with `.bak` suffix or kept in `my-first-plugin/` as reference. `my-first-plugin/` directory itself remains intact.

---

## 8. Target Plugin Structure

```
AI TestCases/
├── .claude-plugin/
│   ├── plugin.json              # ACTIVE plugin manifest
│   ├── skills/
│   │   ├── jira-qa-testcase-generator/
│   │   │   └── SKILL.md        # Cleaned main Jira skill
│   │   ├── confluence-extraction/
│   │   │   └── SKILL.md        # Placeholder — PARTIAL/FUTURE
│   │   └── figma-ui-qa/
│   │       └── SKILL.md        # Placeholder — PLANNED
│   └── commands/
│       ├── figma-design-review.md
│       └── figma-screenshot.md
├── scripts/
│   ├── setup-atlassian-mcp.js  # Moved from my-first-plugin/
│   └── jira-docker-test/        # Moved from ai-testcases/
│       ├── jira-test.js
│       ├── Dockerfile
│       └── package.json
├── docs/
│   ├── JIRA_MCP_SETUP.md       # NEW
│   ├── QA_TEAM_USAGE.md        # NEW
│   ├── FUTURE_INTEGRATIONS.md  # NEW
│   └── superpowers/
│       └── specs/
│           └── 2026-05-27-atlassian-mcp-integration-design.md
├── .claude/
│   └── settings.json
├── my-first-plugin/            # LEGACY — keep as-is, do not modify
│   ├── plugin.json             # → legacy-plugin.json.bak (rename after validation)
│   ├── skills/
│   │   └── SKILL.md            # → SKILL.md.legacy (rename after validation)
│   └── README.md               # → README.legacy.md (rename after validation)
└── ai-testcases/               # LEGACY — keep for reference
    └── jira-docker-test/       # → moved to scripts/ (delete after move)
```

---

## 9. Risks Before Migration

| Risk | Mitigation |
|------|-----------|
| Moving `setup-atlassian-mcp.js` breaks references in README/docs | Update all references after move |
| Moving `jira-docker-test/` breaks any external docs referring to `ai-testcases/` | Update references, keep `ai-testcases/` as backup until validated |
| Renaming `my-first-plugin/plugin.json` breaks if plugin is referenced via `~/.claude/settings.json` | Do NOT rename until `.claude-plugin/plugin.json` is validated working |
| `.claude-plugin/` structure may not be auto-detected by Claude Code | Test `/mcp --list` after migration to verify |
| Skill path change (`skills/SKILL.md` → `.claude-plugin/skills/jira-qa-testcase-generator/`) may change behavior | Test "Generate test cases for BH-3850" after migration |

---

## 10. Validation Steps After Migration

### Immediate (automated checks)
1. `jq . .claude-plugin/plugin.json` — validate JSON syntax
2. `jq . my-first-plugin/plugin.json` — ensure legacy still valid
3. `node scripts/setup-atlassian-mcp.js` — verify patch script still works
4. `jq . .claude/settings.json` — ensure project settings still valid

### Manual QA team validation
1. Run `/mcp --list` — verify `jira_get_issue`, `jira_search_issues` appear
2. Run "Generate test cases for BH-3850" — verify real Jira data is fetched
3. Run `node scripts/jira-docker-test/jira-test.js` — verify Docker test still works
4. Check `.claude-plugin/skills/jira-qa-testcase-generator/SKILL.md` is loaded by Claude Code

---

## 11. Migration Phases

| Phase | Actions |
|-------|---------|
| **Phase 1: Create structure** | Create `.claude-plugin/`, `scripts/`, `docs/` directories |
| **Phase 2: Move and create files** | Copy/move files, create new docs and skill |
| **Phase 3: Update references** | Update all doc references to new paths |
| **Phase 4: Deprecate legacy** | Rename old files to `.bak` suffix |
| **Phase 5: Validate** | Run checks, QA team test |

---

## Implementation Order

1. Create `MIGRATION_PLAN.md` (this file)
2. Create `.claude-plugin/plugin.json`
3. Create `.claude-plugin/skills/jira-qa-testcase-generator/SKILL.md` (cleaned)
4. Create `docs/JIRA_MCP_SETUP.md`
5. Create `docs/QA_TEAM_USAGE.md`
6. Create `docs/FUTURE_INTEGRATIONS.md`
7. Create placeholder skills for Confluence and Figma
8. Move `setup-atlassian-mcp.js` to `scripts/`
9. Move `jira-docker-test/` to `scripts/`
10. Copy commands to `.claude-plugin/commands/`
11. Update `my-first-plugin/README.md` → point to new structure
12. Deprecate legacy files (rename to `.bak`)
13. Validate everything