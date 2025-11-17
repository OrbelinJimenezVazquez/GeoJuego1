// Utilidades generales

// Generador de números aleatorios con semilla
export function seededRand(seed) {
  let t = seed >>> 0;
  return () => (t = (t * 1664525 + 1013904223) >>> 0) / 2**32;
}

// Hash para nombres
export function nameHash(s) {
  let h = 2166136261;
  for (const ch of s) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return h >>> 0;
}

// Funciones de array
export function rand(n) {
  return Math.floor(Math.random() * n);
}

export function sample(arr, k) {
  const a = [...arr];
  const out = [];
  while (out.length < k && a.length) {
    out.push(a.splice(rand(a.length), 1)[0]);
  }
  return out;
}

export function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Funciones de banderas
export function flagEmojiFromCode(code) {
  const a = code.toUpperCase();
  return String.fromCodePoint(...[...a].map(c => 0x1F1E6 + (c.charCodeAt(0) - 65)));
}

export function flagImgUrl(code) {
  return `https://flagcdn.com/w320/${code.toLowerCase()}.png`;
}

// Efectos de sonido
export function beep(good = true) {
  try {
    const a = new (window.AudioContext || window.webkitAudioContext)();
    const o = a.createOscillator();
    const g = a.createGain();
    o.type = good ? 'triangle' : 'sawtooth';
    o.frequency.value = good ? 720 : 220;
    o.connect(g);
    g.connect(a.destination);
    g.gain.setValueAtTime(0.001, a.currentTime);
    g.gain.exponentialRampToValueAtTime(0.2, a.currentTime + 0.02);
    o.start();
    setTimeout(() => {
      g.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + 0.12);
      o.stop(a.currentTime + 0.14);
    }, 120);
  } catch (e) {
    console.log('Audio no disponible');
  }
}

// Selector de elementos
export function el(sel) {
  return document.querySelector(sel);
}