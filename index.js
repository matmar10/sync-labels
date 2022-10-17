'use strict';

const githubLabelSync = require('github-label-sync');
const core = require('@actions/core');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

async function run() {
  try {
    const accessToken = core.getInput('github_token', { required: true });
    const repo = core.getInput('repository', { required: true });
    const configPathRaw = core.getInput('config_path') || '.github/labels.yml';
    const dryRun = JSON.parse(core.getBooleanInput('dry_run') || 'false');
    const allowAddedLabels = JSON.parse(core.getBooleanInput('allow_added_labels') || 'false');

    // relative to dist/index.js, ex:
    // dist/../.github/labels.yml
    const configPath = path.join(__dirname, '/../', configPathRaw);
    core.debug(`Check if config is local file: "${configPath}"`);
    if (!fs.existsSync(configPath)) {
      throw new Error(`Config file "${configPath}" DOES NOT exists.`);
    }
    core.debug(`YES: file "${configPath}" exists. Using it.`);
    const labels = yaml.load(fs.readFileSync(configPath, 'utf8'));

    // https://github.com/Financial-Times/github-label-sync
    const options = {
      accessToken,
      allowAddedLabels,
      dryRun,
      labels,
      repo,
    };
    core.debug(`Options are: ${JSON.stringify(options)}`);
    const result = await githubLabelSync(options);

    core.info(result);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    core.setFailed(err.message);
  }
}

run();
