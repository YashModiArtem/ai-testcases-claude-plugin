# Jira MCP Setup Guide

**Status:** ACTIVE — Production-ready

This guide explains how to set up the Jira MCP integration for QA test case generation.

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

---

## Prerequisites

- Node.js LTS installed
- Jira PAT (see `docs/CREDENTIALS_SETUP.md`)
- Access to Jira Data Center network/VPN

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
cp .env.example .env.local
notepad .env.local
```

Set required values:
```bash
ATLASSIAN_DOMAIN=jira.artem.internal
ATLASSIAN_EMAIL=your-email@company.com
ATLASSIAN_API_TOKEN=paste-your-pat-here
NODE_TLS_REJECT_UNAUTHORIZED=0
```

Load before starting Claude Code:
```powershell
. .\.env.local
```

### 4. Enable local plugin (one-time per machine)

Edit `~/.claude/settings.json`:

```json
{
  "enabledPlugins": {
    "atlassian@claude-plugins-official": false,
    ".claude-plugin@local": true
  }
}
```

### 5. Verify

```
/mcp --list
```

Expected: `jira_get_issue`, `jira_search_issues`, `jira_list_projects`, `jira_add_comment`, and 40+ more.

---

## Environment Variables Reference

| Variable | Required | Source | Notes |
|----------|----------|--------|-------|
| `ATLASSIAN_DOMAIN` | Yes | `.env.local` | Jira host, no `https://` prefix |
| `ATLASSIAN_EMAIL` | Yes | `.env.local` | Your Atlassian account email |
| `ATLASSIAN_API_TOKEN` | Yes | `.env.local` | Jira PAT — **never commit** |
| `NODE_TLS_REJECT_UNAUTHORIZED` | Yes | `.env.local` | `0` for self-signed/corporate CA |

---

## SSL / TLS

`NODE_TLS_REJECT_UNAUTHORIZED=0` bypasses certificate verification. This is acceptable for internal corporate Jira Data Center instances with self-signed or corporate CAs.

For a production setup, install the corporate root CA into your system's trust store instead.

---

## Troubleshooting

### MCP tools not showing up

1. Verify installed: `npm list -g @xuandev/atlassian-mcp`
2. Run patch script: `node scripts/setup-atlassian-mcp.js`
3. Restart Claude Code
4. Check `~/.claude/settings.json` has `.claude-plugin@local: true`
5. Check `~/.claude/settings.json` has `atlassian@claude-plugins-official: false`

### 401 Unauthorized

- PAT is invalid or expired — create a new one at Jira → Profile → Personal Access Tokens
- Check `ATLASSIAN_EMAIL` matches the account the PAT was created under

### 403 Forbidden

- PAT doesn't have permission to access the Jira project
- Check PAT scopes include the needed permissions

### 404 Not Found

- Issue key is wrong — verify exact key (e.g., `BH-3850`, not `bh-3850`)
- The issue may have been deleted or moved to a different project

### SSL/TLS Errors (CERT_HAS_EXPIRED, UNABLE_TO_VERIFY_LEAF_SIGNATURE)

- Ensure `NODE_TLS_REJECT_UNAUTHORIZED=0` is set in `.env.local`
- If persistent, corporate CA is not in trust store — contact IT

### Connection refused / Host not found

- Jira unreachable from current network — check VPN
- DNS resolution failure for `jira.artem.internal`

### OAuth flow triggered instead of PAT

- `atlassian@claude-plugins-official` is enabled in `~/.claude/settings.json`
- Set `atlassian@claude-plugins-official: false`
- The official cloud plugin conflicts with PAT-based Data Center setup

---

## Docker Validation (Optional)

Tests Jira connectivity directly using raw `axios` (bypasses MCP).

### Without Docker:

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

## Skill Location

Active skill: `skills/jira-qa-testcase-generator/SKILL.md` (root-level).
Mirror: `.claude-plugin/skills/jira-qa-testcase-generator/SKILL.md` (identical).
