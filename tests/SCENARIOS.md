# Test Scenarios — task-2026-03-18-003

## Smoke

| ID | Scenario | Test File | Status |
|----|----------|-----------|--------|
| SM-01 | App renders without crashing | `landing-page/src/test/smoke/App.smoke.test.tsx` | ✅ |
| SM-02 | All major landmark sections (nav, main, footer) present | `landing-page/src/test/smoke/App.smoke.test.tsx` | ✅ |
| SM-03 | At least one CTA link (`#cta`) rendered | `landing-page/src/test/smoke/App.smoke.test.tsx` | ✅ |

## Unit

| ID | Scenario | Test File | Status |
|----|----------|-----------|--------|
| UT-01 | `useScrollProgress` returns 0 at top of page | `landing-page/src/test/unit/useScrollProgress.test.ts` | ✅ |
| UT-02 | `useScrollProgress` updates correctly on scroll event | `landing-page/src/test/unit/useScrollProgress.test.ts` | ✅ |

## Regression

_None yet — add entries here when bugs are fixed._

## Integration / E2E

_Not applicable for a static landing page — no multi-module workflows._
