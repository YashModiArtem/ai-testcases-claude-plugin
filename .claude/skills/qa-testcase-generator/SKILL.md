---
name: qa-testcase-generator
description: Smart unified QA test case generator. Parses Jira issue keys and Figma URLs from arguments, routes to Jira-only, Figma-only, or Jira+Figma combined workflow, and generates merged functional test cases.
allowed-tools:
  - "mcp__mcp-atlassian__*"
  - "mcp__figma_developer_mcp__*"
---

# Unified QA Test Case Generator

> Smart routing: detects Jira keys and Figma URLs in input, fetches from the appropriate source(s), and generates unified test cases.

## Prerequisites

1. **Jira:** Jira Data Center MCP connected. Verify with `/mcp --list` — should show `mcp-atlassian`. See `docs/JIRA_MCP_SETUP.md`.
2. **Figma:** Figma MCP connected. Verify with `/mcp --list` — should show `figma` or `figma-framelink-mcp`. See `docs/FIGMA_MCP_SETUP.md`.
3. Jira and Figma credentials are independent. One can be unavailable without affecting the other.

---

## Input

Accept `$ARGUMENTS` containing any combination of:

- **Jira issue key** — pattern: `[A-Z]+-[0-9]+` (e.g., `BH-5474`, `STORY-77`, `QA-100`)
- **Figma file URL** — pattern: `figma.com/design/...` or `figma.com/file/...` (e.g., `https://www.figma.com/design/abc123/MyFile?node-id=123:456`)
- **Optional Figma node ID** — extracted from URL `?node-id=` param, or provided as second positional argument

**Smart routing table:**

| Jira Key? | Figma URL? | Path |
|-----------|------------|------|
| Yes | No | → Jira-only path |
| No | Yes | → Figma-only path |
| Yes | Yes | → Merge path |

---

## Step 1 — Parse Arguments

Parse `$ARGUMENTS` and detect:

```
Input: "BH-5474 https://figma.com/design/abc123/MyFile?node-id=123:456"

Extracted:
  jira_key:  "BH-5474"
  figma_url: "https://www.figma.com/design/abc123/MyFile?node-id=123:456"
  figma_node: "123:456"
```

**Detection regex:**
- Jira key: `\b([A-Z][A-Z0-9]+-[0-9]+)\b`
- Figma URL: `https?://(?:www\.)?figma\.com/(?:design|file)/([a-zA-Z0-9]+)`
- Figma node ID: `[?&]node-id=([0-9:-]+)`

If the input is ambiguous (e.g., a single token that could be either), ask the user for clarification.

---

## Step 2 — Fetch Data

### Jira Path

If a Jira key was detected, use these MCP tools:

| Tool | Purpose |
|------|---------|
| `jira_get_issue` | Fetch title, description, labels, assignee, status, components, linked issues |
| `jira_batch_get_changelogs` | Get changelog for regression context |
| `jira_get_transitions` | Get available workflow transitions |
| `jira_search_issues` | Find related issues via JQL (if useful) |

Extract from Jira:
- **Title and key** — what this ticket is about
- **Description and acceptance criteria** — business requirements
- **Labels and components** — categorisation
- **Linked issues** — blocks, blocked by, relates to,Epic Link
- **Recent changelog** — what changed recently (regression context)
- **Workflow transitions** — available status changes
- **Roles / users** — who is involved
- **Validations / constraints** — field rules, required fields

### Figma Path

If a Figma URL was detected, use this MCP tool:

| Tool | Purpose |
|------|---------|
| `fetch` | Fetch full design structure — frames, components, groups, text, layout. Pass `fileKey` (from URL) and `nodeId` (from `?node-id=` param, or omit for full file). Optional `depth` controls traversal depth; default is sufficient for most designs. Use `format=json` only when you need to parse fields programmatically — default `yaml` is more readable. |

