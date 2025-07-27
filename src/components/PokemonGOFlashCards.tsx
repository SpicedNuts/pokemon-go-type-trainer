import { useState, useEffect, useCallback } from 'react';

// Import data files
import greatLeagueWeights from '../data/great-league-weights.json';
import greatLeaguePokemon from '../data/great-league-pokemon.json';
import ultraLeagueWeights from '../data/ultra-league-weights.json';
import ultraLeaguePokemon from '../data/ultra-league-pokemon.json';
import masterLeagueWeights from '../data/master-league-weights.json';
import masterLeaguePokemon from '../data/master-league-pokemon.json';

// Type definitions
type PokemonType = 'Normal' | 'Fire' | 'Water' | 'Electric' | 'Grass' | 'Ice' | 'Fighting' | 'Poison' | 'Ground' | 'Flying' | 'Psychic' | 'Bug' | 'Rock' | 'Ghost' | 'Dragon' | 'Dark' | 'Steel' | 'Fairy';

type TypeChart = {
  [key in PokemonType]: {
    [key in PokemonType]: number;
  };
};

type TypeColors = {
  [key in PokemonType]: string;
};

type LeagueData = {
  [key: string]: number;
};

type PokemonData = {
  [key: string]: string[];
};

const typeChart: TypeChart = {
  'Bug': { 'Bug': 1.0, 'Dark': 1.6, 'Dragon': 1.0, 'Electric': 1.0, 'Fairy': 0.625, 'Fighting': 0.625, 'Fire': 0.625, 'Flying': 0.625, 'Ghost': 0.625, 'Grass': 1.6, 'Ground': 1.0, 'Ice': 1.0, 'Normal': 1.0, 'Poison': 0.625, 'Psychic': 1.6, 'Rock': 1.0, 'Steel': 0.625, 'Water': 1.0 },
  'Dark': { 'Bug': 1.0, 'Dark': 0.625, 'Dragon': 1.0, 'Electric': 1.0, 'Fairy': 0.625, 'Fighting': 0.625, 'Fire': 1.0, 'Flying': 1.0, 'Ghost': 1.6, 'Grass': 1.0, 'Ground': 1.0, 'Ice': 1.0, 'Normal': 1.0, 'Poison': 1.0, 'Psychic': 1.6, 'Rock': 1.0, 'Steel': 1.0, 'Water': 1.0 },
  'Dragon': { 'Bug': 1.0, 'Dark': 1.0, 'Dragon': 1.6, 'Electric': 1.0, 'Fairy': 0.391, 'Fighting': 1.0, 'Fire': 1.0, 'Flying': 1.0, 'Ghost': 1.0, 'Grass': 1.0, 'Ground': 1.0, 'Ice': 1.0, 'Normal': 1.0, 'Poison': 1.0, 'Psychic': 1.0, 'Rock': 1.0, 'Steel': 0.625, 'Water': 1.0 },
  'Electric': { 'Bug': 1.0, 'Dark': 1.0, 'Dragon': 0.625, 'Electric': 0.625, 'Fairy': 1.0, 'Fighting': 1.0, 'Fire': 1.0, 'Flying': 1.6, 'Ghost': 1.0, 'Grass': 0.625, 'Ground': 0.391, 'Ice': 1.0, 'Normal': 1.0, 'Poison': 1.0, 'Psychic': 1.0, 'Rock': 1.0, 'Steel': 1.0, 'Water': 1.6 },
  'Fairy': { 'Bug': 1.0, 'Dark': 1.6, 'Dragon': 1.6, 'Electric': 1.0, 'Fairy': 1.0, 'Fighting': 1.6, 'Fire': 0.625, 'Flying': 1.0, 'Ghost': 1.0, 'Grass': 1.0, 'Ground': 1.0, 'Ice': 1.0, 'Normal': 1.0, 'Poison': 0.625, 'Psychic': 1.0, 'Rock': 1.0, 'Steel': 0.625, 'Water': 1.0 },
  'Fighting': { 'Bug': 0.625, 'Dark': 1.6, 'Dragon': 1.0, 'Electric': 1.0, 'Fairy': 0.625, 'Fighting': 1.0, 'Fire': 1.0, 'Flying': 0.625, 'Ghost': 0.391, 'Grass': 1.0, 'Ground': 1.0, 'Ice': 1.6, 'Normal': 1.6, 'Poison': 0.625, 'Psychic': 0.625, 'Rock': 1.6, 'Steel': 1.6, 'Water': 1.0 },
  'Fire': { 'Bug': 1.6, 'Dark': 1.0, 'Dragon': 0.625, 'Electric': 1.0, 'Fairy': 1.0, 'Fighting': 1.0, 'Fire': 0.625, 'Flying': 1.0, 'Ghost': 1.0, 'Grass': 1.6, 'Ground': 1.0, 'Ice': 1.6, 'Normal': 1.0, 'Poison': 1.0, 'Psychic': 1.0, 'Rock': 0.625, 'Steel': 1.6, 'Water': 0.625 },
  'Flying': { 'Bug': 1.6, 'Dark': 1.0, 'Dragon': 1.0, 'Electric': 0.625, 'Fairy': 1.0, 'Fighting': 1.6, 'Fire': 1.0, 'Flying': 1.0, 'Ghost': 1.0, 'Grass': 1.6, 'Ground': 1.0, 'Ice': 1.0, 'Normal': 1.0, 'Poison': 1.0, 'Psychic': 1.0, 'Rock': 0.625, 'Steel': 0.625, 'Water': 1.0 },
  'Ghost': { 'Bug': 1.0, 'Dark': 0.625, 'Dragon': 1.0, 'Electric': 1.0, 'Fairy': 1.0, 'Fighting': 1.0, 'Fire': 1.0, 'Flying': 1.0, 'Ghost': 1.6, 'Grass': 1.0, 'Ground': 1.0, 'Ice': 1.0, 'Normal': 0.391, 'Poison': 1.0, 'Psychic': 1.6, 'Rock': 1.0, 'Steel': 1.0, 'Water': 1.0 },
  'Grass': { 'Bug': 0.625, 'Dark': 1.0, 'Dragon': 0.625, 'Electric': 1.0, 'Fairy': 1.0, 'Fighting': 1.0, 'Fire': 0.625, 'Flying': 0.625, 'Ghost': 1.0, 'Grass': 0.625, 'Ground': 1.6, 'Ice': 1.0, 'Normal': 1.0, 'Poison': 0.625, 'Psychic': 1.0, 'Rock': 1.6, 'Steel': 0.625, 'Water': 1.6 },
  'Ground': { 'Bug': 0.625, 'Dark': 1.0, 'Dragon': 1.0, 'Electric': 1.6, 'Fairy': 1.0, 'Fighting': 1.0, 'Fire': 1.6, 'Flying': 0.391, 'Ghost': 1.0, 'Grass': 0.625, 'Ground': 1.0, 'Ice': 1.0, 'Normal': 1.0, 'Poison': 1.6, 'Psychic': 1.0, 'Rock': 1.6, 'Steel': 1.6, 'Water': 1.0 },
  'Ice': { 'Bug': 1.0, 'Dark': 1.0, 'Dragon': 1.6, 'Electric': 1.0, 'Fairy': 1.0, 'Fighting': 1.0, 'Fire': 0.625, 'Flying': 1.6, 'Ghost': 1.0, 'Grass': 1.6, 'Ground': 1.6, 'Ice': 0.625, 'Normal': 1.0, 'Poison': 1.0, 'Psychic': 1.0, 'Rock': 1.0, 'Steel': 0.625, 'Water': 0.625 },
  'Normal': { 'Bug': 1.0, 'Dark': 1.0, 'Dragon': 1.0, 'Electric': 1.0, 'Fairy': 1.0, 'Fighting': 1.0, 'Fire': 1.0, 'Flying': 1.0, 'Ghost': 0.391, 'Grass': 1.0, 'Ground': 1.0, 'Ice': 1.0, 'Normal': 1.0, 'Poison': 1.0, 'Psychic': 1.0, 'Rock': 0.625, 'Steel': 0.625, 'Water': 1.0 },
  'Poison': { 'Bug': 1.0, 'Dark': 1.0, 'Dragon': 1.0, 'Electric': 1.0, 'Fairy': 1.6, 'Fighting': 1.0, 'Fire': 1.0, 'Flying': 1.0, 'Ghost': 0.625, 'Grass': 1.6, 'Ground': 0.625, 'Ice': 1.0, 'Normal': 1.0, 'Poison': 0.625, 'Psychic': 1.0, 'Rock': 0.625, 'Steel': 0.391, 'Water': 1.0 },
  'Psychic': { 'Bug': 1.0, 'Dark': 0.391, 'Dragon': 1.0, 'Electric': 1.0, 'Fairy': 1.0, 'Fighting': 1.6, 'Fire': 1.0, 'Flying': 1.0, 'Ghost': 1.0, 'Grass': 1.0, 'Ground': 1.0, 'Ice': 1.0, 'Normal': 1.0, 'Poison': 1.6, 'Psychic': 0.625, 'Rock': 1.0, 'Steel': 0.625, 'Water': 1.0 },
  'Rock': { 'Bug': 1.6, 'Dark': 1.0, 'Dragon': 1.0, 'Electric': 1.0, 'Fairy': 1.0, 'Fighting': 0.625, 'Fire': 1.6, 'Flying': 1.6, 'Ghost': 1.0, 'Grass': 1.0, 'Ground': 0.625, 'Ice': 1.6, 'Normal': 1.0, 'Poison': 1.0, 'Psychic': 1.0, 'Rock': 1.0, 'Steel': 0.625, 'Water': 1.0 },
  'Steel': { 'Bug': 1.0, 'Dark': 1.0, 'Dragon': 1.0, 'Electric': 0.625, 'Fairy': 1.6, 'Fighting': 1.0, 'Fire': 0.625, 'Flying': 1.0, 'Ghost': 1.0, 'Grass': 1.0, 'Ground': 1.0, 'Ice': 1.6, 'Normal': 1.0, 'Poison': 1.0, 'Psychic': 1.0, 'Rock': 1.6, 'Steel': 0.625, 'Water': 0.625 },
  'Water': { 'Bug': 1.0, 'Dark': 1.0, 'Dragon': 0.625, 'Electric': 1.0, 'Fairy': 1.0, 'Fighting': 1.0, 'Fire': 1.6, 'Flying': 1.0, 'Ghost': 1.0, 'Grass': 0.625, 'Ground': 1.6, 'Ice': 1.0, 'Normal': 1.0, 'Poison': 1.0, 'Psychic': 1.0, 'Rock': 1.6, 'Steel': 1.0, 'Water': 0.625 }
};

