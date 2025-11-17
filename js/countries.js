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
function mx(g) { 
  // México - forma más reconocible
  path(g, "M 200 300 L 250 280 L 300 270 L 350 250 L 400 260 L 450 280 L 500 290 L 520 320 L 480 350 L 430 360 L 380 340 L 330 330 L 280 320 L 230 310 Z");
  // Baja California
  path(g, "M 180 200 L 220 180 L 250 190 L 230 230 L 190 240 Z");
  dot(g, 350, 290, 8); // CDMX
}

function br(g) { 
  // Brasil - forma triangular característica
  path(g, "M 600 250 L 700 220 L 750 280 L 720 380 L 650 400 L 580 350 L 550 300 Z");
  dot(g, 650, 320, 7); // Brasilia
}

function ar(g) { 
  // Argentina - forma alargada
  path(g, "M 550 350 L 600 320 L 650 300 L 700 280 L 720 320 L 700 500 L 650 520 L 600 500 L 580 450 L 560 400 Z");
  dot(g, 620, 380, 6); // Buenos Aires
}

function us(g) { 
  // Estados Unidos - forma rectangular mejorada
  path(g, "M 200 200 L 350 180 L 500 190 L 480 350 L 330 340 L 180 320 Z");
  // Alaska
  path(g, "M 100 100 L 150 80 L 180 120 L 160 160 L 110 150 Z");
  // Hawaii
  path(g, "M 550 320 L 580 300 L 600 330 L 570 350 Z");
  dot(g, 320, 280, 6); // Washington DC
}

function ca(g) { 
  // Canadá - forma con bahías
  path(g, "M 180 150 L 300 130 L 450 140 L 500 160 L 480 200 L 520 220 L 500 280 L 450 300 L 350 290 L 250 270 L 200 240 L 160 200 Z");
  // Terranova
  path(g, "M 520 180 L 550 160 L 580 190 L 550 210 Z");
  dot(g, 300, 220, 6); // Ottawa
}


function it(g) { 
  // Italia - forma de bota reconocible
  path(g, "M 650 250 L 620 280 L 600 320 L 610 380 L 640 400 L 680 380 L 700 340 L 720 300 L 700 270 L 680 260 Z");
  // Sicilia
  path(g, "M 640 420 L 660 410 L 670 440 L 650 450 Z");
  dot(g, 650, 320, 5); // Roma
}

function jp(g) { 
  // Japón - archipiélago
  path(g, "M 820 220 L 850 200 L 880 230 L 860 260 Z"); // Honshu
  path(g, "M 800 250 L 820 240 L 830 270 L 810 280 Z"); // Kyushu
  path(g, "M 840 180 L 860 170 L 870 200 L 850 210 Z"); // Hokkaido
  path(g, "M 890 240 L 910 230 L 920 250 L 900 260 Z"); // Shikoku
  dot(g, 840, 240, 4); // Tokio
}

function au(g) { 
  // Australia - forma reconocible
  path(g, "M 750 400 L 820 380 L 860 420 L 840 480 L 780 500 L 720 470 L 700 430 Z");
  // Tasmania
  path(g, "M 760 520 L 780 510 L 790 530 L 770 540 Z");
  dot(g, 780, 450, 5); // Canberra
}
function fr(g) { 
  // Francia - forma hexagonal
  path(g, "M 450 200 L 500 180 L 550 190 L 580 220 L 570 260 L 530 280 L 480 270 L 440 250 Z");
  // Córcega
  path(g, "M 580 240 L 600 230 L 610 260 L 590 270 Z");
  dot(g, 500, 230, 5); // París
}

function de(g) { 
  // Alemania - forma rectangular
  path(g, "M 480 180 L 530 170 L 580 190 L 590 230 L 550 250 L 500 240 L 470 220 Z");
  dot(g, 520, 210, 5); // Berlín
}

function es(g) { 
  // España - forma rectangular con Portugal
  path(g, "M 400 250 L 450 230 L 500 240 L 480 320 L 430 330 L 380 300 Z");
  dot(g, 440, 280, 5); // Madrid
}

