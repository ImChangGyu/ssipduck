# ssipduck — Design System Rules (Material 3)

이 문서는 Claude Code가 이 레포지토리에서 작업할 때 반드시 따르는 규칙을 정의합니다.
**사람이 읽는 가이드가 아니라 AI 에이전트 지침입니다.**

---

## 디자인 토큰 (Design Tokens)

### 색상
- **절대 hex/rgba 리터럴 금지.** `#6750A4`, `rgba(0,0,0,0.5)` 등을 컴포넌트나 페이지 코드에 쓰지 않는다.
- 항상 Tailwind 유틸리티(`bg-primary`, `text-on-surface`, `border-outline`) 또는 CSS 변수(`var(--md-sys-color-primary)`)를 사용한다.
- M3 색상 역할 목록: `primary / on-primary / primary-container / on-primary-container`, `secondary / …`, `tertiary / …`, `error / …`, `surface / on-surface / surface-variant / on-surface-variant`, `surface-container-lowest/low/DEFAULT/high/highest`, `background / on-background`, `outline / outline-variant`, `inverse-surface / inverse-on-surface / inverse-primary`.

### Radius / Shadow / Typography
| 잘못된 예 | 올바른 예 |
|---|---|
| `rounded-[12px]` | `rounded-md` |
| `rounded-[9999px]` | `rounded-full` |
| `shadow-[0px_8px_24px_0px_#eff1f4]` | `shadow-elevation-2` |
| `text-[14px] leading-[20px]` | `text-label-lg` |
| `text-[16px]` | `text-body-lg` 또는 `text-title-md` |

- `rounded-*` → M3 Corner 토큰: `none / xs / sm / md / lg / lg-plus / xl / xl-plus / 2xl / full`
- `shadow-elevation-{0..5}` → M3 Elevation 토큰
- `text-{display/headline/title/body/label}-{lg/md/sm}` → M3 Typescale 토큰

### 새 토큰이 필요한 경우
`src/styles/tokens/color.css` + `src/app/globals.css`의 `@theme` 블록에 **동시에** 추가한다.
컴포넌트 내부에서 alias를 만들지 않는다.

---

## 다크 모드

- `<html data-theme="dark">` 또는 `<html class="dark">` 를 토글하면 CSS 변수가 자동 스왑된다.
- 컴포넌트 코드에 `dark:` prefix 분기를 쓰지 않는다. 토큰이 이미 다크 값을 포함한다.
- 예외: `dark:` 가 필요한 경우는 토큰으로 해결할 수 없는 레이아웃/투명도 조정에만 허용.

---

## 컴포넌트 작성 규칙

### 파일 위치
- UI 빌딩 블록 → `src/components/ui/` (shadcn 컴포넌트 위치)
- 도메인 컴포넌트 → `src/features/{domain}/components/`
- 페이지 레벨 컴포넌트 → `src/app/.../` 내 Server Component

### shadcn/ui 컴포넌트 우선 사용
- UI 컴포넌트가 필요한 경우 **먼저 `src/components/ui/`에 설치된 shadcn 컴포넌트를 확인**한다.
- `pnpm dlx shadcn@latest add <component>` 로 추가한다.
- shadcn Button의 variant 매핑:
  - M3 `filled` → `variant="default"` (`bg-primary text-primary-foreground`)
  - M3 `tonal` → `variant="secondary"` (`bg-secondary-container text-on-secondary-container`)
  - M3 `outlined` → `variant="outline"`
  - M3 `text` / 고스트 → `variant="ghost"`

### Variants
- shadcn 컴포넌트는 `class-variance-authority` (`cva()`)를 사용한다.
- 커스텀 컴포넌트에는 `cva()` 또는 `tailwind-variants` (`tv()`) 중 shadcn 규칙에 맞게 선택한다.
- variant 정의는 컴포넌트 파일 또는 별도 `*.variants.ts` 에 분리한다.

### State Layer (M3 상호작용)
- shadcn `Button`, `Toggle` 등의 기본 hover/focus 상태를 우선 사용한다.
- 커스텀 카드/인터랙티브 요소에 state-layer가 필요하면 `::before` absolute 패턴을 사용한다:
  ```
  before:absolute before:inset-0 before:rounded-[inherit]
  before:opacity-0 before:transition-opacity
  hover:before:opacity-[0.08] active:before:opacity-[0.12]
  ```

