/**
 * M3 Design Token TypeScript constants
 *
 * Use these when you need token references outside of className strings
 * (e.g., inline styles, Canvas/SVG rendering, JavaScript animations).
 *
 * For className usage prefer Tailwind utilities defined in globals.css @theme.
 */

// ── Color Roles ──────────────────────────────────────────────────────────────

export const COLOR = {
  primary:                 'var(--md-sys-color-primary)',
  onPrimary:               'var(--md-sys-color-on-primary)',
  primaryContainer:        'var(--md-sys-color-primary-container)',
  onPrimaryContainer:      'var(--md-sys-color-on-primary-container)',

  secondary:               'var(--md-sys-color-secondary)',
  onSecondary:             'var(--md-sys-color-on-secondary)',
  secondaryContainer:      'var(--md-sys-color-secondary-container)',
  onSecondaryContainer:    'var(--md-sys-color-on-secondary-container)',

  tertiary:                'var(--md-sys-color-tertiary)',
  onTertiary:              'var(--md-sys-color-on-tertiary)',
  tertiaryContainer:       'var(--md-sys-color-tertiary-container)',
  onTertiaryContainer:     'var(--md-sys-color-on-tertiary-container)',

  error:                   'var(--md-sys-color-error)',
  onError:                 'var(--md-sys-color-on-error)',
  errorContainer:          'var(--md-sys-color-error-container)',
  onErrorContainer:        'var(--md-sys-color-on-error-container)',

  background:              'var(--md-sys-color-background)',
  onBackground:            'var(--md-sys-color-on-background)',

  surface:                 'var(--md-sys-color-surface)',
  onSurface:               'var(--md-sys-color-on-surface)',
  surfaceVariant:          'var(--md-sys-color-surface-variant)',
  onSurfaceVariant:        'var(--md-sys-color-on-surface-variant)',

  surfaceContainerLowest:  'var(--md-sys-color-surface-container-lowest)',
  surfaceContainerLow:     'var(--md-sys-color-surface-container-low)',
  surfaceContainer:        'var(--md-sys-color-surface-container)',
  surfaceContainerHigh:    'var(--md-sys-color-surface-container-high)',
  surfaceContainerHighest: 'var(--md-sys-color-surface-container-highest)',

  outline:                 'var(--md-sys-color-outline)',
  outlineVariant:          'var(--md-sys-color-outline-variant)',

  inverseSurface:          'var(--md-sys-color-inverse-surface)',
  inverseOnSurface:        'var(--md-sys-color-inverse-on-surface)',
  inversePrimary:          'var(--md-sys-color-inverse-primary)',
} as const;

// ── Shape (Border Radius) ─────────────────────────────────────────────────────

export const SHAPE = {
  none:   'var(--md-sys-shape-corner-none)',
  xs:     'var(--md-sys-shape-corner-xs)',
  sm:     'var(--md-sys-shape-corner-sm)',
  md:     'var(--md-sys-shape-corner-md)',
  lg:     'var(--md-sys-shape-corner-lg)',
  lgPlus: 'var(--md-sys-shape-corner-lg-plus)',
  xl:     'var(--md-sys-shape-corner-xl)',
  xlPlus: 'var(--md-sys-shape-corner-xl-plus)',
  xxl:    'var(--md-sys-shape-corner-2xl)',
  full:   'var(--md-sys-shape-corner-full)',
} as const;

// ── Elevation ─────────────────────────────────────────────────────────────────

export type ElevationLevel = 0 | 1 | 2 | 3 | 4 | 5;

export const ELEVATION: Record<ElevationLevel, string> = {
  0: 'var(--md-sys-elevation-0)',
  1: 'var(--md-sys-elevation-1)',
  2: 'var(--md-sys-elevation-2)',
  3: 'var(--md-sys-elevation-3)',
  4: 'var(--md-sys-elevation-4)',
  5: 'var(--md-sys-elevation-5)',
};

// ── Typescale (font-size references) ─────────────────────────────────────────

export const TYPESCALE = {
  displayLg:   { size: 'var(--md-sys-typescale-display-large-size)',   lineHeight: 'var(--md-sys-typescale-display-large-line-height)' },
  displayMd:   { size: 'var(--md-sys-typescale-display-medium-size)',  lineHeight: 'var(--md-sys-typescale-display-medium-line-height)' },
  displaySm:   { size: 'var(--md-sys-typescale-display-small-size)',   lineHeight: 'var(--md-sys-typescale-display-small-line-height)' },
  headlineLg:  { size: 'var(--md-sys-typescale-headline-large-size)',  lineHeight: 'var(--md-sys-typescale-headline-large-line-height)' },
  headlineMd:  { size: 'var(--md-sys-typescale-headline-medium-size)', lineHeight: 'var(--md-sys-typescale-headline-medium-line-height)' },
  headlineSm:  { size: 'var(--md-sys-typescale-headline-small-size)',  lineHeight: 'var(--md-sys-typescale-headline-small-line-height)' },
  titleLg:     { size: 'var(--md-sys-typescale-title-large-size)',     lineHeight: 'var(--md-sys-typescale-title-large-line-height)' },
  titleMd:     { size: 'var(--md-sys-typescale-title-medium-size)',    lineHeight: 'var(--md-sys-typescale-title-medium-line-height)' },
  titleSm:     { size: 'var(--md-sys-typescale-title-small-size)',     lineHeight: 'var(--md-sys-typescale-title-small-line-height)' },
  bodyLg:      { size: 'var(--md-sys-typescale-body-large-size)',      lineHeight: 'var(--md-sys-typescale-body-large-line-height)' },
  bodyMd:      { size: 'var(--md-sys-typescale-body-medium-size)',     lineHeight: 'var(--md-sys-typescale-body-medium-line-height)' },
  bodySm:      { size: 'var(--md-sys-typescale-body-small-size)',      lineHeight: 'var(--md-sys-typescale-body-small-line-height)' },
  labelLg:     { size: 'var(--md-sys-typescale-label-large-size)',     lineHeight: 'var(--md-sys-typescale-label-large-line-height)' },
  labelMd:     { size: 'var(--md-sys-typescale-label-medium-size)',    lineHeight: 'var(--md-sys-typescale-label-medium-line-height)' },
  labelSm:     { size: 'var(--md-sys-typescale-label-small-size)',     lineHeight: 'var(--md-sys-typescale-label-small-line-height)' },
} as const;
