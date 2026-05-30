---
description: Generate QA test cases from an internal Jira Data Center issue using local patched Atlassian MCP
allowed-tools:
  - "mcp__mcp-atlassian__*"
---

# Jira QA Test Case Generator Command

Use this command when the user provides a Jira issue key or Jira issue URL.

Examples:
- `/jira-qa-testcase-generator BH-5474`
- `/jira-qa-testcase-generator Generate test cases for BH-5474`

## Required Workflow

1. Extract the Jira issue key from the command arguments.
2. Load and follow the instructions from:
   `.claude/skills/jira-qa-testcase-generator/SKILL.md`
3. Use Jira MCP tools from the local patched Atlassian MCP server.
4. Fetch the Jira issue using `jira_get_issue`.
5. Generate structured QA test cases using the skill output format.

## Critical Rules

- Internal Jira Data Center only.
- PAT/Bearer auth only.
- No OAuth.
- No Atlassian Cloud.
- Do not use Confluence tools.
- Do not silently bypass MCP with direct HTTPS calls.
- If MCP fails, stop and report the actual MCP/configuration error.

## If MCP Fails

Tell the user to verify:
- `.env.local` has correct values
- `. .\scripts\load-env.ps1` was run
- Claude Code was restarted after loading env
- `/mcp --list` shows `mcp-atlassian`
- PAT is valid and not expired
- VPN/internal network access is active
- `NODE_TLS_REJECT_UNAUTHORIZED=0` is set if required

Do not use direct Node.js HTTPS as the normal workflow.
