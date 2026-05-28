const axios = require('axios');

const JIRA_BASE_URL = process.env.JIRA_BASE_URL;
const JIRA_PAT = process.env.JIRA_PAT;

if (!JIRA_BASE_URL || !JIRA_PAT) {
  console.error('Error: JIRA_BASE_URL and JIRA_PAT environment variables are required.');
  process.exit(1);
}

const ISSUE_KEY = process.env.JIRA_ISSUE_KEY || 'BH-3850';
const url = `${JIRA_BASE_URL}/rest/api/2/issue/${ISSUE_KEY}`;

console.log(`Testing Jira connectivity to: ${url}`);

axios.get(url, {
  headers: {
    'Authorization': `Bearer ${JIRA_PAT}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 15000
})
  .then(response => {
    console.log('Success! Full response:');
    console.log(JSON.stringify(response.data, null, 2));
  })
  .catch(error => {
    if (error.response) {
      console.error(`Error ${error.response.status} (${error.response.statusText}):`);
      if (error.response.status === 401) {
        console.error('Authentication failed. Check your JIRA_PAT token.');
      } else if (error.response.status === 403) {
        console.error('Access forbidden. Check permissions for your PAT and verify the issue key exists.');
      } else if (error.response.status === 404) {
        console.error(`Issue '${ISSUE_KEY}' not found. Verify the issue key is correct.`);
      } else if (error.response.status === 405) {
        console.error('Method not allowed. Verify the Jira REST API endpoint.');
      } else {
        console.error(JSON.stringify(error.response.data, null, 2));
      }
    } else if (error.request) {
      if (error.code === 'CERT_HAS_EXPIRED' || error.code === 'UNABLE_TO_VERIFY_LEAF_SIGNATURE') {
        console.error(`SSL/TLS Error (${error.code}): Unable to verify server certificate.`);
        console.error('This is common with self-signed or corporate internal CAs.');
        console.error('Set NODE_TLS_REJECT_UNAUTHORIZED=0 to bypass (not recommended for production).');
      } else if (error.code === 'ECONNREFUSED') {
        console.error('Connection refused. Verify the JIRA_BASE_URL is reachable from this environment.');
      } else if (error.code === 'ENOTFOUND') {
        console.error(`Host not found. Verify DNS resolution for: ${JIRA_BASE_URL}`);
      } else if (error.code === 'ETIMEDOUT') {
        console.error('Connection timed out. Verify network connectivity to Jira server.');
      } else {
        console.error(`Network error: ${error.code || error.message}`);
      }
    } else {
      console.error(`Error: ${error.message}`);
    }
    process.exit(1);
  });
