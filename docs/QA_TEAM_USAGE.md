# QA Team Usage Guide

**Status:** ACTIVE — Jira is production-ready

This guide is for QA engineers who will use Claude Code to generate test cases from Jira tickets.

---

## Status

| Integration | Status | Notes |
|-------------|--------|-------|
| **Jira QA Test Generation** | **ACTIVE** | Jira Data Center via local patched MCP |
| **Confluence Extraction** | **FUTURE** | Separate host — not connected |
| **Figma UI QA** | **FUTURE** | No API key configured |

---

## Prerequisites

Before starting, you need:

1. **Jira PAT** — Create one at Jira → Profile → Personal Access Tokens
2. **Access to Jira Data Center** — VPN or internal network
3. **Node.js LTS** — For running the MCP server
4. **Claude Code** — Installed on your machine

See `docs/INSTALLATION_CHECKLIST.md` for the full prerequisite checklist.

---

## Step-by-Step Setup

### 1. Clone and open the repo

```bash
git clone <repo-url>
cd <repo-name>
code .
```

### 2. Create your credentials file

Copy the template and fill in your values:

```powershell
cp .env.example .env.local
notepad .env.local
```

Add your Jira PAT to `.env.local`:

```bash
ATLASSIAN_DOMAIN=jira.artem.internal
ATLASSIAN_EMAIL=your-email@company.com
ATLASSIAN_API_TOKEN=paste-your-pat-here
NODE_TLS_REJECT_UNAUTHORIZED=0
```

See `docs/CREDENTIALS_SETUP.md` for full instructions on creating and storing your PAT.

> `.env.local` is gitignored. Never commit it.

### 3. Install and patch the MCP server (one-time)

```bash
npm install -g @xuandev/atlassian-mcp
node scripts/setup-atlassian-mcp.js
```

Re-run the patch script after every `npm install -g @xuandev/atlassian-mcp` reinstall.

### 4. Configure Claude Code (one-time per machine)

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

> **Important:** Both `.claude-plugin@local: true` AND `my-first-plugin@local: true` must be set. Both plugins are active. The Jira MCP server is registered via `.mcp.json` at the repo root.

This is machine-specific. Do not commit `~/.claude/settings.json` to Git.

### 5. Start Claude Code

```powershell
# Load your credentials from .env.local
. .\scripts\load-env.ps1

# Start Claude Code
claude
```

### 6. Verify MCP is loaded

```
/mcp --list
```

Look for: `jira_get_issue`, `jira_search_issues`.

### 7. Generate test cases

```
Generate test cases for BH-3850
```

Claude Code will:
1. Fetch the Jira issue via MCP
2. Analyze description, labels, linked issues, changelog
3. Generate structured test cases

---

## Usage Examples

```
Generate test cases for BH-3850
Analyze STORY-77 and create regression scenarios
Fetch QA-1021 and list all acceptance criteria
Generate edge cases for BH-2029
Generate comprehensive test cases for BH-3850, include regression for linked issues
```

---

## What the Plugin Does

1. **Fetches Jira data** via `jira_get_issue` — title, description, labels, assignee, status, components, linked issues
2. **Finds related issues** via `jira_search_issues` — JQL queries for linked or similar tickets
3. **Reads changelog** via `jira_batch_get_changelogs` — recent changes for regression context
4. **Applies test case rules** from `skills/jira-qa-testcase-generator/SKILL.md`

---

## Output Format

Each test case:

```
TC-001 - [Title]

### Preconditions
- List of preconditions

### Steps
1. Step one
2. Step two

### Expected Result
- Expected outcome

### Priority       [High | Medium | Low]
### Test Type      [Positive | Negative | Edge | Regression | UI | Accessibility]
### Notes          [Assumptions or risks, if any]
```

---

## Coverage Categories

Always generated:
- **Positive** — Happy path, core functionality
- **Negative** — Validation failures, invalid inputs
- **Edge cases** — Empty states, boundary conditions, unicode
- **Regression** — Impact on existing functionality
- **UI/Accessibility** — Layout, keyboard nav, screen reader, contrast
- **State transitions** — Workflow transitions
- **Error handling** — Network errors, timeout, session expiry

---

## Important Notes

### Do not hallucinate

If Jira data is incomplete, the plugin explicitly states what's missing and what assumption was made. It will not invent requirements.

### Confluence is not connected

Jira and Confluence are on separate hosts. Do not ask for Confluence pages — the plugin will report that Confluence is not available.

### Figma is not configured

No Figma API key is set up. The Figma skill and commands are placeholders.

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `/mcp --list` shows nothing | Verify BOTH `.claude-plugin@local: true` AND `my-first-plugin@local: true` in `~/.claude/settings.json` |
| OAuth popup appears | Set `atlassian@claude-plugins-official: false` in `~/.claude/settings.json` |
| 401 Unauthorized | PAT is wrong or expired — get a new one from Jira |
| SSL/TLS error | Set `NODE_TLS_REJECT_UNAUTHORIZED=0` in `.env.local` |
| "jira.artem.internal not found" | Check VPN / network access |

Full troubleshooting in `docs/JIRA_MCP_SETUP.md`.

---

## Repository Structure

```
repo-root/
├── skills/                              # Active skills
│   ├── jira-qa-testcase-generator/     # ACTIVE — Jira test case generation
│   ├── confluence-extraction/            # FUTURE — partial, not connected
│   └── figma-ui-qa/                    # FUTURE — placeholder, no API key
├── commands/                            # Slash commands
│   ├── jira-qa-testcase-generator.md   # /jira-qa-testcase-generator
│   ├── figma-design-review.md         # FUTURE — placeholder
│   └── figma-screenshot.md            # FUTURE — placeholder
├── scripts/
│   ├── setup-atlassian-mcp.js         # Patch script
│   ├── load-env.ps1                   # Load .env.local into PowerShell
│   └── jira-docker-test/              # Connectivity test (optional)
├── docs/
│   ├── QA_TEAM_USAGE.md              # ← You are here
│   ├── JIRA_MCP_SETUP.md             # MCP configuration
│   ├── CREDENTIALS_SETUP.md          # ← Set up your PAT first
│   ├── INSTALLATION_CHECKLIST.md      # Pre-push validation
│   ├── FUTURE_INTEGRATIONS.md         # Roadmap
│   └── legacy/
│       └── claude-plugin-skills-backup/  # Archived duplicate skills
├── .claude/                           # Project settings (safe to commit)
├── .claude-plugin/
│   └── plugin.json                    # Plugin manifest only
├── .mcp.json                          # Jira MCP server registration
├── .env.example                       # Credential template
├── .env.local                        # Your credentials (gitignored)
└── .gitignore                        # Excludes .env.local, tokens, keys
```

---

## File Reference

| File | Purpose |
|------|---------|
| `skills/jira-qa-testcase-generator/SKILL.md` | Test case generation rules |
| `commands/jira-qa-testcase-generator.md` | Slash command definition |
| `.mcp.json` | Jira MCP server registration |
| `.claude-plugin/plugin.json` | Plugin manifest |
| `scripts/setup-atlassian-mcp.js` | Jira Data Center compatibility patch |
| `scripts/load-env.ps1` | Load credentials from .env.local |
| `scripts/jira-docker-test/` | Connectivity test (optional) |
| `.env.example` | Credential template |
| `.env.local` | Your credentials (gitignored) |
| `docs/JIRA_MCP_SETUP.md` | Full MCP setup and troubleshooting |
| `docs/CREDENTIALS_SETUP.md` | How to create and store PAT |
| `docs/FUTURE_INTEGRATIONS.md` | Roadmap for Confluence and Figma |
