# Architecture Document

**Product**: Hook Landing Page (후킹 홈페이지)
**Version**: 1.0
**Date**: 2026-03-18

---

## 1. Overview

### 1.1 Purpose
사람들의 시선을 사로잡는 인터랙티브 랜딩 페이지를 구축합니다. 스크롤 애니메이션, 파티클 이펙트, 타이핑 애니메이션 등 시각적 후킹 요소를 활용하여 방문자의 관심을 끌고 체류 시간을 극대화합니다.

### 1.2 Scope
- 단일 페이지 정적 웹사이트 (SPA)
- 인터랙티브 애니메이션 및 비주얼 이펙트
- 반응형 디자인 (모바일/데스크탑)
- GitHub Pages 배포

### 1.3 Requirements Coverage
| Requirement | Architecture Component |
|-------------|----------------------|
| 시선을 끄는 히어로 섹션 | Hero Component + Particle Effect |
| 스크롤 애니메이션 | Scroll Observer + CSS Animations |
| 반응형 디자인 | Tailwind CSS Responsive |
| 빠른 로딩 | Vite Build + Static Deploy |
| 인터랙티브 요소 | Canvas/Three.js Particle System |

---

## 2. Architecture Decisions

### ADR-001: Next.js 대신 Vite + React 선택
**Status**: Accepted
**Context**: 백엔드 API가 불필요한 순수 프론트엔드 랜딩 페이지이므로 SSR 프레임워크는 과도함.
**Decision**: Vite + React로 정적 SPA 구축. 빌드 속도가 빠르고 번들 사이즈가 작음.
**Consequences**:
- (+) 빠른 개발 및 빌드
- (+) 작은 번들 사이즈
- (-) SEO가 중요해지면 SSR 추가 필요
**Alternatives**:
1. Next.js: SSR/SSG 지원하나 이 프로젝트엔 과도함
2. Vanilla HTML/CSS/JS: 컴포넌트 재사용성 부족

### ADR-002: Tailwind CSS 사용
**Status**: Accepted
**Context**: 빠른 스타일링과 반응형 디자인이 필요.
**Decision**: Tailwind CSS v3으로 유틸리티 퍼스트 스타일링.
**Consequences**:
- (+) 빠른 UI 개발, 일관된 디자인 시스템
- (+) 퍼지로 미사용 CSS 제거
- (-) HTML 클래스가 길어질 수 있음

### ADR-003: Framer Motion으로 애니메이션 구현
**Status**: Accepted
**Context**: 스크롤 기반 애니메이션, 트랜지션, 제스처 등 다양한 인터랙션 필요.
**Decision**: Framer Motion을 메인 애니메이션 라이브러리로 사용.
**Consequences**:
- (+) 선언적 애니메이션 API
- (+) 스크롤 연동, 레이아웃 애니메이션 내장
- (-) 번들 사이즈 약 30KB 추가

### ADR-004: GitHub Pages 배포
**Status**: Accepted
**Context**: 백엔드 없는 정적 사이트이므로 무료 호스팅 가능.
**Decision**: GitHub Pages + GitHub Actions CI/CD.
**Consequences**:
- (+) 무료, 자동 배포
- (+) CDN 제공
- (-) 커스텀 서버 로직 불가 (불필요)

---

## 3. Technology Stack

### 3.1 Frontend
- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3
- **Animation**: Framer Motion 11
- **3D/Particles**: tsparticles (경량 파티클 이펙트)
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Inter, Noto Sans KR)

### 3.2 Backend
- 없음 (정적 사이트)

### 3.3 Database
- 없음

### 3.4 Infrastructure
- **Hosting**: GitHub Pages
- **CI/CD**: GitHub Actions
- **Domain**: GitHub Pages 기본 도메인 (*.github.io)

---

## 4. System Architecture

### 4.1 High-Level Diagram
```
[User Browser]
      ↓
[GitHub Pages CDN]
      ↓
[Static Assets (HTML/CSS/JS)]
      ↓
[React SPA]
  ├── Hero Section (Particle Canvas + Typing Animation)
  ├── Features Section (Scroll-triggered Animations)
  ├── Interactive Section (Mouse-follow Effects)
  ├── Gallery Section (Image Reveal Animations)
  └── CTA Section (Pulsing Button + Gradient)
```

### 4.2 Components

#### App Shell
- **Responsibility**: 전체 레이아웃, 라우팅 (단일 페이지), 테마
- **Technology**: React + Tailwind

#### Hero Section
- **Responsibility**: 첫 화면 임팩트 - 파티클 배경, 타이핑 애니메이션, 그라디언트 텍스트
- **Technology**: tsparticles, Framer Motion
- **Key Features**:
  - 마우스 추적 파티클 이펙트
  - 타이핑 애니메이션으로 키워드 순환
  - 그라디언트 + 글로우 텍스트 효과

