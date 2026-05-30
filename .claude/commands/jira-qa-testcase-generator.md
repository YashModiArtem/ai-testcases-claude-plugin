---
description: Generate QA test cases from an internal Jira Data Center issue using local patched Atlassian MCP
allowed-tools:
  - "mcp__mcp-atlassian__*"
---

# Jira QA Test Case Generator Command

When invoked with `/jira-qa-testcase-generator $ARGUMENTS`, pass `$ARGUMENTS` to the `jira-qa-testcase-generator` skill.

## Workflow

1. Extract the Jira issue key from `$ARGUMENTS`.
2. Invoke the `jira-qa-testcase-generator` skill with the issue key.
3. The skill will use Jira MCP tools from the local patched Atlassian MCP server.
4. Fetch the Jira issue using `jira_get_issue`.
5. Generate structured QA test cases.

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
