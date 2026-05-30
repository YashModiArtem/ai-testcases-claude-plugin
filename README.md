# AI TestCases — BMC HMIS QA Plugin

**Purpose:** Generate structured test cases from Jira tickets and Figma designs using Claude Code and the Atlassian MCP integration.

---

## What This Does

### Jira Workflow
1. **Fetches** a Jira ticket via `jira_get_issue` — title, description, labels, assignee, linked issues, changelog
2. **Finds** related issues via `jira_search_issues`
3. **Generates** structured test cases: positive, negative, edge, regression, UI, accessibility, state transitions

### Figma Workflow
1. **Fetches** a Figma design via `get_metadata` / `get_design_context` — frames, components, layout, typography, spacing
2. **Analyzes** design elements — visual hierarchy, interactive components, data tables, form controls
3. **Generates** UI QA test cases: positive, negative, edge, UI/layout, accessibility, responsive

Output per test case: ID, title, preconditions, steps, expected result, priority, type, notes.

---

## Active Workflows

### Jira — Requirements-Based Test Generation

```
"Generate test cases for BH-5474"
       │
       ▼
Claude Code fetches Jira ticket via mcp-atlassian
       │
       ▼
Jira Data Center REST API v2 (Bearer / PAT auth)
       │
       ▼
Structured test cases written to BH-5474_TestCases.md
```

### Figma — Design-Based UI QA

```
"/figma-ui-qa https://figma.com/file/abc123/MyFile"
       │
       ▼
Claude Code fetches design via Figma MCP (mcp__plugin_figma_figma__)
       │
       ▼
Design metadata (frames, components, layout, typography)
       │
       ▼
UI QA test cases: positive, negative, edge, layout, accessibility, responsive
```

---

## Repository Structure

```
repo-root/
├── .claude/                            # Active skills + commands
│   ├── skills/
│   │   ├── jira-qa-testcase-generator/ # ACTIVE — Jira test case generation
│   │   ├── confluence-extraction/      # FUTURE — placeholder, not connected
│   │   └── figma-ui-qa/               # FUTURE — placeholder, no API key
│   └── commands/
│       ├── jira-qa-testcase-generator.md   # ACTIVE — /jira-qa-testcase-generator
│       ├── figma-design-review.md           # FUTURE — placeholder
│       └── figma-screenshot.md              # FUTURE — placeholder
├── scripts/
│   ├── setup-atlassian-mcp.js          # Data Center patch (run once per install)
│   ├── load-env.ps1                    # Load .env.local into PowerShell
│   └── jira-docker-test/               # Connectivity test (optional)
├── docs/                               # Documentation
│   ├── QA_TEAM_USAGE.md               # ← QA users start here
│   ├── QA_CHEAT_SHEET.md              # ← Quick daily reference
│   ├── JIRA_MCP_SETUP.md              # MCP configuration
│   ├── CREDENTIALS_SETUP.md           # PAT setup
│   ├── INSTALLATION_CHECKLIST.md       # Pre-push validation
│   ├── FUTURE_INTEGRATIONS.md         # Roadmap
│   ├── FIGMA_MCP_SETUP.md             # Figma setup (Phase 1)
│   ├── KNOWN_ISSUES.md                # Current known issues
│   └── legacy/                        # Archived artifacts
├── .claude/                            # Project settings (safe to commit)
├── .claude-plugin/
│   └── plugin.json                    # Plugin manifest only
├── .mcp.json                          # Jira MCP server registration
├── .env.example                       # Credential template (safe to commit)
├── .env.local                         # Your credentials (gitignored — never commit)
└── .gitignore                         # Excludes .env.local, tokens, keys
```

---

## Software Requirements

### Required Software

| Component | Required | Purpose |
|-----------|----------|---------|
| Git | Yes | Clone repo |
| VS Code | Yes | Open project |
| Claude Code | Yes | Run skills and commands |
| Node.js | Yes | MCP tooling |
| Jira PAT | Yes | Jira access |
| VPN / Internal Network | Yes | Reach Jira Data Center |
| Docker Desktop | **No** | Optional troubleshooting |

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

---

## Quick Start

### 1. Clone repo
```powershell
git clone <repo-url>
cd "AI TestCases"
code .
```

### 2. Create credentials
```powershell
copy .env.example .env.local
notepad .env.local
```
Fill in your Jira PAT (see `docs/CREDENTIALS_SETUP.md`).

### 3. Load credentials
```powershell
. .\scripts\load-env.ps1
```

### 4. Start Claude Code
```powershell
claude
```

### 5. Verify MCP
```
/mcp --list
```
Expected: `mcp-atlassian Connected` with Jira tools.

### 6. Generate test cases
```
Generate test cases for BH-5474
```
Output file: `BH-5474_TestCases.md`

That's the verified working command. See `docs/QA_TEAM_USAGE.md` for full details.

---

## Credential Setup

| Credential | Required | File | Safe to Commit? |
|-----------|----------|------|-----------------|
| Jira PAT | Yes | `.env.local` | **Never** |
| Jira Domain | Yes | `.env.local` / `.claude/settings.json` | Project-level only |
| Jira Email | Yes | `.env.local` / `.claude/settings.json` | Project-level only |
| TLS flag | Yes | `.env.local` / `.claude/settings.json` | Project-level only |

**Key rules:**
- Each QA user creates their own `.env.local`
- `.env.local` must **never** be committed
- `.env.example` is safe to commit
- Jira PAT is **different** from GitHub PAT and Anthropic API token

See `docs/CREDENTIALS_SETUP.md` for full instructions.

---

## MCP Setup

