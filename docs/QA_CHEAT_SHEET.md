# QA Cheat Sheet

Quick reference for daily use. For full setup, see `docs/QA_TEAM_USAGE.md`.

---

## Daily Usage

### Start Claude Code

```powershell
# Open PowerShell, navigate to project
cd project

# Load Jira credentials
. .\scripts\load-env.ps1

# Start Claude Code
claude
```

### Generate Test Cases

```
Generate test cases for BH-5532
```

### Generate Regression Suite

```
Generate regression suite for BH-5532
```

### Extract Requirements

```
Extract all acceptance criteria from BH-5532
```

### Find Related Issues

```
Find all issues related to BH-5532
```

### Generate Edge Cases

```
Generate edge cases for BH-5532
```

---

## Key Commands

| Task | Command |
|------|---------|
| Start Claude | `claude` |
| Verify MCP | `/mcp --list` |
| Generate test cases | `Generate test cases for <ISSUE-KEY>` |
| Regression suite | `Generate regression suite for <ISSUE-KEY>` |
| Edge cases | `Generate edge cases for <ISSUE-KEY>` |
| Load credentials | `. .\scripts\load-env.ps1` |

---

## Expected MCP Output

After `/mcp --list`, you should see:

- `jira_get_issue`
- `jira_search_issues`
- `jira_list_projects`
- `jira_get_transitions`
- `jira_add_comment`
- `jira_batch_get_changelogs`
- And 40+ more Jira tools

---

## Quick Troubleshooting

| Symptom | Fix |
|---------|-----|
| No Jira tools in `/mcp --list` | Run `. .\scripts\load-env.ps1` then restart Claude Code |
| 401 Unauthorized | PAT expired — create new one in Jira |
| `jira.artem.internal not found` | Connect VPN |
| Figma auth warning | Ignore — not configured |

---

## Test Case Output Format

Each generated test case follows this format:

```
TC-001 - [Title]

### Preconditions
- List of preconditions

### Steps
1. Step one
2. Step two

### Expected Result
- Expected outcome

### Priority       [High | Medium | Low]
### Test Type      [Positive | Negative | Edge | Regression | UI | Accessibility]
### Notes          [Assumptions or risks, if any]
```

---

## Coverage Categories

Every test case generation includes:

- **Positive** — Happy path, core functionality
- **Negative** — Validation failures, invalid inputs
- **Edge cases** — Empty states, boundary conditions, unicode
- **Regression** — Impact on existing functionality
- **UI/Accessibility** — Layout, keyboard nav, screen reader, contrast
- **State transitions** — Workflow transitions
- **Error handling** — Network errors, timeout, session expiry
