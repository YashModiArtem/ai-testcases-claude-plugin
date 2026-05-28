---
description: Extract requirements and content from Confluence pages linked to Jira tickets (PARTIAL — not yet functional)
disable-model-invocation: true
---

# Confluence Extraction (FUTURE / NOT YET IMPLEMENTED)

> **Status:** PARTIAL / FUTURE
> This skill defines the intended behavior. Confluence MCP is not connected in the current setup.

## Intended Workflow

When a Jira ticket is provided with a Confluence link:

1. Call `confluence_search` with CQL to find pages (e.g., `type=page AND space=DEV AND text~"BH-3850"`)
2. Call `confluence_get_page` to fetch page content by ID
3. Extract requirements, acceptance criteria, or linked specs
4. Feed extracted content into test case generation

## Why It's Not Working

`@xuandev/atlassian-mcp` connects to a **single domain**. It is configured for Jira Data Center at `jira.artem.internal`. Confluence at `confluence.artem.internal` is on a separate host and cannot be reached through the current MCP setup.

## What Would Enable It

Option 1: **Reverse proxy** — Route `confluence.artem.internal` through the same domain (e.g., `api.artem.internal/wiki/*` → Confluence, everything else → Jira). Requires IT/network team.

Option 2: **Separate MCP package** — Use a different MCP server for Confluence, configured to the Confluence domain with its own PAT.

## Current Behavior

When this skill is invoked, Claude Code should:
1. Acknowledge that Confluence extraction is not yet available
2. Proceed with Jira-only test case generation using `jira_get_issue`
3. Note in the output that Confluence docs were not checked

## MCP Tools (Package-Level — Not Connected)

- `confluence_search` — search Confluence with CQL
- `confluence_get_page` — fetch page content by ID
- `confluence_list_spaces` — list available spaces
- `confluence_list_pages` — list pages in a space
- `confluence_get_page_children` — get child pages
- `confluence_get_comments` — get page comments
- `confluence_add_comment` — add comment to page
- `confluence_add_label` — add label to page

These tools exist in `@xuandev/atlassian-mcp` but will fail to connect in the current setup.