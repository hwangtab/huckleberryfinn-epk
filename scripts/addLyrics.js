#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read lyrics.md
const lyricsPath = path.join(__dirname, '../docs/lyrics.md');
const lyricsContent = fs.readFileSync(lyricsPath, 'utf-8');

// Parse lyrics by song number
function parseLyrics(content) {
  const songs = {};

  // Split by song numbers (01., 02., etc.)
  const songRegex = /^(\d{2})\.\s+(.+?)$/m;
  const lines = content.split('\n');

  let currentTrack = null;
  let currentLyrics = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trackMatch = line.match(/^(\d{2})\.\s+(.+?)$/);

    if (trackMatch) {
      // Save previous track
      if (currentTrack !== null && currentLyrics.length > 0) {
        songs[currentTrack] = currentLyrics.join('\n').trim();
      }

      currentTrack = parseInt(trackMatch[1]);
      currentLyrics = [];
    } else if (currentTrack !== null && line.trim() !== '') {
      currentLyrics.push(line);
    }
  }

  // Save last track
  if (currentTrack !== null && currentLyrics.length > 0) {
    songs[currentTrack] = currentLyrics.join('\n').trim();
  }

  return songs;
}

// Read tracks.ts
const tracksPath = path.join(__dirname, '../app/data/tracks.ts');
let tracksContent = fs.readFileSync(tracksPath, 'utf-8');

// Parse lyrics
const parsedLyrics = parseLyrics(lyricsContent);

console.log('📖 Parsed lyrics for', Object.keys(parsedLyrics).length, 'songs');

// Build new tracks array
const trackNumbers = Object.keys(parsedLyrics).map(Number).sort((a, b) => a - b);

// Find the tracks array and replace it
const tracksArrayMatch = tracksContent.match(/export const tracks: Track\[\] = \[([\s\S]*?)\];/);

if (tracksArrayMatch) {
  let tracksArray = tracksArrayMatch[1];

  // For each track, add lyrics if available
  trackNumbers.forEach(num => {
    const lyrics = parsedLyrics[num];
    if (lyrics) {
      // Escape backticks and backslashes
      const escapedLyrics = lyrics
        .replace(/\\/g, '\\\\')
        .replace(/`/g, '\\`')
        .replace(/\$/g, '\\$');

      // Find the track object by number
      const trackPattern = new RegExp(
        `(\\{[\\s\\S]*?number:\\s*${num},[\\s\\S]*?(?:producersNote:[\\s\\S]*?)?)(\\},?)`,
        'm'
      );

      const match = tracksArray.match(trackPattern);
      if (match) {
        // Check if lyrics already exists in this track
        if (!match[0].includes('lyrics:')) {
          // Add lyrics before the closing brace
          const updated = match[0].replace(
            /(\},?)$/,
            `,\n    lyrics: \`${escapedLyrics}\`$1`
          );
          tracksArray = tracksArray.replace(match[0], updated);
          console.log(`✅ Added lyrics for track ${num}`);
        } else {
          console.log(`⏭️  Track ${num} already has lyrics`);
        }
      }
    }
  });

  // Replace in full content
  const newContent = tracksContent.replace(
    /export const tracks: Track\[\] = \[([\s\S]*?)\];/,
    `export const tracks: Track[] = [${tracksArray}];`
  );

  // Write updated tracks.ts
  fs.writeFileSync(tracksPath, newContent, 'utf-8');
  console.log('\n✨ Successfully updated tracks.ts with lyrics!');
} else {
  console.error('❌ Could not find tracks array in tracks.ts');
  process.exit(1);
}
