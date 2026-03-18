# Tech Spec: Interactive Animation System

**Author**: Tech Spec Subagent
**Date**: 2026-03-18
**Status**: Draft
**Related Stories**: S-01 (Hero Section), S-02 (Features Section), S-03 (Interactive Section), S-04 (Stats Section), S-05 (CTA Section)
**Related Requirements**: 시선 후킹, 스크롤 애니메이션, 반응형 디자인, 빠른 로딩, 인터랙티브 요소

---

## 1. Overview

### 1.1 Purpose
후킹 랜딩 페이지의 핵심인 인터랙티브 애니메이션 시스템의 기술 설계를 정의합니다. 파티클 이펙트, 스크롤 기반 애니메이션, 마우스 추적 효과, 타이핑 애니메이션, 카운트업 애니메이션 등 모든 비주얼 인터랙션의 구현 방식을 다룹니다.

### 1.2 Scope
- **In Scope**:
  - tsparticles 기반 파티클 배경 시스템
  - Framer Motion 기반 스크롤/뷰포트 애니메이션
  - 커스텀 훅 기반 타이핑 이펙트 및 카운트업 애니메이션
  - 마우스 추적 패럴랙스 효과
  - 애니메이션 성능 최적화 전략
  - 반응형 애니메이션 (모바일/데스크탑 분기)
- **Out of Scope**:
  - 3D WebGL 렌더링 (Three.js)
  - 비디오/Lottie 애니메이션
  - 백엔드 연동

### 1.3 Goals
- 첫 화면에서 3초 이내 시각적 임팩트 전달
- 모든 애니메이션 60fps 유지
- 모바일에서도 성능 저하 없이 동작
- 접근성(prefers-reduced-motion) 지원

### 1.4 Non-Goals
- 사용자 데이터 수집/분석
- A/B 테스트 프레임워크
- CMS 연동

---

## 2. Background

### 2.1 Context
"후킹 홈페이지"는 방문자의 시선을 즉시 사로잡아야 하는 랜딩 페이지입니다. 정적 텍스트와 이미지만으로는 충분한 임팩트를 주기 어려우므로, 다양한 애니메이션과 인터랙션을 통해 체류 시간을 극대화합니다.

### 2.2 Motivation
- 평균 방문자의 첫 인상 판단 시간: ~50ms
- 인터랙티브 요소가 있는 페이지의 체류 시간이 평균 2.6배 높음
- 스크롤 기반 내러티브가 전환율을 향상시킴

### 2.3 Constraints
- **번들 사이즈**: 전체 gzipped < 200KB
- **초기 로딩**: FCP < 1.5s, LCP < 2.5s
- **프레임 레이트**: 모든 애니메이션 60fps 목표
- **접근성**: prefers-reduced-motion 미디어 쿼리 존중
- **브라우저 지원**: Chrome/Firefox/Safari/Edge 최신 2 버전

---

## 3. Technical Design

### 3.1 Architecture Overview
```
React App
├── Animation Layer (Orchestrator)
│   ├── Framer Motion Provider
│   │   ├── Scroll-triggered Animations (whileInView)
│   │   ├── Layout Animations
│   │   └── Gesture Animations (whileHover, whileTap)
│   ├── tsparticles Engine
│   │   └── Particle Canvas (Hero Background)
│   └── Custom Animation Hooks
│       ├── useTypingAnimation
│       ├── useCountUp
│       ├── useMousePosition
│       └── useScrollProgress
├── Component Layer
│   ├── Navbar (blur on scroll)
│   ├── Hero (particles + typing)
│   ├── Features (stagger cards)
│   ├── Interactive (parallax)
│   ├── Stats (count-up)
│   ├── CTA (pulse + glow)
│   └── Footer
└── Style Layer (Tailwind CSS)
    ├── Responsive breakpoints
    ├── Custom animations (@keyframes)
    └── GPU-accelerated transforms
```

### 3.2 Component Design

#### 3.2.1 Particle Background (Hero)

- **Responsibility**: 히어로 섹션 배경에 인터랙티브 파티클 이펙트 렌더링
- **Technology**: `@tsparticles/react`, `@tsparticles/slim`
- **Interface**:
```typescript
interface ParticleConfig {
  particleCount: number;       // 데스크탑: 80, 모바일: 30
  color: string[];             // ['#6366f1', '#8b5cf6', '#06b6d4']
  linkDistance: number;        // 150
  moveSpeed: number;           // 1.5
  interactivity: {
    onHover: 'grab' | 'repulse' | 'bubble';
    onClick: 'push' | 'remove';
  };
}
```
- **Dependencies**: tsparticles engine (slim preset ~15KB gzipped)
- **Performance**: Canvas 2D 렌더링, requestAnimationFrame 기반

