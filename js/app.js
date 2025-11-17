import { Game } from './game.js';
import { UI } from './ui.js';
import { ITEMS } from './countries.js';

class App {
  constructor() {
    this.game = new Game();
    this.ui = new UI();
    this.isGameActive = false;
    
    this.init();
  }

  init() {
    this.loadBestScore();
    this.setupEventListeners();
  }

  loadBestScore() {
    const best = Number(localStorage.getItem('geo_best') || 0);
    localStorage.setItem('geo_best', String(best));
    this.ui.updateHUD(this.game.getState());
  }

  setupEventListeners() {
    const { 
      btnStart, btnHint, btnSkip, btnReset, btnStudy, 
      toggleImages, roundsSelect 
    } = this.ui.elements;

    btnStart.onclick = () => this.startGame();
    btnHint.onclick = () => this.showHint();
    btnSkip.onclick = () => this.skipQuestion();
    btnReset.onclick = () => this.resetGame();
    btnStudy.onclick = () => this.toggleStudyMode();
    
    toggleImages.addEventListener('change', () => {
      if (this.game.state.current) {
        this.ui.setRefImage(this.game.state.current, toggleImages.checked);
      }
    });
  }

  startGame() {
    const roundsValue = this.ui.elements.roundsSelect.value;
    const totalRounds = roundsValue === 'all' ? ITEMS.length : parseInt(roundsValue, 10);
    
    const message = this.game.startGame(totalRounds);
    this.ui.showToast(message);
    this.isGameActive = true;
    
    this.nextRound();
  }

  nextRound() {
    if (!this.isGameActive) return;
    
    const roundData = this.game.newRound();
    this.ui.updateProgress(roundData.progress, roundData.round, this.game.TOTAL_ROUNDS);
    this.ui.renderFigure(roundData.item, this.game.state.study);
    this.ui.updateQuestion(roundData.item);
    this.ui.setRefImage(roundData.item, this.ui.elements.toggleImages.checked);
    this.ui.renderChoices(roundData.options, (option, button) => this.checkAnswer(option, button));
  }

  checkAnswer(option, button) {
    this.ui.disableChoices();
    
    const result = this.game.checkAnswer(option);
    this.ui.markChoice(button, result.isCorrect);
    
    if (!result.isCorrect) {
      this.ui.markCorrectChoice(result.correctLabel);
    }
    
    const message = result.isCorrect 
      ? `✔ ¡Correcto! +${10 + result.bonus} (Bono racha ${result.bonus})`
      : '✖ Incorrecto — −5 pts';
    
    this.ui.showToast(message);
    this.ui.updateHUD(result.state);
    
    setTimeout(() => {
      if (this.game.endIfNeeded()) {
        this.endGame();
      } else {
        this.nextRound();
      }
    }, 600);
  }

  endGame() {
    this.ui.updateProgress(100, this.game.TOTAL_ROUNDS, this.game.TOTAL_ROUNDS);
    
    const newRecord = this.game.updateBestScore();
    if (newRecord) {
      this.ui.showToast('🎉 ¡Nuevo récord!');
    }
    
    setTimeout(() => {
      const state = this.game.getState();
      this.ui.showToast(
        `Ronda completa: ${state.correct}✔ / ${state.wrong}✖ — Pts: ${state.score}`
      );
      this.isGameActive = false;
    }, 400);
  }

  showHint() {
    const hint = this.ui.elements.hintText.textContent.replace('Pista: ', '💡 ');
    this.ui.showToast(hint);
  }

  skipQuestion() {
    const message = this.game.skipQuestion();
    this.ui.showToast(message);
    this.ui.updateHUD(this.game.getState());
    
    if (!this.game.endIfNeeded()) {
      this.nextRound();
    } else {
      this.endGame();
    }
  }

  resetGame() {
    const message = this.game.reset(true);
    this.ui.showToast(message);
    this.ui.updateHUD(this.game.getState());
    this.ui.updateProgress(0, 0, this.game.TOTAL_ROUNDS);
    this.ui.elements.silhouette.innerHTML = '';
    this.ui.elements.choices.innerHTML = '';
    this.isGameActive = false;
  }

  toggleStudyMode() {
    const isStudyMode = this.game.toggleStudyMode();
    this.ui.updateStudyButton(isStudyMode);
    
    if (this.game.state.current) {
      this.ui.renderFigure(this.game.state.current, isStudyMode);
    }
  }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new App();
});