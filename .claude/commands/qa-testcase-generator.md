---
description: Unified QA test case generator — Jira only, Figma only, or Jira+Figma combined. Parses arguments to detect Jira issue keys and Figma URLs, fetches from the appropriate source(s), and generates merged functional test cases.
---

# /qa-testcase-generator

Smart unified QA test case generator that routes to the appropriate workflow based on detected inputs.

## Usage

```
/qa-testcase-generator [jira-key] [figma-url]
/qa-testcase-generator [figma-url]
/qa-testcase-generator [jira-key]
```

## Arguments

`$ARGUMENTS` is passed directly to the `qa-testcase-generator` skill, which parses it for:

- **Jira issue key** — pattern: `[A-Z]+-[0-9]+` (e.g., `BH-5474`, `STORY-77`, `QA-100`)
- **Figma file URL** — pattern: `figma.com/design/...` or `figma.com/file/...` (e.g., `https://www.figma.com/design/abc123/MyFile?node-id=123:456`)

Smart routing:

| Arguments Provided | Workflow |
|-------------------|----------|
| Jira key only | Jira-only test case generation |
| Figma URL only | Figma-only UI test case generation |
| Both Jira key and Figma URL | Jira + Figma merge → unified test cases |

## Examples

### Jira only

```
/qa-testcase-generator BH-5474
```

Fetches the Jira ticket, analyzes requirements, and generates functional test cases.

### Figma only

```
/qa-testcase-generator https://figma.com/design/abc123/MyFile?node-id=123:456
```

Fetches the Figma design, analyzes UI elements, and generates UI test cases.

### Combined Jira + Figma

```
/qa-testcase-generator BH-5474 https://figma.com/design/abc123/MyFile?node-id=123:456
```

Fetches both sources, builds a requirement merge matrix, identifies gaps, and generates unified functional + UI test cases.

## Prerequisites

- **Jira:** MCP connected (`/mcp --list` shows `mcp-atlassian`). See `docs/JIRA_MCP_SETUP.md`.
- **Figma:** MCP connected (`/mcp --list` shows `figma`). See `docs/FIGMA_MCP_SETUP.md`.

Jira and Figma credentials are independent. One can be unavailable without affecting the other.

## Output

The skill generates a structured report in **tabular format** (Excel-ready):

1. **Source Summary** — fetch status, timestamps, Jira/Figma details
2. **Requirement Coverage Matrix** — maps Jira requirements to Figma UI elements with coverage status
3. **Functional Test Cases** — TC-FN-### prefix, Jira workflows + Figma elements
4. **UI Test Cases** — TC-UI-### prefix, layout and visual checks
5. **Validation Test Cases** — TC-VL-### prefix, field rules and constraints
6. **Negative Test Cases** — TC-NG-### prefix, invalid inputs and boundary conditions
7. **Accessibility Test Cases** — TC-AX-### prefix, contrast, touch targets, labels
8. **Regression Test Cases** — TC-RG-### prefix, changelog-driven coverage
9. **Open Questions** — explicitly documented gaps, ambiguities, and assumptions

**Export-ready:** Each section is a standalone table. Copy-paste directly to Excel, CSV, Jira Xray, Zephyr, or QAignite.

## Error Handling

- If Jira fails, generates Figma-only cases (or vice versa)
- If both fail, stops with clear troubleshooting instructions
- If input is ambiguous, asks for clarification

## Relationships with Other Commands

| Command | Input | Output |
|---------|-------|--------|
| `/qa-testcase-generator` | Jira key +/or Figma URL | Unified test cases (all types) |
| `/jira-qa-testcase-generator` | Jira key only | Functional test cases from Jira |
| `/figma-ui-qa` | Figma URL only | UI test cases from Figma |

Use `/qa-testcase-generator` when you want combined Jira + Figma coverage. Use the individual commands when you need only one source.

## Rules

- Do not hallucinate requirements — generate from fetched data only
- Do not modify Figma — read-only access
- Always use MCP tools — no direct HTTPS fallback for normal workflows
- Confluence tools are not functional — Jira and Confluence are on separate hosts
