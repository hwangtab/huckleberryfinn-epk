
---

### **[Master Spec] Huckleberryfinn EPK Website: The Re-Recording**

*   **Version:** 1.0
*   **Date:** 2025-10-20
*   **Author:** Gemini (AI Assistant)
*   **Project Status:** Ready for Development

#### **1. 프로젝트 목표 (Project Goals)**

1.  **서사적 경험 제공:** 2집 재녹음의 서사를 스크롤 인터랙션을 통해 감성적으로 전달하는 몰입형 웹사이트를 구축한다.
2.  **정보 전달의 효율성:** 미디어, 팬, 신규 리스너 모두에게 필요한 정보를 명확하고 아름다운 UI로 제공한다.
3.  **최고 수준의 기술 구현:** Next.js 14, Tailwind CSS, Framer Motion을 활용하여 최적의 성능과 미려한 인터랙션을 갖춘 정적 사이트(Static Site)를 제작한다.

#### **2. 기술 스택 및 환경 설정 (Tech Stack & Environment Setup)**

**2.1. Core Stack**
*   **Framework:** Next.js 최신 버전 (App Router)
*   **Styling:** Tailwind CSS 최신 버전
*   **Animation:** Framer Motion 최신 버전
*   **Deployment:** Vercel

2.  **추가 라이브러리 설치:**
    ```bash
    npm install framer-motion react-intersection-observer
    ```
3.  **GitHub Repository 생성 및 Vercel 연동:**
    *   GitHub에 `huckleberryfinn-epk` 생성 후 Push.
    *   Vercel 대시보드에서 해당 Repository를 Import하여 프로젝트 생성 및 CI/CD 파이프라인 자동 구축.

#### **3. 디자인 시스템 및 전역 스타일 (Design System & Global Styles)**

**3.1. `tailwind.config.js` 설정**
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'hbf-yellow': '#F3A847',
        'hbf-yellow-light': '#F7BC74',
        'hbf-charcoal': '#2A2A2A',
        'hbf-charcoal-light': '#4F4F4F',
        'hbf-bluegray': '#8B9AAB',
        'hbf-white': '#FDFBF6',
      },
      fontFamily: {
        sans: ['var(--font-pretendard)'], // 본문용
        display: ['var(--font-cafe24-ssurround)'], // 헤드라인용
      },
      backgroundImage: {
        'canvas-texture': "url('/images/textures/canvas-subtle.png')",
      },
    },
  },
  plugins: [],
};
```

**3.2. 폰트 설정 (`app/layout.js`)**
*   `next/font/local`을 사용하여 로컬 폰트 파일(`public/fonts`)을 로드하고 CSS 변수로 지정한다.

```javascript
// app/layout.js
import localFont from 'next/font/local';

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-pretendard',
});

