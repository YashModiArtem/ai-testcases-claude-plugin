/**
 * setup-atlassian-mcp.js
 *
 * Patches @xuandev/atlassian-mcp to work with Jira Data Center:
 * 1. Changes auth from Basic Auth to Bearer Token (PAT)
 * 2. Changes API from v3 to v2 (Data Center compatible)
 * 3. Changes accountId to name for v2 assignee compatibility
 *
 * Usage:
 *   npm install -g @xuandev/atlassian-mcp
 *   node patch-atlassian-mcp.js
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const globalRoot = execSync('npm root -g').toString().trim();
const moduleRoot = path.join(globalRoot, '@xuandev', 'atlassian-mcp');
const authPath = path.join(moduleRoot, 'dist', 'common', 'auth.js');
const apiPath = path.join(moduleRoot, 'dist', 'jira', 'api.js');

function patch(file, description, fn) {
  if (!fs.existsSync(file)) {
    console.error(`ERROR: File not found: ${file}`);
    process.exit(1);
  }
  const content = fs.readFileSync(file, 'utf8');
  const result = fn(content);
  if (result.changed) {
    fs.writeFileSync(file, result.content);
    console.log(`  [PATCH] ${description}`);
    console.log(`  [OK]   ${path.basename(file)}`);
  } else {
    console.log(`  [OK]   ${path.basename(file)} - already patched or unchanged`);
  }
}

console.log('Patching @xuandev/atlassian-mcp for Jira Data Center...\n');

// 1. Auth: Basic Auth → Bearer Token (PAT)
patch(authPath, 'Bearer auth (PAT) instead of Basic Auth', (content) => {
  const newContent = content.replace(
    `const auth = btoa(\`\${this.config.email}:\${this.config.apiToken}\`);
        const url = \`\${this.baseUrl}\${path}\`;
        const response = await fetch(url, {
            ...options,
            headers: {
                Authorization: \`Basic \${auth}\`,`,
    `const url = \`\${this.baseUrl}\${path}\`;
        const response = await fetch(url, {
            ...options,
            headers: {
                Authorization: \`Bearer \${this.config.apiToken}\`,`
  );
  return { changed: newContent !== content, content: newContent };
});

// 2. Jira API: v3 → v2
patch(apiPath, 'API v3 → v2 (Data Center compatible)', (content) => {
  const before = (content.match(/\/rest\/api\/3\//g) || []).length;
  if (before === 0) return { changed: false, content };
  let newContent = content.replace(/\/rest\/api\/3\//g, '/rest/api/2/');
  // Fix search endpoint: /search/jql doesn't exist in v2, use /search
  if (newContent.includes('/rest/api/2/search/jql')) {
    newContent = newContent.replace('/rest/api/2/search/jql', '/rest/api/2/search');
  }
  return { changed: true, content: newContent };
});

// 3. accountId → name for v2 compatibility
patch(apiPath, 'accountId → name (v2 compatibility)', (content) => {
  const before = (content.match(/accountId:/g) || []).length;
  if (before === 0) return { changed: false, content };
  const newContent = content.replace(/accountId:/g, 'name:');
  return { changed: true, content: newContent };
});

console.log('\nPatching complete. Set env vars and run: atlassian-mcp');
console.log('  export ATLASSIAN_DOMAIN=jira.artem.internal');
console.log('  export ATLASSIAN_EMAIL=you@company.com');
console.log('  export ATLASSIAN_API_TOKEN=your-pat-token');
console.log('  export NODE_TLS_REJECT_UNAUTHORIZED=0');
