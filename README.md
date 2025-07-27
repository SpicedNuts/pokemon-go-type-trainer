# Pokemon GO PvP Type Trainer ⚔️

Interactive flashcard app for mastering type effectiveness in Pokemon GO PvP battles.

## 🎮 [Play the App](https://SpicedNuts.github.io/pokemon-go-type-trainer)

## ✨ Features

- 🏆 **Support for all leagues** - Great, Ultra, and Master League
- 🎯 **Meta-weighted training** based on actual battle frequencies
- 🎲 **Random type combination** practice mode
- ⏱️ **Optional timer mode** for quick decision training
- 🚫 **Prevent repeats** option for comprehensive coverage
- 📊 **Detailed battle analysis** with Pokemon lists and meta frequency
- 🎨 **Beautiful, responsive interface** with smooth animations

## 🚀 How to Use

1. **Choose your league** (Great/Ultra/Master)
2. **Select your Pokemon's types** (1 or 2 types)
3. **Pick training mode** (Meta-weighted or Random)
4. **Configure settings** (session length, timer, etc.)
5. **Start training!** Answer whether you're winning, neutral, or losing against opponents

## 📊 Data Structure

The app uses separate JSON files for easy meta updates:

### Weight Files (Battle Frequency)
- `src/data/great-league-weights.json` - Type frequency weights for Great League
- `src/data/ultra-league-weights.json` - Type frequency weights for Ultra League  
- `src/data/master-league-weights.json` - Type frequency weights for Master League

### Pokemon Files (Meta Examples)
- `src/data/great-league-pokemon.json` - Pokemon lists by type for Great League
- `src/data/ultra-league-pokemon.json` - Pokemon lists by type for Ultra League
- `src/data/master-league-pokemon.json` - Pokemon lists by type for Master League

## 🔄 Updating Meta Data

To update the meta data for new seasons:

1. **Edit the appropriate JSON files** in `src/data/`
2. **Commit and deploy**:
   ```bash
   git add src/data/
   git commit -m "Update meta data for Season X"
   git push origin main
   npm run deploy
   ```

### Data Format Examples

**Weight Files:**
```json
{
  "Ghost": 15.6,
  "Bug/Steel": 15.2,
  "Water": 11.8,
  "Fighting": 7.5
}
```

**Pokemon Files:**
```json
{
  "Ghost": ["Dusclops", "Froslass", "Spiritomb"],
  "Bug/Steel": ["Forretress", "Scizor", "Escavalier"],
  "Water": ["Azumarill", "Lanturn", "Whiscash"]
}
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## 🎯 Training Tips

- **Start with meta-weighted mode** to practice the most common matchups
- **Use timer mode** to improve quick decision-making
- **Focus on your weak areas** - the app shows detailed explanations
- **Practice different leagues** as the meta varies significantly
- **Enable "no repeats"** for comprehensive coverage in longer sessions

## 📈 Meta Data Sources

- **PvPoke.com** - Usage statistics and rankings
- **GoBattleLog** - Real battle data analysis
- **Silph Arena** - Tournament meta reports  
- **GO Stadium** - Meta analysis and tier lists
- **Reddit r/TheSilphArena** - Community discussions

## 🤝 Contributing

Want to help keep the meta data current? 

1. Fork this repository
2. Update the relevant JSON files with latest meta information
3. Submit a pull request with:
   - Source of data (PvPoke, tournament results, etc.)
   - Season/date information
   - Brief description of changes

## 🏆 Features Coming Soon

- Move effectiveness training (beyond just types)
- Team composition challenges  
- Historical meta timeline
- Custom cup support (Silph Arena formats)
- User progress tracking
- Spaced repetition for weak areas

## 📱 Built With

- **React** + **TypeScript** - Component framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling and animations
- **GitHub Pages** - Free hosting and deployment

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Train hard, battle smart!** ⚔️✨

*Made with ❤️ for the Pokemon GO PvP community*