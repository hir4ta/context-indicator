# Claude Code Context Indicator

A tool that displays real-time context usage in Claude Code's status line.

## Installation

```bash
npm install -g claude-code-context-indicator
```

## Setup

```bash
context-indicator --setup
```

Then restart Claude Code.

## Features

- **Progress bar display**: Visually track context usage
- **10-level gradient**: Smooth color transition from cool to warm
  - 0-10%: Cornflower Blue
  - 10-20%: Sky Blue
  - 20-30%: Teal
  - 30-40%: Sea Green
  - 40-50%: Soft Green
  - 50-60%: Yellow Green
  - 60-70%: Gold
  - 70-80%: Soft Orange
  - 80-90%: Coral
  - 90-100%: Soft Red

## Display Example

```text
Context Used: ░░░░░░░░░░ 0.0%
Context Used: ███░░░░░░░ 31.0%
Context Used: ██████░░░░ 55.0%
Context Used: ████████░░ 75.0%
Context Used: ██████████ 95.0%
```

## How It Works

Claude Code has a 200K token context window, but the auto-compact feature reserves approximately 45K tokens as a buffer. This tool calculates the percentage based on the effective usable area (155K tokens).

## License

MIT
