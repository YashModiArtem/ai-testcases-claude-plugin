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

## Expected: Figma OAuth Auth Prompt (First-Time Setup)

### Status: EXPECTED ON FIRST USE — NOT AN ERROR

On first-time setup, the Figma MCP may prompt for OAuth authorization.

### Cause

- Figma MCP via `figma@claude-plugins-official` uses OAuth
- The first authorization requires a one-time browser flow

### Resolution

1. Open the authorization URL from the prompt in your browser
2. Complete the Figma authorization
3. Return to Claude Code — Figma tools will be available

This only needs to be done once per machine. After authorization, Figma tools work automatically.

### Impact on Jira

**None.** Jira MCP is completely independent.

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

## Figma — Authenticated and Working

The Figma OAuth flow is complete. All three Figma commands are active:

- `/figma-design-review` — design analysis
- `/figma-ui-qa` — UI test case generation
- `/figma-screenshot` — frame capture

If Figma tools fail to load, see `docs/FIGMA_MCP_SETUP.md` for troubleshooting.

### Common Figma Errors

| Symptom | Cause | Fix |
|---------|-------|-----|
| OAuth prompt on startup | Expected first-time flow | Open URL in browser, authorize once |
| "File not found" | Wrong file key or no access | Verify URL, ask owner to share |
| "Invalid API key" | Token wrong or expired | Generate new at figma.com/developers |
| Rate limit hit | Too many API calls | Wait, reduce requests |

### Design Review Quality

The quality of Figma design reviews depends on the designer's use of Figma features:
- Named layers and frames → better component identification
- Component instances → reusable component inventory
- Text styles → typography analysis
- Color styles → palette extraction
- Unnamed/locked layers → reduced detail

---

## Summary

| Issue | Status | Affects Jira? |
|-------|--------|---------------|
| Slash command invocation | RESOLVED | No — both natural language and slash command work |
| Figma OAuth | RESOLVED | No |
| Direct HTTPS vs MCP | Required workflow | No — MCP is the correct path |
| Confluence separate host | Known limitation | No |
| SSL/TLS bypass | Accepted | No |
| Figma rate limits | Expected | No — retry later |
