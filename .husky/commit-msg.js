#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

const branchName = execSync('git symbolic-ref --short HEAD').toString().trim();

const commitFilePath = process.argv[2];

const commitMessage = fs.readFileSync(commitFilePath, 'utf-8').trim();

const ticketNumberPrefix = `[${branchName}]`;

if (!commitMessage.startsWith(ticketNumberPrefix)) {
  const newCommitMessage = `${ticketNumberPrefix} ${commitMessage}`;
  fs.writeFileSync(commitFilePath, newCommitMessage);
}
