# Future Integrations

**Date:** 2026-05-30
**Status:** Jira and Figma are both active. Confluence is future.

---

## Status Overview

| Integration | Status | Verified |
|-------------|--------|---------|
| **Jira QA Test Generation** | **ACTIVE** | Yes — natural language and slash command both work |
| **Plugin Slash Commands** | **ACTIVE** | `/jira-qa-testcase-generator` validated |
| **Figma Design Review** | **ACTIVE** | `/figma-design-review` authenticated and working |
| **Figma UI QA Test Cases** | **ACTIVE** | `/figma-ui-qa` generating test cases |
| **Unified Jira + Figma Test Cases** | **ACTIVE** | `/qa-testcase-generator` with smart routing |
| **Excel-Ready Output Format** | **ACTIVE** | Tabular test cases ready for copy-paste export |
| **Confluence Extraction** | **FUTURE** | Separate host — not connected |

---

## Jira QA Test Generation — ACTIVE

This is the primary active workflow. See `docs/QA_TEAM_USAGE.md` for daily usage.

---

## Plugin Slash Commands — ACTIVE

All slash commands are validated and working:

```
/jira-qa-testcase-generator BH-5474
/figma-design-review https://figma.com/file/abc123/MyFile
/figma-ui-qa https://figma.com/file/abc123/MyFile
/figma-screenshot abc123 123:456
```

Both natural language and slash command forms are supported for Jira.

---

## Confluence Extraction

**Status:** PARTIAL / FUTURE — Not connected.

### Current State

Confluence tools (`confluence_search`, `confluence_get_page`, etc.) exist in `@xuandev/atlassian-mcp` but are **not functional** because:

- The MCP package connects to a single domain
- That domain is configured as Jira Data Center (`jira.artem.internal`)
- Confluence is on a separate host (`confluence.artem.internal`)
- There is no reverse proxy to route Confluence through the same domain

### What Would Enable It

**Option A — Reverse Proxy (Recommended)**
Set up `api.artem.internal` that routes:
- `/wiki/*` → `confluence.artem.internal`
- All other paths → `jira.artem.internal`

Jira Data Center supports this via `server.xml` configuration.

**Option B — Separate MCP Package**
Use a different MCP server for Confluence, configured to `confluence.artem.internal` with its own PAT.

**Option C — Data Center Confluence Integration**
If your Jira and Confluence instances are already on the same Data Center deployment, the single-domain limitation may not apply. Test with the existing MCP.

### Skill Location

See `.claude/skills/confluence-extraction/SKILL.md` for the placeholder skill.

---

## Figma UI QA

**Status:** ACTIVE — Figma MCP authenticated, commands working.

### Current State

- **Figma MCP connected** via `figma@claude-plugins-official` (OAuth authenticated)
- **`/figma-design-review`** — active, analyzes layout, components, typography
- **`/figma-ui-qa`** — active, generates UI QA test cases from designs
- **`/figma-screenshot`** — active, captures frames as PNG
- **`FIGMA_API_KEY` in `.env.local`** — optional, enables API key fallback
- **Setup docs complete** — see `docs/FIGMA_MCP_SETUP.md`
- Figma OAuth warning on startup is **expected** — completes in one-time browser flow

### How to Use

1. If OAuth prompt appears, open the authorization URL in your browser once
2. Run a design review:
   ```
   /figma-design-review https://www.figma.com/file/abc123/MyFile
   ```
3. Generate UI QA test cases:
   ```
   /figma-ui-qa https://www.figma.com/file/abc123/MyFile
   ```

See `docs/FIGMA_MCP_SETUP.md` for full setup instructions.

### Capabilities

- Fetch design structure (frames, components, groups, text, images)
- Analyze layout, typography, color, spacing
- Generate UI QA test cases (positive, negative, edge, UI, accessibility, responsive)
- Download frames as PNG
- Design review with component inventory and layout analysis

### Limitations

- Does not connect to Jira automatically (Figma and Jira are independent)
- Does not validate design against live implementation
- Does not generate functional/behavioral tests beyond design data
- Accessibility tests are basic (contrast, touch targets) — manual verification needed
- Prototype interaction flows not automatically extracted
- Figma API rate limits may apply for large files

