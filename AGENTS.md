# AGENTS.md

`blue`는 GitHub 닉네임 **BLUECOOL**의 개인 개발자 블로그입니다.

## 디자인 방향

- 심플하고 미니멀한 디자인을 유지합니다. 장식적인 그라데이션/그림자/과한 애니메이션은 지양합니다.
- 브랜드 아이덴티티는 닉네임 BLUECOOL과 마스코트인 설표(눈표범)의 느낌을 반영합니다.
- 개발자 블로그라는 정체성에 맞게 과한 마케팅/커머셜 톤보다는 담백한 톤을 유지합니다.

## 디자인 시스템

- 색상, 스페이싱, 타이포그래피 값은 하드코딩하지 말고 [src/app/globals.css](src/app/globals.css)의 CSS 변수(토큰)를 사용합니다.
  - 색상: `--bg-color`, `--text-color`, `--theme-color-1~9` 등 라이트/다크 테마 토큰
  - 스페이싱: `--space-1` ~ `--space-16` (4px 기준 스케일)
  - 타이포그래피: `--font-size-xs` ~ `--font-size-3xl`, `--font-weight-normal` ~ `--font-weight-extrabold`
- 스케일에 정확히 맞는 값이 없다고 새 하드코딩 값을 추가하지 말고, 필요하면 토큰을 먼저 확장합니다.
- 다크모드는 `next-themes`가 `<html data-theme="...">`를 토글하는 방식입니다. 컴포넌트에서 직접 라이트/다크를 분기하지 말고 CSS 변수로 처리합니다.
- 스타일링은 CSS Modules를 기본으로 합니다. `styled-components`가 일부 남아있지만 새 컴포넌트는 CSS Modules + 토큰 조합을 우선합니다.
