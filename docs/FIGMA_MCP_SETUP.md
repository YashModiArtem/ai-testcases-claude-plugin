# Figma MCP Setup Guide

**Status:** PHASE 1 — Active. Uses local `figma-developer-mcp` server (PAT-based). OAuth plugin is **disabled**.

---

## Overview

The Figma integration uses the Figma MCP server (available as `figma@claude-plugins-official` or a local developer MCP). Unlike Jira (which uses PAT auth to an internal host), Figma uses an API key that authenticates to the external Figma cloud service.

```
"Review this Figma design: https://www.figma.com/file/abc123/MyFile"
       │
       ▼
Claude Code calls get_figma_data / download_figma_images
       │
       ▼
Figma MCP (figma-developer-mcp or framelink-mcp)
       │
       ▼
Figma REST API (api.figma.com)
       │
       ▼
Design data → UI test cases
```

---

## Key Facts

| | |
|--|--|
| **Figma type** | External cloud service |
| **Auth** | API key (Personal Access Token style) |
| **Jira impact** | None — completely independent |
| **Active MCP** | `figma-developer-mcp` (local, PAT-based) — registered in `.mcp.json` |
| **OAuth plugin** | `figma@claude-plugins-official` is **disabled** in `~/.claude/settings.json` |
| **Credential** | `FIGMA_API_KEY` in `~/.claude/settings.json` env block |
| **Figma account** | `frontend-dev2@artemhealthtech.com` — **NOT** `yash.modi@artemhealthtech.com` (that account is for Jira only) |

### How It Works (Auto-Sync)

The Figma MCP reads `FIGMA_API_KEY` from **`~/.claude/settings.json`** (global `env` block). To keep it in sync:

1. You only edit **`./AI TestCases/.env.local`** — set `FIGMA_API_KEY` and `FIGMA_EMAIL`
2. Run `. .\scripts\load-env.ps1` — this loads `.env.local` into your terminal AND auto-syncs `FIGMA_API_KEY` to `~/.claude/settings.json`
3. Start Claude Code — Figma MCP uses the synced token

```
.env.local  (you edit this)
  FIGMA_API_KEY = figd_xxx
  FIGMA_EMAIL   = frontend-dev2@artemhealthtech.com
       │
       ▼  load-env.ps1 auto-syncs FIGMA_API_KEY
~/.claude/settings.json  (MCP reads from here)
  env.FIGMA_API_KEY = figd_xxx
```

> **No manual steps needed.** Just edit `.env.local` and run `load-env.ps1`. The script syncs silently and only updates `settings.json` if the token actually changed.

> **Account mapping:** `yash.modi@artemhealthtech.com` = Jira Data Center, `frontend-dev2@artemhealthtech.com` = Figma. Never mix them.

---

## Prerequisites

| Component | Required | Purpose |
|-----------|----------|---------|
| Git | Yes | Clone repo |
| VS Code | Yes | Open project |
| Claude Code | Yes | Run skills and commands |
| Figma account | Yes | Must have access to the Figma file |
| Figma API key | Yes | From figma.com/developers |
| VPN / Internal Network | **No** | Figma is external — no VPN needed for design access |

---

## Setup Steps

### Step 1 — Generate a Figma API Key

