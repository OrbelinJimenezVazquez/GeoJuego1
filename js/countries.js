import { flagEmojiFromCode, flagImgUrl, nameHash, seededRand } from './utils.js';

// Funciones SVG
function path(g, d) {
  const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  p.setAttribute('d', d);
  p.setAttribute('fill', '#2b69ff22');
  p.setAttribute('stroke', '#8fdcff');
  p.setAttribute('stroke-width', '4');
  p.setAttribute('vector-effect', 'non-scaling-stroke');
  p.setAttribute('stroke-linejoin', 'round');
  g.appendChild(p);
}

function dot(g, cx, cy, r = 5) {
  const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  c.setAttribute('cx', cx);
  c.setAttribute('cy', cy);
  c.setAttribute('r', r);
  c.setAttribute('fill', '#2b69ff22');
  c.setAttribute('stroke', '#8fdcff');
  c.setAttribute('stroke-width', '3');
  c.setAttribute('vector-effect', 'non-scaling-stroke');
  g.appendChild(c);
}

// Generador de formas para países sin silueta específica
function generatedShape(g, name) {
  const rnd = seededRand(nameHash(name));
  const cx = 520, cy = 320;
  const rBase = 160;
  const n = 10 + Math.floor(rnd() * 6); // 10-15 vértices
  let d = '';
  for (let i = 0; i < n; i++) {
    const ang = (i / n) * Math.PI * 2 + rnd() * 0.15;
    const r = rBase * (0.65 + rnd() * 0.5);
    const x = cx + Math.cos(ang) * r;
    const y = cy + Math.sin(ang) * r * (0.70 + rnd() * 0.25);
    d += (i ? ' L ' : 'M ') + x.toFixed(1) + ' ' + y.toFixed(1);
  }
  d += ' Z';
  path(g, d);
}

// Siluetas manuales para países clave
function mx(g) { path(g, "M 120 330 L 220 260 L 300 250 L 350 210 L 420 220 L 470 260 L 520 260 L 555 280 L 590 330 L 560 360 L 520 355 L 500 370 L 470 380 L 410 360 L 360 350 L 320 340 L 300 360 L 260 370 L 200 360 L 160 345 Z"); dot(g, 540, 290, 8); }
function br(g) { path(g, "M 640 220 L 700 210 L 740 240 L 760 300 L 720 340 L 690 360 L 650 360 L 610 330 L 590 290 L 610 250 Z"); }
function ar(g) { path(g, "M 760 360 L 750 420 L 740 480 L 730 520 L 720 560 L 710 620 L 690 640 L 680 610 L 690 560 L 700 520 L 710 470 L 720 420 L 730 380 Z"); }
function us(g) { path(g, "M 180 220 L 260 200 L 360 190 L 460 200 L 560 210 L 600 230 L 560 260 L 520 260 L 470 260 L 420 240 L 360 240 L 300 240 L 240 250 L 200 240 Z"); }
function ca(g) { path(g, "M 160 160 L 260 140 L 360 140 L 460 150 L 540 160 L 560 140 L 600 150 L 620 170 L 560 180 L 520 170 L 460 170 L 400 170 L 340 160 L 260 160 L 200 170 Z"); }
function it(g) { path(g, "M 660 230 L 640 250 L 620 260 L 640 280 L 660 300 L 680 310 L 700 300 L 710 290 L 700 280 L 680 270 L 690 260 L 700 250 L 690 240 Z"); dot(g, 715, 305, 6); }
function jp(g) { dot(g, 860, 260, 6); dot(g, 850, 280, 7); dot(g, 845, 300, 6); dot(g, 855, 320, 5); }
function au(g) { path(g, "M 860 420 L 900 430 L 930 460 L 910 500 L 870 520 L 830 500 L 820 460 Z"); dot(g, 940, 500, 4); }

// Función helper para crear países
function C(code, label, continent, customSvg) {
  return {
    id: code,
    label,
    continent,
    code,
    flag: flagEmojiFromCode(code),
    img: flagImgUrl(code),
    svg: customSvg ? (g) => customSvg(g) : (g) => generatedShape(g, label)
  };
}

// Banco de países
export const COUNTRIES = [
  // América del Norte & Centro
  C('mx', 'México', 'América', mx), C('us', 'Estados Unidos', 'América', us), C('ca', 'Canadá', 'América', ca),
  C('gt', 'Guatemala', 'América'), C('bz', 'Belice', 'América'), C('sv', 'El Salvador', 'América'), 
  C('hn', 'Honduras', 'América'), C('ni', 'Nicaragua', 'América'), C('cr', 'Costa Rica', 'América'), 
  C('pa', 'Panamá', 'América'), C('cu', 'Cuba', 'América'), C('do', 'República Dominicana', 'América'), 
  C('ht', 'Haití', 'América'), C('jm', 'Jamaica', 'América'), C('bs', 'Bahamas', 'América'),
  
  // América del Sur
  C('br', 'Brasil', 'América', br), C('ar', 'Argentina', 'América', ar), C('cl', 'Chile', 'América'), 
  C('uy', 'Uruguay', 'América'), C('py', 'Paraguay', 'América'), C('bo', 'Bolivia', 'América'), 
  C('pe', 'Perú', 'América'), C('ec', 'Ecuador', 'América'), C('co', 'Colombia', 'América'), 
  C('ve', 'Venezuela', 'América'), C('gy', 'Guyana', 'América'), C('sr', 'Surinam', 'América'),
  
  // Europa Occidental y Norte
  C('es', 'España', 'Europa'), C('pt', 'Portugal', 'Europa'), C('fr', 'Francia', 'Europa'), 
  C('gb', 'Reino Unido', 'Europa'), C('ie', 'Irlanda', 'Europa'), C('de', 'Alemania', 'Europa'), 
  C('it', 'Italia', 'Europa', it), C('ch', 'Suiza', 'Europa'), C('at', 'Austria', 'Europa'), 
  C('nl', 'Países Bajos', 'Europa'), C('be', 'Bélgica', 'Europa'), C('lu', 'Luxemburgo', 'Europa'),
  C('dk', 'Dinamarca', 'Europa'), C('no', 'Noruega', 'Europa'), C('se', 'Suecia', 'Europa'), 
  C('fi', 'Finlandia', 'Europa'), C('is', 'Islandia', 'Europa'),
  
  // Resto de países... (mantener el resto de la lista)
];

// Relieves
function mountainRange(g, count, centerX, centerY) {
  for (let i = 0; i < count; i++) {
    const x = centerX - 120 + i * 60;
    const y = centerY + 20;
    const h = 80 + Math.random() * 40;
    const d = `M ${x} ${y} L ${x + 30} ${y - h} L ${x + 60} ${y} Z`;
    path(g, d);
  }
}

export const RELIEFS = [
  { 
    id: 'mountain', 
    type: 'relief', 
    label: 'Cordillera (montañas)', 
    note: 'Elevaciones alineadas con picos.', 
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Andes_La_Paz_Bolivia.jpg/320px-Andes_La_Paz_Bolivia.jpg', 
    svg: (g) => { mountainRange(g, 5, 520, 360); } 
  },
  // Resto de relieves... (mantener el resto de la lista)
];

export const ITEMS = [...COUNTRIES, ...RELIEFS];