### IMPORTANT

Figma and Jira are **completely independent**. Jira MCP uses PAT auth to an internal host. Figma MCP uses OAuth/API key to the external Figma cloud. A Figma failure will never break Jira.

---

## Completed Integrations

The following were planned/future and are now complete:

- **Unified Jira + Figma Test Case Generator** (`/qa-testcase-generator`) — smart routing, merge matrix, gap identification, Excel-ready tabular output
- **Figma Design Review** (`/figma-design-review`) — authenticated and working
- **Figma UI QA Test Cases** (`/figma-ui-qa`) — generating test cases from designs
- **Slash Command Validation** — all commands active

## Roadmap

Still planned/future:

| Feature | Status | Notes |
|---------|--------|-------|
| Excel/XLSX direct export | FUTURE | Tabular format supports copy-paste; automated XLSX export planned |
| QAignite direct export | FUTURE | Map columns to QAignite test case fields |
| Jira Xray export | FUTURE | Map columns to Xray test field structure |
| Zephyr export | FUTURE | Map columns to Zephyr test case fields |
| Confluence extraction | FUTURE | Reverse proxy or separate MCP needed |
| Figma → Jira automatic linkage | FUTURE | Link Figma designs to Jira tickets |
| Figma → Confluence traceability | FUTURE | Trace design changes to requirements |
| Figma change impact analysis | FUTURE | Detect design changes, flag affected test cases |
| Automated gap detection engine | FUTURE | Compare Jira requirements against Figma designs programmatically |
| Figma screenshot automation | PARTIAL | `/figma-screenshot` works — export automation future |

---

## Output Format — Excel-Ready Tabular Standard

All unified test case output follows a standardized 9-section tabular format designed for direct export to QA management tools.

### Section Structure

| # | Section | Contents |
|---|---------|---------|
| 1 | **Source Summary** | Jira key/title/status, Figma file/node, generation mode, timestamp |
| 2 | **Requirement Coverage Matrix** | Each Jira requirement mapped to Figma UI element; coverage status (Covered/Partial/Missing/Ambiguous/Extra) |
| 3 | **Functional Test Cases** | TC ID, Module, Scenario, Preconditions, Test Steps, Expected Result, Priority |
| 4 | **UI Test Cases** | TC ID, Screen, UI Element, Scenario, Expected Result, Priority |
| 5 | **Validation Test Cases** | TC ID, Field/Feature, Validation Rule, Valid Input, Invalid Input, Expected Result, Priority |
| 6 | **Negative Test Cases** | TC ID, Scenario, Invalid Data/Action, Expected Result, Priority |
| 7 | **Accessibility Test Cases** | TC ID, Area, Accessibility Check, Standard, Expected Result, Priority |
| 8 | **Regression Test Cases** | TC ID, Feature/Screen, Scenario, Change Summary, Expected Result, Priority |
| 9 | **Open Questions** | ID, Question, Source, Impact, Assumption |

### Export Compatibility

| Format | How |
|--------|-----|
| **Excel (.xlsx)** | Copy-paste tables, or use a markdown-to-xlsx converter |
| **CSV** | One CSV per table section |
| **Jira Xray** | Map columns to Xray test field structure (Summary → Scenario, Steps → Test Steps, Expected Result → Expected Result) |
| **Zephyr** | Map columns to Zephyr test case fields |
| **QAignite** | Map columns to QAignite test case fields |

### Format Rules

- **TC ID format:** `TC-[PREFIX]-[###]` zero-padded (e.g., `TC-FN-001`, `TC-UI-042`)
- **Prefix meanings:** FN=Functional, UI=UI, VL=Validation, NG=Negative, AX=Accessibility, RG=Regression
- **Priority values:** Critical | High | Medium | Low (never P0/P1/P2/P3)
- **Requirement IDs:** `R001`, `R002`, ... for the coverage matrix
- **Open Question IDs:** `OQ-001`, `OQ-002`, ... for open questions
- **Test Steps format:** One per line, prefixed `Step N:` — no sub-numbering
- **No nested bullets inside cells** — use plain text with line breaks

