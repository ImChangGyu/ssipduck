/**
 * M3 Color Token Generator (seed-based)
 *
 * Generates src/styles/tokens/color.css from a single source color seed.
 * Replaces the Figma-export workflow for color tokens only.
 * Shape / Typography / Elevation are still handled by gen-tokens.mjs.
 *
 * Usage:  pnpm colors:gen
 * Override seed:  M3_SEED=#RRGGBB pnpm colors:gen
 */

import {
  argbFromHex,
  themeFromSourceColor,
  hexFromArgb,
} from '@material/material-color-utilities';
import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUT = resolve(ROOT, 'src/styles/tokens/color.css');

// ── Seed ─────────────────────────────────────────────────────────────────────
const SEED = process.env.M3_SEED ?? '#2563EB';

// ── Helpers ───────────────────────────────────────────────────────────────────
function camelToKebab(str) {
  return str.replace(/([A-Z])/g, (m) => '-' + m.toLowerCase());
}

function hex(argb) {
  return hexFromArgb(argb).toUpperCase();
}

// alpha as 2-digit hex: 0.08→14, 0.10→1A, 0.16→29
const A8 = '14', A10 = '1A', A16 = '29';

function stateLayers(roleHex, roleName) {
  const h = roleHex.replace('#', '');
  return [
    `  --md-sys-state-${roleName}-008: #${h}${A8};`,
    `  --md-sys-state-${roleName}-010: #${h}${A10};`,
    `  --md-sys-state-${roleName}-016: #${h}${A16};`,
  ];
}

// ── Generate ──────────────────────────────────────────────────────────────────
const theme = themeFromSourceColor(argbFromHex(SEED));
const light = theme.schemes.light;
const dark = theme.schemes.dark;
const pal = theme.palettes;

// M3 Scheme role names (camelCase → kebab for var names)
const SCHEME_ROLES = [
  'primary', 'onPrimary', 'primaryContainer', 'onPrimaryContainer',
  'secondary', 'onSecondary', 'secondaryContainer', 'onSecondaryContainer',
  'tertiary', 'onTertiary', 'tertiaryContainer', 'onTertiaryContainer',
  'error', 'onError', 'errorContainer', 'onErrorContainer',
  'background', 'onBackground',
  'surface', 'onSurface', 'surfaceVariant', 'onSurfaceVariant',
  'outline', 'outlineVariant',
  'inverseSurface', 'inverseOnSurface', 'inversePrimary',
];

// Extended roles computed from tonal palettes (tone numbers per M3 spec)
function extendedLight() {
  const n = pal.neutral;
  const nv = pal.neutralVariant;
  return {
    'surface-tint':                  hex(light.primary),
    'shadow':                        '#000000',
    'scrim':                         '#000000',
    'primary-fixed':                 hex(pal.primary.tone(90)),
    'on-primary-fixed':              hex(pal.primary.tone(10)),
    'primary-fixed-dim':             hex(pal.primary.tone(80)),
    'on-primary-fixed-variant':      hex(pal.primary.tone(30)),
    'secondary-fixed':               hex(pal.secondary.tone(90)),
    'on-secondary-fixed':            hex(pal.secondary.tone(10)),
    'secondary-fixed-dim':           hex(pal.secondary.tone(80)),
    'on-secondary-fixed-variant':    hex(pal.secondary.tone(30)),
    'tertiary-fixed':                hex(pal.tertiary.tone(90)),
    'on-tertiary-fixed':             hex(pal.tertiary.tone(10)),
    'tertiary-fixed-dim':            hex(pal.tertiary.tone(80)),
    'on-tertiary-fixed-variant':     hex(pal.tertiary.tone(30)),
    'surface-dim':                   hex(n.tone(87)),
    'surface-bright':                hex(n.tone(98)),
    'surface-container-lowest':      hex(n.tone(100)),
    'surface-container-low':         hex(n.tone(96)),
    'surface-container':             hex(n.tone(94)),
    'surface-container-high':        hex(n.tone(92)),
    'surface-container-highest':     hex(n.tone(90)),
  };
}

function extendedDark() {
  const n = pal.neutral;
  return {
    'surface-tint':                  hex(dark.primary),
    'shadow':                        '#000000',
    'scrim':                         '#000000',
    'primary-fixed':                 hex(pal.primary.tone(90)),
    'on-primary-fixed':              hex(pal.primary.tone(10)),
    'primary-fixed-dim':             hex(pal.primary.tone(80)),
    'on-primary-fixed-variant':      hex(pal.primary.tone(30)),
    'secondary-fixed':               hex(pal.secondary.tone(90)),
    'on-secondary-fixed':            hex(pal.secondary.tone(10)),
    'secondary-fixed-dim':           hex(pal.secondary.tone(80)),
    'on-secondary-fixed-variant':    hex(pal.secondary.tone(30)),
    'tertiary-fixed':                hex(pal.tertiary.tone(90)),
    'on-tertiary-fixed':             hex(pal.tertiary.tone(10)),
    'tertiary-fixed-dim':            hex(pal.tertiary.tone(80)),
    'on-tertiary-fixed-variant':     hex(pal.tertiary.tone(30)),
    'surface-dim':                   hex(n.tone(6)),
    'surface-bright':                hex(n.tone(24)),
    'surface-container-lowest':      hex(n.tone(4)),
    'surface-container-low':         hex(n.tone(10)),
    'surface-container':             hex(n.tone(12)),
    'surface-container-high':        hex(n.tone(17)),
    'surface-container-highest':     hex(n.tone(22)),
  };
}

