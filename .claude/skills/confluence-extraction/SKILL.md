---
name: confluence-extraction
description: FUTURE placeholder skill for extracting requirements from Confluence pages.
---

# Confluence Extraction (FUTURE / NOT YET IMPLEMENTED)

> **Status:** FUTURE
> This skill defines intended behavior. Confluence MCP is not connected.

`@xuandev/atlassian-mcp` connects to Jira Data Center at `jira.artem.internal`. Confluence at `confluence.artem.internal` is on a separate host and cannot be reached through the current MCP setup. See `docs/FUTURE_INTEGRATIONS.md` for the roadmap to enable this.

## Planned Workflow

### Step 1 — Connect to Confluence MCP
When Confluence MCP is enabled, use `confluence_get_page` and `confluence_search` to fetch Confluence content.

### Step 2 — Extract Requirements
Extract user stories, acceptance criteria, and specifications from Confluence pages.

### Step 3 — Generate Context
Use extracted content to inform test case generation or other QA workflows.

## Current State

This is a placeholder. Do not attempt to use Confluence tools — they are not connected.

## Roadmap

See `docs/FUTURE_INTEGRATIONS.md` for the Confluence integration roadmap.