const typeColors: TypeColors = {
  Normal: '#A8A878', Fire: '#F08030', Water: '#6890F0', Electric: '#F8D030',
  Grass: '#78C850', Ice: '#98D8D8', Fighting: '#C03028', Poison: '#A040A0',
  Ground: '#E0C068', Flying: '#A890F0', Psychic: '#F85888', Bug: '#A8B820',
  Rock: '#B8A038', Ghost: '#705898', Dragon: '#7038F8', Dark: '#705848',
  Steel: '#B8B8D0', Fairy: '#EE99AC'
};

const allTypes: PokemonType[] = ['Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'];

// Data mapping for easy access
const leagueWeights = {
  great: greatLeagueWeights as LeagueData,
  ultra: ultraLeagueWeights as LeagueData,
  master: masterLeagueWeights as LeagueData
};

const leaguePokemon = {
  great: greatLeaguePokemon as PokemonData,
  ultra: ultraLeaguePokemon as PokemonData,
  master: masterLeaguePokemon as PokemonData
};

function analyzeMatchup(yourTypes: string[], opponentTypes: string[]) {
  const yourTypeArray = Array.isArray(yourTypes) ? yourTypes : [yourTypes];
  const opponentTypeArray = Array.isArray(opponentTypes) ? opponentTypes : [opponentTypes];
  
  let bestOffense = 0;
  for (const yourType of yourTypeArray) {
    let multiplier = 1.0;
    for (const oppType of opponentTypeArray) {
      const typeChartEntry = (typeChart as any)[yourType];
      if (typeChartEntry) {
        multiplier *= typeChartEntry[oppType] || 1.0;
      }
    }
    bestOffense = Math.max(bestOffense, multiplier);
  }
  
  let worstDefense = 0;
  for (const oppType of opponentTypeArray) {
    let multiplier = 1.0;
    for (const yourType of yourTypeArray) {
      const typeChartEntry = (typeChart as any)[oppType];
      if (typeChartEntry) {
        multiplier *= typeChartEntry[yourType] || 1.0;
      }
    }
    worstDefense = Math.max(worstDefense, multiplier);
  }
  
  if (bestOffense > worstDefense) return 'winning';
  if (bestOffense < worstDefense) return 'losing';
  return 'neutral';
}

