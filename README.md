# English Quiz App for Elementary Students

> 24시간 해커톤 프로젝트 | AI 개발 도구 활용 MVP

## 📝 프로젝트 개요

초등학교 1-3학년을 대상으로 한 대화형 영어 학습 웹 애플리케이션입니다. 4개의 학습 카테고리(Reading, Writing, Vocabulary, Grammar)를 통해 단계별 영어 학습을 지원하며, 각 카테고리당 30개씩 총 120개의 문제를 제공합니다.

### 🎯 프로젝트 목표
- 초등학생의 영어 학습 동기 부여 및 자기주도 학습 지원
- 실시간 피드백을 통한 즉각적인 학습 효과 확인
- 카테고리별 맞춤 학습 컨텐츠 제공
- 확장 가능한 아키텍처로 추가 기능 구현 용이

### 👥 개발 정보
- **팀 구성**: 3명
- **개발 기간**: 24시간 (해커톤)
- **AI 도구 활용**: Cursor, Claude Code, GitHub Copilot
- **개발 방식**: AI 도구를 적극 활용한 빠른 MVP 개발

---

## 🏗️ 아키텍처 설계

### 아키텍처 패턴: 3-Tier Layered Architecture

본 프로젝트는 **3-Tier Layered Architecture** 패턴을 채택하여 각 계층의 책임을 명확히 분리했습니다.

```
┌──────────────────────────────────────────┐
│   Presentation Layer (Client)            │
│   - HTML5 Semantic Markup                │
│   - CSS3 Responsive Design               │
│   - Vanilla JavaScript (SPA)             │
│   - DOM Manipulation & Event Handling    │
└──────────────┬───────────────────────────┘
               │ REST API (JSON)
┌──────────────▼───────────────────────────┐
│   Application Layer (Server)             │
│   - Express.js Middleware                │
│   - API Route Handlers                   │
│   - Business Logic                       │
│   - Input Validation                     │
│   - Error Handling                       │
└──────────────┬───────────────────────────┘
               │ Supabase SDK
┌──────────────▼───────────────────────────┐
│   Data Layer (Database)                  │
│   - Supabase PostgreSQL                  │
│   - JSONB for Complex Data               │
│   - Indexed Queries                      │
└──────────────────────────────────────────┘
```

### 아키텍처 설계 원칙

#### 1. 관심사의 분리 (Separation of Concerns)
- **Presentation**: UI 렌더링 및 사용자 인터랙션 처리
- **Application**: 비즈니스 로직 및 데이터 검증
- **Data**: 영구 저장소 관리 및 데이터 무결성 보장

#### 2. 느슨한 결합 (Loose Coupling)
- REST API를 통한 클라이언트-서버 통신으로 양 측 독립적 개발 가능
- Supabase SDK를 통한 추상화로 데이터베이스 종속성 최소화
- 환경 변수를 통한 설정 외부화

#### 3. 높은 응집도 (High Cohesion)
- 카테고리별 문제 처리 로직 모듈화
- 각 함수는 단일 책임만 수행
- 유사 기능은 논리적으로 그룹화

#### 4. 확장성 고려
- 새로운 카테고리 추가 시 기존 코드 수정 최소화
- 데이터베이스 스키마는 확장을 고려한 설계
- API 버전 관리 가능 구조

---

## 🚀 기술 스택

### Frontend
| 기술 | 버전 | 사용 목적 |
|-----|------|----------|
| HTML5 | - | 시맨틱 마크업, 접근성 고려 |
| CSS3 | - | Grid/Flexbox 레이아웃, 반응형 디자인 |
| JavaScript | ES6+ | 비동기 통신, DOM 조작, SPA 구현 |

### Backend
| 기술 | 버전 | 사용 목적 |
|-----|------|----------|
| Node.js | ≥18.x | JavaScript 런타임 환경 |
| Express.js | ^4.18.2 | 웹 프레임워크, 미들웨어 |
| dotenv | ^16.3.1 | 환경 변수 관리 |

### Database & Services
| 기술 | 버전 | 사용 목적 |
|-----|------|----------|
| Supabase | - | PostgreSQL DB, Authentication |
| @supabase/supabase-js | ^2.39.0 | Supabase 클라이언트 SDK |

### Deployment
| 플랫폼 | 용도 |
|--------|------|
| Vercel | Serverless 배포, CI/CD |
| GitHub | 버전 관리, 협업 |

---

