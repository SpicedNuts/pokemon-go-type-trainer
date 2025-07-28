# Pokemon GO PvP Type Trainer ⚔️

Interactive flashcard app for mastering type effectiveness in Pokemon GO PvP battles. Practice type matchups with real meta data from competitive play.

## 🎮 [Play the App](https://SpicedNuts.github.io/pokemon-go-type-trainer)

## ✨ Features

- 🏆 **All three leagues** - Great League (CP 1500), Ultra League (CP 2500), and Master League
- 🎯 **Meta-weighted training** based on actual usage statistics from PvPoke.com
- 🎲 **Random type combination** practice for comprehensive coverage
- ⏱️ **Optional 5-second timer** for pressure training (auto-submits on timeout)
- 🚫 **Prevent repeats** option to avoid duplicate matchups in a session
- 🔄 **Dual-type order recognition** - Dragon/Fire and Fire/Dragon work the same
- 📊 **Detailed battle analysis** with complete Pokemon lists and meta frequency data
- 📱 **Mobile-optimized interface** with desktop support (no scrolling required)
- 🎨 **Pokemon GO themed colors** and smooth animations

## 🚀 How to Use

1. **Choose your league** (Great/Ultra/Master) with Pokemon GO themed colors
2. **Select your Pokemon's types** (single or dual-type combinations)
3. **Pick training mode**:
   - **Meta-weighted**: Practice against Pokemon you'll actually face in battles
   - **Random**: Cover all possible type combinations
4. **Configure battle settings** (session length 10-30 cards, timer on/off, prevent repeats)
5. **Start training!** Decide if your typing is winning, neutral, or losing against opponents
6. **Review detailed analysis** showing exact damage multipliers and meta Pokemon examples

## 📊 Current Meta Data

All meta data is sourced from **PvPoke.com** usage statistics and includes:

- **Type frequency weights** - How often each typing appears in competitive play
- **Meta Pokemon examples** - Actual Pokemon used for each type combination
- **Updated regularly** to reflect current season meta shifts

### Data Files Structure

```
src/data/
├── great-league-weights.json    # Usage frequency by type (Great League)
├── great-league-pokemon.json    # Meta Pokemon lists (Great League)
├── ultra-league-weights.json    # Usage frequency by type (Ultra League)
├── ultra-league-pokemon.json    # Meta Pokemon lists (Ultra League)
├── master-league-weights.json   # Usage frequency by type (Master League)
└── master-league-pokemon.json   # Meta Pokemon lists (Master League)
```

**Weight format:**
```json
{
  "Ghost": 15.6,
  "Bug/Steel": 15.2,
  "Water": 11.8
}
```

**Pokemon format:**
```json
{
  "Ghost": ["Dusclops", "Froslass", "Spiritomb"],
  "Bug/Steel": ["Forretress", "Scizor", "Escavalier"]
}
```

## 🔄 Updating Meta Data

Meta updates happen when PvPoke.com data significantly changes (new seasons, major balance updates):

1. **Extract data** from PvPoke.com usage stats
2. **Parse into JSON format** using proper type naming conventions
3. **Update appropriate league files** in `src/data/`
4. **Build and deploy**:
   ```bash
   npm run build
   git add .
   git commit -m "Update meta data for Season X"
   git push origin main
   ```

## 🛠️ Development & Deployment

Built with modern web technologies for fast, responsive performance:

```bash
# Install dependencies
npm install

# Run development server  
npm run dev

# Build for production
npm run build

# Deploy automatically via GitHub Pages
git push origin main
```

**Tech Stack:**
- **React 18** + **TypeScript** - Type-safe component framework
- **Vite** - Lightning-fast build tool and dev server  
- **Tailwind CSS** - Utility-first styling with custom Pokemon GO theme
- **GitHub Pages** - Automatic deployment on push to main

## 🎯 Key Improvements

Recent updates have addressed common user pain points:

- **Timer auto-timeout** - No more stuck timers, automatically submits incorrect answer
- **Desktop scrolling eliminated** - Entire interface fits on standard laptop screens
- **Complete Pokemon lists** - No more truncated lists with "x more..." 
- **Dual-type flexibility** - Both Dragon/Fire and Fire/Dragon find the same data
- **Enhanced mobile experience** - Optimized touch targets and responsive design

## 🤝 Contributing Meta Updates

To contribute updated meta data:

1. **Fork this repository**
2. **Gather current data** from PvPoke.com usage statistics
3. **Update relevant JSON files** following existing format conventions
4. **Test locally** to ensure proper functionality
5. **Submit pull request** with:
   - Source: PvPoke.com usage data
   - Date/season of data
   - League(s) updated
   - Brief summary of meta changes

**Note**: Only submit data based on actual PvPoke.com statistics, not personal opinions or other sources.

## 📱 Progressive Web App

The app includes PWA features for better mobile experience:

- **Add to home screen** support with custom icon
- **Offline functionality** once loaded
- **App-like experience** with full-screen mode
- **Custom app title** shows as "PVP Type Trainer" in bookmarks

## 🎨 Design Philosophy

**Mobile-first approach** with desktop enhancements:
- Touch-friendly interface optimized for phone use
- Desktop version eliminates scrolling during battles
- Pokemon GO color scheme (blue/yellow/purple leagues)
- Smooth animations without sacrificing performance
- Clear visual feedback for all interactions

---

**Master type effectiveness, dominate PvP battles!** ⚔️

*Data sourced from PvPoke.com • Built for the Pokemon GO competitive community*