# Installation Checklist

Use this checklist before your first push and before each new team member sets up the plugin.

## Pre-Clone Prerequisites

- [ ] **Git** installed (`git --version`)
- [ ] **VS Code** installed (`code --version`)
- [ ] **Node.js LTS** installed (`node --version` and `npm --version`)
- [ ] **Claude Code** installed (`claude --version`)
- [ ] **Docker Desktop** installed (optional — only for Docker-based Jira test)
- [ ] **VPN** connected / network access to Jira Data Center
- [ ] **Jira PAT** created (see `docs/CREDENTIALS_SETUP.md`)

## Clone and Open

- [ ] Clone the repo: `git clone <repo-url>`
- [ ] Open in VS Code: `code <repo-name>`

## Credentials

- [ ] Copy `.env.example` to `.env.local`:
  ```powershell
  cp .env.example .env.local   # Linux/macOS
  copy .env.example .env.local  # Windows cmd
  ```
- [ ] Edit `.env.local` with your real values:
  - `ATLASSIAN_API_TOKEN` — your Jira PAT (required)
  - `ATLASSIAN_DOMAIN` — your Jira host
  - `ATLASSIAN_EMAIL` — your Jira email
- [ ] Verify `.env.local` is NOT committed to Git (check `.gitignore` contains `.env.local`)

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
    [OK]   auth.js - already patched or unchanged
    [OK]   api.js - already patched or unchanged
  Patching complete.
  ```

## Claude Code Configuration (One-Time Per Machine)

- [ ] Edit `~/.claude/settings.json` (your user home folder):
- [ ] Add `.claude-plugin@local: true` to `enabledPlugins`
- [ ] Add `my-first-plugin@local: true` to `enabledPlugins`
- [ ] Add `"atlassian@claude-plugins-official": false` to `enabledPlugins`
- [ ] Verify `~/.claude/settings.json` is NOT committed to Git

> Your `~/.claude/settings.json` looks like:
> ```json
> {
>   "enabledPlugins": {
>     "atlassian@claude-plugins-official": false,
>     ".claude-plugin@local": true,
>     "my-first-plugin@local": true
>   }
> }
> ```

> **Note:** Both `.claude-plugin@local` and `my-first-plugin@local` must be enabled. Both plugins are active. The Jira MCP server is registered via `.mcp.json` at the repo root.

## Project Settings (Already in Repo)

- [ ] Verify `.claude/settings.json` has `enableAllProjectMcpServers: true`
- [ ] Verify `ATLASSIAN_DOMAIN`, `ATLASSIAN_EMAIL`, `NODE_TLS_REJECT_UNAUTHORIZED` are set
- [ ] Verify `.mcp.json` exists at repo root (MCP registration)

## Start Claude Code

- [ ] Load your credentials:
  ```powershell
  . .\scripts\load-env.ps1   # Windows PowerShell
  ```
- [ ] Start Claude Code:
  ```bash
  claude
  ```

## Verify MCP Is Loaded

- [ ] In Claude Code, run:
  ```
  /mcp --list
  ```
- [ ] Confirm these tools appear:
  - `jira_get_issue`
  - `jira_search_issues`
  - `jira_list_projects`
  - `jira_add_comment`
  - `jira_get_transitions`
  - (and 40+ more Jira/Confluence tools)

## Test the Skill

- [ ] Run this in Claude Code:
  ```
  Generate test cases for BH-3850
  ```
- [ ] Confirm a Jira issue is fetched and test cases are generated
- [ ] If 401 Unauthorized: check your PAT in `.env.local` is correct
- [ ] If SSL error: confirm `NODE_TLS_REJECT_UNAUTHORIZED=0` is set

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

## Final Validation

- [ ] `.gitignore` includes `.env.local` and `.env.*`
- [ ] `.env.example` exists and contains NO real credentials
- [ ] No `.env.local` file is staged or committed (`git status`)
- [ ] `~/.claude/settings.json` is not in the repo
- [ ] `docs/CREDENTIALS_SETUP.md` read and understood
- [ ] Team member can independently run `Generate test cases for BH-3850`

## Push Checklist (Before Committing)

Before pushing changes to the repo:

- [ ] No real credentials in any committed file
- [ ] `.env.local` is not staged (`git status`)
- [ ] `~/.claude/settings.json` changes are not staged
- [ ] `.gitignore` covers all credential patterns
- [ ] JSON files are valid (`node -e "JSON.parse(require('fs').readFileSync('file.json'))"`)
- [ ] All docs reference correct paths
- [ ] README links work

## Troubleshooting Failed Items

| Item | Common Fix |
|------|-----------|
| MCP tools not in `/mcp --list` | Enable BOTH `.claude-plugin@local: true` AND `my-first-plugin@local: true` in `~/.claude/settings.json` |
| OAuth popup appears | Set `atlassian@claude-plugins-official: false` in `~/.claude/settings.json` |
| 401 Unauthorized | PAT wrong or expired — get new one from Jira |
| SSL/TLS error | Set `NODE_TLS_REJECT_UNAUTHORIZED=0` in `.env.local` |
| `jira.artem.internal` not found | Connect to VPN / check network access |
| Patch script fails | Re-run `npm install -g @xuandev/atlassian-mcp` then re-patch |