#### 3.2.2 Typing Animation

- **Responsibility**: 히어로 타이틀에서 키워드를 순환하며 타이핑 효과
- **Technology**: Custom React hook + CSS cursor blink
- **Interface**:
```typescript
interface UseTypingAnimationOptions {
  words: string[];             // 순환할 단어 목록
  typingSpeed: number;         // ms per character (default: 100)
  deletingSpeed: number;       // ms per character (default: 50)
  pauseDuration: number;       // ms between words (default: 2000)
}

interface UseTypingAnimationReturn {
  displayText: string;
  isTyping: boolean;
  currentWordIndex: number;
}
```

#### 3.2.3 Scroll-triggered Animations

- **Responsibility**: 섹션이 뷰포트에 진입할 때 애니메이션 트리거
- **Technology**: Framer Motion `whileInView`, `useScroll`, `useTransform`
- **Animation Variants**:
```typescript
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
  viewport: { once: true, margin: '-100px' },
};

const staggerContainer = {
  whileInView: {
    transition: { staggerChildren: 0.15 },
  },
};
```

#### 3.2.4 Mouse Parallax Effect

- **Responsibility**: 마우스 위치에 따라 요소를 다른 속도로 이동시켜 깊이감 생성
- **Technology**: Custom hook + CSS transforms
- **Interface**:
```typescript
interface UseMousePositionReturn {
  x: number;  // normalized -1 to 1
  y: number;  // normalized -1 to 1
}

// Usage in component:
// transform: `translate(${x * depth}px, ${y * depth}px)`
// depth 값이 클수록 더 많이 이동 (전경), 작을수록 적게 이동 (배경)
```

#### 3.2.5 Count-up Animation

- **Responsibility**: 통계 숫자가 뷰포트에 들어올 때 0부터 목표값까지 카운트업
- **Technology**: Custom hook + requestAnimationFrame
- **Interface**:
```typescript
interface UseCountUpOptions {
  end: number;
  duration: number;      // ms (default: 2000)
  startOnView: boolean;  // IntersectionObserver trigger
  easing: 'linear' | 'easeOut' | 'easeInOut';
}

interface UseCountUpReturn {
  count: number;
  ref: React.RefObject<HTMLElement>;
  isComplete: boolean;
}
```
- **Algorithm**:
  - easeOut 함수: `1 - (1 - t)^3` (cubic ease-out)
  - requestAnimationFrame으로 매 프레임 값 업데이트
  - IntersectionObserver로 뷰포트 진입 감지
  - 한 번만 실행 (once: true)
  - **Complexity**: O(1) per frame, 총 ~120 frames (2초 @ 60fps)

### 3.3 Data Structures

#### AnimationVariant
```typescript
interface AnimationVariant {
  initial?: TargetAndTransition;
  animate?: TargetAndTransition;
  whileInView?: TargetAndTransition;
  whileHover?: TargetAndTransition;
  whileTap?: TargetAndTransition;
  exit?: TargetAndTransition;
  transition?: Transition;
  viewport?: ViewportOptions;
}
```

#### ParticleEngineConfig
```typescript
interface ParticleEngineConfig {
  particles: {
    number: { value: number; density: { enable: boolean; area: number } };
    color: { value: string[] };
    shape: { type: 'circle' };
    opacity: { value: { min: number; max: number }; animation: { enable: boolean; speed: number } };
    size: { value: { min: number; max: number } };
    links: { enable: boolean; distance: number; color: string; opacity: number; width: number };
    move: { enable: boolean; speed: number; direction: 'none'; outModes: { default: 'out' } };
  };
  interactivity: {
    events: {
      onHover: { enable: boolean; mode: string };
      onClick: { enable: boolean; mode: string };
    };
    modes: {
      grab: { distance: number; links: { opacity: number } };
      push: { quantity: number };
    };
  };
  detectRetina: boolean;
}
```

#### Static Content Data
```typescript
// src/data/content.ts

interface HeroContent {
  title: string;
  rotatingWords: string[];
  subtitle: string;
  ctaText: string;
}

interface FeatureItem {
  icon: string;         // Lucide icon name
  title: string;
  description: string;
  gradient: string;     // Tailwind gradient classes
}

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

interface CTAContent {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}
```

### 3.4 Algorithms

#### Typing Animation State Machine
**Purpose**: 타이핑 → 일시정지 → 삭제 → 다음 단어 순환
**Approach**: 상태 기계(state machine) 패턴
**Complexity**: O(1) per tick

