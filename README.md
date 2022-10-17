# Sync Labels

Github action to automatically sync labels in the given repo based on a rule set.

## Quick Start

```yaml
name: Sync Labels

on:
  schedule:
    # run at 02:00 every day
    - cron: "0 2 * * *"

jobs:
  lint-commits:
    steps:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Test the action locally
        uses: matmar10/sync-labels
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          repository: your-org/your-repository
```

## Labels

See the [github-label-sync options](https://github.com/Financial-Times/github-label-sync/blob/master/labels.yml)

By default, it uses [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/blob/master/@commitlint/config-conventional/index.js) rules.

Add a JSON file under `.github/prcolinterrc.json` to define your customer rules:

```yaml
- name: "type: bug"
  color: "e11d21"
  aliases:
    - bug
    - fix
  description: Something is not working as expected
- name: "type: feature"
  color: "1d7a4a"
  aliases:
    - enhancement
    - feature
```

## Debug

You can see verbose log output by adding a Github secret on `ACTIONS_STEP_DEBUG` to `true`