function getRandomOpponentType(weights: LeagueData, excludeList: string[] = []) {
  const availableTypes = Object.entries(weights).filter(([type]) => !excludeList.includes(type));
  if (availableTypes.length === 0) return null;
  
  const totalWeight = availableTypes.reduce((sum, [, weight]) => sum + weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const [type, weight] of availableTypes) {
    random -= weight;
    if (random <= 0) {
      return type;
    }
  }
  
  return availableTypes[0][0];
}

function getRandomCombination(excludeList: string[] = []) {
  const hasDualType = Math.random() < 0.6;
  let attempts = 0;
  let result;
  
  do {
    if (hasDualType) {
      const type1 = allTypes[Math.floor(Math.random() * allTypes.length)];
      let type2 = allTypes[Math.floor(Math.random() * allTypes.length)];
      while (type2 === type1) {
        type2 = allTypes[Math.floor(Math.random() * allTypes.length)];
      }
      result = `${type1}/${type2}`;
    } else {
      result = allTypes[Math.floor(Math.random() * allTypes.length)];
    }
    attempts++;
  } while (excludeList.includes(result) && attempts < 50);
  
  return excludeList.includes(result) ? null : result;
}

const TypeBadge = ({ type, small = false, selected = false, onClick = null }: {
  type: string;
  small?: boolean;
  selected?: boolean;
  onClick?: (() => void) | null;
}) => {
  const size = small ? 'px-2 py-1 text-xs' : 'px-4 py-3 text-sm';
  const cursor = onClick ? 'cursor-pointer' : '';
  const border = selected ? 'ring-4 ring-yellow-400 ring-opacity-70' : '';
  const shadow = selected ? 'shadow-xl' : 'shadow-lg';
  
  return (
    <span 
      className={`${size} ${cursor} ${border} ${shadow} rounded-xl font-bold text-white transition-all transform hover:scale-105`}
      style={{ backgroundColor: (typeColors as any)[type] || '#68D391' }}
      onClick={onClick || undefined}
    >
      {type}
    </span>
  );
};

