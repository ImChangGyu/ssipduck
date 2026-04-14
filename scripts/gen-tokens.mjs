/**
 * M3 Design Token Generator
 *
 * material3_variables.json (Figma Variables export) →
 *   src/styles/tokens/color.css
 *   src/styles/tokens/typography.css
 *   src/styles/tokens/shape.css
 *   src/styles/tokens/elevation.css
 *
 * Usage:  pnpm tokens:gen
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const JSON_PATH = resolve(
  process.env.M3_JSON || '/Users/ImChangGyu/Downloads/material3_variables.json'
);
const OUT_DIR = resolve(ROOT, 'src/styles/tokens');

mkdirSync(OUT_DIR, { recursive: true });

const raw = JSON.parse(readFileSync(JSON_PATH, 'utf8'));

// ── Utilities ───────────────────────────────────────────────────────────────

/**
 * "Schemes/On Primary Container" → "on-primary-container"
 * "State Layers/Primary/opacity 0.08" → "state-primary-008"
 */
function toVarName(name, prefix) {
  return name
    .replace(new RegExp(`^${prefix}/?`, 'i'), '')
    .replace(/\//g, '-')
    .replace(/\s+/g, '-')
    .replace(/\./g, '')
    .toLowerCase()
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function kebab(str) {
  return str
    .replace(/\//g, '-')
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '')
    .toLowerCase()
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function rgba2hex({ r, g, b, a }) {
  const to2 = (v) =>
    Math.round(v * 255)
      .toString(16)
      .padStart(2, '0');
  const alpha = a < 1 ? Math.round(a * 255).toString(16).padStart(2, '0') : '';
  return `#${to2(r)}${to2(g)}${to2(b)}${alpha}`;
}

function effectsToBoxShadow(effects) {
  return effects
    .filter((e) => e.type === 'DROP_SHADOW')
    .map(({ color, offset, radius, spread }) => {
      const hex = rgba2hex(color);
      return `${offset.x}px ${offset.y}px ${radius}px ${spread}px ${hex}`;
    })
    .join(', ');
}

// ── Color tokens ─────────────────────────────────────────────────────────────

const m3Collection = raw.collections.find((c) => c.name === 'M3');
const lightMode = m3Collection.modes.find((m) => m.name === 'Light');
const darkMode = m3Collection.modes.find((m) => m.name === 'Dark');

function modeToVars(mode) {
  const lines = [];
  for (const v of mode.variables) {
    if (v.isAlias || typeof v.value !== 'string') continue;
    const raw_name = v.name;
    const prefix = raw_name.split('/')[0]; // Schemes, Add-ons, State Layers

    let varSuffix;
    if (prefix === 'Schemes') {
      varSuffix = toVarName(raw_name, 'Schemes');
      lines.push(`  --md-sys-color-${varSuffix}: ${v.value};`);
    } else if (prefix === 'Add-ons') {
      varSuffix = toVarName(raw_name, 'Add-ons');
      lines.push(`  --md-sys-addon-${varSuffix}: ${v.value};`);
    } else if (prefix === 'State Layers') {
      // "State Layers/Primary/opacity 0.08" → "primary-008"
      const parts = raw_name.split('/').slice(1);
      const role = kebab(parts[0]);
      const opPart = parts[1] || '';
      const opNum = opPart.replace(/[^0-9.]/g, '').replace('.', '');
      varSuffix = `${role}-${opNum.padStart(3, '0')}`;
      lines.push(`  --md-sys-state-${varSuffix}: ${v.value};`);
    }
  }
  return lines;
}

const lightVars = modeToVars(lightMode);
const darkVars = modeToVars(darkMode);

const colorCss = `/* AUTO-GENERATED — do not edit manually. Run: pnpm tokens:gen */

:root {
${lightVars.join('\n')}
}

[data-theme="dark"],
.dark {
${darkVars.join('\n')}
}
`;

writeFileSync(resolve(OUT_DIR, 'color.css'), colorCss);
console.log(`✓ color.css  (${lightVars.length} Light vars, ${darkVars.length} Dark vars)`);

// ── Shape tokens ──────────────────────────────────────────────────────────────

const shapeCollection = raw.collections.find((c) => c.name === 'Shape');
const shapeMode = shapeCollection.modes[0];

const shapeAbbr = {
  none: 'none',
  'extra-small': 'xs',
  small: 'sm',
  medium: 'md',
  large: 'lg',
  'large-increased': 'lg-plus',
  'extra-large': 'xl',
  'extra-large-increased': 'xl-plus',
  'extra-extra-large': '2xl',
  full: 'full',
};

const shapeLines = shapeMode.variables.map((v) => {
  const key = kebab(v.name.replace('Corner/', ''));
  const abbr = shapeAbbr[key] || key;
  const px = v.value >= 1000 ? '9999px' : `${v.value}px`;
  return `  --md-sys-shape-corner-${abbr}: ${px};`;
});

const shapeCss = `/* AUTO-GENERATED — do not edit manually. Run: pnpm tokens:gen */

:root {
${shapeLines.join('\n')}
}
`;

writeFileSync(resolve(OUT_DIR, 'shape.css'), shapeCss);
console.log(`✓ shape.css  (${shapeLines.length} vars)`);

// ── Typography tokens ─────────────────────────────────────────────────────────

const typescaleCollection = raw.collections.find((c) => c.name === 'Typescale');
const typescaleMode = typescaleCollection.modes[0];

/**
 * "Static/Display Large/Size" → { scale: "display-large", prop: "size" }
 */
function parseTypescaleName(name) {
  const parts = name.replace('Static/', '').split('/');
  if (parts.length < 2) return null;
  return {
    scale: kebab(parts.slice(0, parts.length - 1).join('-')),
    prop: kebab(parts[parts.length - 1]),
  };
}

const typeLines = [];
for (const v of typescaleMode.variables) {
  if (v.isAlias) continue;
  const parsed = parseTypescaleName(v.name);
  if (!parsed) continue;
  const { scale, prop } = parsed;

  // Only output numeric tokens (px or unitless letter-spacing)
  if (typeof v.value !== 'number') continue;

  let value;
  if (prop === 'size') value = `${v.value}px`;
  else if (prop === 'line-height') value = `${v.value}px`;
  else if (prop === 'tracking') value = `${v.value.toFixed(4).replace(/\.?0+$/, '')}px`;
  else continue; // skip weight aliases

  typeLines.push(`  --md-sys-typescale-${scale}-${prop}: ${value};`);
}

const typographyCss = `/* AUTO-GENERATED — do not edit manually. Run: pnpm tokens:gen */

:root {
${typeLines.join('\n')}
}
`;

writeFileSync(resolve(OUT_DIR, 'typography.css'), typographyCss);
console.log(`✓ typography.css  (${typeLines.length} vars)`);

// ── Elevation (shadow) tokens ─────────────────────────────────────────────────

const effectsCollection = raw.collections.find((c) => c.name === 'Effects');
const effectsMode = effectsCollection.modes[0];

// Keep only Light elevation levels
const elevationVars = [];
for (const v of effectsMode.variables) {
  const match = v.name.match(/M3\/Elevation Light\/(\d+)/);
  if (!match) continue;
  const level = match[1];
  if (!v.value || !v.value.effects) continue;
  const shadow = effectsToBoxShadow(v.value.effects);
  if (shadow) {
    elevationVars.push(`  --md-sys-elevation-${level}: ${shadow};`);
  }
}

// Level 0 = no shadow
elevationVars.unshift('  --md-sys-elevation-0: none;');

const elevationCss = `/* AUTO-GENERATED — do not edit manually. Run: pnpm tokens:gen */

:root {
${elevationVars.join('\n')}
}
`;

writeFileSync(resolve(OUT_DIR, 'elevation.css'), elevationCss);
console.log(`✓ elevation.css  (${elevationVars.length} vars)`);

// ── index.css ─────────────────────────────────────────────────────────────────

const indexCss = `/* AUTO-GENERATED — do not edit manually. Run: pnpm tokens:gen */
@import "./color.css";
@import "./typography.css";
@import "./shape.css";
@import "./elevation.css";
`;

writeFileSync(resolve(OUT_DIR, 'index.css'), indexCss);
console.log('✓ index.css');
console.log('\nDone. Token files written to src/styles/tokens/');
