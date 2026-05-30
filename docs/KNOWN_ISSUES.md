# Known Issues

**Date:** 2026-05-30

---

## Plugin Slash Command Invocation

### Status: RESOLVED

Slash commands are now defined in `.claude/commands/`. Both invocation forms work:

- **Natural language:** `Generate test cases for BH-5474` — verified working
- **Slash command:** `/jira-qa-testcase-generator BH-5474` — defined in `.claude/commands/jira-qa-testcase-generator.md`

Commands are registered in:
- `.claude/commands/jira-qa-testcase-generator.md`
- `.claude/skills/jira-qa-testcase-generator/SKILL.md`

---

## Expected: Figma OAuth Auth Warning

### Status: EXPECTED — NOT AN ERROR

When Claude Code starts, you may see a Figma OAuth authentication warning or prompt.

### Cause

- Figma MCP tools (`mcp__plugin_figma_figma__*`) come from `figma@claude-plugins-official` (globally enabled)
- Figma is not configured with an API key in this project
- The OAuth warning is triggered by the global Figma plugin looking for credentials

### Impact on Jira

**None.** The Figma OAuth warning does not affect Jira MCP functionality. Jira test case generation works independently.

### Resolution

No action needed. This is expected behavior. When Figma integration is enabled in the future, an API key will be configured and the warning will be resolved.

---

## Important: Jira Generation Must Use mcp-atlassian

### Status: REQUIRED WORKFLOW

Direct HTTPS calls to Jira should **not** be the normal workflow for test case generation.

The correct workflow is:

```
Generate test cases for BH-5474
     │
     ▼
Claude Code uses mcp-atlassian (jira_get_issue, jira_search_issues, etc.)
     │
     ▼
Structured test cases generated
```

Direct `curl` or `axios` calls to Jira are only for:
- Debugging connectivity issues
- The optional Docker validation script
- Troubleshooting MCP failures

For daily test case generation, always use the natural language command that invokes the MCP.

---

## Confluence: Separate Host Limitation

### Status: KNOWN LIMITATION

Jira and Confluence are on separate hosts:
- Jira: `jira.artem.internal`
- Confluence: `confluence.artem.internal` (or similar)

The `@xuandev/atlassian-mcp` package connects to a single domain, configured for Jira. Confluence tools are not functional.

Do not attempt to use Confluence commands — they will report that Confluence is not available.

---

## SSL/TLS Bypass

### Status: KNOWN AND ACCEPTED

`NODE_TLS_REJECT_UNAUTHORIZED=0` is set to allow the MCP to connect to Jira Data Center with self-signed or corporate CA certificates.

This is acceptable for an internal corporate Jira instance. For a production setup with public certificates, this can be removed.

---

## Summary

| Issue | Status | Affects Jira? |
|-------|--------|---------------|
| Slash command invocation | RESOLVED | No — both natural language and slash command work |
| Figma OAuth warning | EXPECTED | No |
| Direct HTTPS vs MCP | Required workflow | No — MCP is the correct path |
| Confluence separate host | Known limitation | No |
| SSL/TLS bypass | Accepted | No |
