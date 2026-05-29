# QA Automation Plugin for Claude Code

Generate structured test cases from Jira tickets using Claude Code and Atlassian MCP.

---

## Verified Working Components

| Component | Status | Details |
|-----------|--------|---------|
| **Jira Data Center** | Verified | Internal Jira Data Center connection |
| **PAT Authentication** | Verified | Bearer token via Personal Access Token |
| **Atlassian MCP** | Verified | `@xuandev/atlassian-mcp` with Data Center patch |
| **Jira Issue Retrieval** | Verified | `jira_get_issue`, `jira_search_issues` |
| **Test Case Generation** | Verified | Positive, negative, edge, regression, UI, accessibility |
| **Claude Code Skill** | Verified | `jira-qa-testcase-generator` skill active |

**Future Components**

| Component | Status |
|-----------|--------|
| Confluence Extraction | Future — separate host, not connected |
| Figma UI QA | Future — no API key configured |

---

# Quick Start (5 Minutes)

### Step 1 — Clone

```powershell
git clone <repo-url>
cd <repo-name>
code .
```

### Step 2 — Install MCP

```powershell
npm install -g @xuandev/atlassian-mcp
```

### Step 3 — Patch MCP for Data Center

```powershell
node scripts/setup-atlassian-mcp.js
```

> Re-run this after every `npm install -g @xuandev/atlassian-mcp` reinstall.

### Step 4 — Create credentials

```powershell
copy .env.example .env.local
```

Edit `.env.local` with your values:

```
ATLASSIAN_DOMAIN=jira.artem.internal
ATLASSIAN_EMAIL=your-email@company.com
ATLASSIAN_API_TOKEN=your-jira-pat-here
```

See `docs/CREDENTIALS_SETUP.md` for how to create a Jira PAT.

### Step 5 — Load credentials

```powershell
. .\scripts\load-env.ps1
```

> Run this every time you open a new PowerShell window before starting Claude Code.

### Step 6 — Start Claude Code

```powershell
claude
```

### Step 7 — Verify MCP

```
/mcp --list
```

Expected output: `jira_get_issue`, `jira_search_issues`, `jira_list_projects`, and more.

### Step 8 — Generate test cases

```
Generate test cases for BH-5532
```

That's it. The Jira ticket is fetched automatically and test cases are generated.

For detailed step-by-step instructions, see `docs/QA_TEAM_USAGE.md`.

---

## What This Does

1. **Fetches** Jira ticket via `jira_get_issue` — title, description, labels, assignee, linked issues, changelog
2. **Finds** related issues via `jira_search_issues`
3. **Generates** structured test cases: positive, negative, edge, regression, UI, accessibility, state transitions

Output per test case: ID, title, preconditions, steps, expected result, priority, type, notes.

---

## Prerequisites

| Software | Required | Notes |
|----------|----------|-------|
| **Git** | Yes | `git-scm.com` |
| **VS Code** | Yes | `code.visualstudio.com` |
| **Node.js LTS** | Yes | `nodejs.org` — provides `npm` |
| **Claude Code** | Yes | `claude.ai/code` |
| **Jira network access** | Yes | VPN or internal network to Jira Data Center |
| **Jira PAT** | Yes | Personal Access Token from Jira |
| **Docker Desktop** | Optional | Only for `scripts/jira-docker-test/` connectivity test |

---

## One-Time Machine Setup

Edit `~/.claude/settings.json` (your user home folder):

```json
{
  "enabledPlugins": {
    "atlassian@claude-plugins-official": false,
    ".claude-plugin@local": true,
    "my-first-plugin@local": true
  }
}
```

Both `.claude-plugin@local` and `my-first-plugin@local` must be enabled.

---

## Troubleshooting

| Problem | Cause | Fix |
|---------|-------|-----|
| `/mcp --list` shows nothing | MCP not loaded | Run `. .\scripts\load-env.ps1`, then restart Claude Code |
| Jira MCP not in list | Plugins not enabled | Confirm BOTH `.claude-plugin@local: true` AND `my-first-plugin@local: true` in `~/.claude/settings.json` |
| `401 Unauthorized` | Invalid or expired PAT | Create a new Jira PAT — see `docs/CREDENTIALS_SETUP.md` |
| SSL/TLS error | Corporate CA not trusted | `NODE_TLS_REJECT_UNAUTHORIZED=0` is already set in project settings |
| `jira.artem.internal not found` | VPN disconnected | Connect to VPN or check network access |
| Skill loads but Jira fails | MCP not running | Run `/mcp --list` and confirm Jira tools appear |
| OAuth popup appears | Cloud plugin enabled | Set `atlassian@claude-plugins-official: false` in `~/.claude/settings.json` |
| Figma auth warning | Expected | Ignore — Figma is a future integration, not active |

