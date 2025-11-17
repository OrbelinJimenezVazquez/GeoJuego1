import { el } from './utils.js';

export class UI {
  constructor() {
    this.elements = {
      silhouette: el('#silhouette'),
      choices: el('#choices'),
      questionText: el('#questionText'),
      hintText: el('#hintText'),
      streak: el('#streak'),
      score: el('#score'),
      best: el('#best'),
      ok: el('#ok'),
      ko: el('#ko'),
      xp: el('#xp'),
      maxStreak: el('#maxStreak'),
      progress: el('#progress'),
      roundBadge: el('#roundBadge'),
      toast: el('#toast'),
      refImg: el('#refImg'),
      refCaption: el('#refCaption'),
      toggleImages: el('#toggleImages'),
      roundsSelect: el('#roundsSelect'),
      btnStart: el('#btnStart'),
      btnHint: el('#btnHint'),
      btnSkip: el('#btnSkip'),
      btnReset: el('#btnReset'),
      btnStudy: el('#btnStudy')
    };
  }

renderFigure(item, studyMode = false) {
  this.elements.silhouette.innerHTML = '';
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  this.elements.silhouette.appendChild(g);
  
  // Añadir fondo sutil
  const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  bg.setAttribute('width', '1000');
  bg.setAttribute('height', '700');
  bg.setAttribute('fill', 'transparent');
  this.elements.silhouette.appendChild(bg);
  
  item.svg(g);
  
  if (studyMode) {
    const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    t.setAttribute('x', '20');
    t.setAttribute('y', '40');
    t.setAttribute('fill', '#bfe2ff');
    t.setAttribute('font-size', '24');
    t.setAttribute('font-weight', 'bold');
    t.textContent = (item.type === 'relief' ? 'Relieve: ' : 'País: ') + item.label + (item.flag ? ' ' + item.flag : '');
    this.elements.silhouette.appendChild(t);
    
    // Añadir información adicional en modo estudio
    if (item.type !== 'relief') {
      const info = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      info.setAttribute('x', '20');
      info.setAttribute('y', '70');
      info.setAttribute('fill', '#9fb0d8');
      info.setAttribute('font-size', '16');
      info.textContent = `Continente: ${item.continent}`;
      this.elements.silhouette.appendChild(info);
    }
  }
}

  renderChoices(options, onChoiceClick) {
    this.elements.choices.innerHTML = '';
    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'choice';
      btn.textContent = opt;
      btn.onclick = () => onChoiceClick(opt, btn);
      this.elements.choices.appendChild(btn);
    });
  }

  setRefImage(item, showImages) {
    if (!showImages) {
      this.elements.refImg.src = '';
      this.elements.refImg.alt = '';
      this.elements.refCaption.textContent = 'Imágenes desactivadas';
      return;
    }
    
    let caption = '';
    if (item.type === 'relief') {
      caption = `${item.label} — imagen de referencia.`;
    } else {
      caption = `${item.flag || ''} ${item.label} — bandera.`;
    }
    
    if (item.img) {
      this.elements.refImg.src = item.img;
      this.elements.refImg.alt = caption;
      this.elements.refCaption.textContent = caption;
    } else {
      this.elements.refImg.removeAttribute('src');
      this.elements.refCaption.textContent = '—';
    }
  }

  updateQuestion(item) {
    if (item.type === 'relief') {
      this.elements.questionText.textContent = '¿Qué relieve se muestra?';
      this.elements.hintText.textContent = 'Pista: relieve terrestre';
    } else {
      this.elements.questionText.textContent = '¿Qué país es?';
      this.elements.hintText.textContent = 'Pista: continente — ' + item.continent;
    }
  }

  updateProgress(progress, round, totalRounds) {
    this.elements.progress.style.width = `${progress}%`;
    this.elements.roundBadge.textContent = `${round}/${totalRounds}`;
  }

  updateHUD(state) {
    this.elements.streak.textContent = state.streak;
    this.elements.score.textContent = state.score;
    this.elements.ok.textContent = state.correct;
    this.elements.ko.textContent = state.wrong;
    this.elements.xp.textContent = state.exp;
    this.elements.maxStreak.textContent = state.maxStreak;
    this.elements.best.textContent = localStorage.getItem('geo_best') || '0';
  }

  showToast(message) {
    this.elements.toast.textContent = message;
    this.elements.toast.classList.add('show');
    setTimeout(() => this.elements.toast.classList.remove('show'), 1400);
  }

  disableChoices() {
    const buttons = [...document.querySelectorAll('button.choice')];
    buttons.forEach(b => b.disabled = true);
  }

  markChoice(button, isCorrect) {
    button.classList.add(isCorrect ? 'correct' : 'wrong');
  }

  markCorrectChoice(correctLabel) {
    const buttons = [...document.querySelectorAll('button.choice')];
    const correctButton = buttons.find(b => b.textContent === correctLabel);
    if (correctButton) {
      correctButton.classList.add('correct');
    }
  }

  updateStudyButton(isStudyMode) {
    this.elements.btnStudy.classList.toggle('primary', isStudyMode);
    this.elements.btnStudy.textContent = isStudyMode ? 'Salir estudio' : 'Modo estudio';
  }
}