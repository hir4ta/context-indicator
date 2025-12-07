# Claude Code Context Indicator

A tool that displays real-time context usage in Claude Code's status line.

**Zero dependencies** - lightweight and secure.

## Why Use This?

When using Claude Code, the context window fills up as the conversation progresses. Once it reaches the limit, auto-compact kicks in and the conversation history is summarized - which means you lose detailed context.

This tool lets you visually monitor context usage in real-time, so you can:

- Know when to wrap up a task before auto-compact
- Save checkpoints at the right time
- Maintain better control over long coding sessions

## Installation

```bash
npm install -g claude-code-context-indicator
```

## Setup

```bash
context-indicator --setup
```

Then restart Claude Code.

## Display Example

```text
Context: ░░░░░░░░░░ 0.0%
Context: ███░░░░░░░ 31.0%
Context: ██████░░░░ 55.0%
Context: ████████░░ 75.0%
Context: ██████████ 95.0%
```

The progress bar color gradually shifts from blue → green → yellow → red as usage increases.

## Features

- **Real-time progress bar**: Visually track context usage at a glance
- **10-level color gradient**: Intuitive color transition from cool to warm
- **Zero dependencies**: No additional packages installed - minimal security risk
- **Simple setup**: One command to configure

## How It Works

Claude Code has a 200K token context window, but the auto-compact feature reserves approximately 45K tokens as a buffer. This tool calculates the percentage based on the effective usable area (155K tokens).

## License

MIT
