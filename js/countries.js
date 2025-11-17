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
  path(g, "M 120 330 L 220 260 L 300 250 L 350 210 L 420 220 L 470 260 L 520 260 L 555 280 L 590 330 L 560 360 L 520 355 L 500 370 L 470 380 L 410 360 L 360 350 L 320 340 L 300 360 L 260 370 L 200 360 L 160 345 Z"); 
  dot(g, 540, 290, 8); 
}

function br(g) { 
  path(g, "M 640 220 L 700 210 L 740 240 L 760 300 L 720 340 L 690 360 L 650 360 L 610 330 L 590 290 L 610 250 Z"); 
}

function ar(g) { 
  path(g, "M 760 360 L 750 420 L 740 480 L 730 520 L 720 560 L 710 620 L 690 640 L 680 610 L 690 560 L 700 520 L 710 470 L 720 420 L 730 380 Z"); 
}

function us(g) { 
  path(g, "M 180 220 L 260 200 L 360 190 L 460 200 L 560 210 L 600 230 L 560 260 L 520 260 L 470 260 L 420 240 L 360 240 L 300 240 L 240 250 L 200 240 Z"); 
}

function ca(g) { 
  path(g, "M 160 160 L 260 140 L 360 140 L 460 150 L 540 160 L 560 140 L 600 150 L 620 170 L 560 180 L 520 170 L 460 170 L 400 170 L 340 160 L 260 160 L 200 170 Z"); 
}

function it(g) { 
  path(g, "M 660 230 L 640 250 L 620 260 L 640 280 L 660 300 L 680 310 L 700 300 L 710 290 L 700 280 L 680 270 L 690 260 L 700 250 L 690 240 Z"); 
  dot(g, 715, 305, 6); 
}

function jp(g) { 
  dot(g, 860, 260, 6); 
  dot(g, 850, 280, 7); 
  dot(g, 845, 300, 6); 
  dot(g, 855, 320, 5); 
}

function au(g) { 
  path(g, "M 860 420 L 900 430 L 930 460 L 910 500 L 870 520 L 830 500 L 820 460 Z"); 
  dot(g, 940, 500, 4); 
}

function fr(g) { 
  path(g, "M 400 200 L 450 180 L 500 190 L 550 210 L 600 200 L 650 220 L 680 250 L 650 280 L 600 270 L 550 260 L 500 250 L 450 240 L 400 230 Z"); 
}

function de(g) { 
  path(g, "M 420 180 L 480 170 L 540 175 L 600 185 L 640 200 L 620 230 L 580 240 L 520 235 L 460 225 L 420 210 Z"); 
}

function es(g) { 
  path(g, "M 350 280 L 400 260 L 450 270 L 500 290 L 480 320 L 430 330 L 380 310 Z"); 
}

function uk(g) { 
  path(g, "M 380 150 L 420 140 L 460 145 L 500 155 L 480 185 L 440 190 L 400 180 Z"); 
}

function cn(g) { 
  path(g, "M 720 180 L 780 170 L 840 190 L 820 230 L 760 240 L 700 220 Z"); 
}

function in_(g) { 
  path(g, "M 750 250 L 800 240 L 850 260 L 820 300 L 770 310 L 720 280 Z"); 
}

function za(g) { 
  path(g, "M 500 500 L 550 480 L 600 490 L 580 520 L 530 530 L 480 510 Z"); 
}

function eg(g) { 
  path(g, "M 520 220 L 580 210 L 640 230 L 620 260 L 560 270 L 500 250 Z"); 
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
  C('ge', 'Georgia', 'Asia'), 
  C('am', 'Armenia', 'Asia'), 
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