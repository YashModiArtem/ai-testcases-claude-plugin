# Atlassian MCP Integration Design

**Date:** 2026-05-27
**Status:** Partially Implemented — Jira MCP operational, Confluence not implemented

## Goal

Enable Claude Code to generate QA test cases from Jira tickets via MCP, with zero hardcoded secrets.

## What Was Implemented

### Jira MCP (Operational)

The `@xuandev/atlassian-mcp` package provides 46+ MCP tools. It was patched for Jira Data Center compatibility because the package defaults (Basic Auth + API v3) are for Atlassian Cloud.

**Patches applied by `setup-atlassian-mcp.js`:**

| File | Change | Why |
|------|--------|-----|
| `dist/common/auth.js` | `Authorization: Basic base64(email:token)` → `Bearer ${apiToken}` | Jira Data Center uses PAT (Bearer), not Cloud credentials |
| `dist/jira/api.js` | `/rest/api/3/` → `/rest/api/2/` (22 endpoints) | Data Center REST API v2, not v3 |
| `dist/jira/api.js` | `/rest/api/2/search/jql` → `/rest/api/2/search` | v2 search endpoint is `/search`, not `/search/jql` |
| `dist/jira/api.js` | `accountId:` → `name:` | v2 uses `name` field for assignee, not `accountId` |

**Actual invocation flow:**
```
"Generate test cases for BH-3850"
        │
        ▼
Claude Code calls jira_get_issue
        │
        ▼
@xuandev/atlassian-mcp (atlassian-mcp CLI command)
        │
        ▼
Jira REST API v2 (Bearer auth)
        │
        ▼
Ticket JSON response
        │
        ▼
Test case output (guided by skills/SKILL.md)
```

**Environment variable sources:**
- `ATLASSIAN_DOMAIN`, `ATLASSIAN_EMAIL`, `NODE_TLS_REJECT_UNAUTHORIZED` — from `.claude/settings.json`
- `ATLASSIAN_API_TOKEN` — from shell environment (not stored in any config file)

**Plugin registration:**
- `my-first-plugin/plugin.json` registers `mcp-atlassian` via `cmd atlassian-mcp`
- `~/.claude/settings.json` disables `atlassian@claude-plugins-official` (cloud OAuth) to prevent conflicts

### Docker Connectivity Test (Operational)

`ai-testcases/jira-docker-test/` validates direct Jira API connectivity using raw `axios` + Bearer auth. This bypasses the MCP layer entirely — useful for isolating network/Auth issues from MCP issues.

## What Was Not Implemented

### Confluence Integration

Not implemented. Reasons:
- `@xuandev/atlassian-mcp` connects to a single domain, configured as Jira Data Center
- Confluence at `confluence.artem.internal` is on a different host
- Would require reverse proxy (e.g., `api.artem.internal` routing `/wiki/*` to Confluence) or a different MCP package

The `confluence_search` and `confluence_get_page` tools exist in the package but are not functional for this setup.

### OAuth Flow

Not used. The `plugin:atlassian:atlassian` (official Atlassian Cloud OAuth MCP) was explicitly disabled in `~/.claude/settings.json` because it conflicts with the local Data Center setup and triggers an OAuth flow incompatible with PAT-based Data Center auth.

## MCP Tools Available (46 total)

**Jira tools used for test case generation:**
- `jira_get_issue` — primary ticket fetch
- `jira_search_issues` — related issues via JQL

**Other Jira tools (available but not used by SKILL.md):**
`jira_list_projects`, `jira_get_transitions`, `jira_add_comment`, `jira_get_worklog`, `jira_get_agile_boards`, `jira_get_sprints_from_board`, `jira_get_epic_issues`, `jira_batch_get_changelogs`, and 30+ more.

**Confluence tools (package-level, non-functional):**
`confluence_get_page`, `confluence_search`, `confluence_list_spaces`, `confluence_list_pages`, `confluence_get_page_children`, `confluence_get_comments`, `confluence_add_comment`, `confluence_add_label`.

## Files Delivered

| File | Purpose |
|------|---------|
| `my-first-plugin/plugin.json` | MCP server registration with env var references, no hardcoded secrets |
| `my-first-plugin/setup-atlassian-mcp.js` | Patch script for Data Center compatibility |
| `my-first-plugin/skills/SKILL.md` | QA test case generation rules and format |
| `my-first-plugin/README.md` | Setup guide for the plugin |
| `ai-testcases/jira-docker-test/` | Docker Jira connectivity validation |
