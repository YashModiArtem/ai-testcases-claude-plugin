# Installation Checklist

Use this checklist for new team member setup and pre-push validation.

---

## Pre-Clone Prerequisites

- [ ] **Git** installed (`git --version`)
- [ ] **VS Code** installed (`code --version`)
- [ ] **Node.js LTS** installed (`node --version` and `npm --version`)
- [ ] **Claude Code** installed (`claude --version`)
- [ ] **Docker Desktop** installed (optional — only for Docker-based Jira connectivity test)
- [ ] **VPN** connected / network access to Jira Data Center
- [ ] **Jira PAT** created (see `docs/CREDENTIALS_SETUP.md`)

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

## Docker Test (Optional)

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
- [ ] If this succeeds but MCP fails: the MCP layer has an issue
- [ ] If this fails: network or auth problem — check VPN, PAT, TLS settings

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