function uk(g) { 
  // Reino Unido - forma de isla con Escocia e Inglaterra
  path(g, "M 420 150 L 460 140 L 500 150 L 480 200 L 440 210 L 400 190 Z");
  dot(g, 450, 170, 4); // Londres
}

function cn(g) { 
  // China - forma grande y reconocible
  path(g, "M 700 180 L 780 160 L 820 190 L 800 280 L 750 300 L 700 270 L 680 220 Z");
  // Taiwán
  path(g, "M 750 250 L 770 240 L 780 260 L 760 270 Z");
  dot(g, 740, 230, 6); // Beijing
}

function in_(g) { 
  // India - forma triangular
  path(g, "M 720 250 L 780 230 L 800 280 L 760 320 L 700 300 L 680 270 Z");
  dot(g, 740, 280, 5); // Nueva Delhi
}


function eg(g) { 
  // Egipto - forma rectangular
  path(g, "M 550 220 L 600 200 L 640 230 L 620 280 L 570 300 L 530 270 Z");
  dot(g, 580, 250, 5); // El Cairo
}

function za(g) { 
  // Sudáfrica - forma triangular
  path(g, "M 520 450 L 570 430 L 590 470 L 550 490 L 500 480 Z");
  dot(g, 540, 470, 4); // Pretoria
}
function ru(g) { 
  // Rusia - forma enorme
  path(g, "M 300 100 L 500 80 L 600 120 L 580 200 L 550 250 L 500 280 L 400 260 L 300 220 L 250 180 L 220 140 Z");
  // Kaliningrado
  path(g, "M 450 180 L 470 170 L 480 190 L 460 200 Z");
  dot(g, 400, 180, 6); // Moscú
}

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

