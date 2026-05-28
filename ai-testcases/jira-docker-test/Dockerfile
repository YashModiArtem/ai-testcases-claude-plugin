FROM node:18-slim

WORKDIR /app

RUN npm install --no-audit --no-fund axios

COPY jira-test.js .

ENTRYPOINT ["node", "jira-test.js"]
