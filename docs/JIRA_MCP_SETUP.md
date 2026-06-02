# Jira MCP Setup Guide

**Status:** ACTIVE — Production-ready for natural language generation.

---

## Overview

The plugin uses `@xuandev/atlassian-mcp` (globally installed npm package), patched by `scripts/setup-atlassian-mcp.js` to work with Jira Data Center (Bearer auth + REST API v2 instead of the package's default Basic Auth + API v3 for Cloud).

```
"Generate test cases for BH-3850"
       │
       ▼
Claude Code calls jira_get_issue
       │
       ▼
@xuandev/atlassian-mcp (Bearer auth + API v2, patched)
       │
       ▼
Jira Data Center REST API v2
       │
       ▼
Ticket JSON → Test cases (guided by skill)
```

---

## Key Facts

| | |
|--|--|
| **Jira type** | Internal Jira Data Center |
| **Auth** | PAT with Bearer token header |
| **OAuth** | **Not used** — `atlassian@claude-plugins-official` must be disabled |
| **API** | Jira REST API v2 (patched from v3) |
| **Confluence** | Separate host — not connected |
| **Figma** | Not configured |
| **MCP registration** | `.mcp.json` at repo root |

---

## Prerequisites

### Required Software

| Component | Required | Purpose |
|-----------|----------|---------|
| Git | Yes | Clone repo |
| VS Code | Yes | Open project |
| Claude Code | Yes | Run skills and commands |
| Node.js LTS | Yes | MCP tooling |
| Jira PAT | Yes | Jira Data Center access |
| VPN / Internal Network | Yes | Reach `jira.artem.internal` |
| Docker Desktop | **No** | Optional troubleshooting |

### Docker Is NOT Required For

Most users do **not** need Docker installed. Docker is only used for:
- MCP troubleshooting and diagnostics
- Running `scripts/jira-docker-test/jira-test.js`
- Advanced validation (when MCP itself has issues)

Docker is **NOT** required for:
- Daily QA test case generation
- Jira skill usage (`/jira-qa-testcase-generator`)
- Natural language commands (`Generate test cases for BH-5474`)
- Any normal workflow

> **Most QA users do not need Docker installed.**

---

## Setup Steps

### 1. Install the MCP server

```bash
npm install -g @xuandev/atlassian-mcp
```

### 2. Apply the Data Center patch

```bash
node scripts/setup-atlassian-mcp.js
```

Expected output:
```
Patching @xuandev/atlassian-mcp for Jira Data Center...
  [PATCH] Bearer auth (PAT) instead of Basic Auth
  [OK]   auth.js
  [PATCH] API v3 → v2 (Data Center compatible)
  [OK]   api.js
  [PATCH] accountId → name (v2 compatibility)
  [OK]   api.js
Patching complete.
```

> Re-run after every `npm install -g @xuandev/atlassian-mcp` reinstall.

### 3. Set environment variables

Create `.env.local` (from `.env.example`) with your Jira PAT:

```powershell
copy .env.example .env.local
notepad .env.local
```

Set required values:
```
ATLASSIAN_DOMAIN=jira.artem.internal
ATLASSIAN_EMAIL=your-email@company.com
ATLASSIAN_API_TOKEN=paste-your-pat-here
NODE_TLS_REJECT_UNAUTHORIZED=0
```

Load before starting Claude Code:
```powershell
. .\scripts\load-env.ps1
```

### 4. Enable local plugin (one-time per machine)

Edit `~/.claude/settings.json` (your user home folder, NOT the project `.claude/settings.json`):

```json
{
  "enabledPlugins": {
    "atlassian@claude-plugins-official": false,
    ".claude-plugin@local": true
  }
}
```

> **Important:** `.claude-plugin@local: true` must be set. The plugin is registered via `.mcp.json` at the repo root.

### 4a. MCP Registration

The Jira MCP server is registered via `.mcp.json` at the repo root. This file is auto-discovered by Claude Code when `enableAllProjectMcpServers: true` is set in the project `.claude/settings.json` (which it is).

`.mcp.json` uses the `mcpServers` wrapper:

```json
{
  "mcpServers": {
    "mcp-atlassian": {
      "command": "cmd",
      "args": ["/c", "atlassian-mcp"],
      "env": {
        "ATLASSIAN_DOMAIN": "${ATLASSIAN_DOMAIN}",
        "ATLASSIAN_EMAIL": "${ATLASSIAN_EMAIL}",
        "ATLASSIAN_API_TOKEN": "${ATLASSIAN_API_TOKEN}",
        "NODE_TLS_REJECT_UNAUTHORIZED": "${NODE_TLS_REJECT_UNAUTHORIZED:-0}"
      }
    }
  }
}
```

### 5. Validate

```powershell
. .\scripts\load-env.ps1
claude
/mcp --list
```

Expected: `mcp-atlassian Connected` with tools listed including `jira_get_issue`, `jira_search_issues`, `jira_list_projects`, `jira_add_comment`, `jira_get_transitions`, and 40+ more.

---

## Required Environment Variables

| Variable | Required | Source | Notes |
|----------|----------|--------|-------|
| `ATLASSIAN_DOMAIN` | Yes | `.env.local` / `.claude/settings.json` | Jira host, no `https://` prefix |
| `ATLASSIAN_EMAIL` | Yes | `.env.local` / `.claude/settings.json` | Your Atlassian account email |
| `ATLASSIAN_API_TOKEN` | Yes | `.env.local` | Jira PAT — **never commit** |
| `NODE_TLS_REJECT_UNAUTHORIZED` | Yes | `.env.local` / `.claude/settings.json` | `0` for self-signed/corporate CA |

### Where Variables Are Stored

- `ATLASSIAN_DOMAIN`, `ATLASSIAN_EMAIL`, `NODE_TLS_REJECT_UNAUTHORIZED` are in both `.claude/settings.json` (project, safe to commit) and `.env.local` (user-specific)
- `ATLASSIAN_API_TOKEN` is in `.env.local` only (never committed)

---

## SSL / TLS

`NODE_TLS_REJECT_UNAUTHORIZED=0` bypasses certificate verification. This is acceptable for internal corporate Jira Data Center instances with self-signed or corporate CAs.

For a production setup, install the corporate root CA into your system's trust store instead.

---

## Troubleshooting

### MCP tools not showing up in `/mcp --list`

1. Verify installed: `npm list -g @xuandev/atlassian-mcp`
2. Run patch script: `node scripts/setup-atlassian-mcp.js`
3. Restart Claude Code completely
4. Check `~/.claude/settings.json` (user home) has `.claude-plugin@local: true`
5. Check `~/.claude/settings.json` has `atlassian@claude-plugins-official: false`
6. Check `.mcp.json` exists at repo root with valid JSON
7. Check project `.claude/settings.json` has `enableAllProjectMcpServers: true`

### 401 Unauthorized

- PAT is invalid or expired — create a new one at Jira → Profile → Personal Access Tokens
- Check `ATLASSIAN_EMAIL` matches the account the PAT was created under
- PAT must be a Jira Data Center PAT, not a Cloud PAT

### 403 Forbidden

- PAT doesn't have permission to access the Jira project
- Check PAT scopes include the needed permissions

### 404 Not Found

- Issue key is wrong — verify exact key (e.g., `BH-3850`, not `bh-3850`)
- The issue may have been deleted or moved to a different project

### SSL/TLS Errors (CERT_HAS_EXPIRED, UNABLE_TO_VERIFY_LEAF_SIGNATURE)

- Ensure `NODE_TLS_REJECT_UNAUTHORIZED=0` is set in `.env.local`
- Run `. .\scripts\load-env.ps1` to reload
- If persistent, corporate CA is not in trust store — contact IT

### Connection refused / Host not found

- Jira unreachable from current network — check VPN
- DNS resolution failure for `jira.artem.internal`

### OAuth flow triggered instead of PAT

- `atlassian@claude-plugins-official` is enabled in `~/.claude/settings.json`
- Set `atlassian@claude-plugins-official: false`
- The official cloud plugin conflicts with PAT-based Data Center setup

### `mcp-atlassian` shows as "not connected"

- Confirm `.env.local` exists and `ATLASSIAN_API_TOKEN` is set
- Re-run `. .\scripts\load-env.ps1`
- Check `ATLASSIAN_DOMAIN` matches your Jira host exactly (no `https://`)

---

## Docker Validation (Optional — Skip for Normal Usage)

Most users do **not** need Docker. This section is for advanced troubleshooting only.

> **Most QA users do not need Docker installed.**

The Docker test bypasses MCP entirely and calls the Jira API directly via `axios`. Use it only when MCP itself has issues and you need to isolate whether the problem is MCP or the underlying Jira connection.

### Without Docker (recommended for diagnostics):

```bash
node scripts/jira-docker-test/jira-test.js
```

Set env vars first:
```powershell
$env:JIRA_BASE_URL = "https://jira.artem.internal"
$env:JIRA_PAT = "your-PAT"
$env:NODE_TLS_REJECT_UNAUTHORIZED = "0"
```

### With Docker:

```bash
docker build -t jira-test scripts/jira-docker-test
docker run --rm `
  -e JIRA_BASE_URL="https://jira.artem.internal" `
  -e JIRA_PAT="your-PAT" `
  -e NODE_TLS_REJECT_UNAUTHORIZED=0 `
  jira-test
```

Expected: `Success!` with JSON Jira response.

If Docker test succeeds but MCP fails → MCP layer issue.
If Docker test fails → network or auth problem.

---

## What the Patch Does

`scripts/setup-atlassian-mcp.js` modifies two files in the globally installed `@xuandev/atlassian-mcp` package:

| File | Changes |
|------|---------|
| `auth.js` | `Authorization: Basic base64(email:token)` → `Bearer ${apiToken}` |
| `api.js` | 22× `/rest/api/3/` → `/rest/api/2/`, `/search/jql` → `/search`, `accountId:` → `name:` |

---

## Unified Generator Examples

The unified QA generator (`/qa-testcase-generator`) can use Jira independently or alongside Figma:

```
/qa-testcase-generator BH-5474
/qa-testcase-generator BH-5474 https://figma.com/design/abc123/MyFile?node-id=123:456
```

The unified generator still uses `mcp-atlassian` for Jira access. When a Jira key is detected, it calls `jira_get_issue`, `jira_batch_get_changelogs`, and `jira_get_transitions` to build comprehensive test cases. See `docs/QA_TEAM_USAGE.md` for the full output format including Excel-ready tables.

---

## Skill Location

Active skill: `.claude/skills/jira-qa-testcase-generator/SKILL.md`.

---

## Diagnostic Commands

```
/mcp --list
```
Expected: `mcp-atlassian Connected` with `jira_get_issue`, `jira_search_issues`, `jira_list_projects`, etc.

To verify plugin loading, check Claude Code startup output for:
- "Loaded plugin: qa-atlassian-plugin"
- "Loaded plugin: qa-atlassian-plugin"
- "MCP server mcp-atlassian started"