Extract from Figma:
- **Screen/page structure** — top-level pages and frames
- **Layout** — dimensions, positioning, auto-layout, spacing
- **Interactive elements** — buttons, inputs, dropdowns, tables, filters, links
- **Navigation** — menus, tabs, breadcrumbs, back buttons
- **Forms** — input fields, labels, placeholders, validation hints
- **Data display** — tables, cards, lists, charts
- **Responsive hints** — frame sizes, breakpoint indicators
- **Accessibility hints** — alt text on images, visible labels
- **Text content** — visible labels, button text, headings, error messages

**Do NOT modify Figma.** This skill only reads design data.

### Error: Both sources fail

If Jira fetch fails AND Figma fetch fails:
1. Report which sources were attempted
2. Report the specific error from each
3. Provide the per-source troubleshooting checklist
4. Stop — do not generate test cases from assumptions

---

## Step 3 — Route Based on Available Data

```
                    ┌─────────────────────────────┐
                    │  Parsed Input              │
                    │  jira_key, figma_url       │
                    └──────────┬──────────────────┘
                               │
               ┌───────────────┼───────────────┐
               │ Jira = found  │ Jira = missing │
               ├───────────────┼───────────────┤
        Figma=found            │                │
               │        ┌──────┴──────┐         │
               │        │ Jira-only  │         │
               │        │ generation  │         │
               │        └─────────────┘         │
               │                                │
               │        ┌─────────────┐         │
               │        │ Figma-only  │         │
               │        │ generation  │         │
               │        └─────────────┘         │
               │                                │
               │        ┌─────────────┐         │
               └───────►│   MERGE     │◄────────┘
                        │   PATH      │
                        └─────────────┘
```

---

## Step 4A — Jira-Only Path

Generate test cases from Jira requirements only:

- **Functional** — happy path, core functionality, workflow steps
- **Validation** — field constraints, required fields, field rules
- **Negative** — invalid inputs, missing data, boundary conditions
- **Regression** — impact from changelog, affected existing features
- **UI** — layout, element visibility, field labels
- **Accessibility** — keyboard nav, screen reader, contrast
- **State transitions** — workflow transitions (e.g., In Progress → Review → Done)
- **Permission/Role-based** — access control per role

Output follows the **Tabular Format** defined in Step 6. Apply it to all test case categories below.

---

## Step 4B — Figma-Only Path

Generate test cases from Figma design only:

- **Functional** — interactive elements respond to expected interactions
- **UI** — element visibility, alignment, spacing, z-order, layout
- **Validation** — empty states, required field indicators, error state designs
- **Negative** — invalid input handling shown in design (if present)
- **Edge** — long text overflow, maximum item counts, scroll behavior
- **Accessibility** — color contrast, touch targets (min 44x44px), visible labels
- **Responsive** — frame size changes, resizing behavior

Output follows the **Tabular Format** defined in Step 6.

**Critical:** Do NOT hallucinate behavior. If the design data does not include hover states, mark interaction tests accordingly. If breakpoint data is missing, mark responsive tests as "TBD — breakpoint data not available."

---

## Step 4C — Merge Path (Both Jira and Figma)

When both Jira and Figma are detected and fetched:

### 3.1 — Build Requirement List from Jira

List every requirement, acceptance criterion, workflow step, and validation rule from the Jira ticket.

### 3.2 — Build UI Element List from Figma

List every screen, section, form, table, button, input, dropdown, filter, navigation element, and interaction in the Figma design.

### 3.3 — Requirement Coverage Matrix

Build a matrix mapping Jira requirements to Figma UI elements:

| ID | Requirement / UI Element | Source | Coverage Status | Notes |
| -- | ------------------------ | ------ | --------------- | ----- |
| R001 | [Requirement text] | Jira | **Covered** | Figma node-id: 123:456 |
| R002 | [UI element] | Figma | **Ambiguous** | Jira does not mention this element |
| R003 | [Requirement] | Both | **Partial** | Jira mentions it but design detail is unclear |
| R004 | [Missing requirement] | Jira | **Missing** | Not found in Figma design |
| R005 | [Extra element] | Figma | **Extra** | No Jira requirement — flag for clarification |

