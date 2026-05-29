# QA Cheat Sheet

Quick reference for daily use. For full setup, see `docs/QA_TEAM_USAGE.md`.

---

## Daily Usage

### Start Claude Code

```powershell
# Navigate to project
cd "C:\path\to\AI TestCases"

# Load Jira credentials
. .\scripts\load-env.ps1

# Start Claude Code
claude
```

---

## Verified Working Commands

### Generate Test Cases

```
Generate test cases for BH-5474
```

**This is the verified working command.** Fetches the Jira ticket and generates test cases.

### Other Verified Commands

```
Generate test cases for BH-5314
Generate regression suite for BH-5532
Find all issues related to BH-5532
Analyze STORY-77 and create regression scenarios
Generate edge cases for BH-2029
```

---

## Planned Slash Commands (Not Yet Verified)

```
/jira-qa-testcase-generator BH-5474
/qa-atlassian-plugin:jira-qa-testcase-generator BH-5474
```

**Do not rely on these yet.** Use the natural language form above.

---

## Key Commands

| Task | Command |
|------|---------|
| Start Claude | `claude` |
| Load credentials | `. .\scripts\load-env.ps1` |
| Verify MCP | `/mcp --list` |
| Generate test cases | `Generate test cases for <ISSUE-KEY>` |
| Regression suite | `Generate regression suite for <ISSUE-KEY>` |
| Edge cases | `Generate edge cases for <ISSUE-KEY>` |
| Related issues | `Find all issues related to <ISSUE-KEY>` |

---

## Expected MCP Output

After `/mcp --list`, you should see:

```
mcp-atlassian Connected
  jira_get_issue
  jira_search_issues
  jira_list_projects
  jira_get_transitions
  jira_add_comment
  jira_batch_get_changelogs
  (and 40+ more)
```

---

## Quick Troubleshooting

| Symptom | Fix |
|---------|-----|
| No Jira tools in `/mcp --list` | Run `. .\scripts\load-env.ps1` then restart Claude Code |
| `mcp-atlassian` shows not connected | Confirm `.env.local` exists, re-run `load-env.ps1` |
| 401 Unauthorized | PAT expired — create new one in Jira |
| `jira.artem.internal` not found | Connect VPN |
| Figma auth warning | Ignore — expected, does not affect Jira |

---

## Output Format

Generated test cases are written to `<ISSUE-KEY>_TestCases.md`:

```
TC-001 - [Title]

Module: [Module]
Priority: [P0/P1/P2]
Pre-condition: [Precondition]

| Step | Action | Expected Result |
|------|--------|----------------|
| 1    | ...    | ...            |
```

---

## Coverage Categories

Every test case generation includes:

- **P0 - Critical** — Core functionality
- **P1 - High** — Important edge cases, regression
- **P2 - Medium** — UI, performance
- **Positive** — Happy path
- **Negative** — Validation failures
- **Edge cases** — Empty states, boundary conditions
- **Regression** — Impact on existing functionality
- **UI/Accessibility** — Layout, keyboard nav

---

## File Locations

| What | Where |
|------|-------|
| Generated test cases | `<ISSUE-KEY>_TestCases.md` |
| Skills | `skills/jira-qa-testcase-generator/SKILL.md` |
| Commands | `commands/jira-qa-testcase-generator.md` |
| Docs | `docs/*.md` |
| MCP registration | `.mcp.json` |
| Credentials | `.env.local` (gitignored) |
| Credentials template | `.env.example` |