1. Go to [figma.com/developers](https://figma.com/developers)
2. Sign in with your Figma account (`frontend-dev2@artemhealthtech.com`)
3. Navigate to **Account Settings** → **Personal Access Tokens** → **Create a new token**
4. Name it: `Claude Code QA Plugin`
5. Set expiry as needed
6. **Copy immediately** — the token is shown only once
7. Grant access to the files you need (or full account access)
8. Required scopes: **File content: Read**, **Dev resources: Read**

> If you need OAuth app setup for team use, see [Figma Developers](https://figma.com/developers/docs/authentication) for full OAuth flow instructions.

### Step 2 — Store the token

The token can live in either of two places — pick one:

**Option A — `~/.claude/settings.json` env block (direct):**
```json
"env": {
  ...
  "FIGMA_API_KEY": "figd_xxxxxxxxxxxxxxxx"
}
```

**Option B — `.env.local` with auto-sync:**
```
FIGMA_API_KEY=figd_xxxxxxxxxxxxxxxx
FIGMA_EMAIL=frontend-dev2@artemhealthtech.com
```
Then run `. .\scripts\load-env.ps1` to auto-sync `FIGMA_API_KEY` to `~/.claude/settings.json`.

### Step 3 — Install the local MCP package

```powershell
npm install -g figma-developer-mcp
```

This installs the `figma-developer-mcp` binary used by the `.mcp.json` server entry.

### Step 4 — Confirm OAuth plugin is disabled

In `~/.claude/settings.json`:
```json
"enabledPlugins": {
  "figma@claude-plugins-official": false
}
```

### Step 5 — Restart Claude Code

Restart Claude Code completely so the new plugin flag and the local MCP server both load.

### Step 5 — Verify Figma MCP

```powershell
claude
/mcp --list
```

Look for `figma-developer-mcp` in the list of connected MCP servers. If you see `figma@claude-plugins-official` instead, the plugin flag in `~/.claude/settings.json` is still set to `true` — flip it back to `false` and restart Claude Code.

### Step 6 — Test with a known Figma file

Try the design review command:

```
/figma-design-review https://www.figma.com/file/abc123/MyFile?node-id=123:456
```

Replace `abc123` and `123:456` with a real file you have access to.

Expected: A structured review of the design elements.

If you get "not found" or auth errors, see Troubleshooting below.

---

## Testing the Figma Integration

### Quick test — Design Review

```
/figma-design-review <file-url-or-key> [node-id]
```

### Quick test — Screenshot

```
/figma-screenshot <file-url-or-key> [node-id] [output-filename]
```

### Quick test — Full UI QA workflow

```
Use the figma-ui-qa skill to generate test cases for https://www.figma.com/file/abc123/MyFile
```

### Quick test — Unified QA Generator (Jira + Figma)

```
/qa-testcase-generator https://figma.com/design/abc123/MyFile?node-id=123:456
/qa-testcase-generator BH-5474 https://figma.com/design/abc123/MyFile?node-id=123:456
```

The unified generator can use Figma as a standalone source or as a merge source alongside Jira. See `docs/QA_TEAM_USAGE.md` for full examples.

---

## MCP Configuration

The active Figma MCP is the **local `figma-developer-mcp`** (PAT-based), registered in `.mcp.json`.

### Option A — Local `figma-developer-mcp` (ACTIVE — Recommended)

1. Install the MCP: `npm install -g figma-developer-mcp`
2. Confirm the entry exists in `.mcp.json`:
   ```json
   "figma-developer-mcp": {
     "command": "npx",
     "args": ["figma-developer-mcp"],
     "env": { "FIGMA_API_KEY": "${FIGMA_API_KEY}" }
   }
   ```
3. Ensure `FIGMA_API_KEY` is in `~/.claude/settings.json` (the `env` block)
4. Confirm `figma@claude-plugins-official` is set to `false` in `~/.claude/settings.json` `enabledPlugins`
5. Restart Claude Code

### Option B — OAuth Plugin (DISABLED)

`figma@claude-plugins-official` is disabled in this setup. To re-enable:

1. Set `"figma@claude-plugins-official": true` in `~/.claude/settings.json`
2. Restart Claude Code
3. Complete the OAuth flow when prompted

This path is not actively maintained. Use Option A unless you have a specific reason to use OAuth.

---

## Troubleshooting

### Figma auth warning / OAuth popup in Claude Code

**This should not happen** in this setup since `figma@claude-plugins-official` is disabled. If you see an OAuth prompt, the plugin flag in `~/.claude/settings.json` is still `true` — flip it to `false` and restart Claude Code.

### `/mcp --list` does not show Figma

1. Confirm `figma-developer-mcp` is installed: `npm install -g figma-developer-mcp`
2. Confirm the entry exists in `.mcp.json` (`figma-developer-mcp` server)
3. Confirm `FIGMA_API_KEY` is set in `~/.claude/settings.json` env block (or sync from `.env.local` via `load-env.ps1`)
4. Confirm `figma@claude-plugins-official` is set to `false` in `~/.claude/settings.json`
5. Restart Claude Code completely

### "File not found" error

- The file key may be incorrect — double-check the URL
- You may not have access to the Figma file — ask the file owner to share it with your email
- The file may be archived or deleted in Figma

### "Invalid API key" / Wrong Figma account error

- `FIGMA_API_KEY` in `settings.json` is stale or wrong
- Edit `FIGMA_API_KEY` in `.env.local`, then re-run `. .\scripts\load-env.ps1` — it auto-syncs to `settings.json`
- Verify the token belongs to `frontend-dev2@artemhealthtech.com` (Figma), NOT `yash.modi@artemhealthtech.com` (Jira)
- Restart Claude Code after sync to apply the change
- Run a Figma tool — use `whoami` to verify the correct account is active

### Jira MCP stops working

**This cannot happen** — Jira and Figma use completely independent MCP servers and credentials. They are unaffected by each other. If Jira stops working, check the Jira MCP setup docs.

---

## What Figma Can and Cannot Do (Phase 1)

### Can Do

- Fetch design structure (frames, components, groups, text, images)
- Download frames as PNG/SVG images
- Analyze layout, spacing, typography, color
- Generate UI test cases from available design data
- Work offline (cached data) or online (live API)

### Cannot Do (Phase 1 Limitations)

- Generate functional/behavioral tests beyond what design shows
- Connect to Jira automatically
- Validate design against live implementation
- Access prototype interaction flows (use Figma prototype link as reference)
- Generate full accessibility audits (manual verification needed)
- Export all asset types

---

## Credential Safety

| File | Safe to Commit? | Contains |
|------|---------------|---------|
| `.env.example` | **Yes** | Placeholder: `FIGMA_API_KEY=your-figma-api-key` |
| `.env.local` | **Never** | Real `FIGMA_API_KEY` — gitignored |
| `.mcp.json` | **Yes** | MCP registration only — no credentials |

---

## Required Environment Variables

| Variable | Required | File | Notes |
|----------|----------|------|-------|
| `FIGMA_API_KEY` | Yes | `.env.local` (auto-synced to `settings.json`) | Figma Personal Access Token |
| `FIGMA_EMAIL` | Yes | `.env.local` (for reference) | Figma account email |

> Set both in `.env.local`. Run `. .\scripts\load-env.ps1` to load and sync. The MCP reads `FIGMA_API_KEY` from `~/.claude/settings.json` (auto-synced by the script).

---

## Related Documentation

- `docs/FUTURE_INTEGRATIONS.md` — Figma roadmap and integration status
- `docs/CREDENTIALS_SETUP.md` — Credential patterns and safety rules
- `.claude/skills/figma-ui-qa/SKILL.md` — Figma UI QA skill (Phase 1)
- `.claude/skills/qa-testcase-generator/SKILL.md` — Unified Jira+Figma test case generator
- `.claude/commands/figma-design-review.md` — Design review command
- `.claude/commands/figma-screenshot.md` — Screenshot command
- `.claude/commands/qa-testcase-generator.md` — Unified command
