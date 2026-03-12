# Microsoft Foundry GPT 5.2 Chat API 연동 가이드

## ✅ 완료된 작업

1. ✅ `.env` 파일에 Azure OpenAI 환경 변수 추가
2. ✅ `openai` npm 패키지 설치
3. ✅ `server.js`에 Azure OpenAI 클라이언트 초기화 코드 추가
4. ✅ GPT API 엔드포인트 구현:
   - `/api/chat` - 자유 채팅
   - `/api/explain` - 문제 해설 생성

## 🔑 API 키 설정 방법

### 1. Microsoft Foundry에서 API 키 가져오기

1. **Microsoft Foundry 포털 접속**
   - https://foundry.microsoft.com 또는 Azure Portal 접속
   
2. **GPT 5.2 리소스 찾기**
   - 리소스 목록에서 GPT 5.2 chat 모델 선택
   
3. **API 키 및 엔드포인트 정보 복사**
   - API Key
   - Endpoint URL
   - Deployment Name
   - API Version

### 2. `.env` 파일 수정

`.env` 파일을 열고 다음 값을 실제 정보로 교체하세요:

```env
# Microsoft Foundry GPT 5.2 Chat API
AZURE_OPENAI_API_KEY=your-api-key-here          # ← 실제 API 키로 교체
AZURE_OPENAI_ENDPOINT=https://your-resource-name.openai.azure.com/  # ← 실제 엔드포인트로 교체
AZURE_OPENAI_DEPLOYMENT_NAME=gpt-52-chat        # ← 실제 배포 이름으로 교체
AZURE_OPENAI_API_VERSION=2024-08-01-preview     # ← 필요시 버전 업데이트
```

### 3. 서버 재시작

터미널에서 실행:

```powershell
npm start
```

서버 로그에 다음 메시지가 표시되면 성공:
```
✅ Azure OpenAI client initialized successfully
```

## 📡 API 엔드포인트 사용법

### 1. `/api/chat` - 자유 채팅

GPT와 대화할 수 있는 범용 엔드포인트입니다.

**요청 예시:**
```javascript
fetch('/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    messages: [
      { role: 'system', content: '당신은 친절한 선생님입니다.' },
      { role: 'user', content: '영어 단어 "apple"의 뜻을 알려주세요.' }
    ],
    temperature: 0.7,
    maxTokens: 500
  })
})
.then(res => res.json())
.then(data => console.log(data.message));
```

**응답:**
```json
{
  "success": true,
  "message": "Apple은 우리말로 '사과'라는 뜻이에요...",
  "usage": {
    "prompt_tokens": 25,
    "completion_tokens": 50,
    "total_tokens": 75
  }
}
```

### 2. `/api/explain` - 문제 해설 생성

퀴즈 문제에 대한 자동 해설을 생성합니다.

**요청 예시:**
```javascript
fetch('/api/explain', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    question: 'What color is the sky?',
    correctAnswer: 'blue',
    userAnswer: 'red',
    category: 'reading'
  })
})
.then(res => res.json())
.then(data => console.log(data.explanation));
```

**응답:**
```json
{
  "success": true,
  "explanation": "하늘은 파란색(blue)이에요. 낮 동안에 해가 비추면..."
}
```

## 🎨 프론트엔드에서 사용 예시

`public/app.js`에 다음과 같은 함수를 추가할 수 있습니다:

```javascript
// 문제 해설 요청
async function getExplanation(question, correctAnswer, userAnswer, category) {
  try {
    const response = await fetch('/api/explain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question,
        correctAnswer,
        userAnswer,
        category
      })
    });
    
    const data = await response.json();
    if (data.success) {
      return data.explanation;
    } else {
      console.error('해설 생성 실패:', data.error);
      return null;
    }
  } catch (error) {
    console.error('API 오류:', error);
    return null;
  }
}

// 사용 예시
const explanation = await getExplanation(
  'What is 2 + 2?',
  '4',
  '5',
  'vocabulary'
);
console.log(explanation);
```

## 🧪 테스트 방법

### 1. CURL로 테스트

```powershell
# 채팅 테스트
curl -X POST http://localhost:3000/api/chat `
  -H "Content-Type: application/json" `
  -d '{\"messages\": [{\"role\": \"user\", \"content\": \"Hello!\"}]}'

# 해설 테스트
curl -X POST http://localhost:3000/api/explain `
  -H "Content-Type: application/json" `
  -d '{\"question\": \"Test\", \"correctAnswer\": \"A\", \"userAnswer\": \"B\", \"category\": \"reading\"}'
```

### 2. 브라우저 콘솔에서 테스트

브라우저 개발자 도구(F12)를 열고 콘솔에서 실행:

```javascript
fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    messages: [
      { role: 'user', content: '안녕하세요!' }
    ]
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

## 🚨 문제 해결

### 에러: "GPT 서비스를 사용할 수 없습니다"

- `.env` 파일의 `AZURE_OPENAI_API_KEY`와 `AZURE_OPENAI_ENDPOINT`가 올바르게 설정되었는지 확인
- 서버를 재시작했는지 확인

### 에러: "401 Unauthorized"

- API 키가 올바른지 확인
- API 키의 권한이 활성화되어 있는지 확인

### 에러: "404 Not Found"

- `AZURE_OPENAI_DEPLOYMENT_NAME`이 실제 배포 이름과 일치하는지 확인
- Microsoft Foundry에서 모델이 배포되어 있는지 확인

### 에러: "429 Too Many Requests"

- API 사용량 제한에 도달했습니다
- Microsoft Foundry에서 할당량을 확인하세요

## 📊 비용 관리

- GPT API는 토큰 사용량에 따라 비용이 발생합니다
- `usage` 필드에서 토큰 사용량을 확인할 수 있습니다
- `maxTokens` 값을 조정하여 응답 길이를 제한할 수 있습니다
- `temperature` 값을 낮추면 더 일관된 응답을 얻을 수 있습니다

## 🎯 다음 단계

1. `.env` 파일에 실제 API 키 입력
2. 서버 재시작
3. API 엔드포인트 테스트
4. 프론트엔드에 기능 통합 (문제 해설, 힌트 생성 등)

## 💡 활용 아이디어

- ✍️ 문제 정답 해설 자동 생성
- 💬 학습자와의 대화형 튜터 기능
- 🎯 개인화된 힌트 제공
- 📝 오답에 대한 맞춤형 피드백
- 🌟 학습 격려 메시지 생성

---

문의사항이 있으시면 언제든지 물어보세요! 😊
