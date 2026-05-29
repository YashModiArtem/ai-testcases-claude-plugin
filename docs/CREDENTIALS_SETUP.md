# Credentials Setup Guide

**Status:** REQUIRED — All QA users must complete this before using the plugin.

This guide explains how to set up credentials safely for the Jira MCP integration.

---

## Overview

The plugin needs one credential to work:

| Credential | Required | Where to Store |
|-----------|----------|---------------|
| Jira PAT | **Yes** | `.env.local` (never commit) |

Everything else (domain, email, TLS flag) is already in `.claude/settings.json` in the repo.

---

## What NOT to Do

- **Never** commit a real PAT, token, key, or password to Git
- **Never** store credentials in `.claude/settings.json` (it's project-level and may be committed)
- **Never** put credentials in comments, docs, or Slack messages
- **Never** use Atlassian Cloud OAuth — this repo uses Jira Data Center with PAT only

---

## Step-by-Step: Create Your Jira PAT

### 1. Log in to Jira Data Center

Go to your Jira instance: `https://jira.artem.internal` (or your internal URL)

### 2. Create a Personal Access Token

1. Click your **avatar** (top right) → **Manage Account**
2. Go to **Security** → **Personal Access Tokens**
3. Click **Create token**
4. Name it: `Claude Code QA Plugin`
5. Set expiry: choose what your org policy allows
6. Copy the token **immediately** — it is only shown once

### 3. Store it locally

Create a file called `.env.local` in the repo root (the directory where you see `README.md`):

```powershell
# Windows PowerShell
notepad .env.local
```

Add your values:

```bash
ATLASSIAN_DOMAIN=jira.artem.internal
ATLASSIAN_EMAIL=your-email@company.com
ATLASSIAN_API_TOKEN=paste-your-pat-here
NODE_TLS_REJECT_UNAUTHORIZED=0
```

Save and close.

### 4. Load it before starting Claude Code

```powershell
# Windows PowerShell — run this in every new terminal session
. .\scripts\load-env.ps1   # note the dot and space before the path
```

Or set it manually:

```powershell
$env:ATLASSIAN_API_TOKEN = "your-pat-here"
```

---

## File Reference

| File | Safe to Commit? | Purpose |
|------|---------------|---------|
| `.env.example` | **Yes** | Template with placeholder values |
| `.env.local` | **Never** | Your real credentials |
| `.claude/settings.json` | **Yes** | Project env vars (domain, email, TLS flag — no PAT) |
| `~/.claude/settings.json` | **Never** | Your personal Claude Code settings |

---

## Loading .env.local Automatically (Optional)

To avoid running `. .\.env.local` every time, add this to your PowerShell profile:

```powershell
# Find your profile path
$PROFILE

# Edit it
notepad $PROFILE

# Add this line (adjust path to your repo location)
if (Test-Path "C:\path\to\your\repo\scripts\load-env.ps1") {
    . "C:\path\to\your\repo\scripts\load-env.ps1"
}
```

---

## Rotating a Leaked Token

If your PAT is accidentally committed to Git:

1. **Immediately** go to Jira → Personal Access Tokens and **revoke** the token
2. **Create a new token** following the steps above
3. **Update** `.env.local` with the new token
4. **Contact your Git admin** to remove the commit from history

---

## How the PAT Is Used

The PAT flows through this path:

```
.env.local → $env:ATLASSIAN_API_TOKEN
                  │
                  ▼
        .claude-plugin/plugin.json env substitution
                  │
                  ▼
        cmd atlassian-mcp process
                  │
                  ▼
        @xuandev/atlassian-mcp → Bearer ${PAT}
                  │
                  ▼
        Jira Data Center REST API v2
```

The PAT is **never written to disk** by the plugin. It is only in memory as an environment variable passed to the MCP subprocess.

---

## Confluence / Figma Credentials (Future)

These are not needed today but will be when those integrations are enabled:

| Integration | Credential | Status |
|------------|-----------|--------|
| Confluence | Confluence PAT | **Future** — separate host not yet connected |
| Figma | FIGMA_API_KEY | **Future** — no API key obtained yet |

When they become relevant, follow the same pattern: store in `.env.local`, never commit.

---

## Template Reference (.env.example)

The repo includes `.env.example` showing all supported variables with placeholder values. Copy it to `.env.local` and fill in your actual values:

```bash
cp .env.example .env.local
```

Then edit `.env.local` with your real credentials.