## 📚 주요 기능 명세

### 1. 카테고리 선택 시스템
- **기능**: 4개의 학습 영역 중 선택하여 맞춤 학습
- **카테고리**:
  - 📖 **Reading** (30문제): 문장 이해 및 독해
  - ✍️ **Writing** (30문제): 빈칸 채우기 스토리 완성
  - 📚 **Vocabulary** (30문제): 단어 의미, 반의어
  - 📝 **Grammar** (30문제): 동사, 명사, 복수형 등 기본 문법

### 2. 다지선다형 퀴즈 (Reading, Vocabulary, Grammar)
**기능 상세**:
- 카테고리별 랜덤 문제 출제
- 4개 보기 중 1개 정답 선택
- 즉시 정/오답 피드백 제공
- 시각적 강조 (정답: 초록색, 오답: 빨간색)
- 정답 선택 후 다음 문제 버튼 활성화

**비즈니스 로직**:
```javascript
// 문제 로드 → 답안 선택 → 검증 → 피드백 → 다음 문제
loadQuestion() → selectAnswer() → checkAnswer() → showResult() → nextQuestion()
```

### 3. 쓰기 연습 (Writing Category)
**기능 상세**:
- 5-8문장 분량의 짧은 스토리 제시
- 문맥에 맞는 단어를 빈칸에 입력
- Word Bank (힌트 단어 박스) 제공
  - 클릭 시 포커스된 입력칸에 자동 입력
  - 사용된 힌트는 시각적으로 표시
- "Check Answers" 버튼으로 전체 답안 일괄 검증
- 각 입력칸별 정/오답 시각적 피드백

**데이터 구조**:
```json
{
  "story": "I have a [0] dog. His name is [1].",
  "blanks": [
    {"answer": "big"},
    {"answer": "Max"}
  ],
  "hints": ["big", "Max", "small", "happy"]
}
```

### 4. 학습 진도 관리
- 세션별 정답/오답 카운트 실시간 표시
- 카테고리 전환 시 점수 초기화
- 무한 반복 학습 가능 (문제 랜덤 출제)

---

## 🔌 API 명세

### Base URL
- **Development**: `http://localhost:3000`
- **Production**: `https://your-app.vercel.app`

### Endpoints

#### `GET /api/test`
Supabase 데이터베이스 연결 상태 확인

**Response 200 OK:**
```json
{
  "success": true,
  "message": "Supabase connection successful",
  "timestamp": "2024-03-11T10:30:00.000Z"
}
```

**Response 500 Error:**
```json
{
  "success": false,
  "error": "Connection failed",
  "details": {...}
}
```

---

#### `GET /api/questions/random`
카테고리별 랜덤 문제 조회

**Query Parameters:**
| Parameter | Type | Required | Values |
|-----------|------|----------|--------|
| category | string | Yes | `reading`, `writing`, `vocabulary`, `grammar` |

**Request Example:**
```
GET /api/questions/random?category=reading
```

**Response 200 (Multiple Choice):**
```json
{
  "id": 15,
  "question": "Birds can ___.",
  "option_a": "swim",
  "option_b": "fly",
  "option_c": "jump",
  "option_d": "run",
  "correct_answer": "b",
  "category": "reading",
  "created_at": "2024-03-10T12:00:00Z"
}
```

**Response 200 (Writing Exercise):**
```json
{
  "id": 3,
  "story": "Yesterday, I went to the [0]. I saw many [1] animals. My favorite was the [2] elephant.",
  "blanks": [
    {"answer": "zoo"},
    {"answer": "wild"},
    {"answer": "big"}
  ],
  "hints": ["zoo", "wild", "big", "small", "park"],
  "created_at": "2024-03-10T12:00:00Z"
}
```

**Response 400 Bad Request:**
```json
{
  "error": "Invalid category"
}
```

**Response 500 Error:**
```json
{
  "error": "Failed to load question",
  "message": "Database connection error"
}
```

---

#### `POST /api/check-answer`
사용자 답안 검증

**Request Body:**
```json
{
  "questionId": 15,
  "answer": "b"
}
```

**Response 200:**
```json
{
  "correct": true,
  "correctAnswer": "b"
}
```

**Response 400:**
```json
{
  "error": "Invalid request",
  "message": "questionId and answer are required"
}
```

---

## 🗄️ 데이터베이스 스키마

### Table: `questions`
Multiple-choice 문제 저장

