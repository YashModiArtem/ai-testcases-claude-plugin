# QA Automation Plugin for Claude Code

Generate structured test cases from Jira tickets using Claude Code and Atlassian MCP.

## Status

| Integration | Status | Notes |
|-------------|--------|-------|
| **Jira QA Test Generation** | **ACTIVE** | Jira Data Center via local patched MCP |
| **Confluence Extraction** | **FUTURE** | Config preserved, not production-ready |
| **Figma UI QA** | **FUTURE** | Requires FIGMA_API_KEY, not active today |

---

## Prerequisites

Install these before cloning:

| Software | Required | Notes |
|----------|----------|-------|
| **Git** | Yes | `git-scm.com` |
| **VS Code** | Yes | `code.visualstudio.com` |
| **Node.js LTS** | Yes | `nodejs.org` — provides `npm` |
| **Claude Code** | Yes | `claude.ai/code` |
| **Docker Desktop** | Optional | Only needed for `scripts/jira-docker-test/` |
| **Jira network access** | Yes | VPN or internal network to Jira Data Center |
| **Jira PAT** | Yes | Personal Access Token from Jira |

> Docker is **optional**. The Jira skill works without Docker if MCP and your PAT are configured.

---

## Quick Start

### One-time setup after cloning:

```powershell
# 1. Clone and open
git clone <repo-url>
cd <repo-name>
code .

# 2. Install MCP server
npm install -g @xuandev/atlassian-mcp

# 3. Apply Jira Data Center patch
node scripts/setup-atlassian-mcp.js

# 4. Create local credentials (see docs/CREDENTIALS_SETUP.md)
#    Create .env.local with your Jira PAT

# 5. Enable local plugin in Claude Code
#    Add to ~/.claude/settings.json (one-time per machine):
#    ".claude-plugin@local": true
#    "atlassian@claude-plugins-official": false
```

### Every session:

```powershell
# Set your Jira PAT (from .env.local or manually)
# Windows PowerShell:
. .env.local   # loads env vars from file
# Or:
$env:ATLASSIAN_API_TOKEN = "your-PAT-token"

# Start Claude Code
claude

# Verify MCP is loaded
/mcp --list
# Should show: jira_get_issue, jira_search_issues, etc.

# Use the skill
Generate test cases for BH-3850
```

For step-by-step instructions, see `docs/QA_TEAM_USAGE.md`.

---

## What This Does

1. **Fetches** Jira ticket via `jira_get_issue` — title, description, labels, assignee, linked issues, changelog
2. **Finds** related issues via `jira_search_issues`
3. **Generates** structured test cases: positive, negative, edge, regression, UI, accessibility, state transitions

Output format per test case: ID, title, preconditions, steps, expected result, priority, type, notes.

---

## Repository Structure

```
repo-root/
├── skills/                              # Active skills
│   ├── jira-qa-testcase-generator/     # ACTIVE
│   ├── confluence-extraction/           # FUTURE
│   └── figma-ui-qa/                   # FUTURE
├── commands/                            # Commands (Figma = FUTURE)
├── scripts/
│   ├── setup-atlassian-mcp.js         # Patch script (run once per install)
│   └── jira-docker-test/               # Docker connectivity test (optional)
├── docs/
│   ├── QA_TEAM_USAGE.md               # ← Start here
│   ├── JIRA_MCP_SETUP.md              # MCP configuration guide
│   ├── CREDENTIALS_SETUP.md            # ← Create your PAT first
│   ├── INSTALLATION_CHECKLIST.md       # Pre-push validation
│   └── FUTURE_INTEGRATIONS.md          # Roadmap
├── .claude/                            # Project settings (safe to commit)
├── .claude-plugin/                     # Plugin manifest + mirrors
├── my-first-plugin/                    # LEGACY (preserved)
├── .env.example                        # Credential template (safe)
└── .gitignore                          # Excludes .env.local, tokens, keys
```

---

## Key Technical Facts

| | |
|--|--|
| **Jira type** | Internal Jira Data Center, not Atlassian Cloud |
| **Auth** | PAT (Personal Access Token) with Bearer header |
| **API** | Jira REST API v2 (patched from v3) |
| **OAuth** | Not used — do not enable `atlassian@claude-plugins-official` |
| **Confluence** | Separate host — not connected |
| **Figma** | No API key — future placeholder |

---

## Credential Safety

**Never commit real credentials to Git.**

- `.env.local` — your personal PAT and credentials. **Must be gitignored.** Create it from `.env.example`.
- `.env.example` — template with placeholder values. **Safe to commit.**
- `~/.claude/settings.json` — machine-specific. **Never commit this.**

See `docs/CREDENTIALS_SETUP.md` for full credential guide.

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `/mcp --list` shows nothing | Enable local plugin in `~/.claude/settings.json` |
| OAuth popup appears | Disable `atlassian@claude-plugins-official` in `~/.claude/settings.json` |
| 401 Unauthorized | PAT is wrong or expired — see `docs/CREDENTIALS_SETUP.md` |
| SSL/TLS error | `NODE_TLS_REJECT_UNAUTHORIZED=0` already set in `.claude/settings.json` |
| "jira.artem.internal not found" | Check VPN / network access to Jira |

Full troubleshooting in `docs/JIRA_MCP_SETUP.md`.
