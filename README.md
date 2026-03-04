# 초등 2학년 퀴즈 앱

초등학교 2학년 수준의 사지선다형 문제를 풀 수 있는 웹 애플리케이션입니다.

## 🚀 기술 스택

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js + Express
- **Database**: Supabase
- **Deployment**: Vercel

## 📋 설정 방법

### 1. 의존성 설치

```bash
npm install
```

### 2. Supabase 설정

1. [Supabase](https://supabase.com)에서 새 프로젝트 생성
2. SQL Editor에서 `database.sql` 파일의 내용을 실행하여 테이블과 샘플 데이터 생성
3. Settings > API에서 프로젝트 URL과 anon key 복사

### 3. 환경 변수 설정

`.env.example` 파일을 `.env`로 복사하고 Supabase 정보 입력:

```bash
cp .env.example .env
```

`.env` 파일 수정:
```
SUPABASE_URL=your-supabase-project-url
SUPABASE_ANON_KEY=your-supabase-anon-key
PORT=3000
```

### 4. 로컬 실행

```bash
npm start
```

브라우저에서 `http://localhost:3000` 접속

## 🌐 Vercel 배포

### 방법 1: Vercel CLI 사용

```bash
npm install -g vercel
vercel
```

### 방법 2: GitHub 연동

1. GitHub에 저장소 생성 및 코드 푸시
2. [Vercel](https://vercel.com)에서 Import Project
3. Environment Variables에 다음 추가:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
4. Deploy 버튼 클릭

## 📁 프로젝트 구조

```
vibe/
├── public/              # 정적 파일
│   ├── index.html      # 메인 페이지
│   ├── style.css       # 스타일
│   └── app.js          # 클라이언트 JavaScript
├── server.js           # Express 서버
├── package.json        # 프로젝트 설정
├── vercel.json         # Vercel 배포 설정
├── database.sql        # Supabase 데이터베이스 스키마
└── .env.example        # 환경 변수 템플릿
```

## 🎮 주요 기능

- ✅ 랜덤 문제 출제
- ✅ 실시간 정답 확인
- ✅ 점수 기록 (맞힌 문제/틀린 문제)
- ✅ 반응형 디자인
- ✅ 애니메이션 효과

## 📝 문제 추가하기

Supabase 대시보드의 Table Editor에서 `questions` 테이블에 직접 추가하거나, SQL Editor에서 다음과 같이 추가:

```sql
INSERT INTO questions (question, option_a, option_b, option_c, option_d, correct_answer) 
VALUES ('문제 내용?', '선택지1', '선택지2', '선택지3', '선택지4', 'c');
```

`correct_answer`는 'a', 'b', 'c', 'd' 중 하나여야 합니다.