```
States: TYPING → PAUSING → DELETING → PAUSING_BEFORE_NEXT → TYPING
                                                              ↑____________|

function typingStateMachine(state, currentText, targetWord):
    switch state:
        case TYPING:
            if currentText.length < targetWord.length:
                append next character
                schedule after typingSpeed ms
            else:
                state = PAUSING
                schedule after pauseDuration ms

        case PAUSING:
            state = DELETING
            schedule after deletingSpeed ms

        case DELETING:
            if currentText.length > 0:
                remove last character
                schedule after deletingSpeed ms
            else:
                state = PAUSING_BEFORE_NEXT
                advance to next word (circular)
                schedule after 500ms

        case PAUSING_BEFORE_NEXT:
            state = TYPING
            schedule after typingSpeed ms
```

#### Count-up with Easing
**Purpose**: 숫자를 자연스럽게 증가시키는 애니메이션
**Approach**: requestAnimationFrame + easing function
**Complexity**: O(1) per frame

```
function countUp(startTime, duration, endValue, easing):
    elapsed = now() - startTime
    progress = min(elapsed / duration, 1.0)

    easedProgress = easing(progress)  // e.g., 1 - (1 - t)^3
    currentValue = round(easedProgress * endValue)

    if progress < 1.0:
        requestAnimationFrame(countUp)
    return currentValue
```

#### Responsive Particle Scaling
**Purpose**: 기기 성능에 따라 파티클 수 자동 조절
**Approach**: 화면 크기 + devicePixelRatio 기반
**Complexity**: O(1)

```
function getParticleCount(screenWidth, pixelRatio):
    if screenWidth < 640 or pixelRatio < 2:   // mobile
        return 25
    else if screenWidth < 1024:                // tablet
        return 50
    else:                                      // desktop
        return 80
```

---

## 4. API Specification

외부 API 없음. 모든 데이터는 정적으로 번들에 포함.

### 4.1 Custom Hook APIs

#### useTypingAnimation
```typescript
export function useTypingAnimation(options: UseTypingAnimationOptions): UseTypingAnimationReturn;
// 사용 예:
// const { displayText, isTyping } = useTypingAnimation({
//   words: ['창의적인', '혁신적인', '매력적인'],
//   typingSpeed: 100,
//   deletingSpeed: 50,
//   pauseDuration: 2000,
// });
```

#### useCountUp
```typescript
export function useCountUp(options: UseCountUpOptions): UseCountUpReturn;
// 사용 예:
// const { count, ref } = useCountUp({ end: 1000, duration: 2000, startOnView: true, easing: 'easeOut' });
```

#### useMousePosition
```typescript
export function useMousePosition(): UseMousePositionReturn;
// 사용 예:
// const { x, y } = useMousePosition();
// <div style={{ transform: `translate(${x * 20}px, ${y * 20}px)` }} />
```

#### useScrollProgress
```typescript
export function useScrollProgress(): { progress: number }; // 0 to 1
// Navbar 투명도, 배경 전환 등에 사용
```

### 4.2 Error Handling
- **파티클 엔진 로드 실패**: 그라디언트 배경 폴백
- **IntersectionObserver 미지원**: 즉시 표시 (애니메이션 건너뜀)
- **requestAnimationFrame 미지원**: setTimeout 폴백
- **prefers-reduced-motion**: 모든 애니메이션 비활성, 즉시 최종 상태 표시

---

## 5. Data Model

### 5.1 정적 콘텐츠 파일 구조

모든 데이터는 `src/data/content.ts`에 정적으로 정의:

```typescript
// src/data/content.ts
export const heroContent: HeroContent = {
  title: '우리는 미래를 만듭니다',
  rotatingWords: ['창의적인', '혁신적인', '매력적인', '강력한'],
  subtitle: '당신의 아이디어를 현실로 만드는 가장 빠른 방법',
  ctaText: '시작하기',
};

export const features: FeatureItem[] = [
  {
    icon: 'Zap',
    title: '빠른 속도',
    description: '번개처럼 빠른 성능으로 사용자 경험을 극대화합니다.',
    gradient: 'from-yellow-400 to-orange-500',
  },
  // ... 4-6개 항목
];

export const stats: StatItem[] = [
  { value: 10000, suffix: '+', label: '활성 사용자' },
  { value: 99, suffix: '%', label: '만족도' },
  { value: 50, suffix: 'M+', label: '처리된 요청' },
  { value: 24, suffix: '/7', label: '지원' },
];
```

