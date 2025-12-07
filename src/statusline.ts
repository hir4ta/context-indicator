#!/usr/bin/env node

/**
 * Claude Code Context Indicator - Statusline Script
 *
 * Displays context usage percentage in Claude Code's status line.
 * This script is called by Claude Code with transcript data via stdin.
 */

import fs from "node:fs";

interface TranscriptEntry {
  timestamp: string;
  isSidechain?: boolean;
  error?: boolean;
  message?: {
    usage?: {
      input_tokens?: number;
      cache_read_input_tokens?: number;
      cache_creation_input_tokens?: number;
    };
  };
}

interface StatuslineInput {
  transcript_path?: string;
}

// 24-bit true color ANSI escape codes for smooth gradient
function getColor(percentage: number): string {
  if (percentage < 10) return "\x1b[38;2;100;149;237m";  // Cornflower Blue
  if (percentage < 20) return "\x1b[38;2;72;166;215m";   // Sky Blue
  if (percentage < 30) return "\x1b[38;2;64;189;186m";   // Teal
  if (percentage < 40) return "\x1b[38;2;72;201;150m";   // Sea Green
  if (percentage < 50) return "\x1b[38;2;134;199;116m";  // Soft Green
  if (percentage < 60) return "\x1b[38;2;185;195;100m";  // Yellow Green
  if (percentage < 70) return "\x1b[38;2;230;190;90m";   // Gold
  if (percentage < 80) return "\x1b[38;2;235;150;80m";   // Soft Orange
  if (percentage < 90) return "\x1b[38;2;230;110;80m";   // Coral
  return "\x1b[38;2;215;85;85m";                          // Soft Red
}

function createProgressBar(percentage: number, width: number = 10): string {
  const filled = Math.round((percentage / 100) * width);
  const empty = width - filled;
  const color = getColor(percentage);

  const filledBar = "█".repeat(Math.min(filled, width));
  const emptyBar = "░".repeat(Math.max(empty, 0));

  return `${color}${filledBar}\x1b[38;5;240m${emptyBar}\x1b[0m`;
}

try {
  const input: StatuslineInput = JSON.parse(fs.readFileSync(0, "utf-8"));
  const transcriptPath = input.transcript_path;

  if (!transcriptPath || !fs.existsSync(transcriptPath)) {
    console.log("Context: N/A");
    process.exit(0);
  }

  // Parse transcript file
  const lines = fs.readFileSync(transcriptPath, "utf-8").split("\n").filter(Boolean);

  // Find latest valid entry
  let latestValidEntry: TranscriptEntry | null = null;
  let latestTimestamp = "";

  for (const line of lines) {
    try {
      const entry: TranscriptEntry = JSON.parse(line);
      if (!entry.message?.usage || !entry.timestamp) continue;
      if (entry.isSidechain || entry.error) continue;

      if (entry.timestamp > latestTimestamp) {
        latestTimestamp = entry.timestamp;
        latestValidEntry = entry;
      }
    } catch {
      // Skip invalid JSON lines
    }
  }

  if (!latestValidEntry) {
    console.log(`Context Used: ${createProgressBar(0)} ${getColor(0)}0.0%\x1b[0m`);
    process.exit(0);
  }

  // Calculate token count
  const usage = latestValidEntry.message!.usage!;
  const transcriptTokens =
    (usage.input_tokens || 0) +
    (usage.cache_read_input_tokens || 0) +
    (usage.cache_creation_input_tokens || 0);

  // Claude Code uses 200K context, but ~45K is reserved for auto-compact buffer
  // Effective usable area: 200k - 45k = 155k
  const effectiveMaxTokens = 155000;
  const usedPercentage = (transcriptTokens / effectiveMaxTokens) * 100;

  const color = getColor(usedPercentage);
  const progressBar = createProgressBar(usedPercentage);

  console.log(`Context Used: ${progressBar} ${color}${usedPercentage.toFixed(1)}%\x1b[0m`);
} catch {
  console.log("Context: N/A");
}