### 접근성
- 모든 인터랙티브 컴포넌트에 `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` 를 적용한다.
- shadcn 컴포넌트는 기본적으로 이 스타일을 포함한다.
- `disabled` 상태: `disabled:opacity-50 disabled:pointer-events-none`
- 아이콘만 있는 버튼/링크에는 반드시 `aria-label` 을 제공한다.

---

## 아이콘 시스템

### 아이콘 사용 방법 (lucide-react 우선)
- **UI 아이콘**은 `lucide-react` 에서 import 해서 사용한다.
- **브랜드 로고 / 일러스트 SVG**만 `src/assets/svg/` 에 보관한다.

```tsx
// lucide 아이콘 (UI 아이콘)
import { Search, Star, X, Play } from 'lucide-react';

// 브랜드 로고 (assets/svg 유지)
import * as SVG from '~/assets/svg';
<SVG.SsipduckLogo />
```

### 버튼 내 아이콘
- shadcn 규칙: 아이콘에 `data-icon="inline-start"` 또는 `data-icon="inline-end"` prop을 추가한다.
- shadcn 컴포넌트 내부 아이콘에는 별도 `size-*` 클래스를 붙이지 않는다.

### SVG 직접 사용 시 규격 (브랜드/일러스트만)
- `viewBox="0 0 24 24"` 고정
- `fill="currentColor"` — 색상은 부모의 `text-*` 유틸리티로 제어한다.
- 하드코딩된 색상(`fill="#000"`, `stroke="white"`) 금지.

---

## Tailwind v4 규칙

- `tailwind.config.ts` 를 재도입하지 않는다. v4는 CSS-first 설정이다.
- `@theme` 블록이 유일한 설정 위치 (`src/app/globals.css`).
- `className` 에 `!important` 금지 — 토큰 재정의로 해결한다.
- 임의값(`text-[14px]`, `rounded-[12px]`) 은 토큰으로 치환 가능한 경우 사용 금지.

---

## 토큰 소스 동기화

- **색상 변경** → `M3_SEED=#RRGGBB pnpm colors:gen` 재실행. 스크립트: `scripts/gen-colors.mjs`. Seed 상수는 스크립트 상단 `SEED` 변수.
- **Shape / Typography / Elevation 변경** → Figma Variables JSON export 후 `pnpm tokens:gen` 재실행. 스크립트: `scripts/gen-tokens.mjs`.
- `src/styles/tokens/*.css` 는 **생성물**이다. 수동으로 편집하지 않는다.

---

## 레거시 Ad-hoc 클래스 (마이그레이션 대상)

아래 클래스들은 M3 도입 이전 임시 토큰이다. 해당 파일을 수정할 때 함께 M3 토큰으로 교체한다.

| 레거시 | M3 대체 |
|---|---|
| `bg-primary` (old `#4f92f6`) | → 사이트 브랜드 색상이면 `--color-app-primary` 유지, M3 primary 역할이면 `bg-primary` |
| `text-primary_darken` | → `text-on-surface` 또는 브랜드 `text-app-primary-dark` |
| `text-gray_description` | → `text-on-surface-variant` |
| `stroke-gray_scale_100` | → `stroke-outline-variant` |
| `shadow-item` | → `shadow-elevation-1` 또는 `shadow-elevation-2` |
| `shadow-input` | → `shadow-elevation-1` |
| `grid-cols-list` | → `@layer utilities` 에 유지 (v4 호환됨) |
| `hover:shadow-hover_shadow_color` | → `hover:shadow-elevation-1` |

---

## Git / GitHub 계정 규칙

커밋 또는 푸시 전에 반드시 아래 명령으로 active 계정을 확인한다.

```bash
gh auth status
```

- `github.com` 의 active account가 **`ImChangGyu`** 인지 확인.
- 다른 계정이 active라면 먼저 전환 후 진행:
  ```bash
  gh auth switch -u ImChangGyu
  ```
- 확인 없이 커밋·푸시하지 않는다.

---

## 금지 사항 요약

| 금지 | 이유 |
|---|---|
| hex/rgba 리터럴을 컴포넌트 className에 사용 | 토큰 시스템 우회 |
| `tailwind.config.ts` 재생성 | v4 CSS-first 원칙 |
| `styles/tokens/*.css` 수동 편집 | gen script 결과물 |
| `dark:` prefix로 색상 분기 | 토큰이 다크값 포함 |
| 아이콘 SVG에 하드코딩 색상 | `currentColor` 원칙 |
| `className="!..."` (important) | 토큰 오버라이드로 해결 |
