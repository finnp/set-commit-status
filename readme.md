# set-commit-status
[![NPM](https://nodei.co/npm/set-commit-status.png)](https://nodei.co/npm/set-commit-status/)

Create a commit-status for the current branch and repository you are in.
Needs an `GH_TOKEN` in the environment, that has at least status access.

```sh
set-commit-status <state> <context> <description> [<target_url>]
  state   pending, success, error, or failure.
  context   A string label to differentiate this status from the status of other systems.
  description   A short description of the status.
  target_url    The target URL to associate with this status.
```