```sql
CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_answer CHAR(1) NOT NULL CHECK (correct_answer IN ('a', 'b', 'c', 'd')),
  category TEXT NOT NULL CHECK (category IN ('reading', 'vocabulary', 'grammar')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX idx_questions_category ON questions(category);
```

**컬럼 설명:**
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | 자동 증가 고유 ID |
| question | TEXT | NOT NULL | 문제 본문 |
| option_a | TEXT | NOT NULL | 선택지 A |
| option_b | TEXT | NOT NULL | 선택지 B |
| option_c | TEXT | NOT NULL | 선택지 C |
| option_d | TEXT | NOT NULL | 선택지 D |
| correct_answer | CHAR(1) | NOT NULL, CHECK | 정답 ('a', 'b', 'c', 'd') |
| category | TEXT | NOT NULL, CHECK | 카테고리 (reading, vocabulary, grammar) |
| created_at | TIMESTAMP | DEFAULT NOW() | 생성 일시 |

**설계 의도:**
- `CHECK` 제약조건으로 데이터 무결성 보장
- `category` 인덱스로 카테고리별 조회 성능 최적화
- SERIAL 타입으로 ID 자동 생성

---

### Table: `writing_exercises`
Writing 빈칸 채우기 문제 저장

```sql
CREATE TABLE writing_exercises (
  id SERIAL PRIMARY KEY,
  story TEXT NOT NULL,
  blanks JSONB NOT NULL,
  hints JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);
```

**컬럼 설명:**
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | 자동 증가 고유 ID |
| story | TEXT | NOT NULL | 스토리 텍스트 ([0], [1] 플레이스홀더 포함) |
| blanks | JSONB | NOT NULL | 정답 배열 JSON ([{"key": 0, "answer": "word"}]) |
| hints | JSONB | NOT NULL | 힌트 단어 배열 JSON (["word1", "word2"]) |
| created_at | TIMESTAMP | DEFAULT NOW() | 생성 일시 |

**설계 의도:**
- JSONB 타입으로 유연한 데이터 구조 지원
- 빈칸 개수가 가변적인 문제에 대응
- PostgreSQL의 JSONB 인덱싱 기능 활용 가능

**예시 데이터:**
```json
{
  "story": "I like to [0] in the park. My friend likes to [1] too.",
  "blanks": [
    {"answer": "play"},
    {"answer": "run"}
  ],
  "hints": ["play", "run", "jump", "swim"]
}
```

---

## 🔒 보안 고려사항

### 1. 환경 변수 관리
**구현:**
- `.env` 파일을 통한 민감 정보 분리
- `.gitignore`에 `.env` 추가로 Git 저장소에서 제외
- `.env.example` 템플릿 제공

**환경 변수 목록:**
```bash
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
PORT=3000
```

**서버 시작 시 검증:**
```javascript
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
  console.error('❌ ERROR: Required environment variables are not set');
  // 개발 환경에서는 경고만 출력, 프로덕션에서는 종료
}
```

### 2. API 키 및 시크릿 보호
**보안 조치:**
- ✅ Supabase API 키는 서버 사이드에서만 사용
- ✅ 클라이언트는 직접 데이터베이스 접근 불가
- ✅ 모든 데이터 작업은 Express API를 경유
- ✅ Public anon key만 사용 (Service Role Key는 서버 전용)

**위험 요소:**
- ⚠️ 클라이언트 JavaScript에 하드코딩된 API 키 없음
- ⚠️ Git 히스토리에 노출된 시크릿 없음

### 3. 입력 검증 및 Injection 방지
**SQL Injection 방지:**
- Supabase SDK의 파라미터화된 쿼리 사용
- 직접 SQL 문자열 조합 없음

```javascript
// ✅ 안전한 방식
const { data } = await supabase
  .from('questions')
  .select('*')
  .eq('category', userInput); // 자동 이스케이프

// ❌ 위험한 방식 (사용하지 않음)
// const query = `SELECT * FROM questions WHERE category = '${userInput}'`;
```

**XSS 방지:**
- 사용자 입력은 `textContent` 사용 (innerHTML 지양)
- Writing 문제 답안은 소문자 변환 후 비교

```javascript
// ✅ 안전한 방식
element.textContent = userInput;

// ❌ 위험한 방식 (사용하지 않음)
// element.innerHTML = userInput;
```