**Coverage Status values:**
- **Covered** — requirement is in Jira AND has a matching UI element in Figma
- **Partial** — requirement is mentioned but implementation detail is unclear
- **Missing** — in Jira but no UI element found in Figma
- **Ambiguous** — UI element exists but Jira intent is unclear
- **Extra** — Figma element with no Jira requirement (flag for clarification)

### 3.4 — Identify Gaps

After building the matrix, explicitly call out:

**Gaps (Jira not visible in Figma):**
- List each Jira requirement with no matching UI element

**Gaps (Figma not mentioned in Jira):**
- List each Figma element with no corresponding Jira requirement

**Ambiguous elements:**
- List elements whose purpose or behavior is unclear from both sources

---

## Step 5 — Test Case Categories

From the merge matrix and gap analysis, generate test cases across these categories:

| Category | Prefix | Source | Description |
|----------|--------|--------|-------------|
| Functional | TC-FN- | Jira + Figma | Happy path, core workflows, business rules |
| UI | TC-UI- | Figma (+ Jira roles) | Layout, element visibility, alignment, spacing |
| Validation | TC-VL- | Jira + Figma | Field constraints, required fields, error states |
| Negative | TC-NG- | Jira + Figma | Invalid inputs, missing data, boundary conditions |
| Accessibility | TC-AX- | Figma (+ Jira) | Contrast, touch targets, labels, screen reader |
| Regression | TC-RG- | Jira changelog | Changed areas, impacted features, linked issues |

---

## Step 6 — Output Format

All output uses structured tabular format. Every section is one table. No nested bullets inside cells.

---

### Section 1 — Source Summary

```
## 1. Source Summary

| Field             | Value                                        |
| ----------------- | -------------------------------------------- |
| Jira Issue        | [KEY]                                        |
| Jira Title        | [Title from Jira]                            |
| Jira Status       | [Status] / [Assignee] / [Labels]             |
| Figma File        | [fileKey]                                    |
| Figma File Name   | [Name from Figma]                            |
| Figma Node        | [node-id or "Full file"]                     |
| Figma Account     | [FIGMA_EMAIL from .env.local]                |
| Generation Mode   | [Jira-only / Figma-only / Jira + Figma]      |
| Generated At      | [YYYY-MM-DD HH:MM UTC]                       |
| Fetch Failures    | [None / list of failed sources]              |
```

---

### Section 2 — Requirement Coverage Matrix

```
## 2. Requirement Coverage Matrix

| ID   | Requirement / UI Element              | Source    | Coverage Status | Figma Node    | Notes |
| ---- | ------------------------------------ | --------- | --------------- | ------------- | ----- |
| R001 | [Requirement text]                   | Jira      | Covered         | 123:456       | ...   |
| R002 | [UI element]                         | Figma     | Ambiguous       | 123:789       | ...   |
| R003 | [Requirement]                        | Both      | Partial         | 123:111       | ...   |
| R004 | [Requirement]                        | Jira      | Missing         | —             | ...   |
| R005 | [UI element]                         | Figma     | Extra           | 123:222       | ...   |
```

**Coverage Status:** Covered | Partial | Missing | Ambiguous | Extra

---

### Section 3 — Functional Test Cases

```
## 3. Functional Test Cases

| TC ID     | Module     | Scenario                          | Preconditions           | Test Steps                          | Expected Result                     | Priority |
| --------- | ---------- | -------------------------------- | ---------------------- | ---------------------------------- | ---------------------------------- | -------- |
| TC-FN-001 | [Module]   | [What is being tested]            | [Setup required]       | Step 1:\nStep 2:\nStep 3:      | [What should happen]             | Critical |
| TC-FN-002 | [Module]   | [Another scenario]                | [Setup required]       | Step 1:\nStep 2:                 | [Expected outcome]               | High     |
```

**Columns:** TC ID | Module | Scenario | Preconditions | Test Steps | Expected Result | Priority

**Test Steps format:** All steps in a single cell, one per line prefixed with `Step N:`. No sub-numbering.

---

### Section 4 — UI Test Cases

