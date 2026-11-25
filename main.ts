// Two-Sentence Horror.
//
// Exactly two sentences, at most 400 characters: the scariest horror
// story you can tell in two sentences. This program writes that story
// to entry.txt and nothing else.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

const story =
  "The baby monitor crackled, and a small voice whispered goodnight from the nursery. I was standing in the nursery alone, holding the monitor, and the voice was not mine.";

// The gate: exactly two sentences, 1 to 400 characters, no surrounding
// whitespace, no embedded newline. Anything else never reaches the judge.
const size = [...story].length;
if (size < 1 || size > 400) {
  throw new Error(`story must be 1 to 400 characters, got ${size}`);
}
const sentences = story.split(/[.!?]+/).filter((s) => s.trim().length > 0);
if (sentences.length !== 2) {
  throw new Error(`story must be exactly two sentences, got ${sentences.length}`);
}
if (story.trim() !== story || story.includes("\n")) {
  throw new Error("story must be a single text with no surrounding whitespace");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), story, "utf8");
