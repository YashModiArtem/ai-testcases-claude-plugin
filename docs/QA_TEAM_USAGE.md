# QA Team Usage Guide

**Status:** ACTIVE — Jira MCP is production-ready for natural language generation.

---

## Status

| Integration | Status | Notes |
|-------------|--------|-------|
| **Jira QA Test Generation** | **ACTIVE** | Natural language command is verified working |
| **Plugin Slash Commands** | **PENDING** | `/jira-qa-testcase-generator` still under validation |
| **Confluence Extraction** | **FUTURE** | Separate host — not connected |
| **Figma UI QA** | **FUTURE** | No API key configured |

---

## Daily Usage

Open a PowerShell terminal and navigate to the project:

```powershell
cd "C:\path\to\AI TestCases"
```

Load your Jira credentials:

```powershell
. .\scripts\load-env.ps1
```

Start Claude Code:

```powershell
claude
```

---

## Verified Working Command

Once Claude Code is running, type:

```
Generate test cases for BH-5474
```

This is the **verified working command**. It fetches the Jira ticket and generates structured test cases in `BH-5474_TestCases.md`.

### Other Natural Language Commands

```
Generate test cases for BH-5314
Generate regression suite for BH-5532
Find all issues related to BH-5532
Analyze STORY-77 and create regression scenarios
Generate edge cases for BH-2029
```

All of these use the mcp-atlassian integration to fetch Jira data.

---

## Planned Slash Commands (Pending Validation)

The following plugin slash commands are defined but **still pending final validation**:

```
/jira-qa-testcase-generator BH-5474
/qa-atlassian-plugin:jira-qa-testcase-generator BH-5474
```

**Do not rely on these yet.** Use the natural language form above instead.

These are documented here for awareness. Once validated, they will be promoted to the verified list.

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
| Docker Desktop | **No** | Optional troubleshooting only |

### Docker Is NOT Required For

Most QA users do **not** need Docker installed. Docker is only used for:
- MCP troubleshooting and diagnostics
- Running `scripts/jira-docker-test/jira-test.js`
- Advanced validation (when MCP itself has issues)

Docker is **NOT** required for:
- Daily QA test case generation
- Jira skill usage (`/jira-qa-testcase-generator`)
- Natural language commands (`Generate test cases for BH-5474`)
- Any normal workflow

> **Most QA users do not need Docker installed.**

For full setup instructions, see `docs/INSTALLATION_CHECKLIST.md`.

---

## One-Time Setup

### 1. Clone the repo

```bash
git clone <repo-url>
cd "AI TestCases"
code .
```

### 2. Create your credentials file

```powershell
copy .env.example .env.local
notepad .env.local
```

Fill in your Jira PAT. See `docs/CREDENTIALS_SETUP.md` for how to create and store your PAT.

> **`.env.local` is gitignored. Never commit it.**

### 3. Install and patch the MCP server

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
  }
}
```

> **Important:** `.claude-plugin@local: true` must be set. The Jira MCP server is registered via `.mcp.json` at the repo root.

This is machine-specific. Do not commit `~/.claude/settings.json` to Git.

### 5. Verify MCP is loaded

```
/mcp --list
```

Look for: `mcp-atlassian Connected` and Jira tools like `jira_get_issue`, `jira_search_issues`.

---

## What the Plugin Does

1. **Fetches Jira data** via `jira_get_issue` — title, description, labels, assignee, status, components, linked issues
2. **Finds related issues** via `jira_search_issues` — JQL queries for linked or similar tickets
3. **Reads changelog** via `jira_batch_get_changelogs` — recent changes for regression context
4. **Generates test cases** following rules from `.claude/skills/jira-qa-testcase-generator/SKILL.md`

---

## Output Format

Each test case:

```
TC-001 - [Title]

Module: [Module name]
Priority: [P0/P1/P2]
Pre-condition: [Preconditions]