```
## 4. UI Test Cases

| TC ID   | Screen          | UI Element          | Scenario                         | Expected Result                        | Priority |
| ------- | --------------- | ------------------- | ------------------------------- | ------------------------------------- | -------- |
| TC-UI-001 | [Screen name] | [Button / Field / Table / etc.] | [Visual/layout check]    | [Element visible, aligned, etc.]       | High     |
| TC-UI-002 | [Screen name] | [Another element]   | [Another layout check]           | [Expected behavior]                    | Medium   |
```

**Columns:** TC ID | Screen | UI Element | Scenario | Expected Result | Priority

---

### Section 5 — Validation Test Cases

```
## 5. Validation Test Cases

| TC ID   | Field / Feature     | Validation Rule                     | Valid Input        | Invalid Input     | Expected Result                              | Priority |
| ------- | -------------------- | ---------------------------------- | ------------------ | ----------------- | ------------------------------------------- | -------- |
| TC-VL-001 | [Field name]       | [Rule: required / format / range] | [Valid value]     | [Invalid value]   | [System response]                            | Critical |
| TC-VL-002 | [Field name]       | [Rule]                             | [Valid value]     | [Invalid value]   | [System response]                            | High     |
```

**Columns:** TC ID | Field / Feature | Validation Rule | Valid Input | Invalid Input | Expected Result | Priority

---

### Section 6 — Negative Test Cases

```
## 6. Negative Test Cases

| TC ID   | Scenario                          | Invalid Data / Action          | Expected Result                           | Priority |
| ------- | -------------------------------- | ----------------------------- | ---------------------------------------- | -------- |
| TC-NG-001 | [Scenario]                    | [Bad input or action]         | [System blocks / shows error]             | Critical |
| TC-NG-002 | [Scenario]                    | [Missing mandatory data]       | [Form submission blocked]                | High     |
```

**Columns:** TC ID | Scenario | Invalid Data / Action | Expected Result | Priority

---

### Section 7 — Accessibility Test Cases

```
## 7. Accessibility Test Cases

| TC ID   | Area                  | Accessibility Check                | Standard        | Expected Result                   | Priority |
| ------- | --------------------- | --------------------------------- | --------------- | ------------------------------- | -------- |
| TC-AX-001 | [Screen/Section]    | Color contrast ratio               | WCAG 2.1 AA    | [Min 4.5:1 normal / 3:1 large]  | High     |
| TC-AX-002 | [Screen/Section]    | Touch target minimum               | WCAG 2.1 AA    | [Min 44x44px touch area]       | High     |
| TC-AX-003 | [Screen/Section]    | Screen reader — form labels       | WCAG 2.1 AA    | [All fields have labels]        | Medium   |
| TC-AX-004 | [Screen/Section]    | Keyboard navigation               | WCAG 2.1 AA    | [Tab order is logical]          | Medium   |
```

**Columns:** TC ID | Area | Accessibility Check | Standard | Expected Result | Priority

---

### Section 8 — Regression Test Cases

```
## 8. Regression Test Cases

| TC ID   | Feature / Screen       | Scenario                              | Change Summary                        | Expected Result                     | Priority |
| ------- | --------------------- | ------------------------------------ | ------------------------------------ | ---------------------------------- | -------- |
| TC-RG-001 | [Feature]            | [Existing feature behavior check]     | [From Jira changelog: what changed]  | [Existing behavior unchanged]       | High     |
| TC-RG-002 | [Feature]            | [Related feature impacted by change]   | [What changed]                       | [No regression in related area]    | High     |
```

**Columns:** TC ID | Feature / Screen | Scenario | Change Summary | Expected Result | Priority

---

### Section 9 — Open Questions

```
## 9. Open Questions

| ID   | Question                                       | Source     | Impact     | Assumption |
| ---- | ---------------------------------------------- | ---------- | ---------- | --------- |
| OQ-001 | [What is unknown]                           | [Jira/Figma/Both] | [P0-P3]  | [What is assumed] |
| OQ-002 | [What needs clarification]                  | [Jira/Figma/Both] | [P0-P3]  | [What is assumed] |
```