Full troubleshooting in `docs/JIRA_MCP_SETUP.md`.

---

## Common Mistakes

1. **Forgot to run `load-env.ps1`** — MCP fails silently without credentials. Always run `. .\scripts\load-env.ps1` before `claude`.
2. **Forgot to restart Claude after changing PAT** — Restart Claude Code completely after updating `.env.local`.
3. **PAT expired** — Jira PATs expire. Create a new one at Jira → Profile → Personal Access Tokens.
4. **Wrong Jira URL** — Verify `ATLASSIAN_DOMAIN` in `.env.local` matches your Jira host exactly.
5. **Using Atlassian Cloud credentials** — This setup uses Jira Data Center with a PAT. Cloud OAuth is disabled and not supported.
6. **Committed `.env.local` accidentally** — Never commit `.env.local`. It contains your PAT. If committed, rotate the PAT immediately.
7. **Forgetting to re-patch after `npm install`** — Re-run `node scripts/setup-atlassian-mcp.js` after every global MCP reinstall.

---

## Repository Structure

```
repo-root/
├── skills/                              # Active skills
│   ├── jira-qa-testcase-generator/     # ACTIVE — Jira test case generation
│   ├── confluence-extraction/           # FUTURE — partial, not connected
│   └── figma-ui-qa/                    # FUTURE — placeholder, no API key
├── commands/                            # Slash commands
│   ├── jira-qa-testcase-generator.md   # /jira-qa-testcase-generator
│   ├── figma-design-review.md          # FUTURE — placeholder
│   └── figma-screenshot.md             # FUTURE — placeholder
├── scripts/
│   ├── setup-atlassian-mcp.js          # Data Center patch (run once per install)
│   ├── load-env.ps1                    # Load .env.local into PowerShell
│   └── jira-docker-test/               # Connectivity test (optional)
├── docs/
│   ├── QA_TEAM_USAGE.md                # ← Start here for detailed guide
│   ├── QA_CHEAT_SHEET.md              # ← Quick daily reference
│   ├── JIRA_MCP_SETUP.md               # MCP configuration
│   ├── CREDENTIALS_SETUP.md            # ← Create your PAT first
│   ├── INSTALLATION_CHECKLIST.md       # Pre-push validation
│   ├── FUTURE_INTEGRATIONS.md          # Roadmap
│   └── legacy/
│       └── claude-plugin-skills-backup/  # Archived duplicate skills
├── .claude/                            # Project settings (safe to commit)
├── .claude-plugin/
│   └── plugin.json                     # Plugin manifest only (no MCP duplication)
├── .mcp.json                           # Jira MCP server registration
├── my-first-plugin/                    # Legacy (preserved, do not modify)
├── .env.example                        # Credential template (safe to commit)
└── .gitignore                          # Excludes .env.local, tokens, keys
```

> **Note:** Skills were previously mirrored in `.claude-plugin/skills/`. That duplication has been removed — all active skills now live in root `skills/` only. The archived copies are in `docs/legacy/claude-plugin-skills-backup/`.

---

## Key Technical Facts

| | |
|--|--|
| **Jira type** | Internal Jira Data Center |
| **Auth** | PAT (Personal Access Token) with Bearer header |
| **API** | Jira REST API v2 (patched from v3 for Data Center compatibility) |
| **MCP registration** | `.mcp.json` at repo root |
| **OAuth** | Not used — `atlassian@claude-plugins-official` is disabled |
| **Confluence** | Separate host — not connected |
| **Figma** | No API key — future placeholder |

---

## Credential Safety

**Never commit real credentials to Git.**

- `.env.local` — your personal PAT and credentials. **Must be gitignored.** Create from `.env.example`.
- `.env.example` — template with placeholder values. **Safe to commit.**
- `~/.claude/settings.json` — machine-specific. **Never commit this.**

See `docs/CREDENTIALS_SETUP.md` for full credential guide.
