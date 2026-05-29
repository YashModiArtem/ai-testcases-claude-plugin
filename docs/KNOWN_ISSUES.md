# Known Issues

**Date:** 2026-05-29

---

## Pending: Plugin Slash Command Invocation

### Status: PENDING VALIDATION

The plugin slash command invocation is **not yet fully resolved**.

### What Is Defined

The following commands are defined in the plugin:

```
/jira-qa-testcase-generator BH-5474
/qa-atlassian-plugin:jira-qa-testcase-generator BH-5474
```

These are registered in:
- `commands/jira-qa-testcase-generator.md`
- `skills/jira-qa-testcase-generator/SKILL.md`

### What Is Verified

The following is **verified and supported**:

```
Generate test cases for BH-5474
```

This natural language command works correctly:
- Fetches the Jira ticket via mcp-atlassian
- Generates structured test cases
- Writes output to `BH-5474_TestCases.md`

### Recommended Action

**Until the slash command issue is resolved, always use the natural language form.**

```
Generate test cases for <ISSUE-KEY>
```

This is the supported workflow.

### Tracking

This issue is tracked as a known limitation. Once slash command invocation is validated, this document will be updated and the slash command form will be promoted to the verified list.

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
| Slash command invocation | PENDING | No — use natural language instead |
| Figma OAuth warning | EXPECTED | No |
| Direct HTTPS vs MCP | Required workflow | No — MCP is the correct path |
| Confluence separate host | Known limitation | No |
| SSL/TLS bypass | Accepted | No |
