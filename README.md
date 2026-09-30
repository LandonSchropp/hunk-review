# Hunk Review

> [!WARNING]
> **This repository is 100% vibe coded.** The author did not read any of the code. Use it at your own risk.

This is a [Hunk](https://hunk.dev/) extension that lets you approve or deny a diff from inside Hunk, and hands that decision to whatever is waiting for it, usually a coding agent.

<!-- TODO: Add a screenshot of the modal. -->

Press a key while reviewing to approve or deny the changes, and the decision goes straight to the agent that's listening. Hunk can stay open across rounds of changes, and every decision reaches the agent the same way.

## Install

```sh
hunk extension install LandonSchropp/hunk-review
```

## Usage

Press `ctrl+r` in any Hunk review to approve or deny the changes.

To use another key, remap `hunk-review.review` in the `[keybindings]` table of your Hunk config. A key Hunk already uses has to be freed from its built-in command first.

## Listening for Decisions

```sh
hunk review listen [--repo <path>] [--session <id>]
```

`hunk review listen` prints each decision made in a Hunk review, one line at a time: `approve` or `deny`. When the review closes, it prints `quit` and exits. It waits for the review to open if it isn't open yet.

It listens to the review of the repository in the current directory, or the one `--repo` names. If several reviews are open in the same repository, it asks you to pick one with `--session`, using an ID from `hunk session list`.

Anything can listen: an agent's background command, a script, or a terminal. If you decide while nothing is listening, Hunk tells you so, and the decision goes nowhere.

The reviewer's comments stay in Hunk. Read them from the open review with `hunk session comment list`.

## Agent Skill

The repository includes an agent skill, `hunk-review`, that teaches a coding agent to run a review with Hunk. This skill is designed to work _specifically_ with Claude Code's monitor feature, and may not work with other agents.

```sh
npx skills add LandonSchropp/hunk-review
```

## License

[MIT](LICENSE)
