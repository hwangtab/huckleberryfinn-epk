# EPK 웹사이트 개선 작업 상세 가이드

## 📋 목차
1. [프로젝트 개요](#프로젝트-개요)
2. [작업 배경 및 목적](#작업-배경-및-목적)
3. [상세 작업 내용](#상세-작업-내용)
4. [기술 구현 가이드](#기술-구현-가이드)
5. [일정 및 마일스톤](#일정-및-마일스톤)
6. [체크리스트](#체크리스트)

---

## 프로젝트 개요

### 기본 정보
- **프로젝트명**: 허클베리핀 EPK 웹사이트 개편
- **목적**: 2025년 리마스터링 앨범 프로모션을 위한 웹사이트 개선
- **타겟 오픈일**: 2025년 11월 12일 (화)
- **관련 공연**: 2025년 12월 13일 옐로우(Yellow) 공연

### 관련 인물
- **개발 담당**: 황경하
- **클라이언트**: 허클베리핀 (밴드)
- **음원/콘텐츠 제공**: 허클베리핀 측

---

## 작업 배경 및 목적

### 1. 왜 이 작업을 하는가?

허클베리핀은 2001년에 발매했던 앨범을 2025년에 리마스터링하여 재발매합니다. 이번 EPK(Electronic Press Kit) 웹사이트 개편은 다음 목적을 가집니다:

1. **차별화된 경험 제공**
   - 단순히 앨범 정보만 제공하는 것이 아닌, "과거와 현재의 음악을 비교"하는 독특한 경험
   - 팬들이 직접 음질 향상을 체감할 수 있는 인터랙티브 콘텐츠

2. **SNS 홍보 포인트 생성**
   - "EPK 사이트에서 옛날 버전과 새 버전을 비교해볼 수 있다"는 메시지로 사이트 방문 유도
   - 단순 정보 나열이 아닌, 방문할 이유 제공

3. **보안 및 정보 관리**
   - 언론용 자료(음원, 보도자료)를 일반 대중에게 노출하지 않기
   - 공개 타이밍 조절

### 2. 현재 문제점

- **음원/자료 링크가 공개되어 있음**: 구글 드라이브 링크로 누구나 접근 가능한 상태
- **갤러리가 단조로움**: 사진이 랜덤으로 표시되어 스토리텔링 부족
- **과거 사진 부족**: 리마스터링의 의미를 시각적으로 전달할 자료 부족
- **차별화 요소 없음**: 다른 EPK와 다를 바 없는 구조

---

## 상세 작업 내용

### 작업 1: 비공개 자료 처리

#### 📍 작업 내용
현재 EPK 사이트에 링크되어 있는 다음 자료들을 제거하거나 비공개 처리합니다:

1. **음원 다운로드 링크**
   - 구글 드라이브에 업로드된 전체 음원 파일
   - 언론/관계자만 접근 가능해야 함

2. **보도자료 링크**
   - PDF 형태의 프레스 릴리스
   - 배경 정보, 크레딧 등

3. **기타 언론용 자료**
   - 고화질 프로필 사진
   - 로고 파일 등

#### 💡 왜 이렇게 하나요?

**문제**: 구글 드라이브 링크는 주소만 알면 누구나 접근할 수 있습니다.
- 예시: `https://drive.google.com/file/d/xxxxx/view`

**해결**: 
- 일반 대중에게는 스트리밍 링크만 제공
- 언론/관계자에게는 별도 비공개 링크 제공
- EPK 사이트에서는 해당 링크들을 완전히 제거

#### 🔧 구현 방법

```html
<!-- 기존 코드 (제거 대상) -->
<div class="download-section">
  <a href="https://drive.google.com/file/d/xxxxx/view">
    음원 다운로드
  </a>
  <a href="https://drive.google.com/file/d/yyyyy/view">
    보도자료 다운로드
  </a>
</div>

<!-- 새로운 코드 -->
<div class="streaming-section">
  <a href="https://www.youtube.com/..." target="_blank">
    YouTube Music
  </a>
  <a href="https://open.spotify.com/..." target="_blank">
    Spotify
  </a>
  <a href="https://music.apple.com/..." target="_blank">
    Apple Music
  </a>
</div>
```

---

### 작업 2: 갤러리 섹션 개편 ⭐

#### 📍 작업 내용

**현재 상태**: 사진 몇 장이 랜덤하게 표시됨

**변경 후 모습**: 모바일 청첩장처럼 넘기면서 볼 수 있는 갤러리

#### 💡 왜 이렇게 하나요?

1. **스토리텔링**: 과거 → 현재 순서로 사진을 배치하여 밴드의 여정을 보여줌
2. **사용자 경험**: 모바일에서 익숙한 스와이프 제스처로 자연스럽게 탐색
3. **콘텐츠 볼륨**: 더 많은 사진을 보기 좋게 정리

#### 🎨 디자인 참고

**모바일 청첩장 스타일이란?**
```
[사진 1]        → 좌우 스와이프 →        [사진 2]
                                          
● ○ ○ ○ ○                              ○ ● ○ ○ ○
(현재 위치 표시)                          (현재 위치 표시)
```

**PC에서는?**
```
┌─────────────────────────────────────┐
│  [←]        [큰 사진]         [→]   │
│                                     │
│  [썸네일1] [썸네일2] [썸네일3] ...  │
└─────────────────────────────────────┘
```

#### 🔧 구현 방법

##### 옵션 1: Swiper.js 사용 (권장)

```html
<!-- HTML 구조 -->
<div class="gallery-section">
  <div class="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <img src="2001-concert-1.jpg" alt="2001년 공연 모습">
        <p class="caption">2001년 첫 앨범 발매 기념 공연</p>
      </div>
      <div class="swiper-slide">
        <img src="2001-recording.jpg" alt="2001년 녹음 중">
        <p class="caption">홍대 근처 작은 스튜디오에서</p>
      </div>
      <div class="swiper-slide">
        <img src="2025-studio.jpg" alt="2025년 스튜디오">
        <p class="caption">2025년, 같은 곡을 다시 녹음하다</p>
      </div>
      <!-- 더 많은 슬라이드... -->
    </div>
    
    <!-- 네비게이션 버튼 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
    
    <!-- 페이지네이션 -->
    <div class="swiper-pagination"></div>
  </div>
</div>
```

```javascript
// JavaScript 초기화
const swiper = new Swiper('.swiper', {
  // 기본 설정
  slidesPerView: 1,
  spaceBetween: 20,
  
  // 자동재생 (선택사항)
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  
  // 키보드 컨트롤
  keyboard: {
    enabled: true,
  },
  
  // 네비게이션
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  
  // 페이지네이션
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  
  // 반응형 설정
  breakpoints: {
    // 모바일
    320: {
      slidesPerView: 1,
    },
    // 태블릿
    768: {
      slidesPerView: 2,
    },
    // 데스크톱
    1024: {
      slidesPerView: 3,
    },
  },
});
```

```css
/* CSS 스타일링 */
.gallery-section {
  max-width: 1200px;
  margin: 60px auto;
  padding: 0 20px;
}

.swiper {
  width: 100%;
  height: auto;
}

.swiper-slide {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.swiper-slide img {
  width: 100%;
  height: auto;
  max-height: 600px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.caption {
  margin-top: 16px;
  font-size: 14px;
  color: #666;
  text-align: center;
}

/* 네비게이션 버튼 커스터마이징 */
.swiper-button-prev,
.swiper-button-next {
  color: #333;
}

.swiper-button-prev:after,
.swiper-button-next:after {
  font-size: 32px;
}

/* 페이지네이션 커스터마이징 */
.swiper-pagination-bullet {
  background: #333;
  opacity: 0.3;
}

.swiper-pagination-bullet-active {
  opacity: 1;
  background: #000;
}
```

##### 옵션 2: Lightbox 방식

```html
<!-- 썸네일 그리드 -->
<div class="photo-grid">
  <div class="photo-item" data-index="0">
    <img src="thumb-1.jpg" alt="썸네일 1">
  </div>
  <div class="photo-item" data-index="1">
    <img src="thumb-2.jpg" alt="썸네일 2">
  </div>
  <!-- 더 많은 사진들... -->
</div>

<!-- 라이트박스 모달 -->
<div id="lightbox" class="lightbox">
  <span class="close">&times;</span>
  <img class="lightbox-content" id="lightbox-img">
  <div class="lightbox-caption"></div>
  <a class="prev">&#10094;</a>
  <a class="next">&#10095;</a>
</div>
```

#### 📸 필요한 사진 자료

허클베리핀 측에서 제공해야 할 사진들:

**과거 사진 (2001년 전후)**
- 첫 앨범 녹음 스튜디오 사진
- 당시 공연 사진
- 멤버 프로필 사진
- 음반 자켓 촬영 비하인드
- 연습실 풍경

**현재 사진 (2024-2025년)**
- 리마스터링 작업 중인 스튜디오
- 현재 멤버 프로필
- 새 자켓 사진
- 준비 과정 비하인드

**권장 수량**: 최소 15-20장 (스토리를 만들기에 적절한 양)

**파일 형식**:
- 포맷: JPG 또는 PNG
- 해상도: 최소 1920x1080px (Full HD)
- 용량: 장당 2-5MB 정도

---

### 작업 3: 음원 비교 섹션 제작 ⭐⭐⭐ (최우선)

이것이 이번 개편의 핵심이자 가장 중요한 작업입니다.

#### 📍 작업 내용

**목표**: 방문자가 2001년 버전과 2025년 리마스터링 버전을 직접 듣고 비교할 수 있게 하기

#### 💡 왜 이렇게 하나요?

**문제 상황**:
- "음질이 좋아졌어요"라고 말만 하면 → 믿기 어려움
- 전체 음원을 다 듣게 하면 → 시간이 오래 걸려 이탈

**해결책**:
- 가장 차이가 나는 부분만 15-30초 짧게 편집
- 직접 들어보고 비교하게 함
- 두 버전을 각각 재생 가능하게 (스스로 컨트롤)

**효과**:
1. 팬들의 호기심 자극
2. SNS 공유 포인트 ("들어보니 진짜 다르더라!")
3. 웹사이트 방문 이유 제공
4. 리마스터링 가치 증명

#### 🎵 곡 선정 기준

회의에서 논의된 내용:
- **전체 수록곡이 아닌 4-5곡만** 선정
- 변화가 큰 곡 위주로

**선정 예상 곡**:
1. 길들여진 개
2. 훌라 (Hula)
3. 고양이
4. (추가 1곡)
5. (추가 1곡)

**제외 곡**:
- 사막 (변화가 적음)
- 기타 큰 변화 없는 곡들

#### 🔧 구현 방법 - 1단계 (음원 플레이어)

##### UI 디자인 예시

```
┌─────────────────────────────────────────────┐
│  🎵 길들여진 개 (Tamed Dog)                │
│                                             │
│  비교 포인트: 드럼 사운드와 보컬 믹싱      │
│  ─────────────────────────────────────────  │
│                                             │
│  📼 2001 Original Version                  │
│  ▶️ ━━━━━━━●───── 0:08 / 0:15            │
│  [2001년 버전의 특징적인 사운드]           │
│                                             │
│  🎚️ 2025 Remastered Version              │
│  ▶️ ━━━━━━━━━━━ 0:00 / 0:15             │
│  [깨끗해진 음질과 선명한 악기 분리]        │
│                                             │
└─────────────────────────────────────────────┘
```

##### HTML 구조

```html
<section class="audio-comparison">
  <h2>음원 비교하기</h2>
  <p class="section-description">
    2001년 오리지널과 2025년 리마스터링 버전을 직접 비교해보세요.
    <br>가장 변화가 큰 부분만 골라 들려드립니다.
  </p>
  
  <!-- 곡 1: 길들여진 개 -->
  <div class="comparison-item">
    <div class="song-header">
      <h3 class="song-title">🎵 길들여진 개</h3>
      <p class="comparison-point">
        <strong>비교 포인트:</strong> 드럼 사운드의 공간감과 보컬 믹싱
      </p>
    </div>
    
    <!-- 2001년 버전 -->
    <div class="audio-player original">
      <div class="player-label">
        <span class="year-badge">2001</span>
        <span class="version-text">Original Version</span>
      </div>
      
      <div class="player-controls">
        <button class="play-btn" data-audio="tamed-dog-2001">
          <svg class="play-icon"><!-- 재생 아이콘 --></svg>
          <svg class="pause-icon" style="display:none;"><!-- 정지 아이콘 --></svg>
        </button>
        
        <div class="progress-bar">
          <div class="progress-fill" style="width: 0%;"></div>
        </div>
        
        <span class="time-display">0:00 / 0:15</span>
      </div>
      
      <audio id="tamed-dog-2001" preload="metadata">
        <source src="/audio/tamed-dog-2001-excerpt.mp3" type="audio/mpeg">
      </audio>
      
      <p class="audio-description">
        초기 CD 마스터링의 특징적인 사운드. 
        당시로서는 최선이었던 믹싱 기술을 확인하세요.
      </p>
    </div>
    
    <!-- 2025년 버전 -->
    <div class="audio-player remastered">
      <div class="player-label">
        <span class="year-badge highlight">2025</span>
        <span class="version-text">Remastered Version</span>
      </div>
      
      <div class="player-controls">
        <button class="play-btn" data-audio="tamed-dog-2025">
          <svg class="play-icon"><!-- 재생 아이콘 --></svg>
          <svg class="pause-icon" style="display:none;"><!-- 정지 아이콘 --></svg>
        </button>
        
        <div class="progress-bar">
          <div class="progress-fill" style="width: 0%;"></div>
        </div>
        
        <span class="time-display">0:00 / 0:15</span>
      </div>
      
      <audio id="tamed-dog-2025" preload="metadata">
        <source src="/audio/tamed-dog-2025-excerpt.mp3" type="audio/mpeg">
      </audio>
      
      <p class="audio-description">
        최신 리마스터링 기술로 되살린 사운드. 
        악기 하나하나가 더 선명하게 들립니다.
      </p>
    </div>
  </div>
  
  <!-- 곡 2: 훌라 -->
  <div class="comparison-item">
    <!-- 위와 동일한 구조 반복 -->
  </div>
  
  <!-- 곡 3, 4, 5... -->
</section>
```

##### CSS 스타일링

```css
/* 섹션 전체 */
.audio-comparison {
  max-width: 900px;
  margin: 80px auto;
  padding: 0 20px;
}

.audio-comparison h2 {
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 16px;
}

.section-description {
  text-align: center;
  color: #666;
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 60px;
}

/* 각 곡 비교 아이템 */
.comparison-item {
  background: #fff;
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 48px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
}

.song-header {
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 2px solid #f0f0f0;
}

.song-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 12px;
}

.comparison-point {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

.comparison-point strong {
  color: #333;
  font-weight: 600;
}

/* 오디오 플레이어 */
.audio-player {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 20px;
}

.audio-player.remastered {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.player-label {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.year-badge {
  display: inline-block;
  padding: 4px 12px;
  background: rgba(0,0,0,0.1);
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.audio-player.remastered .year-badge.highlight {
  background: rgba(255,255,255,0.3);
  color: white;
}

.version-text {
  font-size: 14px;
  font-weight: 500;
}

/* 플레이어 컨트롤 */
.player-controls {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.play-btn {
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  background: #333;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;
}

.play-btn:hover {
  transform: scale(1.05);
  background: #000;
}

.audio-player.remastered .play-btn {
  background: rgba(255,255,255,0.9);
  color: #667eea;
}

.play-icon, .pause-icon {
  width: 20px;
  height: 20px;
}

/* 프로그레스 바 */
.progress-bar {
  flex: 1;
  height: 6px;
  background: rgba(0,0,0,0.1);
  border-radius: 3px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #333;
  border-radius: 3px;
  transition: width 0.1s linear;
}

.audio-player.remastered .progress-fill {
  background: white;
}

/* 시간 표시 */
.time-display {
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  min-width: 80px;
  text-align: right;
}

/* 설명 텍스트 */
.audio-description {
  font-size: 13px;
  line-height: 1.5;
  color: #666;
  margin: 0;
}

.audio-player.remastered .audio-description {
  color: rgba(255,255,255,0.9);
}

/* 반응형 */
@media (max-width: 768px) {
  .comparison-item {
    padding: 24px 20px;
  }
  
  .song-title {
    font-size: 20px;
  }
  
  .audio-player {
    padding: 20px 16px;
  }
  
  .play-btn {
    width: 40px;
    height: 40px;
  }
  
  .time-display {
    font-size: 12px;
    min-width: 70px;
  }
}
```

##### JavaScript 기능

```javascript
// 오디오 플레이어 컨트롤러
class AudioComparisonPlayer {
  constructor() {
    this.currentlyPlaying = null;
    this.init();
  }
  
  init() {
    // 모든 재생 버튼에 이벤트 리스너 추가
    document.querySelectorAll('.play-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const audioId = btn.getAttribute('data-audio');
        this.togglePlay(audioId, btn);
      });
    });
    
    // 모든 오디오 요소에 이벤트 추가
    document.querySelectorAll('audio').forEach(audio => {
      // 시간 업데이트
      audio.addEventListener('timeupdate', () => {
        this.updateProgress(audio);
      });
      
      // 재생 종료
      audio.addEventListener('ended', () => {
        this.resetPlayer(audio);
      });
    });
    
    // 프로그레스 바 클릭 이벤트
    document.querySelectorAll('.progress-bar').forEach(bar => {
      bar.addEventListener('click', (e) => {
        this.seek(e, bar);
      });
    });
  }
  
  togglePlay(audioId, button) {
    const audio = document.getElementById(audioId);
    
    // 다른 오디오가 재생 중이면 정지
    if (this.currentlyPlaying && this.currentlyPlaying !== audio) {
      this.currentlyPlaying.pause();
      this.resetPlayer(this.currentlyPlaying);
    }
    
    // 현재 오디오 재생/정지 토글
    if (audio.paused) {
      audio.play();
      this.currentlyPlaying = audio;
      button.querySelector('.play-icon').style.display = 'none';
      button.querySelector('.pause-icon').style.display = 'block';
    } else {
      audio.pause();
      button.querySelector('.play-icon').style.display = 'block';
      button.querySelector('.pause-icon').style.display = 'none';
    }
  }
  
  updateProgress(audio) {
    const player = audio.closest('.audio-player');
    const progressFill = player.querySelector('.progress-fill');
    const timeDisplay = player.querySelector('.time-display');
    
    // 프로그레스 바 업데이트
    const percentage = (audio.currentTime / audio.duration) * 100;
    progressFill.style.width = percentage + '%';
    
    // 시간 표시 업데이트
    const current = this.formatTime(audio.currentTime);
    const total = this.formatTime(audio.duration);
    timeDisplay.textContent = `${current} / ${total}`;
  }
  
  resetPlayer(audio) {
    const player = audio.closest('.audio-player');
    const button = player.querySelector('.play-btn');
    const progressFill = player.querySelector('.progress-fill');
    
    audio.currentTime = 0;
    progressFill.style.width = '0%';
    button.querySelector('.play-icon').style.display = 'block';
    button.querySelector('.pause-icon').style.display = 'none';
    
    if (this.currentlyPlaying === audio) {
      this.currentlyPlaying = null;
    }
  }
  
  seek(event, progressBar) {
    const player = progressBar.closest('.audio-player');
    const audio = player.querySelector('audio');
    const clickX = event.offsetX;
    const width = progressBar.offsetWidth;
    const percentage = clickX / width;
    
    audio.currentTime = audio.duration * percentage;
  }
  
  formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
  new AudioComparisonPlayer();
});
```

#### 📦 필요한 음원 파일

허클베리핀 측에서 준비해야 할 것:

**각 선정 곡마다**:
1. **2001년 버전 편집본**
   - 파일명 예시: `tamed-dog-2001-excerpt.mp3`
   - 길이: 15-30초
   - 형식: MP3 (320kbps 권장)
   - 구간: 가장 차이가 나는 부분

2. **2025년 버전 편집본**
   - 파일명 예시: `tamed-dog-2025-excerpt.mp3`
   - 길이: 동일 구간, 동일 길이
   - 형식: MP3 (320kbps 권장)

**추가 정보**:
- 각 곡의 비교 포인트 설명 (예: "드럼 사운드의 공간감")
- 각 버전에 대한 짧은 설명 (선택사항)

**전달 방법**:
```
곡명_연도_excerpt.mp3

예시:
- 길들여진개_2001_excerpt.mp3
- 길들여진개_2025_excerpt.mp3
- 훌라_2001_excerpt.mp3
- 훌라_2025_excerpt.mp3
```

---

### 작업 4: 2단계 - 유튜브 비교 영상 제작 (후속)

1단계 음원 플레이어가 완성되고 운영된 후, 추가로 제작할 콘텐츠입니다.

#### 📍 작업 내용

음원 비교를 시각적으로 더 매력적으로 만든 영상 버전

#### 💡 왜 영상으로도 만드나요?

**1단계의 한계**:
- 오디오만으로는 SNS 공유가 제한적
- 유튜브, 인스타그램 등에서 활용 불가

**영상의 장점**:
- 유튜브 쇼츠, 인스타그램 릴스로 확산 가능
- 시각적 효과로 청각적 차이를 강조
- 독립적인 콘텐츠로도 가치 있음

#### 🎬 영상 컨셉

**Before/After 플러그인 광고 스타일**

음악 제작자들이 많이 보는 플러그인(이펙터, 믹싱 도구) 광고에서 사용하는 형식:
- "이 플러그인 쓰기 전 vs 쓴 후"를 극명하게 대비
- 시각적으로도 변화를 표현 (흑백→컬러 등)

**타임라인 구성**:
```
0:00-0:02  타이틀 화면
            "길들여진 개"
            "2001 vs 2025"

0:02-0:12  2001년 버전 재생
            - 흑백 화면
            - "2001 ORIGINAL" 텍스트 오버레이
            - 빈티지한 비주얼 효과

0:12-0:13  전환 효과
            - 컬러가 확 차오르는 느낌
            - 사운드 이펙트

0:13-0:23  2025년 버전 재생
            - 풀 컬러 화면
            - "2025 REMASTERED" 텍스트
            - 생생한 비주얼

0:23-0:25  엔딩
            "전체 앨범 스트리밍 中"
            [Spotify/YouTube Music 로고]
```

#### 🎨 비주얼 아이디어

##### 옵션 1: 타이포그래피 중심

```
[화면 구성]
┌─────────────────────┐
│                     │
│   길들여진 개        │  ← 트랙명 (큼)
│                     │
│   2001              │  ← 연도 (서서히 나타남)
│   ORIGINAL          │
│                     │
│   [파형 애니메이션]  │  ← 음악에 반응하는 시각화
│                     │
└─────────────────────┘

↓ 전환

┌─────────────────────┐
│                     │
│   길들여진 개        │
│                     │
│   2025              │  ← 폰트가 더 선명하게
│   REMASTERED        │
│                     │
│   [파형 애니메이션]  │  ← 더 다이나믹하게
│                     │
└─────────────────────┘
```

##### 옵션 2: 실제 장비/공간 활용

```
2001년 파트:
- 오래된 녹음 테이프나 CD 플레이어
- 당시 스튜디오 사진 (있다면)
- 흑백 또는 세피아 톤

2025년 파트:
- 현대적인 DAW 화면
- 현재 스튜디오 모습
- 선명한 컬러
```

##### 옵션 3: 분할 화면

```
┌────────────┬────────────┐
│            │            │
│   2001     │   2025     │
│            │            │
│  [흑백]    │  [컬러]    │
│            │            │
│  재생 중... │  대기 중   │
│            │            │
└────────────┴────────────┘

→ 전환 시 화면이 슬라이드되며 교체
```

#### 🔧 제작 도구

**간단한 방법** (권장):
- **Adobe Premiere Pro** or **DaVinci Resolve**
  - 타임라인에 음원 배치
  - 텍스트 애니메이션 추가
  - 컬러 그레이딩으로 분위기 전환

**웹 기반 도구**:
- **Canva** (간단한 텍스트 애니메이션)
- **VEED.io** (온라인 비디오 편집)

**전문 제작**:
- **After Effects** (복잡한 애니메이션)
- **Motion** (Mac 사용자)

#### 📱 포맷 사양

**유튜브 쇼츠 / 인스타그램 릴스**:
- 종횡비: 9:16 (세로형)
- 해상도: 1080x1920px
- 길이: 20-30초
- 형식: MP4 (H.264 코덱)

**유튜브 일반 영상**:
- 종횡비: 16:9 (가로형)
- 해상도: 1920x1080px
- 길이: 30초-1분
- 형식: MP4 (H.264 코덱)

#### 📋 제작 단계

1. **스크립트 작성** (5분)
   - 어떤 장면에 어떤 텍스트가 나올지
   - 타이밍 계획

2. **에셋 준비** (30분)
   - 음원 파일 (1단계에서 이미 준비됨)
   - 사진/영상 소스 (있다면)
   - 로고, 텍스트 준비

3. **편집** (1-2시간)
   - 타임라인 구성
   - 텍스트 애니메이션
   - 컬러 그레이딩
   - 전환 효과

4. **검토 및 수정** (30분)
   - 오타 확인
   - 타이밍 조정
   - 사운드 레벨 체크

5. **렌더링 및 업로드** (30분)
   - 고화질로 렌더링
   - 유튜브 업로드
   - EPK 사이트 임베드

#### 🌐 웹사이트 임베드 방법

```html
<!-- 유튜브 영상 임베드 -->
<div class="video-comparison-section">
  <h3>영상으로 보는 비교</h3>
  <p>시각적으로 더 생생하게 차이를 느껴보세요</p>
  
  <div class="video-grid">
    <!-- 곡 1 -->
    <div class="video-item">
      <div class="video-wrapper">
        <iframe 
          width="100%" 
          height="315" 
          src="https://www.youtube.com/embed/VIDEO_ID_1" 
          title="길들여진 개 - 2001 vs 2025"
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      </div>
      <h4>길들여진 개</h4>
    </div>
    
    <!-- 곡 2 -->
    <div class="video-item">
      <div class="video-wrapper">
        <iframe 
          width="100%" 
          height="315" 
          src="https://www.youtube.com/embed/VIDEO_ID_2" 
          title="훌라 - 2001 vs 2025"
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      </div>
      <h4>훌라</h4>
    </div>
  </div>
</div>
```

```css
.video-comparison-section {
  max-width: 1200px;
  margin: 60px auto;
  padding: 0 20px;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
  margin-top: 40px;
}

.video-wrapper {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 비율 */
  height: 0;
  overflow: hidden;
  border-radius: 12px;
}

.video-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.video-item h4 {
  margin-top: 16px;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
}
```

---

## 기술 구현 가이드

### 개발 환경 설정

#### 필요한 라이브러리

```html
<!-- index.html의 <head>에 추가 -->

<!-- Swiper.js (갤러리용) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

<!-- Font Awesome (아이콘용, 선택사항) -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
```

### 폴더 구조

```
epk-website/
│
├── index.html                 # 메인 페이지
├── css/
│   ├── main.css              # 기본 스타일
│   ├── gallery.css           # 갤러리 전용 스타일
│   └── audio-player.css      # 오디오 플레이어 전용 스타일
│
├── js/
│   ├── main.js               # 메인 스크립트
│   ├── gallery.js            # 갤러리 초기화
│   └── audio-player.js       # 오디오 플레이어 컨트롤
│
├── audio/
│   ├── 2001/                 # 2001년 버전 음원들
│   │   ├── tamed-dog-excerpt.mp3
│   │   ├── hula-excerpt.mp3
│   │   └── ...
│   └── 2025/                 # 2025년 버전 음원들
│       ├── tamed-dog-excerpt.mp3
│       ├── hula-excerpt.mp3
│       └── ...
│
├── images/
│   ├── gallery/
│   │   ├── 2001/             # 과거 사진들
│   │   │   ├── concert-01.jpg
│   │   │   ├── studio-01.jpg
│   │   │   └── ...
│   │   └── 2025/             # 현재 사진들
│   │       ├── remaster-01.jpg
│   │       ├── studio-01.jpg
│   │       └── ...
│   └── icons/                # 각종 아이콘
│
└── videos/                   # 비교 영상 (2단계)
    ├── tamed-dog-comparison.mp4
    └── ...
```

### 성능 최적화

#### 1. 이미지 최적화

```bash
# ImageMagick을 사용한 일괄 리사이징
mogrify -resize 1920x1080 -quality 85 *.jpg

# 또는 온라인 도구 사용
# - TinyPNG (https://tinypng.com/)
# - Squoosh (https://squoosh.app/)
```

#### 2. 오디오 파일 최적화

```bash
# FFmpeg를 사용한 MP3 압축
ffmpeg -i input.wav -codec:a libmp3lame -b:a 320k output.mp3

# 또는 파일 크기가 크다면 192kbps로
ffmpeg -i input.wav -codec:a libmp3lame -b:a 192k output.mp3
```

#### 3. Lazy Loading 구현

```html
<!-- 이미지 레이지 로딩 -->
<img src="placeholder.jpg" data-src="actual-image.jpg" class="lazyload" alt="...">

<!-- 오디오 프리로드 설정 -->
<audio preload="metadata">  <!-- 또는 preload="none" -->
  <source src="audio.mp3">
</audio>
```

```javascript
// Intersection Observer를 사용한 레이지 로딩
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazyload');
      observer.unobserve(img);
    }
  });
});

document.querySelectorAll('img.lazyload').forEach(img => {
  imageObserver.observe(img);
});
```

### 브라우저 호환성

#### 테스트해야 할 브라우저

**데스크톱**:
- Chrome (최신 버전)
- Firefox (최신 버전)
- Safari (최신 버전)
- Edge (최신 버전)

**모바일**:
- iOS Safari (iPhone)
- Chrome (Android)
- Samsung Internet (Android)

#### 오디오 재생 관련 주의사항

```javascript
// iOS에서 오디오 자동재생 제한 우회
// 사용자 인터랙션 후에만 재생 가능

// 나쁜 예 (iOS에서 작동 안 함)
window.onload = function() {
  document.getElementById('audio').play(); // ❌
};

// 좋은 예 (사용자 클릭 필요)
button.addEventListener('click', function() {
  document.getElementById('audio').play(); // ✅
});
```

### SEO 최적화

#### 메타 태그 추가

```html
<head>
  <!-- 기본 메타 태그 -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="허클베리핀 2001년 앨범 리마스터링 프로젝트. 과거와 현재의 음원을 직접 비교해보세요.">
  <meta name="keywords" content="허클베리핀, Huckleberry Finn, 리마스터링, 한국 인디음악, 2001, 2025">
  
  <!-- Open Graph (SNS 공유용) -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="허클베리핀 - 2001 앨범 리마스터링">
  <meta property="og:description" content="24년의 시간을 넘어 되살아난 음악. 2001년 오리지널과 2025년 리마스터링을 비교해보세요.">
  <meta property="og:image" content="https://yoursite.com/images/og-image.jpg">
  <meta property="og:url" content="https://yoursite.com">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="허클베리핀 - 2001 앨범 리마스터링">
  <meta name="twitter:description" content="24년의 시간을 넘어 되살아난 음악">
  <meta name="twitter:image" content="https://yoursite.com/images/twitter-card.jpg">
  
  <title>허클베리핀 - 2001 앨범 리마스터링 | EPK</title>
</head>
```

---

## 일정 및 마일스톤

### 전체 타임라인

```
11월 6일 (수)   ━━━━━  회의 완료
                        ↓
11월 7-8일 (목-금) ━━  자료 수집
                        - 허클베리핀: 과거 사진 선별
                        - 허클베리핀: 음원 편집
                        ↓
11월 9-10일 (토-일) ━  개발 작업
                        - 황경하: 웹사이트 개편
                        - 갤러리 구현
                        - 오디오 플레이어 구현
                        ↓
11월 11일 (월)   ━━━━  검토 및 수정
                        - 허클베리핀 측 피드백
                        - 버그 수정
                        ↓
11월 12일 (화)   ━━━━  🎉 사이트 오픈
                        - SNS 홍보 시작
                        - 추천서 시리즈 마무리와 동시 진행
                        ↓
11월 15일 (금)   ━━━━  응원 영상 촬영 (별도 일정)
                        ↓
11월 22일 (토)   ━━━━  음감회 1차
                        ↓
11월 중-하순      ━━━━  2단계 작업 (여유 있을 때)
                        - 유튜브 비교 영상 제작
                        - EPK 사이트 업데이트
                        ↓
12월 13일 (금)   ━━━━  옐로우 공연
```

### 상세 작업 일정

#### 📅 11월 7-8일 (목-금) - 자료 수집

**허클베리핀 측 준비사항**:

- [ ] **과거 사진 15-20장 선별**
  - 2001년 전후 활동 사진
  - 해상도: 최소 1920x1080px
  - 파일명: `2001-01.jpg`, `2001-02.jpg` 등으로 정리

- [ ] **현재 사진 10-15장 준비**
  - 2024-2025년 리마스터링 작업 사진
  - 파일명: `2025-01.jpg`, `2025-02.jpg` 등

- [ ] **음원 편집 (4-5곡)**
  - 각 곡의 2001년 버전 15-30초 구간
  - 각 곡의 2025년 버전 동일 구간
  - MP3 형식, 320kbps
  - 파일명 규칙 준수 (예: `길들여진개_2001_excerpt.mp3`)

- [ ] **비교 포인트 설명 작성**
  - 각 곡마다 어떤 부분이 달라졌는지 간단히 설명
  - 예: "드럼 사운드의 공간감과 보컬 믹싱이 개선되었습니다"

**전달 방법**:
- 구글 드라이브 폴더에 업로드 후 링크 공유
- 또는 WeTransfer 등 대용량 파일 전송 서비스 이용

#### 📅 11월 9일 (토) - 개발 집중 작업 1일차

**오전 (09:00-12:00)**:
- [x] 개발 환경 설정
- [ ] 기존 구글 드라이브 링크 제거
- [ ] 갤러리 섹션 HTML 구조 작성
- [ ] Swiper.js 설치 및 기본 설정

**오후 (13:00-18:00)**:
- [ ] 갤러리 스타일링 (CSS)
- [ ] 갤러리 기능 구현 (JavaScript)
- [ ] 이미지 업로드 및 테스트
- [ ] 반응형 확인 (모바일/태블릿/데스크톱)

**저녁 (19:00-21:00)**:
- [ ] 오디오 비교 섹션 HTML 구조 작성
- [ ] 첫 번째 곡 플레이어 프로토타입

#### 📅 11월 10일 (일) - 개발 집중 작업 2일차

**오전 (09:00-12:00)**:
- [ ] 오디오 플레이어 CSS 스타일링
- [ ] 플레이어 기능 구현 (재생/정지/탐색)
- [ ] 나머지 곡들 플레이어 추가

**오후 (13:00-18:00)**:
- [ ] 전체 페이지 통합 및 레이아웃 조정
- [ ] 크로스 브라우저 테스트
- [ ] 성능 최적화 (이미지 압축, 레이지 로딩)
- [ ] 모바일 환경 집중 테스트

**저녁 (19:00-21:00)**:
- [ ] 최종 검수
- [ ] 초안 완성 및 허클베리핀 측 공유
- [ ] 피드백 대기

#### 📅 11월 11일 (월) - 검토 및 수정

**오전-오후**:
- [ ] 허클베리핀 측 피드백 확인
- [ ] 수정사항 반영
  - 텍스트 수정
  - 레이아웃 조정
  - 이미지 교체 등
- [ ] 버그 수정

**저녁**:
- [ ] 최종 확인
- [ ] 프로덕션 서버 배포 준비

#### 📅 11월 12일 (화) - 🎉 사이트 오픈

**오전**:
- [ ] 프로덕션 서버 배포
- [ ] 전체 기능 최종 점검
- [ ] SEO 메타 태그 확인

**오후**:
- [ ] SNS 홍보 시작
  - Instagram 포스트
  - Facebook 공유
  - 밴드 공식 채널 공지

**저녁**:
- [ ] 모니터링 (접속자 수, 오류 여부)

#### 📅 11월 중-하순 - 2단계 작업 (유동적)

**언제**:
- 음감회 준비와 겹치지 않는 시간
- 여유가 있을 때 진행

**작업**:
- [ ] 유튜브 비교 영상 제작 (곡당 1-2시간)
- [ ] 영상 업로드 및 최적화
- [ ] EPK 사이트에 영상 섹션 추가
- [ ] SNS 2차 홍보

---

## 체크리스트

### 🎯 착수 전 체크리스트

#### 허클베리핀 측
- [ ] 과거 사진 15-20장 준비 완료
- [ ] 현재 사진 10-15장 준비 완료
- [ ] 비교할 곡 4-5곡 최종 선정
- [ ] 각 곡의 2001년 버전 편집본 (15-30초)
- [ ] 각 곡의 2025년 버전 편집본 (15-30초)
- [ ] 비교 포인트 설명 작성
- [ ] 자료 전달 완료 (구글 드라이브 등)

#### 개발자(황경하) 측
- [ ] 기존 EPK 사이트 백업
- [ ] 개발 환경 설정 완료
- [ ] 필요한 라이브러리 확인 (Swiper.js 등)
- [ ] 호스팅 서버 접속 권한 확인
- [ ] 일정 확보 (주말 양일)

### 🔍 개발 중 체크리스트

#### 갤러리 섹션
- [ ] 이미지 최적화 완료 (용량, 해상도)
- [ ] 갤러리 UI 구현 (Swiper.js)
- [ ] 좌우 네비게이션 버튼 작동
- [ ] 페이지네이션 (●○○○) 표시
- [ ] 이미지 캡션 표시
- [ ] 모바일 스와이프 제스처 작동
- [ ] 데스크톱 반응형 확인
- [ ] 로딩 속도 테스트

#### 음원 비교 섹션
- [ ] HTML 구조 완성
- [ ] CSS 스타일링 완료
- [ ] 재생/정지 버튼 작동
- [ ] 프로그레스 바 업데이트
- [ ] 시간 표시 (0:00 / 0:15)
- [ ] 프로그레스 바 클릭으로 탐색 가능
- [ ] 한 번에 하나의 오디오만 재생
- [ ] 오디오 종료 시 자동 리셋
- [ ] 모든 곡의 플레이어 작동 확인
- [ ] 음원 파일 용량 최적화

#### 전체 페이지
- [ ] 구글 드라이브 링크 제거 완료
- [ ] 스트리밍 플랫폼 링크 추가
- [ ] 전체 레이아웃 일관성 확인
- [ ] 로딩 속도 측정 및 최적화
- [ ] SEO 메타 태그 추가
- [ ] Open Graph 이미지 설정

### 🧪 테스트 체크리스트

#### 브라우저 테스트
- [ ] Chrome (Windows)
- [ ] Chrome (Mac)
- [ ] Firefox (Windows)
- [ ] Firefox (Mac)
- [ ] Safari (Mac)
- [ ] Edge (Windows)
- [ ] iOS Safari (iPhone)
- [ ] Chrome (Android)
- [ ] Samsung Internet (Android)

#### 기능 테스트
- [ ] 갤러리 이미지 로딩
- [ ] 갤러리 스와이프/클릭 네비게이션
- [ ] 오디오 재생/정지
- [ ] 오디오 탐색 (프로그레스 바 클릭)
- [ ] 여러 오디오 동시 재생 방지
- [ ] 모든 링크 작동 확인
- [ ] 폼 제출 (있다면)
- [ ] 404 에러 페이지

#### 반응형 테스트
- [ ] 모바일 (320px-480px)
- [ ] 태블릿 (768px-1024px)
- [ ] 데스크톱 (1280px 이상)
- [ ] 가로/세로 모드 전환
- [ ] 텍스트 가독성
- [ ] 버튼 터치 영역 크기

#### 성능 테스트
- [ ] 페이지 로딩 속도 (3초 이내 목표)
- [ ] 이미지 레이지 로딩 작동
- [ ] 오디오 파일 프리로드 설정
- [ ] 총 페이지 용량 (10MB 이하 권장)
- [ ] Lighthouse 점수 확인

### ✅ 배포 전 최종 체크리스트

#### 콘텐츠 확인
- [ ] 모든 텍스트 오타 검수
- [ ] 이미지 alt 텍스트 작성
- [ ] 링크 주소 재확인
- [ ] 연락처 정보 정확성
- [ ] 공연 날짜/장소 정보 확인

#### 기술적 확인
- [ ] 모든 에셋 파일 업로드 완료
- [ ] 상대 경로 → 절대 경로 확인
- [ ] 캐싱 설정
- [ ] HTTPS 적용 확인
- [ ] 파비콘 설정
- [ ] robots.txt 설정
- [ ] sitemap.xml 생성

#### SNS 준비
- [ ] Open Graph 이미지 (1200x630px)
- [ ] Twitter Card 이미지
- [ ] 공유 문구 준비
- [ ] 해시태그 리스트 준비

### 📊 오픈 후 모니터링 체크리스트

#### 1일차 (11월 12일)
- [ ] 사이트 접속 확인
- [ ] 실시간 방문자 수 모니터링
- [ ] 오류 로그 확인
- [ ] SNS 반응 확인
- [ ] 긴급 버그 대응

#### 1주차
- [ ] Google Analytics 데이터 확인
- [ ] 사용자 피드백 수집
- [ ] 가장 많이 본 페이지 분석
- [ ] 오디오 플레이 통계
- [ ] 개선사항 메모

### 🎬 2단계 작업 체크리스트 (11월 중-하순)

#### 기획 단계
- [ ] 영상 스타일 최종 결정
- [ ] 타임라인/스토리보드 작성
- [ ] 필요한 비주얼 에셋 리스트업
- [ ] 제작 도구 선택

#### 제작 단계
- [ ] 영상 편집 (곡당 1-2시간)
- [ ] 텍스트 애니메이션
- [ ] 컬러 그레이딩
- [ ] 사운드 레벨 조정
- [ ] 검수 및 수정

#### 업로드 단계
- [ ] 유튜브 업로드 (쇼츠 + 일반)
- [ ] 인스타그램 릴스 업로드
- [ ] 제목/설명 최적화
- [ ] 해시태그 추가
- [ ] EPK 사이트 임베드

---

## 💡 팁 & 주의사항

### 개발 팁

#### 1. 작업 전 백업

```bash
# Git을 사용한다면
git add .
git commit -m "개편 작업 시작 전 백업"
git push

# 또는 수동 백업
cp -r /current/website /backup/website-2025-11-09
```

#### 2. 점진적 개발

한 번에 모든 것을 만들려 하지 말고:
1. HTML 구조만 먼저 완성
2. CSS로 스타일링
3. JavaScript로 인터랙션 추가
4. 테스트 및 디버깅

각 단계마다 브라우저에서 확인하며 진행하세요.

#### 3. 콘솔 활용

```javascript
// 개발 중 디버깅용 로그
console.log('오디오 재생 시작:', audioElement.currentTime);
console.error('오류 발생:', error);
console.table(audioList); // 배열/객체를 표로 보기
```

배포 전에는 console.log 제거 또는 주석 처리하세요.

#### 4. 브라우저 개발자 도구 활용

- **Elements 탭**: HTML/CSS 실시간 수정
- **Console 탭**: JavaScript 오류 확인
- **Network 탭**: 파일 로딩 속도 확인
- **Lighthouse 탭**: 성능 점수 측정

### 주의사항

#### ⚠️ 음원 저작권
- 사용하는 모든 음원에 대한 권리가 있는지 확인
- 음원에 대해 third-party 라이센스가 필요한 부분은 없는지 점검

#### ⚠️ 이미지 권리
- 사용하는 모든 사진의 저작권 확인
- 사진 속 사람들의 초상권 동의 여부

#### ⚠️ 음원 파일 크기
- 너무 큰 음원 파일은 로딩 지연 유발
- 15-30초 구간이면 1-2MB 정도가 적당
- 320kbps MP3가 최적 (음질 vs 용량 밸런스)

#### ⚠️ 모바일 우선
- 대부분의 사용자가 모바일로 접속
- 모바일에서 먼저 테스트
- 터치 영역은 최소 44x44px

#### ⚠️ iOS 오디오 제한
- iOS Safari는 사용자 인터랙션 없이 오디오 재생 불가
- 자동재생 기능 구현하지 말 것
- 음소거 상태 확인 안내 추가 고려

#### ⚠️ 브라우저 캐싱
- CSS/JS 파일 수정 후 반영 안 될 수 있음
- 강력 새로고침: Ctrl+Shift+R (Windows) / Cmd+Shift+R (Mac)
- 배포 시 파일명에 버전 추가 고려 (예: `main.css?v=1.1`)

### 트러블슈팅

#### 문제: 오디오가 재생되지 않음

**원인**:
- 파일 경로 오류
- 파일 형식 미지원
- iOS 자동재생 제한

**해결**:
```javascript
// 콘솔에서 확인
audio.addEventListener('error', function(e) {
  console.error('오디오 로딩 실패:', audio.error);
  console.error('파일 경로:', audio.src);
});

// 형식 지원 여부 확인
if (audio.canPlayType('audio/mpeg')) {
  console.log('MP3 재생 가능');
} else {
  console.log('MP3 재생 불가능 - 다른 형식 필요');
}
```

#### 문제: 이미지가 깨져 보임

**원인**:
- 파일 경로 오류
- 파일명 대소문자 불일치
- 파일 업로드 누락

**해결**:
```html
<!-- 이미지 로딩 실패 시 대체 이미지 -->
<img 
  src="images/photo.jpg" 
  onerror="this.src='images/placeholder.jpg'"
  alt="..."
>
```

#### 문제: 갤러리 스와이프가 작동 안 함

**원인**:
- Swiper.js 미로드
- 초기화 타이밍 문제
- CSS 충돌

**해결**:
```javascript
// DOM 로드 완료 후 초기화
document.addEventListener('DOMContentLoaded', function() {
  const swiper = new Swiper('.swiper', {
    // 설정...
  });
  
  console.log('Swiper 초기화됨:', swiper);
});
```

#### 문제: 모바일에서 레이아웃이 깨짐

**원인**:
- viewport 메타 태그 누락
- 고정 너비 사용
- 너무 작은 폰트

**해결**:
```html
<!-- 반드시 포함 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

```css
/* 고정 너비 대신 */
.container {
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
}

/* 상대 단위 사용 */
font-size: 16px; /* ✅ */
font-size: 16pt; /* ❌ */
```

---

## 📞 커뮤니케이션

### 정기 체크인

**11월 9일 (토) 저녁 8시**:
- 1일차 진행 상황 공유
- 이슈 사항 논의
- 다음 날 계획 확인

**11월 10일 (일) 저녁 9시**:
- 초안 완성 공유
- 피드백 요청
- 수정사항 정리

### 긴급 연락

개발 중 긴급한 문제 발생 시:
1. 스크린샷 또는 화면 녹화
2. 오류 메시지 복사
3. 재현 방법 설명
4. 연락 (카톡/전화)

### 피드백 방법

**좋은 피드백 예시**:
```
❌ "갤러리가 이상해요"
✅ "갤러리에서 3번째 사진이 너무 어둡게 보여요. 
    밝기를 조금 올려주실 수 있을까요?"

❌ "오디오가 안 돼요"
✅ "iPhone Safari에서 '길들여진 개' 2025년 버전 재생 버튼을 
    눌렀는데 아무 반응이 없어요"

❌ "디자인이 별로예요"
✅ "음원 비교 섹션의 배경색이 너무 진해서 텍스트가 잘 안 보여요.
    조금 더 밝은 색으로 바꿔주실 수 있을까요?"
```

**피드백 템플릿**:
```markdown
## 위치
- 페이지: 메인 페이지
- 섹션: 음원 비교 섹션

## 문제
- 설명: ...
- 스크린샷: [첨부]

## 원하는 결과
- 설명: ...
- 참고 이미지: [첨부]

## 우선순위
- [ ] 긴급 (사이트 작동 불가)
- [ ] 높음 (사용자 경험에 큰 영향)
- [x] 중간 (개선하면 좋음)
- [ ] 낮음 (나중에 수정 가능)
```

---

## 🎯 성공 지표

### 정량적 지표

**사이트 방문**:
- 목표: 오픈 첫 주 방문자 500명 이상
- 측정: Google Analytics

**오디오 재생**:
- 목표: 방문자의 50% 이상이 최소 1곡 재생
- 측정: JavaScript 이벤트 트래킹

**체류 시간**:
- 목표: 평균 2분 이상
- 측정: Google Analytics

**공유**:
- 목표: SNS 공유 50회 이상
- 측정: Open Graph 추적

### 정성적 지표

**사용자 피드백**:
- 댓글, DM을 통한 긍정적 반응
- "음질 차이를 확실히 느꼈다" 등의 코멘트

**언론 관심**:
- 음악 미디어의 EPK 언급
- 기사화

**티켓 판매**:
- 12월 13일 공연 티켓 판매 증가

---

## 📚 참고 자료

### 기술 문서

**Swiper.js**:
- 공식 문서: https://swiperjs.com/
- 데모: https://swiperjs.com/demos

**HTML5 Audio**:
- MDN 가이드: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
- 오디오 API: https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement

**반응형 디자인**:
- CSS Tricks: https://css-tricks.com/snippets/css/a-guide-to-flexbox/
- Media Queries: https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries

### 디자인 참고

**음원 플레이어**:
- Spotify Web Player
- SoundCloud 임베드 플레이어
- Apple Music Web

**갤러리**:
- Instagram 웹 버전
- Pinterest 레이아웃
- Unsplash

### 도구

**이미지 최적화**:
- TinyPNG: https://tinypng.com/
- Squoosh: https://squoosh.app/

**오디오 편집**:
- Audacity (무료): https://www.audacityteam.org/
- Ocenaudio (무료): https://www.ocenaudio.com/

**성능 테스트**:
- Google PageSpeed Insights: https://pagespeed.web.dev/
- GTmetrix: https://gtmetrix.com/

**브라우저 호환성 체크**:
- Can I Use: https://caniuse.com/

---

## 마무리

이 문서는 EPK 웹사이트 개편 작업의 모든 측면을 다룹니다. 

**핵심 기억사항**:
1. **음원 비교 섹션이 가장 중요** - 이것이 사람들이 방문할 이유
2. **모바일 우선** - 대부분의 사용자가 모바일로 접속
3. **단계별 접근** - 1단계(오디오 플레이어) 완성 후 2단계(영상) 진행
4. **꾸준한 소통** - 정기 체크인과 명확한 피드백

**질문이나 막히는 부분이 있다면**:
- 이 문서를 다시 참고
- 참고 자료 링크 활용
- 즉시 커뮤니케이션

**화이팅! 멋진 EPK 사이트를 만들어봅시다! 🚀**