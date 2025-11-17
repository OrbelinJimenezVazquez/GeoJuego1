import { ITEMS, COUNTRIES, RELIEFS } from './countries.js';
import { rand, sample, shuffle, beep } from './utils.js';

export class Game {
  constructor() {
    this.TOTAL_ROUNDS = 10;
    this.state = {
      round: 0,
      score: 0,
      exp: 0,
      correct: 0,
      wrong: 0,
      streak: 0,
      maxStreak: 0,
      current: null,
      options: [],
      study: false
    };
  }

  startGame(totalRounds) {
    this.TOTAL_ROUNDS = totalRounds;
    this.reset(false);
    return `🎮 ¡Comienza! Rondas: ${totalRounds === ITEMS.length ? 'Banco completo' : totalRounds}`;
  }

  newRound() {
    this.state.round++;
    const progress = (this.state.round - 1) / Math.max(1, this.TOTAL_ROUNDS) * 100;
    const pool = Math.random() < 0.75 ? COUNTRIES : ITEMS; // prioriza países
    const item = pool[rand(pool.length)];
    
    this.state.current = item;
    
    if (item.type === 'relief') {
      this.state.options = this.generateReliefOptions(item);
    } else {
      this.state.options = this.generateCountryOptions(item);
    }
    
    return {
      progress,
      round: Math.min(this.state.round, this.TOTAL_ROUNDS),
      item,
      options: this.state.options
    };
  }

  generateReliefOptions(correctItem) {
    const opts = new Set([correctItem.label]);
    const distract = sample(RELIEFS.filter(r => r.id !== correctItem.id), 8);
    for (const d of distract) {
      if (opts.size >= 4) break;
      opts.add(d.label);
    }
    return shuffle([...opts]);
  }

  generateCountryOptions(correctItem) {
    const opts = new Set([correctItem.label]);
    const distract = sample(COUNTRIES.filter(c => c.id !== correctItem.id), 12);
    for (const d of distract) {
      if (opts.size >= 4) break;
      opts.add(d.label);
    }
    return shuffle([...opts]);
  }

  checkAnswer(selectedOption) {
    const correctLabel = this.state.current.label;
    const isCorrect = selectedOption === correctLabel;
    
    if (isCorrect) {
      this.state.correct++;
      this.state.streak++;
      this.state.maxStreak = Math.max(this.state.maxStreak, this.state.streak);
      const bonus = Math.min(15, 5 + Math.floor(this.state.streak / 2));
      this.state.score += 10 + bonus;
      this.state.exp += 12 + bonus;
      beep(true);
    } else {
      this.state.wrong++;
      this.state.streak = 0;
      this.state.score = Math.max(0, this.state.score - 5);
      beep(false);
    }
    
    return {
      isCorrect,
      correctLabel,
      bonus: isCorrect ? Math.min(15, 5 + Math.floor(this.state.streak / 2)) : 0,
      state: { ...this.state }
    };
  }

  endIfNeeded() {
    return this.state.round >= this.TOTAL_ROUNDS;
  }

  reset(showToast = true) {
    this.state = {
      round: 0,
      score: 0,
      exp: 0,
      correct: 0,
      wrong: 0,
      streak: 0,
      maxStreak: 0,
      current: null,
      options: [],
      study: false
    };
    
    return showToast ? '🔄 Juego reiniciado' : null;
  }

  toggleStudyMode() {
    this.state.study = !this.state.study;
    return this.state.study;
  }

  skipQuestion() {
    this.state.wrong++;
    this.state.streak = 0;
    return '⏭ Pregunta saltada';
  }

  getState() {
    return { ...this.state };
  }

  updateBestScore() {
    const best = Number(localStorage.getItem('geo_best') || 0);
    if (this.state.score > best) {
      localStorage.setItem('geo_best', String(this.state.score));
      return true;
    }
    return false;
  }
}