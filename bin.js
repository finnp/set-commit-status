#!/usr/bin/env node

var get = require('simple-get')
var ghslug = require('github-slug')
const getRepoInfo = require('git-repo-info')

var token = process.env.GH_TOKEN

if (!token) {
  console.error('Missing GH_TOKEN')
  process.exit(2)
}

if (process.argv.length < 5) {
  console.error(`set-commit-status <state> <context> <description> [<target_url>]
    state   pending, success, error, or failure.
    context   A string label to differentiate this status from the status of other systems.
    description   A short description of the status.
    target_url    The target URL to associate with this status.`)
  process.exit(2)
}

ghslug('./', function (err, slug) {
  if (err) throw err
  var info = getRepoInfo()
  createStatus(slug, info.sha)
})

function createStatus (slug, sha) {
  console.log(`Setting commit status on ${sha} (${slug})...`)
  get.concat({
    url: `https://api.github.com/repos/${slug}/statuses/${sha}`,
    method: 'POST',
    headers: {
      Authorization: `token ${token}`,
      'User-Agent': 'npm install -g set-commit-status'
    },
    body: {
      state: process.argv[2],
      context: process.argv[3],
      description: process.argv[4],
      target_url: process.argv[5]
    },
    json: true
  }, done)

  function done (err, res, data) {
    if (err) throw err
    console.log(`Done.`)
  }
}
