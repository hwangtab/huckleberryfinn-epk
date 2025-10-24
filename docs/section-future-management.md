# SectionFuture 관리 가이드

## 개요

청년 프로젝트 섹션(SectionFuture)은 최종 확정 대기 중인 섹션으로, 필요에 따라 숨기거나 복원할 수 있도록 관리됩니다.

- **파일**: `app/_components/SectionFuture.tsx`
- **상태**: 주석 처리됨 (숨겨짐)
- **최신 커밋**: `1a5311b` - "chore: Hide SectionFuture (youth mentorship project) - pending confirmation"

---

## 현재 상태

### 숨겨진 상태

```
app/page.tsx:
- Line 6: import SectionFuture → 주석 처리 ✓
- Line 20: <SectionFuture /> → 주석 처리 ✓
```

**웹사이트 표시 순서:**
1. Intro (히어로)
2. Narrative (밴드 이야기)
3. Profile (멤버 소개)
4. Music (음악)
5. Concert (콘서트)
6. ~~Future (청년 프로젝트)~~ ← 숨겨짐
7. Press Kit (보도 자료)
8. Footer (푸터)

---

## 복원 방법

### 1단계: app/page.tsx 편집

**Line 6에서 import 주석 해제:**

```typescript
// 변경 전
// import SectionFuture from './_components/SectionFuture'; // 청년 프로젝트 섹션 - 추후 복원 예정

// 변경 후
import SectionFuture from './_components/SectionFuture'; // 청년 프로젝트 섹션
```

**Line 20에서 컴포넌트 호출 주석 해제:**

```typescript
// 변경 전
{/* <SectionFuture /> */}

// 변경 후
<SectionFuture />
```

### 2단계: 확인

```bash
npm run build
git add app/page.tsx
git commit -m "feat: Restore SectionFuture (youth mentorship project)"
git push origin main
```

### 3단계: Vercel 배포 확인

- https://vercel.com/dashboard 접속
- 최신 배포가 "Ready" 상태 확인
- 웹사이트에서 "청년 프로젝트" 섹션 표시 확인

---

## SectionFuture 구성

### 컴포넌트 구조

```
SectionFuture.tsx
├── 제목: "The Future: 청년 음악가 멘토링 프로젝트"
├── 설명: 프로젝트 개요 및 목표
├── 혜택 목록:
│   ├── 멘토링 프로그램
│   ├── 음악 제작 지원
│   ├── 공연 기회
│   └── 네트워킹
└── CTA 버튼: 신청 링크
```

### 스타일

- **배경색**: `bg-hbf-white` (밝은 배경)
- **텍스트색**: `text-hbf-charcoal` (어두운 텍스트)
- **애니메이션**: Framer Motion (scroll-triggered)
- **반응형**: 모바일 ~ 데스크톱 완벽 지원

---

## 파일 보존 상태

### Git에 저장된 파일

```
✅ app/_components/SectionFuture.tsx (완전하게 보존됨)
✅ 모든 커밋 히스토리 (Git log에서 조회 가능)
```

### 복원 불가능한 변경 없음

- 파일이 삭제되지 않음
- Git 히스토리에 모든 기록이 남음
- 언제든지 완벽히 복원 가능

---

## 자주 묻는 질문

### Q1: 파일이 정말 안전한가요?

**A:** 네, 완전히 안전합니다!
- 파일은 여전히 `app/_components/SectionFuture.tsx`에 존재
- Git에 전체 히스토리가 기록되어 있음
- 언제든지 복원 가능

### Q2: 복원하면 이전 코드 그대로 나오나요?

**A:** 네, 정확히 같습니다!
- `app/_components/SectionFuture.tsx` 파일의 내용은 변경되지 않음
- import와 렌더링만 주석 처리된 것
- 주석 해제하면 즉시 작동

### Q3: 복원할 때 빌드 오류가 나면?

**A:** 다음을 확인하세요:
```bash
# 의존성 재설치
npm install

# 빌드 테스트
npm run build

# 캐시 제거 후 빌드
rm -rf .next
npm run build
```

### Q4: 얼마나 자주 복원/숨김을 반복할 수 있나요?

**A:** 무제한입니다!
- 파일 생성/삭제가 아니라 import/rendering 주석 처리일 뿐
- 성능 영향 없음
- 원하는 만큼 반복 가능

---

## 관련 커밋

| 커밋 | 메시지 | 날짜 |
|------|--------|------|
| `1a5311b` | chore: Hide SectionFuture | 2025-10-23 |

### 커밋 보기

```bash
git show 1a5311b
```

---

## 나중에 참고할 정보

### 섹션 내용 (확정 전)

```
제목: The Future - 청년 음악가 멘토링 프로젝트
설명: 허클베리핀이 시작하는 새로운 도전

혜택:
- 1:1 음악 멘토링
- 음악 제작 지원
- 공연 무대 제공
- 업계 네트워킹
```

### 링크

- **파일 경로**: `app/_components/SectionFuture.tsx`
- **페이지 경로**: `app/page.tsx`
- **스타일**: Tailwind CSS + Framer Motion

---

## 체크리스트

복원 시 확인 사항:

- [ ] `app/page.tsx` Line 6 주석 해제
- [ ] `app/page.tsx` Line 20 주석 해제
- [ ] `npm run build` 성공
- [ ] Git commit 생성
- [ ] GitHub push 완료
- [ ] Vercel 배포 완료 (Ready 상태)
- [ ] 웹사이트에서 섹션 표시 확인

---

**마지막 업데이트**: 2025-10-23
**상태**: 숨겨짐 (미확정)
**복원 예정**: 청년 프로젝트 최종 확정 시점