### 4. HTTPS 통신
- Vercel 배포 시 자동 HTTPS 적용
- Let's Encrypt SSL 인증서 자동 관리
- HTTP → HTTPS 자동 리다이렉션

### 5. 에러 처리 및 정보 노출 방지
**원칙:**
- 상세한 에러 스택은 서버 로그에만 기록
- 클라이언트에는 일반화된 메시지만 전송

```javascript
// 서버 사이드
try {
  const result = await someOperation();
} catch (error) {
  console.error('Detailed error:', error); // 서버 로그에만
  res.status(500).json({ error: 'An error occurred' }); // 클라이언트에는 일반 메시지
}
```

### 6. CORS (Cross-Origin Resource Sharing)
- Express 기본 설정으로 동일 출처 정책 적용
- 추후 확장 시 특정 도메인만 허용 가능

### 7. Rate Limiting (향후 개선 예정)
- 현재 미구현 (24시간 MVP의 범위 제한)
- 향후 `express-rate-limit` 미들웨어 도입 권장

---

## 📦 설치 및 실행

### 사전 요구사항
- Node.js ≥ 18.x
- npm ≥ 9.x
- Supabase 계정

### 1. 저장소 클론
```bash
git clone https://github.com/spaphysicalai-lgtm/eng_quiz.git
cd eng_quiz
```

### 2. 의존성 설치
```bash
npm install
```

### 3. Supabase 설정

