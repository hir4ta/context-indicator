#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const CLAUDE_DIR = path.join(os.homedir(), ".claude");
const SETTINGS_PATH = path.join(CLAUDE_DIR, "settings.json");

interface Settings {
  statusLine?: {
    type: string;
    command: string;
  };
  [key: string]: unknown;
}

function setup(): void {
  console.log("Claude Code Context Indicator Setup\n");

  if (!fs.existsSync(CLAUDE_DIR)) {
    fs.mkdirSync(CLAUDE_DIR, { recursive: true });
    console.log(`Created: ${CLAUDE_DIR}`);
  }

  // Update settings.json
  let settings: Settings = {};

  if (fs.existsSync(SETTINGS_PATH)) {
    try {
      settings = JSON.parse(fs.readFileSync(SETTINGS_PATH, "utf-8"));
    } catch {
      console.log(
        "Warning: Could not parse existing settings.json, creating new one"
      );
    }
  }

  settings.statusLine = {
    type: "command",
    command: "context-indicator-statusline",
  };

  fs.writeFileSync(SETTINGS_PATH, JSON.stringify(settings, null, 2), "utf-8");
  console.log(`Updated: ${SETTINGS_PATH}`);

  console.log("\nSetup complete!");
  console.log("\nNext steps:");
  console.log("1. Restart Claude Code");
  console.log("2. Context usage will be displayed in the status line");
}

function showHelp(): void {
  console.log(`
Claude Code Context Indicator

Usage:
  context-indicator --setup    Install statusline configuration
  context-indicator --help     Show this help message

After running --setup, restart Claude Code to see the context usage
in the status line.
`);
}

const args = process.argv.slice(2);

if (args.includes("--help") || args.includes("-h")) {
  showHelp();
} else if (args.includes("--setup")) {
  setup();
} else {
  showHelp();
}