### 5.2 Data Flow
```
content.ts (static) → Component Props → Framer Motion Variants → DOM Render → CSS GPU Layer
```

---

## 6. Security Considerations

### 6.1 Threat Model
| Threat | Impact | Likelihood | Mitigation |
|--------|--------|------------|------------|
| XSS via content injection | Low | Very Low | 정적 콘텐츠만 사용, 사용자 입력 없음 |
| Supply chain attack (npm) | Medium | Low | npm audit, lockfile 고정, Dependabot |
| CDN hijacking | Medium | Very Low | SRI (Subresource Integrity) 해시 |

### 6.2 Security Measures
- **CSP 헤더**: `index.html` meta 태그로 설정
  ```html
  <meta http-equiv="Content-Security-Policy"
        content="default-src 'self'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src fonts.gstatic.com; script-src 'self';">
  ```
- **SRI**: 외부 리소스(Google Fonts)에 integrity 해시 적용
- **npm audit**: CI 파이프라인에서 자동 실행

---

## 7. Performance

### 7.1 Requirements
| Metric | Target | Measurement |
|--------|--------|-------------|
| FCP | < 1.5s | Lighthouse |
| LCP | < 2.5s | Lighthouse |
| CLS | < 0.1 | Lighthouse |
| Frame Rate | 60fps | Chrome DevTools Performance |
| Bundle Size (gzipped) | < 200KB | Vite build output |
| Lighthouse Score | 90+ | Lighthouse |

### 7.2 Bundle Size Budget
| Dependency | Estimated gzipped |
|-----------|-------------------|
| React + ReactDOM | ~45KB |
| Framer Motion | ~30KB |
| tsparticles (slim) | ~15KB |
| Tailwind CSS (purged) | ~10KB |
| Lucide React (tree-shaken) | ~5KB |
| Application code | ~15KB |
| **Total** | **~120KB** |

### 7.3 Optimization Strategies

1. **GPU 가속**: 애니메이션은 `transform`과 `opacity`만 사용 → 컴포지터 레이어에서 처리
2. **will-change 적용**: 애니메이션 대상 요소에 `will-change: transform` 힌트
3. **파티클 수 제한**: 모바일 25개, 태블릿 50개, 데스크탑 80개
4. **IntersectionObserver**: 뷰포트 밖 애니메이션 비활성화
5. **Code Splitting**: Vite 자동 청크 분리 (vendor + app)
6. **Font Loading**: `font-display: swap` + preconnect
7. **이미지 최적화**: 이미지 사용 시 WebP 포맷, lazy loading

### 7.4 Reduced Motion Support
```typescript
// src/hooks/useReducedMotion.ts
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  // MediaQueryList change listener
  return reduced;
}

// 사용: 모든 애니메이션 컴포넌트에서 체크
// if (reducedMotion) return finalState immediately
```

---

## 8. Testing Strategy

### 8.1 Unit Tests
- [ ] `useTypingAnimation`: 상태 전환 (typing → pausing → deleting → next word)
- [ ] `useCountUp`: easing 함수 정확도, 경계값 (0, max)
- [ ] `useMousePosition`: normalized 좌표 (-1 to 1)
- [ ] `useScrollProgress`: 0~1 범위 클램핑
- [ ] `useReducedMotion`: prefers-reduced-motion 감지
- [ ] `getParticleCount`: 화면 크기별 파티클 수

### 8.2 Integration Tests
- [ ] Hero 섹션: 파티클 캔버스 렌더링 확인
- [ ] Features 섹션: 스크롤 시 카드 등장 확인
- [ ] Stats 섹션: IntersectionObserver 트리거 후 카운트업 동작
- [ ] Navbar: 스크롤 시 배경 블러 적용
- [ ] 전체 페이지: prefers-reduced-motion 시 모든 애니메이션 비활성

### 8.3 Visual Regression Tests
- [ ] 각 섹션 스크린샷 비교 (Playwright)
- [ ] 모바일/태블릿/데스크탑 반응형 레이아웃
- [ ] 다크 배경에서 텍스트 가독성

### 8.4 Performance Tests
- [ ] Lighthouse CI: 성능 점수 90+ 게이트
- [ ] 번들 사이즈: 200KB gzipped 초과 시 빌드 실패
- [ ] 애니메이션 프레임 드롭: Chrome DevTools Performance 프로파일

### 8.5 Testing Tools
- **Unit/Integration**: Vitest + React Testing Library
- **Visual**: Playwright (선택적)
- **Performance**: Lighthouse CI (GitHub Actions)

---

## 9. Rollout Plan

