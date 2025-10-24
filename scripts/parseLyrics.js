#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Parse lyrics from docs/lyrics.md
 * Returns an object mapping track numbers to lyrics
 */
function parseLyricsFile() {
  const lyricsPath = path.join(__dirname, '../docs/lyrics.md');
  const lyricsContent = fs.readFileSync(lyricsPath, 'utf-8');

  const lyrics = {};
  const lines = lyricsContent.split('\n');

  let currentTrackNumber = null;
  let currentLyrics = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Match track headers like "01. 사막"
    const trackMatch = line.match(/^(\d{2})\.\s+(.+)$/);

    if (trackMatch) {
      // Save previous track if it exists
      if (currentTrackNumber !== null && currentLyrics.length > 0) {
        const lyricText = currentLyrics
          .join('\n')
          .trim();
        lyrics[currentTrackNumber] = lyricText;
      }

      // Start new track
      currentTrackNumber = parseInt(trackMatch[1], 10);
      currentLyrics = [];
    } else if (currentTrackNumber !== null) {
      // Add line to current track lyrics (including empty lines to preserve formatting)
      currentLyrics.push(line);
    }
  }

  // Save last track
  if (currentTrackNumber !== null && currentLyrics.length > 0) {
    const lyricText = currentLyrics
      .join('\n')
      .trim();
    lyrics[currentTrackNumber] = lyricText;
  }

  return lyrics;
}

// Parse and generate lyrics data
const parsedLyrics = parseLyricsFile();

// Create output directory if needed
const outputDir = path.join(__dirname, '../app/data');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Write as JSON for runtime use
const jsonPath = path.join(outputDir, 'lyrics.json');
fs.writeFileSync(jsonPath, JSON.stringify(parsedLyrics, null, 2), 'utf-8');

console.log(`✅ Successfully parsed ${Object.keys(parsedLyrics).length} tracks`);
console.log(`📝 Generated: ${jsonPath}`);

// Also generate TypeScript file for type safety
const tsPath = path.join(outputDir, 'lyricsData.ts');
const tsContent = `// Auto-generated lyrics data
// Generated from: docs/lyrics.md
// Do not edit manually

export const lyricsData: Record<number, string> = ${JSON.stringify(parsedLyrics, null, 2)};
`;

fs.writeFileSync(tsPath, tsContent, 'utf-8');
console.log(`📝 Generated: ${tsPath}`);