// Banco de países COMPLETO (90+ países)
export const COUNTRIES = [
  // América del Norte & Centro
  C('mx', 'México', 'América', mx), 
  C('us', 'Estados Unidos', 'América', us), 
  C('ca', 'Canadá', 'América', ca),
  C('gt', 'Guatemala', 'América'), 
  C('bz', 'Belice', 'América'), 
  C('sv', 'El Salvador', 'América'), 
  C('hn', 'Honduras', 'América'), 
  C('ni', 'Nicaragua', 'América'), 
  C('cr', 'Costa Rica', 'América'), 
  C('pa', 'Panamá', 'América'),
  C('cu', 'Cuba', 'América'), 
  C('do', 'República Dominicana', 'América'), 
  C('ht', 'Haití', 'América'), 
  C('jm', 'Jamaica', 'América'), 
  C('bs', 'Bahamas', 'América'),
  
  // América del Sur
  C('br', 'Brasil', 'América', br), 
  C('ar', 'Argentina', 'América', ar), 
  C('cl', 'Chile', 'América'), 
  C('uy', 'Uruguay', 'América'), 
  C('py', 'Paraguay', 'América'), 
  C('bo', 'Bolivia', 'América'), 
  C('pe', 'Perú', 'América'), 
  C('ec', 'Ecuador', 'América'), 
  C('co', 'Colombia', 'América'), 
  C('ve', 'Venezuela', 'América'), 
  C('gy', 'Guyana', 'América'), 
  C('sr', 'Surinam', 'América'),
  
  // Europa Occidental y Norte
  C('es', 'España', 'Europa', es), 
  C('pt', 'Portugal', 'Europa'), 
  C('fr', 'Francia', 'Europa', fr), 
  C('gb', 'Reino Unido', 'Europa', uk), 
  C('ie', 'Irlanda', 'Europa'), 
  C('de', 'Alemania', 'Europa', de), 
  C('it', 'Italia', 'Europa', it), 
  C('ch', 'Suiza', 'Europa'), 
  C('at', 'Austria', 'Europa'), 
  C('nl', 'Países Bajos', 'Europa'), 
  C('be', 'Bélgica', 'Europa'), 
  C('lu', 'Luxemburgo', 'Europa'),
  C('dk', 'Dinamarca', 'Europa'), 
  C('no', 'Noruega', 'Europa'), 
  C('se', 'Suecia', 'Europa'), 
  C('fi', 'Finlandia', 'Europa'), 
  C('is', 'Islandia', 'Europa'),
  
  // Europa Central / Este / Balcanes
  C('pl', 'Polonia', 'Europa'), 
  C('cz', 'Chequia', 'Europa'), 
  C('sk', 'Eslovaquia', 'Europa'), 
  C('hu', 'Hungría', 'Europa'), 
  C('ro', 'Rumanía', 'Europa'), 
  C('bg', 'Bulgaria', 'Europa'), 
  C('gr', 'Grecia', 'Europa'), 
  C('al', 'Albania', 'Europa'), 
  C('mk', 'Macedonia del Norte', 'Europa'), 
  C('rs', 'Serbia', 'Europa'), 
  C('ba', 'Bosnia y Herzegovina', 'Europa'), 
  C('hr', 'Croacia', 'Europa'), 
  C('si', 'Eslovenia', 'Europa'), 
  C('me', 'Montenegro', 'Europa'), 
  C('xk', 'Kosovo', 'Europa'),
  C('ee', 'Estonia', 'Europa'), 
  C('lv', 'Letonia', 'Europa'), 
  C('lt', 'Lituania', 'Europa'),
  C('ua', 'Ucrania', 'Europa'), 
  C('by', 'Bielorrusia', 'Europa'), 
  C('md', 'Moldavia', 'Europa'), 
  C('ru', 'Rusia', 'Europa/Asia'),
  
  // Medio Oriente & Cáucaso
  C('tr', 'Turquía', 'Europa/Asia'), 
  C('cy', 'Chipre', 'Europa/Asia'), 
  C('ru', 'Rusia', 'Europa/Asia', ru), 
  C('kz', 'Kazajistán', 'Europa/Asia'), 
  C('kg', 'Kirguistán', 'Europa/Asia'), 
  C('tj', 'Tayikistán', 'Europa/Asia'), 
  C('tm', 'Turkmenistán', 'Europa/Asia'), 
  C('am', 'Armenia', 'Europa/Asia'), 
  C('ge', 'Georgia', 'Asia'), 
  C('az', 'Azerbaiyán', 'Asia'),
  C('sa', 'Arabia Saudita', 'Asia'), 
  C('ae', 'Emiratos Árabes Unidos', 'Asia'), 
  C('qa', 'Catar', 'Asia'), 
  C('bh', 'Baréin', 'Asia'), 
  C('kw', 'Kuwait', 'Asia'), 
  C('om', 'Omán', 'Asia'), 
  C('ye', 'Yemen', 'Asia'),
  C('ir', 'Irán', 'Asia'), 
  C('iq', 'Irak', 'Asia'), 
  C('sy', 'Siria', 'Asia'), 
  C('lb', 'Líbano', 'Asia'), 
  C('il', 'Israel', 'Asia'), 
  C('jo', 'Jordania', 'Asia'),
  
  // Asia meridional
  C('af', 'Afganistán', 'Asia'), 
  C('pk', 'Pakistán', 'Asia'), 
  C('in', 'India', 'Asia', in_), 
  C('np', 'Nepal', 'Asia'), 
  C('bt', 'Bután', 'Asia'), 
  C('bd', 'Bangladés', 'Asia'), 
  C('lk', 'Sri Lanka', 'Asia'), 
  C('mv', 'Maldivas', 'Asia'),
  
  // Asia oriental y sudeste
  C('cn', 'China', 'Asia', cn), 
  C('mn', 'Mongolia', 'Asia'), 
  C('kp', 'Corea del Norte', 'Asia'), 
  C('kr', 'Corea del Sur', 'Asia'), 
  C('jp', 'Japón', 'Asia', jp), 
  C('tw', 'Taiwán', 'Asia'),
  C('mm', 'Myanmar', 'Asia'), 
  C('th', 'Tailandia', 'Asia'), 
  C('la', 'Laos', 'Asia'), 
  C('kh', 'Camboya', 'Asia'), 
  C('vn', 'Vietnam', 'Asia'), 
  C('my', 'Malasia', 'Asia'), 
  C('sg', 'Singapur', 'Asia'), 
  C('id', 'Indonesia', 'Asia'), 
  C('ph', 'Filipinas', 'Asia'), 
  C('bn', 'Brunéi', 'Asia'), 
  C('tl', 'Timor Oriental', 'Asia'),
  
  // Oceanía
  C('au', 'Australia', 'Oceanía', au), 
  C('nz', 'Nueva Zelanda', 'Oceanía'), 
  C('pg', 'Papúa Nueva Guinea', 'Oceanía'), 
  C('fj', 'Fiyi', 'Oceanía'), 
  C('ws', 'Samoa', 'Oceanía'), 
  C('to', 'Tonga', 'Oceanía'), 
  C('vu', 'Vanuatu', 'Oceanía'), 
  C('sb', 'Islas Salomón', 'Oceanía'), 
  C('fm', 'Micronesia', 'Oceanía'), 
  C('ki', 'Kiribati', 'Oceanía'), 
  C('pw', 'Palaos', 'Oceanía'), 
  C('nr', 'Nauru', 'Oceanía'), 
  C('tv', 'Tuvalu', 'Oceanía'),
  
  // África Norte & Oeste
  C('ma', 'Marruecos', 'África'), 
  C('dz', 'Argelia', 'África'), 
  C('tn', 'Túnez', 'África'), 
  C('ly', 'Libia', 'África'), 
  C('eg', 'Egipto', 'África', eg), 
  C('mr', 'Mauritania', 'África'), 
  C('eh', 'Sahara Occidental', 'África'),
  C('sn', 'Senegal', 'África'), 
  C('gm', 'Gambia', 'África'), 
  C('gw', 'Guinea-Bisáu', 'África'), 
  C('gn', 'Guinea', 'África'), 
  C('sl', 'Sierra Leona', 'África'), 
  C('lr', 'Liberia', 'África'), 
  C('ci', 'Costa de Marfil', 'África'), 
  C('gh', 'Ghana', 'África'), 
  C('tg', 'Togo', 'África'), 
  C('bj', 'Benín', 'África'), 
  C('ng', 'Nigeria', 'África'), 
  C('ne', 'Níger', 'África'), 
  C('bf', 'Burkina Faso', 'África'), 
  C('ml', 'Malí', 'África'),
  
  // África Central & Este & Austral
  C('td', 'Chad', 'África'), 
  C('cm', 'Camerún', 'África'), 
  C('cf', 'República Centroafricana', 'África'), 
  C('gq', 'Guinea Ecuatorial', 'África'), 
  C('ga', 'Gabón', 'África'), 
  C('cg', 'República del Congo', 'África'), 
  C('cd', 'R. D. del Congo', 'África'), 
  C('ao', 'Angola', 'África'), 
  C('na', 'Namibia', 'África'), 
  C('bw', 'Botsuana', 'África'), 
  C('zw', 'Zimbabue', 'África'), 
  C('zm', 'Zambia', 'África'), 
  C('mw', 'Malaui', 'África'), 
  C('mz', 'Mozambique', 'África'), 
  C('tz', 'Tanzania', 'África'), 
  C('ke', 'Kenia', 'África'), 
  C('ug', 'Uganda', 'África'), 
  C('rw', 'Ruanda', 'África'), 
  C('bi', 'Burundi', 'África'), 
  C('so', 'Somalia', 'África'), 
  C('et', 'Etiopía', 'África'), 
  C('er', 'Eritrea', 'África'), 
  C('dj', 'Yibuti', 'África'), 
  C('ss', 'Sudán del Sur', 'África'), 
  C('sd', 'Sudán', 'África'), 
  C('za', 'Sudáfrica', 'África', za), 
  C('ls', 'Lesoto', 'África'), 
  C('sz', 'Esuatini', 'África'), 
  C('mg', 'Madagascar', 'África'), 
  C('mu', 'Mauricio', 'África'), 
  C('sc', 'Seychelles', 'África'), 
  C('km', 'Comoras', 'África')
];
// Clasificar países por tamaño para mejor generación
function getCountryComplexity(countryName) {
  const largeCountries = [
    'Rusia', 'Canadá', 'Estados Unidos', 'China', 'Brasil', 'Australia', 
    'India', 'Argentina', 'Kazajistán', 'Argelia', 'México', 'Indonesia'
  ];
  
  const smallCountries = [
    'Singapur', 'Mónaco', 'Ciudad del Vaticano', 'San Marino', 'Liechtenstein',
    'Malta', 'Andorra', 'Luxemburgo', 'Chipre', 'Baréin', 'Maldivas', 'Palaos'
  ];
  
  if (largeCountries.includes(countryName)) return 'high';
  if (smallCountries.includes(countryName)) return 'low';
  return 'medium';
}