### Example

```
| TC ID     | Module         | Scenario                     | Preconditions    | Test Steps                  | Expected Result                | Priority |
| --------- | -------------- | ---------------------------- | ---------------- | --------------------------- | ----------------------------- | -------- |
| TC-FN-001 | Neonatal Request | Create neonatal request     | User has access  | Step 1: Navigate to...\nStep 2: Select... | Single BBR Number generated | Critical |
```

---

## Repository Architecture

```
repo-root/
├── .claude/skills/           # ACTIVE skill locations
│   ├── jira-qa-testcase-generator/SKILL.md   # ACTIVE
│   ├── figma-ui-qa/SKILL.md                  # ACTIVE
│   ├── qa-testcase-generator/SKILL.md         # ACTIVE — unified Jira+Figma
│   └── confluence-extraction/SKILL.md         # FUTURE — placeholder
├── .claude/commands/
│   ├── jira-qa-testcase-generator.md   # ACTIVE
│   ├── figma-design-review.md          # ACTIVE
│   ├── figma-screenshot.md             # ACTIVE
│   └── qa-testcase-generator.md        # ACTIVE — unified command
├── scripts/
│   ├── setup-atlassian-mcp.js
│   ├── load-env.ps1
│   └── jira-docker-test/
├── docs/
│   ├── QA_TEAM_USAGE.md
│   ├── JIRA_MCP_SETUP.md
│   ├── CREDENTIALS_SETUP.md
│   ├── INSTALLATION_CHECKLIST.md
│   ├── FUTURE_INTEGRATIONS.md
│   ├── FIGMA_MCP_SETUP.md
│   ├── KNOWN_ISSUES.md
│   └── legacy/
│       └── claude-plugin-skills-backup/
├── .claude-plugin/
│   ├── plugin.json            # Plugin manifest only
│   ├── skills/               # Mirrors root-level skills/
│   └── commands/             # Mirrors root-level commands/
```

## Data Flow Architecture

```
Jira (jira.artem.internal)
     │
     ▼
mcp-atlassian (jira_get_issue, jira_batch_get_changelogs, jira_get_transitions)
     │
     ├─► jira-qa-testcase-generator  ──► Functional test cases (Jira-only path)
     │
     └─► qa-testcase-generator (merge path)
              │
              ▲
Figma (api.figma.com)
     │
     ▼
figma-developer-mcp (get_figma_data)
     │
     ├─► figma-ui-qa  ──► UI test cases (Figma-only path)
     │
     └─► qa-testcase-generator (merge path)
              │
              ▼
      Requirement Coverage Matrix
      (Jira requirements ↔ Figma UI elements)
              │
              ▼
      Unified Test Cases
      (Functional + UI + Validation + Negative + Accessibility + Regression)
              │
              ▼
      Excel-Ready Tabular Output
      (9 sections, copy-paste exportable)
```

**Unified generator** (`qa-testcase-generator`) is the canonical entry point for combined Jira + Figma workflows.

---

## Development Notes

### MCP Server Discovery

Claude Code auto-detects plugins in:
1. `~/.claude/plugins/` (global)
2. `.claude-plugin/` in project root (local)
3. `.claude-plugin/` in project root (local)

### Confluence MCP Limitation

`@xuandev/atlassian-mcp` uses the Atlassian `config.domain` field for the base URL. Both Jira and Confluence cannot be configured simultaneously with the same package instance. A separate MCP server or a reverse proxy is required.

### Figma Authentication

Figma MCP via `figma@claude-plugins-official` (globally enabled) uses OAuth. A local developer MCP (`figma-developer-mcp`) uses API key auth via `FIGMA_API_KEY`. Both are available. Jira MCP is completely independent — a Figma auth failure cannot break Jira.

### User-Level Settings

User-level settings (`~/.claude/settings.json`) are machine-specific and must never be committed to Git. They are configured manually per machine by each QA team member. The repo provides documentation for what to set but does not generate or commit these files.
