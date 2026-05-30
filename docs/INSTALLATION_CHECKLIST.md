# Installation Checklist

Use this checklist for new team member setup and pre-push validation.

---

## Pre-Clone Prerequisites

### Required Software

| Component | Required | Purpose |
|-----------|----------|---------|
| Git | Yes | Clone repo |
| VS Code | Yes | Open project |
| Claude Code | Yes | Run skills and commands |
| Node.js | Yes | MCP tooling |
| Jira PAT | Yes | Jira Data Center access |
| VPN / Internal Network | Yes | Reach `jira.artem.internal` |
| Docker Desktop | **No** | Optional troubleshooting only |

### Optional Software

| Component | Purpose |
|-----------|---------|
| Docker Desktop | Running `scripts/jira-docker-test/` for connectivity diagnostics |

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

---

## Clone and Open

- [ ] Clone the repo: `git clone <repo-url>`
- [ ] Open in VS Code: `code "AI TestCases"`

---

## Credentials

- [ ] Copy `.env.example` to `.env.local`:
  ```powershell
  copy .env.example .env.local
  ```
- [ ] Edit `.env.local` with your real values:
  - `ATLASSIAN_API_TOKEN` — your Jira PAT (required)
  - `ATLASSIAN_DOMAIN` — your Jira host (already set in `.claude/settings.json`)
  - `ATLASSIAN_EMAIL` — your Jira email (already set in `.claude/settings.json`)
- [ ] Verify `.env.local` is **not** committed to Git (`.gitignore` contains `.env.local`)

---

## MCP Server Setup (One-Time Per Machine)

- [ ] Install Atlassian MCP:
  ```bash
  npm install -g @xuandev/atlassian-mcp
  ```
- [ ] Apply Jira Data Center patch:
  ```bash
  node scripts/setup-atlassian-mcp.js
  ```
- [ ] Verify patch succeeded:
  ```
  Patching @xuandev/atlassian-mcp for Jira Data Center...
    [OK]   auth.js
    [OK]   api.js
  Patching complete.
  ```

---

## Claude Code Configuration (One-Time Per Machine)

- [ ] Edit `~/.claude/settings.json` (your user home folder):
- [ ] Add `.claude-plugin@local: true` to `enabledPlugins`
- [ ] Add `"atlassian@claude-plugins-official": false` to `enabledPlugins`
- [ ] Verify `~/.claude/settings.json` is **not** committed to Git

> Your `~/.claude/settings.json` looks like:
> ```json
> {
>   "enabledPlugins": {
>     "atlassian@claude-plugins-official": false,
>     ".claude-plugin@local": true
>   }
> }
> ```

> **Note:** `.claude-plugin@local` must be enabled. The Jira MCP server is registered via `.mcp.json` at the repo root.

---

## Project Settings (Already in Repo)

- [ ] Verify `.claude/settings.json` has `enableAllProjectMcpServers: true`
- [ ] Verify `ATLASSIAN_DOMAIN`, `ATLASSIAN_EMAIL`, `NODE_TLS_REJECT_UNAUTHORIZED` are set
- [ ] Verify `.mcp.json` exists at repo root (MCP registration)

---

## Start Claude Code

- [ ] Load your credentials:
  ```powershell
  . .\scripts\load-env.ps1
  ```
- [ ] Start Claude Code:
  ```bash
  claude
  ```

---

## MCP Validation

- [ ] In Claude Code, run:
  ```
  /mcp --list
  ```
- [ ] Confirm `mcp-atlassian Connected` appears
- [ ] Confirm these tools appear:
  - `jira_get_issue`
  - `jira_search_issues`
  - `jira_list_projects`
  - `jira_add_comment`
  - `jira_get_transitions`
  - (and 40+ more Jira/Confluence tools)

---

## Natural Language Test Generation

- [ ] Run this in Claude Code:
  ```
  Generate test cases for BH-5474
  ```