#### 3.1. 프로젝트 생성
1. [Supabase](https://supabase.com) 로그인
2. "New Project" 클릭
3. 프로젝트 이름, 비밀번호 설정

#### 3.2. 데이터베이스 초기화
1. Supabase Dashboard → SQL Editor
2. `database.sql` 파일 내용 복사
3. SQL Editor에 붙여넣기 후 "Run" 실행
   - `questions` 테이블 생성 (90개 문제 포함)
   - `writing_exercises` 테이블 생성 (30개 문제 포함)

#### 3.3. API 키 확인
1. Settings → API
2. **Project URL** 복사 (예: `https://xxxxx.supabase.co`)
3. **anon public** 키 복사

### 4. 환경 변수 설정
```bash
cp .env.example .env
```

`.env` 파일 편집:
```bash
SUPABASE_URL=https://gfrgaqqugwmzxqowhhbx.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
PORT=3000
```

### 5. 로컬 실행
```bash
npm start
```

서버 시작 확인:
```
Supabase client initialized successfully
Server running on http://localhost:3000
```

### 6. 브라우저 테스트
1. `http://localhost:3000` 접속
2. 카테고리 선택
3. 문제 풀이 테스트

### 7. 연결 테스트
```bash
curl http://localhost:3000/api/test
```

성공 응답:
```json
{
  "success": true,
  "message": "Supabase connection successful"
}
```

---

## 🌐 Vercel 배포

### 방법 1: Vercel CLI

#### 1.1. Vercel CLI 설치
```bash
npm install -g vercel
```

#### 1.2. 로그인
```bash
vercel login
```

#### 1.3. 프로젝트 배포
```bash
vercel
```

대화형 프롬프트 응답:
```
? Set up and deploy "~/eng_quiz"? [Y/n] Y
? Which scope? Your Name
? Link to existing project? [y/N] N
? What's your project's name? eng-quiz
? In which directory is your code located? ./
```

#### 1.4. 환경 변수 설정
```bash
vercel env add SUPABASE_URL production
# 입력: https://gfrgaqqugwmzxqowhhbx.supabase.co

vercel env add SUPABASE_ANON_KEY production
# 입력: (your anon key)
```

#### 1.5. 프로덕션 배포
```bash
vercel --prod
```

### 방법 2: GitHub 연동 (권장)

#### 2.1. GitHub 저장소 푸시
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

#### 2.2. Vercel 프로젝트 생성
1. [Vercel Dashboard](https://vercel.com/dashboard) 접속
2. "Add New..." → "Project"
3. GitHub 저장소 선택
4. "Import"

#### 2.3. 환경 변수 설정 (필수!)
1. Project Settings → Environment Variables
2. 다음 변수 추가:
   - `SUPABASE_URL`: `https://gfrgaqqugwmzxqowhhbx.supabase.co`
   - `SUPABASE_ANON_KEY`: (your anon key)
3. "Save"

#### 2.4. 배포 트리거
- "Deploy" 버튼 클릭
- 또는 Git push 시 자동 배포

### 배포 후 확인
```bash
curl https://your-app.vercel.app/api/test
```

---

## 📁 프로젝트 구조

```
eng_quiz/
├── public/                    # 정적 파일 (클라이언트)
│   ├── index.html            # 메인 HTML (115 lines)
│   ├── style.css             # 스타일시트 (400+ lines)
│   └── app.js                # 클라이언트 JavaScript (290 lines)
│
├── server.js                 # Express 서버 (190 lines)
├── database.sql              # DB 스키마 및 초기 데이터 (259 lines)
│
├── package.json              # 프로젝트 메타데이터
├── package-lock.json         # 의존성 잠금 파일
├── vercel.json               # Vercel 배포 설정
│
├── .env                      # 환경 변수 (Git 제외)
├── .env.example              # 환경 변수 템플릿
├── .gitignore                # Git 제외 파일
│
└── README.md                 # 프로젝트 문서 (본 파일)
```

### 파일별 역할 및 책임

#### `server.js` (Application Layer)
**책임:**
- Express 앱 초기화 및 미들웨어 설정
- Supabase 클라이언트 생성
- API 라우트 정의 및 핸들러 구현
- 환경 변수 검증
- 전역 에러 처리

**주요 함수:**
```javascript
app.get('/api/test')               // DB 연결 테스트
app.get('/api/questions/random')   // 문제 조회
app.post('/api/check-answer')      // 답안 검증
```

#### `public/index.html` (Presentation Layer - Markup)
**책임:**
- 시맨틱 HTML5 구조 정의
- 2-Page SPA 레이아웃 (카테고리 선택 + 퀴즈)
- 접근성 고려 (ARIA 속성)
- SEO 메타 태그

**구조:**
```html
<body>
  <div id="category-page">      <!-- 카테고리 선택 화면 -->
  <div id="quiz-page">           <!-- 퀴즈 화면 -->
    <div id="quiz-content">      <!-- Multiple Choice -->
    <div id="writing-content">   <!-- Writing Exercise -->
</body>
```

#### `public/app.js` (Presentation Layer - Logic)
**책임:**
- DOM 이벤트 리스너 등록
- 카테고리 선택 및 페이지 전환
- API 통신 (fetch)
- 동적 UI 생성 및 업데이트
- 사용자 인터랙션 처리

**주요 함수:**
```javascript
selectCategory(category)           // 카테고리 선택
loadQuestion()                     // 문제 로드
displayQuestion()                  // 객관식 문제 표시
displayWritingExercise()           // 쓰기 문제 표시
selectAnswer(answer)               // 답안 선택
checkWriting()                     // 쓰기 답안 검증
showResult(isCorrect)              // 결과 표시
```

#### `public/style.css` (Presentation Layer - Styling)
**책임:**
- 반응형 레이아웃 (Mobile-first)
- 카테고리별 색상 테마
- 애니메이션 및 트랜지션
- 타이포그래피 및 간격 조정

**주요 스타일:**
```css
.category-grid              /* Grid 레이아웃 */
.category-card              /* 카테고리 카드 */
.option-btn                 /* 객관식 버튼 */
.story-box input            /* 빈칸 입력 필드 */
.correct / .wrong           /* 정/오답 피드백 */
```

#### `database.sql` (Data Layer)
**책임:**
- 테이블 스키마 정의
- 제약조건 및 인덱스 설정
- 초기 데이터 삽입 (120개 문제)

**구성:**
- 테이블 드롭 및 생성 (lines 1-28)
- Reading 문제 30개 (lines 30-80)
- Vocabulary 문제 30개 (lines 82-132)
- Grammar 문제 30개 (lines 134-184)
- Writing 문제 30개 (lines 186-259)

---

## 💻 코드 컨벤션

### JavaScript 코딩 스타일

#### 1. 네이밍 규칙
- **변수/함수**: camelCase
  ```javascript
  let currentQuestion;
  function loadQuestion() {}
  ```
- **상수**: UPPER_SNAKE_CASE
  ```javascript
  const API_BASE_URL = '/api';
  ```
- **클래스** (미사용): PascalCase
- **DOM 요소**: ~El 접미사
  ```javascript
  const buttonEl = document.getElementById('button');
  ```

#### 2. 함수 작성 원칙
- 한 함수는 하나의 작업만 수행
- 함수명은 동사로 시작 (get, set, load, check, display)
- 비동기 함수는 `async`/`await` 사용

```javascript
// ✅ 좋은 예
async function loadQuestion() {
  const response = await fetch(`/api/questions/random?category=${currentCategory}`);
  const data = await response.json();
  return data;
}

// ❌ 나쁜 예
function doEverything() {
  // 여러 작업을 한 함수에서 처리
}
```

#### 3. 주석 작성
- 복잡한 로직에만 주석 추가
- "무엇을" 하는지가 아닌 "왜" 하는지 설명

```javascript
// ✅ 도움이 되는 주석
// JSONB 배열을 파싱하여 JavaScript 객체로 변환
const blanks = JSON.parse(question.blanks);

// ❌ 불필요한 주석
// i를 0으로 설정
let i = 0;
```

#### 4. 에러 처리
- 모든 비동기 작업은 try-catch로 감싸기
- 에러는 콘솔에 로그, 사용자에게는 친화적인 메시지

```javascript
try {
  const data = await fetchData();
} catch (error) {
  console.error('Error:', error);
  showUserMessage('문제를 불러오는데 실패했습니다.');
}
```

### CSS 코딩 스타일

#### 1. 클래스 네이밍: BEM (Block Element Modifier)
```css
.category-card { }           /* Block */
.category-card__icon { }     /* Element */
.category-card--active { }   /* Modifier */
```

#### 2. 선택자 우선순위
1. 클래스 선택자 우선 사용
2. ID 선택자 최소화
3. !important 금지

### SQL 코딩 스타일
- 키워드는 대문자: `SELECT`, `CREATE`, `INSERT`
- 테이블/컬럼명은 소문자 스네이크케이스: `writing_exercises`, `created_at`
- 들여쓰기로 가독성 확보

---

## 🔄 확장성 및 유연성

### 현재 아키텍처의 확장 가능 영역

#### 1. 새로운 카테고리 추가
**시나리오**: "Listening" 카테고리 추가

**필요한 수정:**
- ✅ `database.sql`: Listening 문제 INSERT
- ✅ `index.html`: 카테고리 카드 1개 추가
- ✅ `app.js`: `categoryNames` 객체에 매핑 추가
- ✅ `style.css`: `.listening` 색상 테마 정의

**수정 불필요:**
- ✅ `server.js`: API 로직 변경 없음 (category 파라미터만 전달)
- ✅ 기존 카테고리 코드 변경 없음

**난이도**: 하 (1-2시간)

---

#### 2. 실시간 알림 시스템 추가
**시나리오**: 정답 시 사운드 효과 & 애니메이션

**수정이 필요한 모듈:**
- `app.js`: 
  - `showResult()` 함수에 사운드 재생 로직 추가
  - Web Audio API 또는 `<audio>` 태그 사용
- `style.css`:
  - 애니메이션 keyframes 정의
  - `.correct` 클래스에 animation 속성 추가

**새로 생성할 모듈:**
- `public/sounds/`: 정답/오답 사운드 파일
- `public/utils.js`: 사운드 관리 유틸리티 함수

**잠재적 어려움:**
- 사운드 파일 로딩 지연 처리
- 모바일 브라우저의 autoplay 정책

**난이도**: 중 (4-6시간)

---

#### 3. 사용자 인증 및 학습 기록 저장
**시나리오**: 로그인 후 개인별 학습 진도 저장

**수정이 필요한 모듈:**
- `server.js`:
  - Supabase Auth 미들웨어 추가
  - 세션 검증 로직
  - 학습 기록 저장 API 추가 (`POST /api/progress`)
- `app.js`:
  - 로그인/회원가입 UI 추가
  - JWT 토큰 저장 (localStorage)
  - API 요청 시 Authorization 헤더 추가
- `database.sql`:
  - `users` 테이블 생성
  - `learning_progress` 테이블 생성 (user_id, category, score 등)

**새로 생성할 모듈:**
- `public/auth.js`: 인증 관련 로직
- `public/login.html`: 로그인 페이지

**잠재적 어려움:**
- 강한 결합: 모든 API에 인증 로직 추가 필요
- 기존 익명 사용자 데이터 마이그레이션

**난이도**: 상 (16-24시간)

---

### 아키텍처 개선 제안

#### 1. 모듈 분리
현재 `app.js` (290 lines)를 다음과 같이 분리:
```
public/
├── js/
│   ├── api.js          // API 통신 로직
│   ├── ui.js           // UI 렌더링 로직
│   ├── quiz.js         // 퀴즈 비즈니스 로직
│   └── main.js         // 초기화 및 이벤트 바인딩
```

**장점**: 단일 책임 원칙 준수, 테스트 용이

#### 2. 상태 관리
현재 전역 변수를 객체로 캡슐화:
```javascript
const QuizState = {
  currentQuestion: null,
  currentCategory: null,
  score: { correct: 0, wrong: 0 },
  
  reset() { ... },
  updateScore(isCorrect) { ... }
};
```

**장점**: 상태 변경 추적 용이, 디버깅 간편

#### 3. API 버전 관리
```javascript
// 현재
app.get('/api/questions/random', ...)

// 개선
app.get('/api/v1/questions/random', ...)
```

**장점**: 하위 호환성 유지하며 API 개선 가능

---

## 🧪 테스트 시나리오

### 기능 테스트 체크리스트

#### 1. 카테고리 선택
- [ ] Reading 카드 클릭 시 퀴즈 페이지로 전환
- [ ] Writing 카드 클릭 시 Writing 문제 표시
- [ ] Vocabulary 카드 클릭 시 문제 로드
- [ ] Grammar 카드 클릭 시 문제 로드
- [ ] Back 버튼 클릭 시 카테고리 페이지로 복귀

#### 2. 객관식 퀴즈 (Reading/Vocabulary/Grammar)
- [ ] 문제 텍스트 정상 표시
- [ ] 4개 보기 버튼 정상 표시
- [ ] 정답 선택 시 초록색 표시
- [ ] 오답 선택 시 빨간색 표시 + 정답 초록색 표시
- [ ] 정답 카운트 증가
- [ ] 오답 카운트 증가
- [ ] Next 버튼 활성화
- [ ] Next 버튼 클릭 시 새 문제 로드

#### 3. Writing 문제
- [ ] 스토리 텍스트 정상 표시
- [ ] 빈칸 입력 필드 생성
- [ ] Word Bank 힌트 표시
- [ ] 힌트 클릭 시 포커스된 입력칸에 입력
- [ ] Check Answers 버튼 작동
- [ ] 정답 입력 시 초록색 테두리
- [ ] 오답 입력 시 빨간색 테두리
- [ ] 모두 정답 시 Next Story 버튼 활성화

#### 4. 에러 처리
- [ ] 네트워크 오류 시 사용자 친화적 메시지 표시
- [ ] 데이터베이스 연결 실패 시 적절한 에러 처리
- [ ] 잘못된 API 요청 시 400/500 응답

---

## 🚧 알려진 제한사항 및 향후 개선 사항

### 현재 제한사항
1. **인증 시스템 부재**: 익명 사용자만 지원, 학습 기록 저장 불가
2. **테스트 코드 부재**: 단위 테스트 및 통합 테스트 미구현
3. **Rate Limiting 없음**: API 남용 방지 기능 없음
4. **오프라인 지원 없음**: 네트워크 연결 필수
5. **다국어 지원 없음**: 한국어/영어 혼용 UI

### 향후 개선 계획 (우선순위)
1. **High Priority**:
   - 사용자 인증 (Supabase Auth)
   - 학습 진도 저장 및 통계
   - 모바일 반응형 개선

2. **Medium Priority**:
   - 단위 테스트 작성 (Jest)
   - 난이도 조절 기능
   - 카테고리별 성취도 배지

3. **Low Priority**:
   - 다크 모드
   - 사운드 효과
   - 소셜 공유 기능

---

## 📊 성능 고려사항

### 데이터베이스 쿼리 최적화
- `category` 컬럼에 인덱스 적용으로 조회 속도 개선
- `ORDER BY RANDOM()` 대신 더 효율적인 랜덤 알고리즘 고려 (대용량 데이터 시)

### 프론트엔드 최적화
- 이미지 미사용으로 초기 로딩 빠름
- Vanilla JS 사용으로 번들 크기 최소화
- CSS는 별도 파일로 분리하여 캐싱 가능

---

## 📄 라이선스

MIT License

---

## 👨‍💻 기여자

- Developer 1: 백엔드 API 개발
- Developer 2: 프론트엔드 UI/UX
- Developer 3: 데이터베이스 설계 및 문제 작성

---

## 📞 문의

프로젝트 관련 문의: [GitHub Issues](https://github.com/spaphysicalai-lgtm/eng_quiz/issues)

---

**© 2024 English Quiz App Team. All rights reserved.**