// Modifica la función C para usar complejidad
function C(code, label, continent, customSvg) {
  const complexity = getCountryComplexity(label);
  
  return {
    id: code,
    label,
    continent,
    code,
    flag: flagEmojiFromCode(code),
    img: flagImgUrl(code),
    svg: customSvg ? 
      (g) => customSvg(g) : 
      (g) => generatedShape(g, label, complexity)
  };
}
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
  { 
    id: 'volcano', 
    type: 'relief', 
    label: 'Volcán', 
    note: 'Cono con cráter en la cima.', 
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Popocatepetl_from_Paso_de_Cortes.jpg/320px-Popocatepetl_from_Paso_de_Cortes.jpg', 
    svg: (g) => { 
      const d = `M 400 520 L 520 330 L 640 520 Z`; 
      path(g, d); 
      for (let i = 0; i < 4; i++) dot(g, 520 + (Math.random() * 20 - 10), 300 - i * 22, 8 - i);
    } 
  },
  { 
    id: 'river', 
    type: 'relief', 
    label: 'Río meándrico', 
    note: 'Curso de agua sinuoso.', 
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Meanders.jpg/320px-Meanders.jpg', 
    svg: (g) => { 
      const midX = 580, midY = 360; 
      const d = `M 180 180 C ${midX - 120} ${midY - 150}, ${midX + 120} ${midY + 150}, 820 480`; 
      const p = document.createElementNS('http://www.w3.org/2000/svg', 'path'); 
      p.setAttribute('d', d); 
      p.setAttribute('stroke', '#53e0ff'); 
      p.setAttribute('stroke-width', '14'); 
      p.setAttribute('fill', 'none'); 
      g.appendChild(p);
    } 
  },
  { 
    id: 'plateau', 
    type: 'relief', 
    label: 'Altiplano / Meseta', 
    note: 'Superficie alta y plana.', 
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Altiplano_Boliviano.jpg/320px-Altiplano_Boliviano.jpg', 
    svg: (g) => { 
      const d = `M 320 420 L 420 320 L 620 320 L 720 420 Z`; 
      path(g, d);
    } 
  },
  { 
    id: 'dune', 
    type: 'relief', 
    label: 'Dunas (desierto)', 
    note: 'Acumulaciones de arena eólica.', 
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Sossusvlei_Dunes.jpg/320px-Sossusvlei_Dunes.jpg', 
    svg: (g) => { 
      for (let i = 0; i < 4; i++) { 
        const x = 220 + i * 130, y = 440 + (i % 2 ? 20 : 0), w = 90, h = 30; 
        const d = `M ${x} ${y} Q ${x + w / 2} ${y - h} ${x + w} ${y}`; 
        const p = document.createElementNS('http://www.w3.org/2000/svg', 'path'); 
        p.setAttribute('d', d); 
        p.setAttribute('fill', 'none'); 
        p.setAttribute('stroke', '#8fdcff'); 
        p.setAttribute('stroke-width', '8'); 
        g.appendChild(p);
      } 
    } 
  },
  { 
    id: 'valley', 
    type: 'relief', 
    label: 'Valle en U', 
    note: 'Valle glaciar de fondo plano.', 
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Glacial_valley%2C_Switzerland.jpg/320px-Glacial_valley%2C_Switzerland.jpg', 
    svg: (g) => { 
      const d = `M 340 440 L 460 300 L 540 360 L 620 300 L 740 440`; 
      const p = document.createElementNS('http://www.w3.org/2000/svg', 'path'); 
      p.setAttribute('d', d); 
      p.setAttribute('fill', 'none'); 
      p.setAttribute('stroke', '#8fdcff'); 
      p.setAttribute('stroke-width', '8'); 
      g.appendChild(p);
    } 
  }
];

export const ITEMS = [...COUNTRIES, ...RELIEFS];