#### Features Section
- **Responsibility**: 핵심 가치/특징을 카드로 표시
- **Technology**: Framer Motion (whileInView)
- **Key Features**:
  - 스크롤 시 스태거 애니메이션으로 카드 등장
  - 호버 시 카드 틸트 이펙트
  - 아이콘 펄스 애니메이션

#### Interactive Section
- **Responsibility**: 사용자 참여 유도 인터랙티브 영역
- **Technology**: React state + CSS transforms
- **Key Features**:
  - 마우스 위치에 따른 패럴랙스 효과
  - 클릭 시 리플 이펙트
  - 카운터/통계 숫자 카운트업 애니메이션

#### CTA Section
- **Responsibility**: 행동 유도 (Call-to-Action)
- **Technology**: Framer Motion, Tailwind
- **Key Features**:
  - 펄싱 버튼 애니메이션
  - 배경 그라디언트 시프트
  - 호버 시 스케일 + 글로우

#### Navigation
- **Responsibility**: 섹션 간 스무스 스크롤 네비게이션
- **Technology**: React scroll, Framer Motion
- **Key Features**:
  - 스크롤 시 배경 블러 네비바
  - 현재 섹션 하이라이트
  - 모바일 햄버거 메뉴

---

## 5. Data Model

데이터베이스 없음. 모든 콘텐츠는 정적 데이터로 컴포넌트 내에 정의.

### 5.1 Static Data Structures

#### SectionContent
```typescript
interface SectionContent {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
}
```

#### FeatureCard
```typescript
interface FeatureCard {
  icon: string;
  title: string;
  description: string;
  color: string; // gradient color
}
```

#### NavItem
```typescript
interface NavItem {
  label: string;
  sectionId: string;
}
```

#### Stat
```typescript
interface Stat {
  value: number;
  label: string;
  suffix?: string; // e.g., "+", "%", "K"
}
```

---

## 6. API Design

외부 API 호출 없음. 순수 클라이언트 사이드 렌더링.

---

## 7. Integration Points

### 7.1 Google Fonts
- **Purpose**: 웹폰트 로딩 (Inter, Noto Sans KR)
- **Method**: `<link>` 태그 preconnect

### 7.2 GitHub Pages
- **Purpose**: 정적 파일 호스팅
- **Method**: GitHub Actions → `gh-pages` 브랜치 배포

---

## 8. Security

### 8.1 CSP (Content Security Policy)
- 인라인 스크립트 제한
- 허용된 도메인에서만 리소스 로드

### 8.2 Dependencies
- npm audit 정기 실행
- Dependabot 활성화

---

## 9. Performance

### 9.1 Target Metrics
- Lighthouse Performance: 90+
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Total Bundle Size: < 200KB (gzipped)

### 9.2 Optimization Strategy
- Vite 코드 스플리팅
- 이미지 lazy loading
- 폰트 display: swap
- CSS purge (Tailwind)
- 애니메이션 GPU 가속 (transform, opacity 사용)

---

## 10. Project Structure

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── Interactive.tsx
│   │   ├── Stats.tsx
│   │   ├── CTA.tsx
│   │   └── Footer.tsx
│   ├── data/
│   │   └── content.ts        # 정적 콘텐츠 데이터
│   ├── hooks/
│   │   ├── useScrollAnimation.ts
│   │   └── useMousePosition.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css              # Tailwind directives
├── index.html
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
├── package.json
└── .github/
    └── workflows/
        └── deploy.yml
```

---

## 11. Deployment Pipeline

```
Push to main
    ↓
GitHub Actions triggered
    ↓
npm install → npm run build
    ↓
Deploy dist/ to gh-pages branch
    ↓
GitHub Pages serves static files
```

---

## Appendix

### A. Key Animation Patterns

| Pattern | Library | Trigger |
|---------|---------|---------|
| Particle Background | tsparticles | Page load |
| Typing Effect | Custom hook | Page load |
| Scroll Reveal | Framer Motion whileInView | Scroll |
| Card Tilt | CSS transform + React state | Mouse hover |
| Number Count-up | Custom hook + requestAnimationFrame | In viewport |
| Parallax | CSS transform + scroll position | Scroll |
| Button Pulse | Framer Motion animate | Continuous |
| Ripple Click | CSS animation | Click |

### B. Color Palette
- Primary: `#6366f1` (Indigo 500)
- Secondary: `#8b5cf6` (Violet 500)
- Accent: `#06b6d4` (Cyan 500)
- Background: `#0f172a` (Slate 900) - 다크 테마
- Text: `#f8fafc` (Slate 50)
- Gradient: Indigo → Violet → Cyan