const cafe24 = localFont({
  src: '../public/fonts/Cafe24Ssurround.woff2',
  display: 'swap',
  variable: '--font-cafe24-ssurround',
});

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={`${pretendard.variable} ${cafe24.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

**3.3. 전역 CSS (`app/globals.css`)**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply bg-hbf-white text-hbf-charcoal font-sans antialiased;
  /* 안티앨리어싱으로 폰트 렌더링 최적화 */
}

/* 스크롤바 커스텀 (선택 사항) */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #c4c4c4;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
```

---

#### **4. 컴포넌트 아키텍처 (Component Architecture)**

**4.1. UI 컴포넌트 (`/components/ui`)**
*   `Heading.js`: 섹션 제목 컴포넌트. `level` (h1-h6), `children`, `className` props를 받는다.
*   `Button.js`: CTA 버튼. `variant` ('primary', 'secondary'), `href`, `children`, `onClick` props를 받는다.
    *   `primary`: `bg-hbf-charcoal text-hbf-white hover:bg-hbf-charcoal-light`
    *   `secondary`: `border border-hbf-charcoal text-hbf-charcoal hover:bg-hbf-charcoal hover:text-hbf-white`

**4.2. Feature 컴포넌트 (`/components/features`)**
*   `CustomAudioPlayer.js`:
    *   **Props:** `src: string`, `title: string`, `producersNote: string`
    *   **State:** `isPlaying: boolean`, `progress: number`
    *   **Functionality:** HTML5 `<audio>` element를 내부적으로 제어. 재생/일시정지 토글, 재생 시간 시각화.
*   `PressKitDownloader.js`:
    *   **Props:** `items: { title: string, type: string, href: string }[]`
    *   **Functionality:** props로 받은 아이템 리스트를 렌더링. 각 아이템은 다운로드 링크(`<a>` 태그의 `download` 속성 활용)를 포함.

**4.3. Section 컴포넌트 (`/app/_components`)**
*   페이지를 구성하는 각 섹션을 독립된 컴포넌트로 분리하여 `app/page.js`의 가독성을 높인다.

---

#### **5. 섹션별 상세 구현 명세 (Section-by-Section Implementation Spec)**

**5.1. Section 1: Intro (`section-intro.js`)**
*   **레이아웃:** `flex flex-col justify-center items-center h-screen bg-hbf-yellow bg-canvas-texture`.
*   **애니메이션 (Framer Motion):**
    *   컨테이너 `motion.div`에 `variants`를 정의하여 자식 요소들의 순차적 애니메이션(stagger)을 구현한다.
    *   **Parent Variant:** `staggerChildren: 0.4`
    *   **Child Variant:** `initial={{ opacity: 0, y: 30 }}`, `animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }}`
    *   적용 대상: Headline, Sub-headline, Band Name, Album Title.
*   **반응형:** 폰트 크기를 `text-4xl md:text-6xl lg:text-7xl` 과 같이 브레이크포인트에 따라 조정.

**5.2. Section 2: Narrative (`section-narrative.js`)**
*   **레이아웃:** `md:grid md:grid-cols-2 md:gap-16 items-center`. 모바일에서는 수직 1단.
*   **콘텐츠:** 좌측(이미지), 우측(헤드라인, 본문).
*   **인터랙션 (Framer Motion & `react-intersection-observer`):**
    *   `useScroll`과 `useTransform` 훅을 사용해 스크롤 위치에 따라 이미지를 전환.
    *   **구현 로직:**
        1.  두 개의 `motion.img` (흑백, 컬러)를 `absolute` 포지션으로 겹친다.
        2.  `useScroll({ target: sectionRef, offset: ["start end", "end start"] })`로 섹션 내 스크롤 진행률(`scrollYProgress`)을 측정한다.
        3.  `useTransform(scrollYProgress, [0.3, 0.7], [0, 1])`를 사용해 섹션의 30% ~ 70% 지점을 지날 때 컬러 이미지의 `opacity`가 0에서 1로 변하도록 매핑한다.
*   **텍스트 애니메이션:** 헤드라인과 본문 단락이 뷰포트에 들어왔을 때(`whileInView`) 아래에서 위로 떠오르는 효과 적용.

**5.3. Section 3: Music (`section-music.js`)**
*   **레이아웃:** `flex flex-col items-center`.
*   **컴포넌트:** `CustomAudioPlayer` 컴포넌트를 트랙별로 2회 사용.
*   **인터랙션:**
    *   오디오 재생 시, Lottie 애니메이션(은은한 붓터치 효과)을 배경에 재생하여 시각적 피드백 제공. (`lottie-react` 라이브러리 사용).
    *   'Producer's Note' 버튼 클릭 시, 해당 노트가 담긴 모달 또는 툴팁이 부드럽게 나타남 (`Framer Motion`의 `AnimatePresence` 활용).

**5.4. Section 4: Concert (`section-concert.js`)**
*   **레이아웃:** `bg-hbf-charcoal text-hbf-white`. `md:flex md:items-center md:gap-12`. 모바일에서는 수직 1단.
*   **콘텐츠:** 좌측(포스터 이미지), 우측(헤드라인, 본문, 공연 정보, CTA 버튼).
*   **애니메이션:**
    *   `motion.div`로 섹션 전체를 감싸고 `whileInView`를 통해 요소들이 좌/우에서 등장하도록 설정.
    *   `Image`: `initial={{ opacity: 0, x: -50 }}`
    *   `Text Content`: `initial={{ opacity: 0, x: 50 }}`
    *   `Button` 컴포넌트에 `whileHover={{ scale: 1.05 }}` `whileTap={{ scale: 0.95 }}` 효과 적용.

**5.5. Section 5: The Future (`section-future.js`)**
*   **레이아웃:** `bg-hbf-white`. 중앙 정렬된 텍스트 블록과 CTA 버튼.
*   **인터랙션:** `Benefit Highlight` 부분의 각 키워드('프로듀싱', '오프닝 무대' 등)에 마우스를 올리면 밑줄이 그어지고 설명 툴팁이 나타나는 효과 구현.
*   **CTA:** '프로젝트 참여하기' 버튼은 `mailto:` 링크 또는 외부 신청폼 URL로 연결.

**5.6. Section 6: Press Kit (`section-presskit.js`)**
*   **레이아웃:** 기능성에 초점. `divide-y divide-hbf-charcoal/20` 클래스로 각 항목을 구분하는 리스트 형태.
*   **컴포넌트:** `PressKitDownloader` 컴포넌트 사용.
*   **Props 전달 예시 (`app/page.js`에서):**
    ```jsx
    const pressKitItems = [
      { title: '보도자료 (Press Release)', type: 'PDF, DOCX', href: '/presskit/hbf-press-release.zip' },
      { title: '고해상도 프로필 사진 (Photos)', type: 'JPG, 300dpi', href: '/presskit/hbf-photos.zip' },
      // ... more items
    ];
    <SectionPressKit items={pressKitItems} />
    ```

**5.7. Footer (`components/layout/Footer.js`)**
*   **레이아웃:** `flex justify-between items-center`.
*   **콘텐츠:** 좌측(Copyright © 2025 Huckleberryfinn. All rights reserved.), 우측(SNS 아이콘 링크).
*   **아이콘:** `react-icons` 라이브러리 사용 또는 SVG 아이콘 직접 삽입.

---

#### **6. 에셋 관리 및 최적화 (Asset Management & Optimization)**

*   **이미지:** `public/images`에 저장. `next/image` 컴포넌트를 사용하여 WebP 형식으로 자동 변환 및 Lazy Loading 적용.
*   **오디오:** `public/audio`에 저장. 초기 페이지 로드에 영향을 주지 않도록 사용자가 재생 버튼을 눌렀을 때 로드.
*   **폰트:** `public/fonts`에 `woff2` 형식으로 저장. `next/font`를 통해 서브셋 최적화 및 preload.
*   **프레스킷 파일:** `public/presskit`에 `.zip` 형태로 저장.

#### **7. 접근성 (Accessibility, A11y)**

*   **시맨틱 HTML:** `<h1>`, `<section>`, `<nav>`, `<button>` 등 의미에 맞는 태그 사용.
*   **이미지 대체 텍스트:** 모든 `<img>` 및 `next/image` 컴포넌트에 의미 있는 `alt` 속성 제공.
*   **키보드 네비게이션:** 모든 인터랙티브 요소(버튼, 링크)가 `Tab` 키로 포커싱 가능하고 `Enter` 키로 실행 가능하도록 보장. 포커스 시 `focus-visible` 스타일 적용.
*   **색상 대비:** WCAG AA 기준을 충족하는 텍스트와 배경 색상 대비 유지 (`hbf-charcoal` on `hbf-yellow` 등).

이 명세서는 프로젝트의 성공적인 완수를 위한 청사진입니다. 각 단계와 세부 사항을 따르면, 허클베리핀의 역사적 가치에 걸맞은 높은 완성도의 디지털 결과물을 만들어낼 수 있을 것입니다.