# Pokemon GO PvP Type Trainer ⚔️

Interactive flashcard app for mastering type effectiveness in Pokemon GO PvP battles.

## Features

- 🏆 Support for Great, Ultra, and Master League
- 🎯 Meta-weighted training based on actual battle frequencies
- 🎲 Random type combination practice
- ⏱️ Optional timer mode
- 🚫 Prevent repeats option
- 📊 Detailed battle analysis with Pokemon lists

## Data Structure

The app uses separate JSON files for easy meta updates:

- `src/data/great-league-weights.json` - Type frequency weights for Great League
- `src/data/great-league-pokemon.json` - Pokemon lists by type for Great League
- `src/data/ultra-league-weights.json` - Type frequency weights for Ultra League
- `src/data/ultra-league-pokemon.json` - Pokemon lists by type for Ultra League
- `src/data/master-league-weights.json` - Type frequency weights for Master League
- `src/data/master-league-pokemon.json` - Pokemon lists by type for Master League

## Updating Meta Data

To update the meta data:

1. Edit the appropriate JSON files in `src/data/`
2. Commit and push changes
3. Run `npm run deploy` to redeploy

## Development

```bash
npm install
npm run dev