- [ ] Confirm a Jira issue is fetched and test cases are generated
- [ ] Confirm output file `BH-5474_TestCases.md` is created
- [ ] If 401 Unauthorized: check your PAT in `.env.local` is correct
- [ ] If SSL error: confirm `NODE_TLS_REJECT_UNAUTHORIZED=0` is set

---

## Docker Test (Optional — Most Users Skip This)

Most QA users do **not** need Docker installed. Only proceed if:
- MCP is failing and you need advanced diagnostics
- You are troubleshooting connectivity issues beyond normal PAT/VPN problems

If you need Docker:

- [ ] Build the Docker test image:
  ```bash
  docker build -t jira-test scripts/jira-docker-test
  ```
- [ ] Run with your credentials:
  ```bash
  docker run --rm `
    -e JIRA_BASE_URL="https://jira.artem.internal" `
    -e JIRA_PAT="your-PAT" `
    -e NODE_TLS_REJECT_UNAUTHORIZED=0 `
    jira-test
  ```
- [ ] Confirm: `Success!` with JSON response
- [ ] If Docker succeeds but MCP fails: the MCP layer has an issue
- [ ] If Docker fails: network or auth problem — check VPN, PAT, TLS settings

> **Note:** The Docker test bypasses MCP entirely and calls the Jira API directly. It is a diagnostic tool, not part of normal usage.

---

## Optional: Figma Setup

These steps are optional — they enable Figma design review and UI QA test generation.

- [ ] Create a Figma Personal Access Token at [figma.com/developers](https://figma.com/developers) → Account Settings → Personal Access Tokens
- [ ] Add `FIGMA_API_KEY=your-token` to `.env.local`
- [ ] Load environment: `. .\scripts\load-env.ps1`
- [ ] Restart Claude Code
- [ ] If OAuth prompt appears, open the authorization URL in your browser
- [ ] Verify Figma MCP: `/mcp --list` should show `figma` or `figma-framelink-mcp`
- [ ] Test design review:
  ```
  /figma-design-review https://www.figma.com/file/abc123/MyFile
  ```

See `docs/FIGMA_MCP_SETUP.md` for full instructions.

---

## Troubleshooting Failed Items

| Item | Common Fix |
|------|-----------|
| MCP tools not in `/mcp --list` | Enable `.claude-plugin@local: true` in `~/.claude/settings.json` |
| `mcp-atlassian` shows as not connected | Confirm `.env.local` exists, re-run `. .\scripts\load-env.ps1`, restart Claude Code |
| OAuth popup appears | Set `atlassian@claude-plugins-official: false` in `~/.claude/settings.json` |
| 401 Unauthorized | PAT wrong or expired — get new one from Jira |
| SSL/TLS error | Set `NODE_TLS_REJECT_UNAUTHORIZED=0` in `.env.local`, re-run `load-env.ps1` |
| `jira.artem.internal` not found | Connect to VPN / check network access |
| Patch script fails | Re-run `npm install -g @xuandev/atlassian-mcp` then re-patch |

---

## Pre-Push Safety Checklist

Before pushing changes to the repo:

- [ ] `.gitignore` includes `.env.local` and `.env.*`
- [ ] `.env.example` exists and contains **no real credentials**
- [ ] No `.env.local` file is staged or committed (`git status`)
- [ ] `~/.claude/settings.json` changes are **not** staged
- [ ] `.gitignore` covers all credential patterns
- [ ] JSON files are valid (`node -e "JSON.parse(require('fs').readFileSync('file.json'))"`)
- [ ] All docs reference correct paths and filenames
- [ ] README links work
- [ ] No test case files with real patient data are committed (test cases use placeholder data)

---

## Team Member Independence

Each QA team member should be able to independently:

1. Clone the repo
2. Create their own `.env.local` from `.env.example`
3. Install and patch the MCP
4. Configure their local `~/.claude/settings.json`
5. Run `Generate test cases for BH-3850` successfully