### 9.1 Feature Flags
이 프로젝트는 단일 정적 사이트이므로 별도 feature flag 없이 전체 배포.
단, `VITE_ENABLE_PARTICLES` 환경 변수로 파티클 이펙트만 선택적 비활성화 가능:
```typescript
const PARTICLES_ENABLED = import.meta.env.VITE_ENABLE_PARTICLES !== 'false';
```

### 9.2 Deployment Phases

1. **Phase 1: 로컬 개발** (Day 1)
   - 프로젝트 초기화 (Vite + React + TypeScript)
   - Tailwind CSS, Framer Motion, tsparticles 설치
   - 기본 컴포넌트 구조 생성

2. **Phase 2: 핵심 애니메이션 구현** (Day 1-2)
   - Hero 섹션: 파티클 + 타이핑 애니메이션
   - Features 섹션: 스크롤 스태거 애니메이션
   - Stats 섹션: 카운트업 애니메이션

3. **Phase 3: 인터랙션 및 폴리싱** (Day 2)
   - 마우스 패럴랙스 효과
   - CTA 펄스/글로우 효과
   - Navbar 스크롤 반응
   - 반응형 디자인 검증

4. **Phase 4: 성능 최적화 및 배포** (Day 2-3)
   - Lighthouse 성능 측정 및 최적화
   - GitHub Actions CI/CD 설정
   - GitHub Pages 배포

### 9.3 Rollback Plan
1. GitHub Pages는 이전 배포 커밋으로 `gh-pages` 브랜치를 revert하여 즉시 롤백
2. `git revert` → push → 자동 재배포
3. 데이터 마이그레이션 없음 (정적 사이트)

---

## 10. Open Questions

- [ ] 콘텐츠 언어: 한국어 전용 vs 영어 병행? → 현재는 한국어 전용으로 진행
- [ ] 파티클 이펙트 대신 CSS-only 대안 검토 필요? → tsparticles slim이 15KB로 충분히 경량
- [ ] Google Analytics 또는 방문자 추적 추가 여부? → 현재 스코프 외, 추후 결정
- [ ] 커스텀 도메인 연결 여부? → GitHub Pages 기본 도메인으로 시작

---

## 11. References

- [Framer Motion Documentation](https://www.framer.com/motion/)
- [tsparticles Documentation](https://particles.js.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Web Animations Performance](https://web.dev/animations/)
- [prefers-reduced-motion MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)

---

## Appendix

### A. Animation Timing Reference

| Animation | Duration | Easing | Trigger |
|-----------|----------|--------|---------|
| Hero fade-in | 1s | easeOut | Page load |
| Particle init | 0.5s | linear | Page load |
| Typing speed | 100ms/char | linear | Page load |
| Typing delete | 50ms/char | linear | After pause |
| Scroll reveal | 0.6s | easeOut | whileInView |
| Stagger delay | 0.15s | - | Between children |
| Card hover tilt | 0.3s | easeOut | mouseEnter |
| Count-up | 2s | easeOut (cubic) | whileInView |
| CTA pulse | 2s | easeInOut | Continuous (infinite) |
| Navbar blur | 0.3s | easeOut | Scroll > 50px |

### B. Responsive Breakpoints

| Breakpoint | Screen Width | Particle Count | Font Scale | Layout |
|------------|-------------|----------------|------------|--------|
| sm | < 640px | 25 | 0.875x | Stack |
| md | 640-1023px | 50 | 1x | 2-col grid |
| lg | 1024-1279px | 80 | 1x | 3-col grid |
| xl | >= 1280px | 80 | 1.125x | 3-col grid |

### C. Key File Mapping

| File | Content |
|------|---------|
| `src/hooks/useTypingAnimation.ts` | 타이핑 상태 기계 훅 |
| `src/hooks/useCountUp.ts` | 카운트업 애니메이션 훅 |
| `src/hooks/useMousePosition.ts` | 마우스 좌표 정규화 훅 |
| `src/hooks/useScrollProgress.ts` | 스크롤 진행도 훅 |
| `src/hooks/useReducedMotion.ts` | 접근성 모션 감지 훅 |
| `src/components/Hero.tsx` | 파티클 + 타이핑 + 그라디언트 |
| `src/components/Features.tsx` | 스크롤 스태거 카드 |
| `src/components/Interactive.tsx` | 마우스 패럴랙스 |
| `src/components/Stats.tsx` | 카운트업 통계 |
| `src/components/CTA.tsx` | 펄스 버튼 + 글로우 |
| `src/components/Navbar.tsx` | 스크롤 블러 네비 |
| `src/data/content.ts` | 정적 콘텐츠 데이터 |
