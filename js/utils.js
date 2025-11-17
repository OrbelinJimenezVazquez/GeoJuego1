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

function generatedShape(g, name, complexity = 'medium') {
  const rnd = seededRand(nameHash(name));
  const cx = 500, cy = 350;
  
  // Diferentes complejidades según el "tamaño" del país
  let n, rBase, variation;
  
  switch(complexity) {
    case 'high': // Países grandes
      n = 14 + Math.floor(rnd() * 8);
      rBase = 200;
      variation = 0.6;
      break;
    case 'low': // Países pequeños/islas
      n = 8 + Math.floor(rnd() * 4);
      rBase = 100;
      variation = 0.3;
      break;
    default: // Países medianos
      n = 10 + Math.floor(rnd() * 6);
      rBase = 160;
      variation = 0.5;
  }
  
  let d = '';
  for(let i = 0; i < n; i++) {
    const ang = (i/n) * Math.PI * 2 + rnd() * 0.2;
    const r = rBase * (0.7 + rnd() * variation);
    const x = cx + Math.cos(ang) * r;
    const y = cy + Math.sin(ang) * r * (0.75 + rnd() * 0.3);
    d += (i ? ' L ' : 'M ') + x.toFixed(1) + ' ' + y.toFixed(1);
  }
  d += ' Z';
  
  const p = document.createElementNS('http://www.w3.org/2000/svg','path');
  p.setAttribute('d', d);
  p.setAttribute('fill','#2b69ff22');
  p.setAttribute('stroke','#8fdcff');
  p.setAttribute('stroke-width','4');
  p.setAttribute('vector-effect','non-scaling-stroke');
  p.setAttribute('stroke-linejoin','round');
  g.appendChild(p);
  
  // Añadir un punto para la capital en formas generadas
  const capitalX = cx + (rnd() * 80 - 40);
  const capitalY = cy + (rnd() * 60 - 30);
  dot(g, capitalX, capitalY, 4);
}