export default function PokemonGOFlashCards() {
  const [gameState, setGameState] = useState('setup');
  const [league, setLeague] = useState<'great' | 'ultra' | 'master'>('great');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [practiceMode, setPracticeMode] = useState<'meta' | 'random'>('meta');
  const [sessionLength, setSessionLength] = useState(15);
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [preventRepeats, setPreventRepeats] = useState(false);
  
  const [currentCard, setCurrentCard] = useState(1);
  const [opponentType, setOpponentType] = useState('');
  const [timeLeft, setTimeLeft] = useState(5);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [usedOpponents, setUsedOpponents] = useState<string[]>([]);

  const handleTypeSelection = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else if (selectedTypes.length < 2) {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const getYourTypesCombination = () => {
    if (selectedTypes.length === 0) return '';
    if (selectedTypes.length === 1) return selectedTypes[0];
    return selectedTypes.join('/');
  };

  const getMetaPokemon = (typeCombo: string, currentLeague: 'great' | 'ultra' | 'master') => {
    const pokemonData = leaguePokemon[currentLeague];
    return pokemonData[typeCombo] || [];
  };

  const generateOpponent = useCallback(() => {
    const excludeList = preventRepeats ? usedOpponents : [];
    
    if (practiceMode === 'meta') {
      const weights = leagueWeights[league];
      return getRandomOpponentType(weights, excludeList);
    } else {
      return getRandomCombination(excludeList);
    }
  }, [league, practiceMode, preventRepeats, usedOpponents]);

  const startSession = () => {
    if (selectedTypes.length === 0) return;
    
    setGameState('playing');
    setCurrentCard(1);
    setScore({ correct: 0, total: 0 });
    setStreak(0);
    setShowAnswer(false);
    setUsedOpponents([]);
    
    const opponent = generateOpponent();
    if (!opponent) return;
    
    setOpponentType(opponent);
    setUsedOpponents([opponent]);
    
    const yourTypes = selectedTypes;
    const oppTypes = opponent.includes('/') ? opponent.split('/') : [opponent];
    setCorrectAnswer(analyzeMatchup(yourTypes, oppTypes));
    
    if (timerEnabled) {
      setTimeLeft(5);
    }
  };

  const handleAnswer = (answer: string) => {
    if (showAnswer) return;
    
    setUserAnswer(answer);
    setShowAnswer(true);
    
    const isCorrect = answer === correctAnswer;
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));
    
    if (isCorrect) {
      setStreak(prev => {
        const newStreak = prev + 1;
        setBestStreak(current => Math.max(current, newStreak));
        return newStreak;
      });
    } else {
      setStreak(0);
    }
  };

  const nextCard = () => {
    if (currentCard >= sessionLength) {
      setGameState('finished');
      return;
    }
    
    const opponent = generateOpponent();
    if (!opponent) {
      setGameState('finished');
      return;
    }
    
    setCurrentCard(prev => prev + 1);
    setShowAnswer(false);
    setUserAnswer('');
    setOpponentType(opponent);
    setUsedOpponents(prev => [...prev, opponent]);
    
    const yourTypes = selectedTypes;
    const oppTypes = opponent.includes('/') ? opponent.split('/') : [opponent];
    setCorrectAnswer(analyzeMatchup(yourTypes, oppTypes));
    
    if (timerEnabled) {
      setTimeLeft(5);
    }
  };

  const restartSession = () => {
    setGameState('setup');
    setCurrentCard(1);
    setScore({ correct: 0, total: 0 });
    setStreak(0);
    setShowAnswer(false);
    setUserAnswer('');
    setUsedOpponents([]);
  };

  const getDetailedExplanation = () => {
    const yourTypes = selectedTypes;
    const oppTypes = opponentType.includes('/') ? opponentType.split('/') : [opponentType];
    
    let explanation = '--- YOUR OFFENSE ---\n';
    
    for (const yourType of yourTypes) {
      let multiplier = 1.0;
      for (const oppType of oppTypes) {
        const typeChartEntry = (typeChart as any)[yourType];
        if (typeChartEntry) {
          multiplier *= typeChartEntry[oppType] || 1.0;
        }
      }
      explanation += `${yourType}`;
      if (oppTypes.length > 1) {
        explanation += ` vs ${oppTypes.join('/')} = ${oppTypes.map(t => {
          const entry = (typeChart as any)[yourType];
          return `${entry ? entry[t] || 1.0 : 1.0}x`;
        }).join(' × ')} = ${multiplier.toFixed(3)}x\n`;
      } else {
        explanation += ` vs ${oppTypes[0]} = ${multiplier.toFixed(3)}x\n`;
      }
    }
    
    explanation += '\n--- OPPONENT OFFENSE ---\n';
    
    for (const oppType of oppTypes) {
      let multiplier = 1.0;
      for (const yourType of yourTypes) {
        const typeChartEntry = (typeChart as any)[oppType];
        if (typeChartEntry) {
          multiplier *= typeChartEntry[yourType] || 1.0;
        }
      }
      explanation += `${oppType}`;
      if (yourTypes.length > 1) {
        explanation += ` vs ${yourTypes.join('/')} = ${yourTypes.map(t => {
          const entry = (typeChart as any)[oppType];
          return `${entry ? entry[t] || 1.0 : 1.0}x`;
        }).join(' × ')} = ${multiplier.toFixed(3)}x\n`;
      } else {
        explanation += ` vs ${yourTypes[0]} = ${multiplier.toFixed(3)}x\n`;
      }
    }

    const relevantPokemon = getMetaPokemon(opponentType, league);
    if (relevantPokemon && relevantPokemon.length > 0) {
      explanation += `\n--- META ${opponentType.toUpperCase()} POKEMON ---\n`;
      explanation += relevantPokemon.slice(0, 15).join(', ');
      if (relevantPokemon.length > 15) {
        explanation += ` + ${relevantPokemon.length - 15} more...`;
      }
    }

    const weights = leagueWeights[league];
    const weight = weights[opponentType];
    if (weight) {
      explanation += `\n\n--- META FREQUENCY ---\n`;
      explanation += `Weight: ${weight}x (${weight > 10 ? 'Very Common' : weight > 5 ? 'Common' : weight > 2 ? 'Uncommon' : 'Rare'})`;
    }
    
    return explanation;
  };

  useEffect(() => {
    if (gameState === 'playing' && timerEnabled && !showAnswer && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [gameState, timerEnabled, showAnswer, timeLeft]);

  if (gameState === 'setup') {
    const yourTypeCombo = getYourTypesCombination();
    const yourMetaPokemon = yourTypeCombo ? getMetaPokemon(yourTypeCombo, league) : [];

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full px-8 py-4 inline-block mb-4 shadow-2xl">
              <h1 className="text-4xl font-black text-blue-900 tracking-wide">
                ⚔️ PvP TYPE TRAINER ⚔️
              </h1>
            </div>
            <div className="text-yellow-300 font-bold text-lg">
              Master type effectiveness for competitive Pokémon GO battles!
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-800 to-purple-900 rounded-3xl shadow-2xl p-8 border-4 border-yellow-400">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-yellow-300 text-center">🏆 Choose Your League 🏆</h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: 'great' as const, label: 'Great League', color: 'from-blue-500 to-blue-700', icon: '🥉' },
                    { value: 'ultra' as const, label: 'Ultra League', color: 'from-yellow-500 to-yellow-600', icon: '🥈' },
                    { value: 'master' as const, label: 'Master League', color: 'from-purple-500 to-purple-700', icon: '🥇' }
                  ].map(({ value, label, color, icon }) => (
                    <button
                      key={value}
                      onClick={() => setLeague(value)}
                      className={`p-4 rounded-2xl font-bold text-white text-lg transition-all transform hover:scale-105 shadow-xl ${
                        league === value 
                          ? `bg-gradient-to-r ${color} scale-110 ring-4 ring-white ring-opacity-50` 
                          : 'bg-gray-600 hover:bg-gray-500'
                      }`}
                    >
                      <div className="text-2xl mb-1">{icon}</div>
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4 text-yellow-300 text-center">
                  🔥 Select Your Pokémon Types ({selectedTypes.length}/2) 🔥
                </h3>
                <div className="grid grid-cols-6 md:grid-cols-9 gap-3">
                  {allTypes.map(type => (
                    <TypeBadge
                      key={type}
                      type={type}
                      selected={selectedTypes.includes(type)}
                      onClick={() => handleTypeSelection(type)}
                    />
                  ))}
                </div>
                <div className="text-center mt-3 text-yellow-200 text-sm">
                  Click up to 2 types • Single-type Pokémon use 1 type • Dual-type use 2 types
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4 text-yellow-300 text-center">⚡ Training Mode ⚡</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setPracticeMode('meta')}
                    className={`p-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 ${
                      practiceMode === 'meta' 
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white scale-105 shadow-xl' 
                        : 'bg-gray-300 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    🎯 Meta-Weighted
                    <div className="text-sm opacity-90 mt-1">Real battle frequency</div>
                  </button>
                  <button
                    onClick={() => setPracticeMode('random')}
                    className={`p-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 ${
                      practiceMode === 'random' 
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white scale-105 shadow-xl' 
                        : 'bg-gray-300 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    🎲 Random Mix
                    <div className="text-sm opacity-90 mt-1">All combinations</div>
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4 text-yellow-300 text-center">⚙️ Battle Settings ⚙️</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-yellow-200 font-semibold mb-2">Cards per Session</label>
                    <select
                      value={sessionLength}
                      onChange={(e) => setSessionLength(Number(e.target.value))}
                      className="w-full p-3 bg-white border-2 border-yellow-400 rounded-xl focus:ring-2 focus:ring-yellow-300 font-semibold text-gray-700"
                    >
                      <option value={10}>⚡ Quick (10 Cards)</option>
                      <option value={15}>🔥 Standard (15 Cards)</option>
                      <option value={20}>💪 Extended (20 Cards)</option>
                      <option value={30}>🏆 Marathon (30 Cards)</option>
                    </select>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="timer"
                        checked={timerEnabled}
                        onChange={(e) => setTimerEnabled(e.target.checked)}
                        className="w-5 h-5 text-yellow-500 rounded focus:ring-yellow-400"
                      />
                      <label htmlFor="timer" className="text-yellow-200 font-semibold">
                        ⏱️ 5-second timer
                      </label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="preventRepeats"
                        checked={preventRepeats}
                        onChange={(e) => setPreventRepeats(e.target.checked)}
                        className="w-5 h-5 text-yellow-500 rounded focus:ring-yellow-400"
                      />
                      <label htmlFor="preventRepeats" className="text-yellow-200 font-semibold">
                        🚫 No repeats
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {selectedTypes.length > 0 && (
                <div className="bg-gradient-to-r from-green-800 to-blue-800 rounded-2xl p-6 border-2 border-green-400">
                  <h4 className="text-xl font-bold mb-3 text-green-200">🌟 Your Pokémon:</h4>
                  <div className="flex gap-3 mb-4">
                    {selectedTypes.map(type => (
                      <TypeBadge key={type} type={type} />
                    ))}
                  </div>
                  {yourMetaPokemon.length > 0 && (
                    <div>
                      <div className="text-green-200 font-semibold mb-2">Meta Pokémon with this typing:</div>
                      <div className="text-green-100 text-sm">
                        {yourMetaPokemon.slice(0, 8).join(', ')}
                        {yourMetaPokemon.length > 8 && ` + ${yourMetaPokemon.length - 8} more...`}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={startSession}
                disabled={selectedTypes.length === 0}
                className="w-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 text-white font-black py-6 px-8 rounded-2xl text-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:from-green-400 hover:via-yellow-400 hover:to-red-400 transition-all transform hover:scale-105 shadow-2xl border-4 border-white"
              >
                {selectedTypes.length === 0 ? '⚠️ SELECT YOUR TYPES FIRST ⚠️' : '🚀 START BATTLE TRAINING! 🚀'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'playing') {
    const yourTypes = selectedTypes;
    const oppTypes = opponentType.includes('/') ? opponentType.split('/') : [opponentType];
    const accuracy = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl shadow-2xl p-6 mb-6 border-4 border-white">
            <div className="flex justify-between items-center">
              <div className="flex space-x-8">
                <div className="text-center">
                  <div className="text-3xl font-black text-blue-900">{accuracy}%</div>
                  <div className="text-sm font-bold text-blue-800">ACCURACY</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-blue-900">{streak}</div>
                  <div className="text-sm font-bold text-blue-800">STREAK</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-blue-900">{score.correct}/{score.total}</div>
                  <div className="text-sm font-bold text-blue-800">SCORE</div>
                </div>
              </div>
              
              <button
                onClick={restartSession}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg"
              >
                🏃 QUIT
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 mb-6 shadow-xl border-2 border-yellow-400">
            <div className="flex justify-between text-sm font-bold text-gray-700 mb-2">
              <span>⚔️ Battle {currentCard} of {sessionLength}</span>
              {timerEnabled && !showAnswer && (
                <span className={`font-black text-lg ${timeLeft <= 2 ? 'text-red-500 animate-pulse' : 'text-blue-500'}`}>
                  ⏱️ {timeLeft}s
                </span>
              )}
            </div>
            <div className="w-full bg-gray-300 rounded-full h-4 border-2 border-gray-400">
              <div 
                className="bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${(currentCard / sessionLength) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-800 to-purple-900 rounded-3xl shadow-2xl p-8 border-4 border-yellow-400">
            {!showAnswer ? (
              <div className="text-center">
                <h2 className="text-3xl font-black mb-8 text-yellow-300">⚡ TYPE MATCHUP BATTLE! ⚡</h2>
                
                <div className="flex items-center justify-center space-x-12 mb-12">
                  <div className="text-center bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl p-6 border-4 border-white shadow-xl">
                    <div className="text-xl font-bold mb-4 text-white">🌟 YOUR POKÉMON</div>
                    <div className="flex flex-col gap-3">
                      {yourTypes.map(type => (
                        <TypeBadge key={type} type={type} />
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-6xl font-black text-yellow-300 animate-pulse">⚔️</div>
                  
                  <div className="text-center bg-gradient-to-br from-red-600 to-purple-600 rounded-2xl p-6 border-4 border-white shadow-xl">
                    <div className="text-xl font-bold mb-4 text-white">👾 OPPONENT</div>
                    <div className="flex flex-col gap-3">
                      {oppTypes.map(type => (
                        <TypeBadge key={type} type={type} />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
                  <button
                    onClick={() => handleAnswer('winning')}
                    className="bg-gradient-to-br from-green-500 to-green-700 hover:from-green-400 hover:to-green-600 text-white font-black py-8 px-6 rounded-2xl text-xl transition-all transform hover:scale-110 shadow-2xl border-4 border-white"
                  >
                    <div className="text-3xl mb-2">🟢</div>
                    <div>WINNING</div>
                  </button>
                  <button
                    onClick={() => handleAnswer('neutral')}
                    className="bg-gradient-to-br from-yellow-500 to-yellow-700 hover:from-yellow-400 hover:to-yellow-600 text-white font-black py-8 px-6 rounded-2xl text-xl transition-all transform hover:scale-110 shadow-2xl border-4 border-white"
                  >
                    <div className="text-3xl mb-2">🟡</div>
                    <div>NEUTRAL</div>
                  </button>
                  <button
                    onClick={() => handleAnswer('losing')}
                    className="bg-gradient-to-br from-red-500 to-red-700 hover:from-red-400 hover:to-red-600 text-white font-black py-8 px-6 rounded-2xl text-xl transition-all transform hover:scale-110 shadow-2xl border-4 border-white"
                  >
                    <div className="text-3xl mb-2">🔴</div>
                    <div>LOSING</div>
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <h2 className="text-3xl font-black mb-6 text-white">
                  {userAnswer === correctAnswer ? (
                    <span className="text-green-400">🎉 CORRECT! 🎉</span>
                  ) : (
                    <span className="text-red-400">💥 INCORRECT! 💥</span>
                  )}
                </h2>
                
                <div className="text-xl mb-6 text-yellow-300">
                  <span>Correct answer: </span>
                  <span className={`font-black text-2xl ${
                    correctAnswer === 'winning' ? 'text-green-400' : 
                    correctAnswer === 'neutral' ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {correctAnswer === 'winning' ? '🟢 WINNING' : 
                     correctAnswer === 'neutral' ? '🟡 NEUTRAL' : '🔴 LOSING'}
                  </span>
                </div>

                <div className="bg-gray-900 bg-opacity-80 rounded-2xl p-6 mb-8 text-left border-2 border-yellow-400">
                  <h4 className="font-black mb-4 text-yellow-300 text-xl">📊 BATTLE ANALYSIS:</h4>
                  <pre className="whitespace-pre-wrap text-sm text-gray-200 font-mono leading-relaxed">
                    {getDetailedExplanation()}
                  </pre>
                </div>

                <button
                  onClick={nextCard}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-black py-4 px-8 rounded-2xl text-xl transition-all transform hover:scale-105 shadow-2xl border-4 border-white"
                >
                  {currentCard >= sessionLength ? '🏆 FINISH SESSION!' : '⚡ NEXT BATTLE!'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'finished') {
    const accuracy = Math.round((score.correct / score.total) * 100);
    const grade = accuracy >= 90 ? 'S' : accuracy >= 80 ? 'A' : accuracy >= 70 ? 'B' : accuracy >= 60 ? 'C' : 'D';
    const gradeColor = grade === 'S' ? 'text-yellow-400' : grade === 'A' ? 'text-green-400' : grade === 'B' ? 'text-blue-400' : grade === 'C' ? 'text-orange-400' : 'text-red-400';
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-blue-800 to-purple-900 rounded-3xl shadow-2xl p-8 text-center border-4 border-yellow-400">
            <div className="text-6xl mb-4">🏆</div>
            <h1 className="text-4xl font-black mb-8 text-yellow-300">TRAINING COMPLETE!</h1>
            
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 border-4 border-white">
                <div className="text-5xl font-black text-white mb-2">{accuracy}%</div>
                <div className="text-gray-200 mb-2">Final Accuracy</div>
                <div className={`text-3xl font-black ${gradeColor}`}>Grade: {grade}</div>
              </div>
              
              <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-2xl p-6 border-4 border-white">
                <div className="text-5xl font-black text-white mb-2">{bestStreak}</div>
                <div className="text-gray-200 mb-2">Best Streak</div>
                <div className="text-lg text-green-200">{score.correct}/{score.total} Correct</div>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={startSession}
                className="w-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 text-white font-black py-4 px-6 rounded-2xl text-xl hover:from-green-400 hover:via-yellow-400 hover:to-red-400 transition-all transform hover:scale-105 shadow-2xl border-4 border-white"
              >
                🔥 TRAIN AGAIN! 🔥
              </button>
              
              <button
                onClick={restartSession}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 px-6 rounded-2xl text-lg transition-all border-2 border-gray-500"
              >
                ⚙️ Change Settings
              </button>
            </div>

            {accuracy < 70 && (
              <div className="mt-6 p-4 bg-yellow-900 bg-opacity-60 rounded-xl border-2 border-yellow-600">
                <p className="text-yellow-300 font-bold text-lg">💡 Training Tip</p>
                <p className="text-yellow-200 text-sm">
                  Focus on the most common {league} league matchups first! 
                  {practiceMode === 'random' ? ' Try Meta-Weighted mode to practice real battles!' : ' Keep practicing those meta types!'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}