**Jira type:** Internal Jira Data Center (not Atlassian Cloud)
**Auth:** PAT with Bearer token header (not OAuth)
**API:** Jira REST API v2 (patched from v3)
**MCP package:** `@xuandev/atlassian-mcp` (globally installed, locally patched)
**MCP registration:** `.mcp.json` at repo root
**Docker:** Not required for normal usage — see `docs/JIRA_MCP_SETUP.md` for diagnostics

### Required Environment Variables

| Variable | Value |
|----------|-------|
| `ATLASSIAN_DOMAIN` | `jira.artem.internal` |
| `ATLASSIAN_EMAIL` | `your-email@company.com` |
| `ATLASSIAN_API_TOKEN` | Your Jira PAT |
| `NODE_TLS_REJECT_UNAUTHORIZED` | `0` |

### One-Time Setup

```powershell
npm install -g @xuandev/atlassian-mcp
node scripts/setup-atlassian-mcp.js
```

Re-run the patch script after every `npm install -g @xuandev/atlassian-mcp` reinstall.

### MCP Validation

```powershell
. .\scripts\load-env.ps1
claude
/mcp --list
```

Expected: `mcp-atlassian Connected` with Jira tools listed.

See `docs/JIRA_MCP_SETUP.md` for full setup and troubleshooting.

---

## Daily Usage

```powershell
cd "C:\path\to\AI TestCases"
. .\scripts\load-env.ps1
claude
```

Then use natural language commands:

```
Generate test cases for BH-5474
```

This is the **verified working command**. It fetches the Jira ticket and generates test cases in a `.md` file.

### Other Commands

```
Generate test cases for BH-5314
Generate regression suite for BH-5532
Find all issues related to BH-5532
```

### Slash Command

```
/jira-qa-testcase-generator BH-5474
```

Both natural language and slash command are supported.

### Figma Usage

```powershell
# Design review — analyze layout, components, typography
/figma-design-review https://www.figma.com/file/abc123/MyFile

# Design review with specific frame
/figma-design-review abc123 123:456

# Generate UI QA test cases from a Figma design
/figma-ui-qa https://www.figma.com/file/abc123/MyFile

# Screenshot a frame
/figma-screenshot abc123 123:456
```

Figma commands work with either a full URL or a file key. Node IDs are optional — if omitted, the top-level page is shown.

---

---

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| `/mcp --list` shows nothing | MCP not loaded | Run `. .\scripts\load-env.ps1`, then restart Claude Code |
| `401 Unauthorized` | Invalid or expired PAT | Create a new Jira PAT — see `docs/CREDENTIALS_SETUP.md` |
| SSL/TLS error | Corporate CA not trusted | `NODE_TLS_REJECT_UNAUTHORIZED=0` is already set |
| `jira.artem.internal not found` | VPN disconnected | Connect to VPN |
| OAuth popup appears | Cloud plugin enabled | Set `atlassian@claude-plugins-official: false` in `~/.claude/settings.json` |
| Figma OAuth prompt | First-time setup | Open URL in browser and authorize once |
| Skill loads but Jira fails | MCP not running | Run `/mcp --list` and confirm Jira tools appear |

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
8. **Using slash commands instead of natural language** — Until pending validation is complete, use `Generate test cases for BH-XXXX` instead.

---

## Git Safety Notes

**Never commit:**
- `.env.local` — your personal PAT and credentials
- `~/.claude/settings.json` — machine-specific settings
- Any file containing real tokens, keys, or passwords

**Safe to commit:**
- `.env.example` — template with placeholder values
- All `.md` documentation files
- `.gitignore` — credential patterns are already excluded
- `.claude/settings.json` — project-level env vars (no PAT)
- `.mcp.json` — MCP registration (no credentials)

**Before pushing:**
1. Run `git status` — confirm `.env.local` is not staged
2. Confirm no credentials in any committed file
3. Validate JSON files with `node -e "JSON.parse(require('fs').readFileSync('file.json'))"`

---

## Feature Matrix

| Feature | Command | Input | Output |
|---------|---------|-------|--------|
| Jira QA Test Cases | `/jira-qa-testcase-generator BH-XXXX` or `Generate test cases for BH-XXXX` | Jira issue key | Structured test cases (`.md` file) |
| Figma Design Review | `/figma-design-review <url>` | Figma file URL or key | Layout analysis, component inventory |
| Figma UI QA Test Cases | `/figma-ui-qa <url>` | Figma file URL or key | UI test cases (positive, negative, edge, etc.) |
| Confluence Extraction | — | — | FUTURE |



| Component | Status |
|-----------|--------|
| Jira Data Center MCP | **ACTIVE** |
| PAT Authentication | **ACTIVE** |
| Natural language test generation | **ACTIVE** (verified) |
| `/jira-qa-testcase-generator` command | **ACTIVE** |
| Figma MCP | **ACTIVE** (authenticated) |
| `/figma-design-review` command | **ACTIVE** |
| `/figma-ui-qa` command | **ACTIVE** |
| Confluence integration | FUTURE / partial |

---

## Key Technical Facts

| | |
|--|--|
| **Jira type** | Internal Jira Data Center |
| **Jira auth** | PAT (Personal Access Token) with Bearer header |
| **Jira API** | Jira REST API v2 (patched from v3) |
| **Jira MCP registration** | `.mcp.json` at repo root |
| **Jira OAuth** | Not used — `atlassian@claude-plugins-official` is disabled |
| **Confluence** | Separate host — not connected |
| **Figma type** | External cloud service |
| **Figma auth** | API key (`FIGMA_API_KEY`) or OAuth |
| **Figma MCP** | `figma@claude-plugins-official` (globally enabled) |
| **Independence** | Jira and Figma are completely independent — one cannot break the other |

For full details, see `docs/JIRA_MCP_SETUP.md` and `docs/FIGMA_MCP_SETUP.md`.