| Step | Action | Expected Result |
|------|--------|----------------|
| 1    | ...    | ...            |
```

---

## Coverage Categories

Always generated:
- **P0 - Critical** — Core functionality, happy path
- **P1 - High** — Important edge cases, regression
- **P2 - Medium** — UI, accessibility, performance
- **Positive** — Happy path, core functionality
- **Negative** — Validation failures, invalid inputs
- **Edge cases** — Empty states, boundary conditions
- **Regression** — Impact on existing functionality
- **UI/Accessibility** — Layout, keyboard nav

---

## Important Notes

### Do not hallucinate

If Jira data is incomplete, the plugin explicitly states what's missing and what assumption was made. It will not invent requirements.

### Jira generation must use mcp-atlassian

All test case generation flows through the Jira MCP integration. Do not attempt direct HTTPS calls to Jira — use the natural language command which invokes the MCP.

### Confluence is not connected

Jira and Confluence are on separate hosts. Do not ask for Confluence pages — the plugin will report that Confluence is not available.

### Figma is not configured

No Figma API key is set up. The Figma skill and commands are placeholders.

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `/mcp --list` shows nothing | Run `. .\scripts\load-env.ps1`, then restart Claude Code |
| No `mcp-atlassian` in list | Confirm `.claude-plugin@local: true` in `~/.claude/settings.json` |
| OAuth popup appears | Set `atlassian@claude-plugins-official: false` in `~/.claude/settings.json` |
| `401 Unauthorized` | PAT is wrong or expired — get a new one from Jira |
| SSL/TLS error | Set `NODE_TLS_REJECT_UNAUTHORIZED=0` in `.env.local` |
| "jira.artem.internal not found" | Check VPN / network access |

Full troubleshooting in `docs/JIRA_MCP_SETUP.md`.

---

## Repository Structure

```
repo-root/
├── skills/
│   ├── jira-qa-testcase-generator/     # ACTIVE
│   ├── confluence-extraction/           # FUTURE
│   └── figma-ui-qa/                   # FUTURE
├── commands/
│   ├── jira-qa-testcase-generator.md   # PENDING validation
│   ├── figma-design-review.md          # FUTURE
│   └── figma-screenshot.md             # FUTURE
├── scripts/
│   ├── setup-atlassian-mcp.js
│   ├── load-env.ps1
│   └── jira-docker-test/
├── docs/
│   ├── QA_TEAM_USAGE.md              # ← You are here
│   ├── QA_CHEAT_SHEET.md             # ← Quick daily reference
│   ├── JIRA_MCP_SETUP.md
│   ├── CREDENTIALS_SETUP.md
│   ├── INSTALLATION_CHECKLIST.md
│   ├── FUTURE_INTEGRATIONS.md
│   ├── KNOWN_ISSUES.md
│   └── legacy/
├── .claude-plugin/
│   └── plugin.json
├── .mcp.json
├── .env.example
└── .env.local
```

---

## File Reference

| File | Purpose |
|------|---------|
| `.claude/skills/jira-qa-testcase-generator/SKILL.md` | Test case generation rules |
| `.claude/commands/jira-qa-testcase-generator.md` | Slash command definition |
| `.mcp.json` | Jira MCP server registration |
| `.claude-plugin/plugin.json` | Plugin manifest |
| `scripts/setup-atlassian-mcp.js` | Jira Data Center compatibility patch |
| `scripts/load-env.ps1` | Load credentials from .env.local |
| `.env.example` | Credential template |
| `.env.local` | Your credentials (gitignored) |
| `docs/KNOWN_ISSUES.md` | Current known issues and pending items |
| `docs/JIRA_MCP_SETUP.md` | Full MCP setup and troubleshooting |
| `docs/CREDENTIALS_SETUP.md` | How to create and store PAT |
| `docs/FUTURE_INTEGRATIONS.md` | Roadmap for Confluence and Figma |
