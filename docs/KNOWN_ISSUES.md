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

## Figma MCP: Local `figma-developer-mcp` (Replaces OAuth Plugin)

### Status: ACTIVE

The Figma OAuth plugin (`figma@claude-plugins-official`) has been **disabled** in `~/.claude/settings.json`. The local `figma-developer-mcp` server is now the active Figma MCP, registered via the project's `.mcp.json`.

### Setup

- Package: `figma-developer-mcp@0.12.0` (installed globally via `npm install -g figma-developer-mcp`)
- Registration: `.mcp.json` → `figma-developer-mcp` server entry
- Credential: `FIGMA_API_KEY` in `~/.claude/settings.json` → `env.FIGMA_API_KEY`
- Account: `frontend-dev2@artemhealthtech.com` (token owner)

### Why This Change

- OAuth flow requires a one-time browser authorization per machine
- Local PAT-based auth is simpler and more deterministic for CI / scripted use
- Both paths use the same Figma REST API — output and tools are equivalent

### Verifying

```
/mcp --list
```

Expected: `figma-developer-mcp` listed and connected. If missing, ensure the OAuth plugin is set to `false` and the global npm package is installed.

### Troubleshooting

| Symptom | Fix |
|---------|-----|
| `figma-developer-mcp` not in `/mcp --list` | Confirm `npm install -g figma-developer-mcp` ran; check `~/.claude/settings.json` has plugin set to `false` |
| `403 Invalid token` | Regenerate PAT at figma.com/developers with **File content: Read** + **Dev resources: Read** scopes |
| `File not found` | Token owner (`frontend-dev2@artemhealthtech.com`) must have access to the file |

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

## Figma — Local MCP Active

The Figma integration uses the local `figma-developer-mcp` server (PAT-based) via `.mcp.json`. All Figma commands are active:

- `/figma-design-review` — design analysis
- `/figma-ui-qa` — UI test case generation
- `/figma-screenshot` — frame capture
- `/qa-testcase-generator` — unified Jira+Figma combined (uses Figma as one source)

### Smart Routing

`/qa-testcase-generator` automatically detects whether arguments contain a Jira key, Figma URL, or both and routes accordingly:

| Input | Workflow |
|-------|----------|
| `BH-5474` | Jira-only path |
| `https://figma.com/design/abc123/...` | Figma-only path |
| `BH-5474 https://figma.com/design/abc123/...` | Merge path — Requirement Merge Matrix + unified test cases |

This is independent of `/jira-qa-testcase-generator` and `/figma-ui-qa` — all three commands coexist.

If Figma tools fail to load, see `docs/FIGMA_MCP_SETUP.md` for troubleshooting.

### Common Figma Errors

| Symptom | Cause | Fix |
|---------|-------|-----|
| `figma-developer-mcp` not in `/mcp --list` | Plugin flag wrong, package missing | Set `figma@claude-plugins-official: false`; run `npm install -g figma-developer-mcp` |
| "File not found" | Wrong file key or no access | Verify URL, ask owner to share |
| "Invalid token" / 403 | Token wrong or wrong scopes | Regenerate PAT with **File content: Read** + **Dev resources: Read** |
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
| `/qa-testcase-generator` unified command | ACTIVE | No — independent routing |
| Figma OAuth | RESOLVED | No |
| Direct HTTPS vs MCP | Required workflow | No — MCP is the correct path |
| Confluence separate host | Known limitation | No |
| SSL/TLS bypass | Accepted | No |
| Figma rate limits | Expected | No — retry later |

---

## Unified Generator Limitations

The unified generator (`/qa-testcase-generator`) has the following known limitations:

| Limitation | Impact | Mitigation |
|-----------|--------|------------|
| Requires valid Jira access for Jira path | Jira path fails if PAT expired or network down | Check `/mcp --list` for `mcp-atlassian`; verify VPN connected |
| Requires valid Figma access for Figma path | Figma path fails if API key wrong or no file access | Verify `FIGMA_API_KEY` in `.env.local`; check Figma account access |
| Figma prototype interactions not fully captured | UI test cases may miss interactive flows | Mark interaction tests accordingly; verify with live prototype |
| Gap analysis depends on Jira/Figma quality | Missing Jira requirements or unnamed Figma layers reduce coverage | Flag ambiguities in Open Questions table; clarify with team |
| Large Figma files may hit token limits | Deep traversal (`depth=3+`) returns partial data | Use targeted node IDs; check Figma rate limits |
| Requirement Coverage Matrix is text-based | No automated linking to live implementation | Use matrix as QA guide, not as compliance proof |
