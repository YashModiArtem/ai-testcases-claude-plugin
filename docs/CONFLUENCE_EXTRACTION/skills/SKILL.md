# Confluence Extraction

**Status:** PARTIAL / FUTURE

This document describes the planned Confluence integration. It is not yet implemented.

## Why It's Not Available

`@xuandev/atlassian-mcp` connects to a single domain. It is configured for Jira Data Center (`jira.artem.internal`). Confluence is on a separate host (`confluence.artem.internal`).

To enable Confluence integration, one of the following is required:
1. A reverse proxy that serves Jira and Confluence under the same domain
2. A separate MCP package configured for Confluence
3. Jira and Confluence on the same Data Center instance

## Planned Capabilities

When implemented, this integration will:
- Search Confluence pages linked to Jira tickets
- Extract requirements and acceptance criteria from Confluence docs
- Fetch design specs, acceptance criteria, or linked specs
- Feed Confluence content into test case generation

## Confluence Skill

See `.claude-plugin/skills/confluence-extraction/SKILL.md` for the skill definition.