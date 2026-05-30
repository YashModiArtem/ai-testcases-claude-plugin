# QA Team Usage Guide

**Status:** ACTIVE — Jira MCP is production-ready for natural language generation.

---

## Status

| Integration | Status | Notes |
|-------------|--------|-------|
| **Jira QA Test Generation** | **ACTIVE** | Natural language and slash command both verified working |
| **Plugin Slash Commands** | **ACTIVE** | `/jira-qa-testcase-generator` validated and working |
| **Confluence Extraction** | **FUTURE** | Separate host — not connected |
| **Figma Design Review** | **ACTIVE** | `/figma-design-review` authenticated and working |
| **Figma UI QA** | **ACTIVE** | `/figma-ui-qa` generating test cases |

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

## Active Slash Commands

Both Jira and Figma slash commands are fully operational:

### Jira Commands

```
/jira-qa-testcase-generator BH-5474
```

### Figma Commands

```
/figma-design-review https://www.figma.com/file/abc123/MyFile
/figma-design-review abc123 123:456
/figma-ui-qa https://www.figma.com/file/abc123/MyFile
/figma-screenshot abc123 123:456
```

See the Figma Workflow section below for details.

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

### Figma is Active

Figma design review and UI QA test generation are working. See the Figma Workflow section below.

---

## Figma Workflow

Use Figma commands to analyze designs and generate UI QA test cases. No Jira ticket is required.

### Step 1 — Open Figma design

Navigate to the Figma design in your browser. Copy the file URL.

### Step 2 — Review the design

```
/figma-design-review https://www.figma.com/file/abc123/MyFile
```

This fetches the design structure and provides:
- Layout analysis (frames, sections, sidebar, content areas)
- Component inventory (buttons, tables, inputs, dropdowns)
- Visual design observations (spacing, alignment, hierarchy)
- Recommendations for development and QA

### Step 3 — Generate UI QA test cases

```
/figma-ui-qa https://www.figma.com/file/abc123/MyFile
```

This generates structured test cases covering:
- **Positive** — All interactive elements respond to expected interactions
- **Negative** — Empty states, invalid inputs, boundary values
- **Edge** — Long text overflow, maximum item counts, scroll behavior
- **UI/Layout** — Element visibility, alignment, spacing, z-order
- **Accessibility** — Color contrast, touch targets, keyboard nav
- **Responsive** — Frame size changes, resizing behavior

### Step 4 — (Optional) Screenshot a specific frame

```
/figma-screenshot abc123 123:456 my-frame.png
```

### Input Formats

All Figma commands accept:
- Full URL: `https://www.figma.com/file/abc123/MyFile?node-id=123:456`
- File key only: `abc123` (defaults to top-level page)
- File key + node ID: `abc123 123:456`

### Prerequisites

Figma commands require Figma MCP authentication. If you see an OAuth prompt, open the authorization URL in your browser once. See `docs/FIGMA_MCP_SETUP.md` for full setup instructions.

### Jira vs. Figma Test Generation

| | Jira | Figma |
|--|------|-------|
| **Input** | Jira issue key | Figma file URL/key |
| **Output** | Functional/requirements test cases | UI/visual test cases |
| **Covers** | Business logic, validation, workflows | Layout, interactions, accessibility |
| **When to use** | You have a Jira ticket with requirements | You have a Figma design to build from |

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
├── .claude/
│   ├── skills/
│   │   ├── jira-qa-testcase-generator/  # ACTIVE
│   │   ├── figma-ui-qa/               # ACTIVE
│   │   └── confluence-extraction/       # FUTURE
│   └── commands/
│       ├── jira-qa-testcase-generator.md   # ACTIVE
│       ├── figma-design-review.md          # ACTIVE
│       └── figma-screenshot.md             # ACTIVE
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
│   ├── FIGMA_MCP_SETUP.md            # Figma setup
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
| `.claude/skills/jira-qa-testcase-generator/SKILL.md` | Jira test case generation rules |
| `.claude/skills/figma-ui-qa/SKILL.md` | Figma UI QA test case generation |
| `.claude/commands/jira-qa-testcase-generator.md` | Jira slash command |
| `.claude/commands/figma-design-review.md` | Figma design review command |
| `.claude/commands/figma-screenshot.md` | Figma screenshot command |
| `.mcp.json` | Jira MCP server registration |
| `.claude-plugin/plugin.json` | Plugin manifest |
| `scripts/setup-atlassian-mcp.js` | Jira Data Center compatibility patch |
| `scripts/load-env.ps1` | Load credentials from .env.local |
| `.env.example` | Credential template |
| `.env.local` | Your credentials (gitignored) |
| `docs/KNOWN_ISSUES.md` | Current known issues |
| `docs/JIRA_MCP_SETUP.md` | Jira MCP setup and troubleshooting |
| `docs/FIGMA_MCP_SETUP.md` | Figma MCP setup |
| `docs/CREDENTIALS_SETUP.md` | How to create and store PATs |
| `docs/FUTURE_INTEGRATIONS.md` | Roadmap |
