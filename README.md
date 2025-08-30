Pokemon GO PvP Type Trainer ⚔️
Interactive flashcard app for mastering type effectiveness in Pokemon GO PvP battles. Practice type matchups with real meta data from competitive play.

🎮 Play the App
✨ Features
🏆 All three leagues - Great League (CP 1500), Ultra League (CP 2500), and Master League
🎯 Meta-weighted training based on actual usage statistics from PvPoke.com
🎲 Random type combination practice for comprehensive coverage
⏱️ Optional 5-second timer for pressure training (auto-submits on timeout)
🚫 Prevent repeats option to avoid duplicate matchups in a session
🔄 Dual-type order recognition - Dragon/Fire and Fire/Dragon work the same
📊 Detailed battle analysis with complete Pokemon lists and meta frequency data
📱 Mobile-optimized interface with desktop support (no scrolling required)
🎨 Pokemon GO themed colors and smooth animations
🚀 How to Use
Choose your league (Great/Ultra/Master) with Pokemon GO themed colors
Select your Pokemon's types (single or dual-type combinations)
Pick training mode:
Meta-weighted: Practice against Pokemon you'll actually face in battles
Random: Cover all possible type combinations
Configure battle settings (session length 10-30 cards, timer on/off, prevent repeats)
Start training! Decide if your typing is winning, neutral, or losing against opponents
Review detailed analysis showing exact damage multipliers and meta Pokemon examples
📊 Current Meta Data
All meta data is sourced from PvPoke.com usage statistics and includes:

Type frequency weights - How often each typing appears in competitive play
Meta Pokemon examples - Actual Pokemon used for each type combination
Updated regularly to reflect current season meta shifts
Data Files Structure
src/data/
├── great-league-weights.json    # Usage frequency by type (Great League)
├── great-league-pokemon.json    # Meta Pokemon lists (Great League)
├── ultra-league-weights.json    # Usage frequency by type (Ultra League)
├── ultra-league-pokemon.json    # Meta Pokemon lists (Ultra League)
├── master-league-weights.json   # Usage frequency by type (Master League)
└── master-league-pokemon.json   # Meta Pokemon lists (Master League)
Weight format:

```json
{
  "Ghost": 15.6,
  "Bug/Steel": 15.2,
  "Water": 11.8
}
```

Pokemon format:

```json
{
  "Ghost": ["Dusclops", "Froslass", "Spiritomb"],
  "Bug/Steel": ["Forretress", "Scizor", "Escavalier"]
}
```

🔄 Updating Meta Data
Meta updates happen when PvPoke.com data significantly changes (new seasons, major balance updates):

1. Extract data from PvPoke.com usage stats
2. Parse into JSON format using proper type naming conventions
3. Update appropriate league files in `src/data/`
4. **Build and deploy** (both steps required for live site updates):

```bash
# Method 1: Deploy command (recommended - does both build and deploy)
npm run deploy

# Method 2: Manual build then push
npm run build
git add .
git commit -m "Update meta data for Season X"
git push origin main
npm run deploy
```

**Important:** Simply building (`npm run build`) or pushing to GitHub doesn't update the live website. You must run `npm run deploy` to publish changes to the live site.

🛠️ Development & Deployment
Built with modern web technologies for fast, responsive performance:

```bash
# Install dependencies
npm install

# Run development server  
npm run dev

# Build for production (compiles code, doesn't update live site)
npm run build

# Deploy to live website (builds + publishes to GitHub Pages)
npm run deploy
```

**Deployment Process:**
- `npm run dev` - Local development with hot reload
- `npm run build` - Creates production files in `dist/` folder
- `npm run deploy` - Publishes `dist/` to GitHub Pages (live website)

The deploy command automatically runs the build first, then publishes to the `gh-pages` branch which serves your live website.

Tech Stack:

- React 18 + TypeScript - Type-safe component framework
- Vite - Lightning-fast build tool and dev server  
- Tailwind CSS - Utility-first styling with custom Pokemon GO theme
- GitHub Pages - Automatic deployment via `gh-pages` package

🎯 Key Improvements
Recent updates have addressed common user pain points:

- Timer auto-timeout - No more stuck timers, automatically submits incorrect answer
- Desktop scrolling eliminated - Entire interface fits on standard laptop screens
- Complete Pokemon lists - No more truncated lists with "x more..."
- Dual-type flexibility - Both Dragon/Fire and Fire/Dragon find the same data
- Enhanced mobile experience - Optimized touch targets and responsive design

🤝 Contributing Meta Updates
To contribute updated meta data:

1. Fork this repository
2. Gather current data from PvPoke.com usage statistics  
3. Update relevant JSON files following existing format conventions
4. Test locally with `npm run dev` to ensure proper functionality
5. **Deploy your changes** with `npm run deploy`
6. Submit pull request with:
   - Source: PvPoke.com usage data
   - Date/season of data
   - League(s) updated  
   - Brief summary of meta changes

**Note:** Only submit data based on actual PvPoke.com statistics, not personal opinions or other sources.

📱 Progressive Web App
The app includes PWA features for better mobile experience:

- Add to home screen support with custom icon
- Offline functionality once loaded
- App-like experience with full-screen mode
- Custom app title shows as "PVP Type Trainer" in bookmarks

🎨 Design Philosophy
Mobile-first approach with desktop enhancements:

- Touch-friendly interface optimized for phone use
- Desktop version eliminates scrolling during battles
- Pokemon GO color scheme (blue/yellow/purple leagues)
- Smooth animations without sacrificing performance
- Clear visual feedback for all interactions

🙏 Credits
**Meta Data & Pokemon Rankings** - All competitive meta data sourced from PvPoke.com:
- Created and developed by Matt (KakunaMattata42/EmpoleonDynamite)
- Usage statistics, Pokemon rankings, and meta frequency weights
- The premier resource for Pokemon GO PvP analysis and battle simulations
- Support PvPoke: [Patreon](https://www.patreon.com/pvpoke) | [Discord](https://discord.gg/pvpoke) | [GitHub](https://github.com/pvpoke)

**Type Effectiveness Matrix** - Based on the dual-type effectiveness spreadsheet created by u/profaj on r/TheSilphRoad:
- [Updated type effectiveness chart w/ dual-types](https://www.reddit.com/r/TheSilphRoad/comments/8qvgus/updated_type_effectiveness_chart_w_dualtypes/)
- Original work using Gamepress numbers and u/zehipp0's template
- Adapted for Pokemon GO's specific type effectiveness multipliers (0.391x, 0.625x, 1.0x, 1.6x)

**Master type effectiveness, dominate PvP battles!** ⚔️

*Meta data from PvPoke.com • Type effectiveness from r/TheSilphRoad community • Built for the Pokemon GO competitive community*