**Columns:** ID | Question | Source | Impact | Assumption

---

### Output Rules

1. **One table per section.** No mixing categories within a table.
2. **Consistent column order.** Columns never reorder between tables of the same category.
3. **No nested bullets inside cells.** Use plain text with line breaks.
4. **Test Steps cell format:**
   ```
   Step 1: [Action]
   Step 2: [Action]
   Step 3: [Action involving [data]]
   ```
5. **Priority values:** Critical | High | Medium | Low (never P0/P1/P2/P3 in output)
6. **TC ID format:** `TC-[PREFIX]-[###]` zero-padded to 3 digits (e.g., TC-FN-001, TC-UI-042)
7. **Requirement IDs:** `R001`, `R002`, ... for the coverage matrix
8. **Open Question IDs:** `OQ-001`, `OQ-002`, ... for the open questions table
9. **Generated timestamp** always in UTC.

---

### Export Compatibility

The tabular format is designed for direct export to:

| Format | How |
|--------|-----|
| **Excel (.xlsx)** | Copy-paste tables, or use a markdown-to-xlsx converter |
| **CSV** | One CSV per table section |
| **Jira Xray** | Map columns to Xray test field structure (Summary → Scenario, Steps → Test Steps, Expected Result → Expected Result) |
| **Zephyr** | Map columns to Zephyr test case fields |
| **QAignite** | Map columns to QAignite test case fields |

No changes to routing, MCP calls, parsing, or merge logic are needed to support these exports. The format is content-only.

---

## Critical Rules

1. **Do not hallucinate requirements.** If Jira data is missing, generate Figma-only cases. If Figma data is missing, generate Jira-only cases. If both fail, stop.
2. **Do not modify Figma.** Only read design data.
3. **Always use MCP tools.** Do not fall back to direct HTTPS calls for normal workflows.
4. **Jira is internal Data Center.** PAT/Bearer auth only. No Atlassian Cloud, no OAuth.
5. **Figma is external cloud.** Independent credentials from Jira.
6. **Confluence tools are not functional.** Jira and Confluence are on separate hosts.
7. **Do not generate test cases without fetching data first.** Always call `jira_get_issue` and/or `fetch` (Figma MCP) before generating.

---

## Error Handling

| Scenario | Response |
|----------|----------|
| Jira key detected but MCP fails | Stop. Report MCP error + troubleshooting checklist. |
| Figma URL detected but MCP fails | Stop. Report error + setup instructions. |
| Both detected, one MCP fails | Generate from the available source. Flag the failed source in Source Summary. |
| Neither source available | Stop with clear troubleshooting instructions for both. |
| Ambiguous input | Ask user to clarify which input is Jira and which is Figma. |

---

## What This Does NOT Do

- Does **not** generate test cases without fetching source data
- Does **not** modify Figma files or Jira tickets
- Does **not** use Confluence tools
- Does **not** validate against live implementation
- Does **not** generate accessibility audits beyond design-level checks

---

## Confluence Notes

Confluence tools (`confluence_get_page`, `confluence_search`) are **not functional** in this setup. Jira and Confluence are on separate hosts. Do not attempt to use them.

---

## MCP Tool Reference

### Jira (mcp__mcp-atlassian__)

| Tool | Used in |
|------|---------|
| `jira_get_issue` | All Jira paths |
| `jira_batch_get_changelogs` | Jira-only, Merge |
| `jira_get_transitions` | Jira-only, Merge |
| `jira_search_issues` | Jira-only, Merge |

### Figma (mcp__figma_developer_mcp__)

| Tool | Used in |
|------|---------|
| `fetch` | Figma-only, Merge — pass `fileKey` and optional `nodeId` / `depth` / `format` |

---

## Response Style

- Concise but comprehensive
- Highly structured
- Technically precise
- Directly actionable for QA engineers
- No vague statements
- No generic testing advice
- Focus on implementation-relevant scenarios
- Flag ambiguities explicitly with open questions
