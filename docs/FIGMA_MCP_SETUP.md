# Figma MCP Setup Guide

**Status:** PHASE 1 — Active when `FIGMA_API_KEY` is set.

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
| **MCP options** | `figma@claude-plugins-official` (OAuth) or `figma-developer-mcp` (API key) |
| **Credential** | `FIGMA_API_KEY` in `.env.local` |

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
2. Sign in with your Figma account
3. Click **Create a new OAuth app** or use the **Personal access tokens** section
4. For personal use: navigate to **Account Settings** → **Personal Access Tokens** → **Create a new token**
5. Name it: `Claude Code QA Plugin`
6. Set expiry as needed
7. **Copy immediately** — the token is shown only once
8. Grant access to the files you need (or full account access)

> If you need OAuth app setup for team use, see [Figma Developers](https://figma.com/developers/docs/authentication) for full OAuth flow instructions.

### Step 2 — Add to `.env.local`

Open your `.env.local` (from the repo root) and add:

```
FIGMA_API_KEY=your-figma-api-key
```

If you don't have a `.env.local`, copy from `.env.example`:

```powershell
copy .env.example .env.local
notepad .env.local
```

Uncomment the `FIGMA_API_KEY` line and paste your key.

### Step 3 — Load credentials

```powershell
. .\scripts\load-env.ps1
```

The script is generic — it loads any variable from `.env.local`, including `FIGMA_API_KEY`.

### Step 4 — Restart Claude Code

Restart Claude Code completely to pick up the new environment variable.

### Step 5 — Verify Figma MCP

```powershell
claude
/mcp --list
```

Look for `figma` or `figma-framelink-mcp` in the list of connected MCP servers.

If you see an OAuth authorization prompt instead, this means the Figma OAuth flow is active. This is normal for `figma@claude-plugins-official`. Complete the OAuth flow once per machine.

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

---

## MCP Configuration Options

The Figma MCP can be configured in two ways. Claude Code auto-detects the available server.

### Option A — Official Figma OAuth (Recommended for most users)

`figma@claude-plugins-official` is globally enabled. It uses OAuth and requires a one-time browser authorization per machine.

1. When prompted, click the authorization link
2. Complete the Figma OAuth flow in your browser
3. Return to Claude Code — Figma tools are now available

This is the default for most users and requires no local configuration.

### Option B — Local Developer MCP (API key)

For a local `figma-developer-mcp` using the `FIGMA_API_KEY` environment variable:

1. Install the MCP: `npm install -g figma-developer-mcp`
2. Add to `.mcp.json` (create a separate entry or use the existing format)
3. Set `FIGMA_API_KEY` in `.env.local`
4. Restart Claude Code

The Framelink MCP (`mcp__plugin_figma_Framelink_MCP_for_Figma__*`) is also available as a globally registered server and uses `FIGMA_API_KEY`.

---

## Troubleshooting

### Figma auth warning / OAuth popup in Claude Code

**This is expected.** `figma@claude-plugins-official` uses OAuth. Complete the authorization once per machine. This does not affect Jira functionality.

### `/mcp --list` does not show Figma

1. Figma OAuth may not be completed — look for an auth prompt in Claude Code
2. Check if the Figma MCP server is registered: Claude Code auto-detects globally enabled plugins
3. For local developer MCP: verify `FIGMA_API_KEY` is set in `.env.local` and `load-env.ps1` was run

### "File not found" error

- The file key may be incorrect — double-check the URL
- You may not have access to the Figma file — ask the file owner to share it with your email
- The file may be archived or deleted in Figma

### "Invalid API key" error

- `FIGMA_API_KEY` is incorrect or expired
- Generate a new token at figma.com/developers
- Update `.env.local` and restart Claude Code

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
| `FIGMA_API_KEY` | Yes | `.env.local` | Figma Personal Access Token |

---

## Related Documentation

- `docs/FUTURE_INTEGRATIONS.md` — Figma roadmap and integration status
- `docs/CREDENTIALS_SETUP.md` — Credential patterns and safety rules
- `.claude/skills/figma-ui-qa/SKILL.md` — Figma UI QA skill (Phase 1)
- `.claude/commands/figma-design-review.md` — Design review command
- `.claude/commands/figma-screenshot.md` — Screenshot command
