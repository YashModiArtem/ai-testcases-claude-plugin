---
name: figma-ui-qa
description: Generate UI QA test cases from Figma designs using Figma MCP tools. Phase 1: file fetch, design review, screenshot, and test case generation.
allowed-tools:
  - "mcp__plugin_figma_figma__*"
  - "mcp__plugin_figma_Framelink_MCP_for_Figma__get_figma_data"
  - "mcp__plugin_figma_Framelink_MCP_for_Figma__download_figma_images"
---

# Figma UI QA — Phase 1

> **Status:** PHASE 1 — Active when `FIGMA_API_KEY` is set. Fails gracefully without it.

## Prerequisites

1. Create a Figma API key at [figma.com/developers](https://figma.com/developers)
2. Add to `.env.local`:
   ```
   FIGMA_API_KEY=your-figma-api-key
   ```
3. Load credentials: `. .\scripts\load-env.ps1`
4. Restart Claude Code
5. Confirm Figma MCP is available: `/mcp --list` should show `figma` or `figma-framelink-mcp`

See `docs/FIGMA_MCP_SETUP.md` for full setup instructions.

---

## Input

Accept any of:

- **Figma file URL**: `https://www.figma.com/file/abc123/MyFile?node-id=123:456`
- **File key only**: `abc123` (from `figma.com/file/{fileKey}/...`)
- **File key + node ID**: `abc123` and `123:456`

If the user provides a URL, extract the file key and node ID automatically.

---

## Workflow

### Step 1 — Extract file key and node ID

Parse the input:

- File key: capture the alphanumeric string between `/file/` and the next `/`
- Node ID: capture from `?node-id=` parameter if present, otherwise ask the user

If no node ID is provided, ask: *"Which frame or page should I analyze? Please provide the node ID or frame name."*

### Step 2 — Fetch Figma design data

Use `get_figma_data` to fetch the design:

```
fileKey: "abc123"
nodeId: "123:456"   (optional — omit for full file)
depth: 2            (optional — controls traversal depth)
```

### Step 3 — Analyze available design elements

From the fetched data, extract what is available:

- **Node name and type** (frame, component, group, etc.)
- **Layout** (position, dimensions, rotation)
- **Children** (nested elements)
- **Component properties** (fills, strokes, effects)
- **Text content** (visible labels, placeholder text)
- **Auto-layout** properties (spacing, alignment, sizing)

### Step 4 — Generate UI QA test cases

Generate test cases covering:

| Type | Coverage |
|------|----------|
| **Positive** | All interactive elements respond to expected interactions |
| **Negative** | Empty states, invalid inputs, boundary values |
| **Edge** | Long text overflow, maximum item counts, scroll behavior |
| **UI/Layout** | Element visibility, alignment, spacing, z-order |
| **Accessibility** | Color contrast, touch targets (min 44x44px), text labels |
| **Responsive** | Frame size changes, resizing behavior |

Output format per test case:
```
## TC-[N] — [Title]

**Type:** [Positive|Negative|Edge|UI|Accessibility|Responsive]
**Priority:** [P0|P1|P2|P3]
**Preconditions:** [Setup required before test]
**Steps:**
1. [Step 1]
2. [Step 2]
...
**Expected Result:** [What should happen]
**Notes:** [Edge cases, variations, caveats]
```

### Step 5 — Honor missing design data

**Critical:** Do NOT hallucinate or assume design behavior that is not present in the fetched data.

If the API response does not include:
- Hover/active states → skip interaction tests for those states
- Responsive breakpoints → mark responsive tests as "TBD — breakpoint data not available"
- Accessibility attributes → note in accessibility test cases that manual verification is needed
- Specific interaction behavior → use "See Figma prototype link" as fallback

When design data is sparse, say so clearly and generate only what the data supports.

---

## Error Handling

| Error | Response |
|-------|----------|
| No `FIGMA_API_KEY` set | Exit gracefully: "Figma API key not configured. Set `FIGMA_API_KEY` in `.env.local` and restart Claude Code. See `docs/FIGMA_MCP_SETUP.md`." |
| Invalid file key | "Could not access Figma file. Verify the file key is correct and you have access to the file in Figma." |
| Node not found | "Node ID not found in file. Check the node ID or try the file root." |
| Network/auth error | "Figma API error: [details]. Verify your FIGMA_API_KEY is valid at figma.com/developers." |

---

## What This Does NOT Do (Phase 1 Limitations)

- Does **not** generate functional/behavioral tests beyond what the design shows
- Does **not** connect to Jira or Confluence automatically
- Does **not** validate design against implementation
- Does **not** generate accessibility tests beyond basic contrast/size checks from design data
- Does **not** export Figma assets (use `/figma-screenshot` command for that)

---

## Jira Integration

Figma UI QA and Jira QA are independent. To use both:
1. Generate design-based tests with this skill
2. Generate requirements-based tests with the Jira skill
3. Merge the outputs manually

See `docs/FUTURE_INTEGRATIONS.md` for planned combined workflows.