// State layer role names (same roles as the scheme + fixed/surface-container)
const STATE_ROLES_LIGHT = [
  ['primary',                   hex(light.primary)],
  ['on-primary',                hex(light.onPrimary)],
  ['primary-container',         hex(light.primaryContainer)],
  ['on-primary-container',      hex(light.onPrimaryContainer)],
  ['secondary',                 hex(light.secondary)],
  ['on-secondary',              hex(light.onSecondary)],
  ['secondary-container',       hex(light.secondaryContainer)],
  ['on-secondary-container',    hex(light.onSecondaryContainer)],
  ['tertiary',                  hex(light.tertiary)],
  ['on-tertiary',               hex(light.onTertiary)],
  ['tertiary-container',        hex(light.tertiaryContainer)],
  ['on-tertiary-container',     hex(light.onTertiaryContainer)],
  ['error',                     hex(light.error)],
  ['on-error',                  hex(light.onError)],
  ['error-container',           hex(light.errorContainer)],
  ['on-error-container',        hex(light.onErrorContainer)],
  ['background',                hex(light.background)],
  ['on-background',             hex(light.onBackground)],
  ['surface',                   hex(light.surface)],
  ['on-surface',                hex(light.onSurface)],
  ['surface-variant',           hex(light.surfaceVariant)],
  ['on-surface-variant',        hex(light.onSurfaceVariant)],
  ['outline',                   hex(light.outline)],
  ['outline-variant',           hex(light.outlineVariant)],
  ['surface-tint',              hex(light.primary)],
  ['shadow',                    '#000000'],
  ['scrim',                     '#000000'],
  ['inverse-surface',           hex(light.inverseSurface)],
  ['inverse-on-surface',        hex(light.inverseOnSurface)],
  ['inverse-primary',           hex(light.inversePrimary)],
];

const STATE_ROLES_DARK = STATE_ROLES_LIGHT.map(([role]) => {
  const keyMap = {
    'primary':                   hex(dark.primary),
    'on-primary':                hex(dark.onPrimary),
    'primary-container':         hex(dark.primaryContainer),
    'on-primary-container':      hex(dark.onPrimaryContainer),
    'secondary':                 hex(dark.secondary),
    'on-secondary':              hex(dark.onSecondary),
    'secondary-container':       hex(dark.secondaryContainer),
    'on-secondary-container':    hex(dark.onSecondaryContainer),
    'tertiary':                  hex(dark.tertiary),
    'on-tertiary':               hex(dark.onTertiary),
    'tertiary-container':        hex(dark.tertiaryContainer),
    'on-tertiary-container':     hex(dark.onTertiaryContainer),
    'error':                     hex(dark.error),
    'on-error':                  hex(dark.onError),
    'error-container':           hex(dark.errorContainer),
    'on-error-container':        hex(dark.onErrorContainer),
    'background':                hex(dark.background),
    'on-background':             hex(dark.onBackground),
    'surface':                   hex(dark.surface),
    'on-surface':                hex(dark.onSurface),
    'surface-variant':           hex(dark.surfaceVariant),
    'on-surface-variant':        hex(dark.onSurfaceVariant),
    'outline':                   hex(dark.outline),
    'outline-variant':           hex(dark.outlineVariant),
    'surface-tint':              hex(dark.primary),
    'shadow':                    '#000000',
    'scrim':                     '#000000',
    'inverse-surface':           hex(dark.inverseSurface),
    'inverse-on-surface':        hex(dark.inverseOnSurface),
    'inverse-primary':           hex(dark.inversePrimary),
  };
  return [role, keyMap[role]];
});

function buildModeVars(scheme, extended, stateRoles) {
  const lines = [];

  // Scheme roles
  for (const role of SCHEME_ROLES) {
    const varName = camelToKebab(role);
    lines.push(`  --md-sys-color-${varName}: ${hex(scheme[role])};`);
  }

  // Extended roles
  for (const [name, value] of Object.entries(extended)) {
    lines.push(`  --md-sys-color-${name}: ${value};`);
  }

  // Add-ons (constant, seed-independent)
  const addonBg = scheme === light ? '#F5F5F5' : '#000000';
  lines.push(`  --md-sys-addon-section-background: ${addonBg};`);

  // State layers
  for (const [role, roleHex] of stateRoles) {
    lines.push(...stateLayers(roleHex, role));
  }

  return lines;
}

const lightVars = buildModeVars(light, extendedLight(), STATE_ROLES_LIGHT);
const darkVars = buildModeVars(dark, extendedDark(), STATE_ROLES_DARK);

const css = `/* AUTO-GENERATED — do not edit manually. Run: pnpm colors:gen */
/* Seed: ${SEED} */

:root {
${lightVars.join('\n')}
}

[data-theme="dark"],
.dark {
${darkVars.join('\n')}
}
`;

mkdirSync(resolve(ROOT, 'src/styles/tokens'), { recursive: true });
writeFileSync(OUT, css);
console.log(`✓ color.css  (seed: ${SEED}, ${lightVars.length} light vars, ${darkVars.length} dark vars)`);
