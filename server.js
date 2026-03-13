require('dotenv').config();
const express = require('express');
const { AzureOpenAI } = require('openai');
const path = require('path');
const questionsData = require('./questions-data');

const app = express();
const PORT = process.env.PORT || 3000;

// Azure OpenAI 클라이언트 초기화
let azureOpenAI = null;
if (process.env.AZURE_OPENAI_API_KEY && process.env.AZURE_OPENAI_ENDPOINT) {
  try {
    azureOpenAI = new AzureOpenAI({
      apiKey: process.env.AZURE_OPENAI_API_KEY,
      endpoint: process.env.AZURE_OPENAI_ENDPOINT,
      apiVersion: process.env.AZURE_OPENAI_API_VERSION || '2024-08-01-preview',
      deployment: process.env.AZURE_OPENAI_DEPLOYMENT_NAME || 'gpt-52-chat'
    });
    console.log('✅ Azure OpenAI client initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize Azure OpenAI client:', error.message);
  }
} else {
  console.log('⚠️  Azure OpenAI keys not set. GPT features will be disabled.');
}

app.use(express.json());
app.use(express.static('public'));

// 테스트 엔드포인트
app.get('/api/test', (req, res) => {
  res.json({ 
    success: true, 
    message: '로컬 데이터로 실행 중입니다! 🎉',
    totalQuestions: Object.keys(questionsData).length
  });
});

// 랜덤 문제 가져오기 (레벨별)
app.get('/api/questions/random', (req, res) => {
  try {
    const category = req.query.category || 'reading';
    const level = req.query.level || 'beginner';
    
    console.log(`Fetching random question for ${category} - ${level}`);
    
    if (category === 'writing') {
      // Writing exercises
      const exercises = questionsData[category][level];
      if (exercises && exercises.length > 0) {
        const randomExercise = exercises[Math.floor(Math.random() * exercises.length)];
        res.json(randomExercise);
      } else {
        res.status(404).json({ error: 'No writing exercises found.' });
      }
    } else {
      // Multiple choice questions
      const questions = questionsData[category][level];
      if (questions && questions.length > 0) {
        const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        res.json(randomQuestion);
      } else {
        res.status(404).json({ error: 'No questions found.' });
      }
    }
  } catch (error) {
    console.error('Error fetching random question:', error);
    res.status(500).json({ 
      error: 'Failed to fetch question.',
      message: error.message
    });
  }
});

// 답안 확인
app.post('/api/check-answer', (req, res) => {
  try {
    const { questionId, answer, category, level } = req.body;
    
    // Find the question in questionsData
    let question = null;
    let foundCategory = category;
    let foundLevel = level;
    
    // If category/level provided, search there first
    if (category && level && questionsData[category] && questionsData[category][level]) {
      question = questionsData[category][level].find(q => q.id === questionId);
    }
    
    // Otherwise search all categories/levels
    if (!question) {
      for (const cat in questionsData) {
        for (const lvl in questionsData[cat]) {
          const found = questionsData[cat][lvl].find(q => q.id === questionId);
          if (found) {
            question = found;
            foundCategory = cat;
            foundLevel = lvl;
            break;
          }
        }
        if (question) break;
      }
    }
    
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    
    // Check answer
    let isCorrect = false;
    let correctAnswerLetter = '';
    
    if (question.correct_answer) {
      // Find which option matches the correct answer
      const correctIndex = question.options.findIndex(opt => 
        opt.toLowerCase() === question.correct_answer.toLowerCase()
      );
      
      if (correctIndex >= 0) {
        correctAnswerLetter = String.fromCharCode(97 + correctIndex); // a, b, c, d
        isCorrect = correctAnswerLetter === answer.toLowerCase();
      }
    }
    
    res.json({ 
      correct: isCorrect,
      correctAnswer: correctAnswerLetter
    });
  } catch (error) {
    console.error('Error checking answer:', error);
    res.status(500).json({ error: 'Failed to check answer.' });
  }
});

// GPT 채팅 엔드포인트 (문제 해설, 힌트 등)
app.post('/api/chat', async (req, res) => {
  try {
    if (!azureOpenAI) {
      return res.status(503).json({ 
        error: 'GPT 서비스를 사용할 수 없습니다.',
        message: 'Azure OpenAI API 키가 설정되지 않았습니다.'
      });
    }

    const { messages, temperature = 0.7, maxTokens = 800 } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ 
        error: '잘못된 요청입니다.',
        message: 'messages 배열이 필요합니다.'
      });
    }

    console.log('GPT 요청:', messages[messages.length - 1]?.content?.substring(0, 100));

    const response = await azureOpenAI.chat.completions.create({
      model: process.env.AZURE_OPENAI_DEPLOYMENT_NAME || 'gpt-52-chat',
      messages: messages,
      max_completion_tokens: maxTokens,
    });

    const reply = response.choices[0]?.message?.content;
    
    res.json({
      success: true,
      message: reply,
      usage: response.usage
    });

  } catch (error) {
    console.error('GPT API error:', error);
    res.status(500).json({ 
      error: 'GPT 요청 처리 중 오류가 발생했습니다.',
      message: error.message
    });
  }
});

// GPT 문제 해설 생성
app.post('/api/explain', async (req, res) => {
  try {
    if (!azureOpenAI) {
      return res.status(503).json({ 
        error: 'GPT 서비스를 사용할 수 없습니다.'
      });
    }

    const { question, correctAnswer, userAnswer, category } = req.body;
    
    const prompt = `You are a helpful teacher for elementary school 2nd graders. 

문제: ${question}
정답: ${correctAnswer}
학생의 답: ${userAnswer}
카테고리: ${category}

이 문제에 대해 초등학교 2학년 학생이 이해하기 쉽게 친절하고 간단한 한국어로 설명해주세요. 왜 정답이 맞는지, 그리고 학생이 틀렸다면 어떤 부분을 놓쳤는지 설명해주세요.`;

    const response = await azureOpenAI.chat.completions.create({
      model: process.env.AZURE_OPENAI_DEPLOYMENT_NAME || 'gpt-52-chat',
      messages: [
        { role: 'system', content: '당신은 초등학교 2학년 학생들을 가르치는 친절한 선생님입니다.' },
        { role: 'user', content: prompt }
      ],
      max_completion_tokens: 500,
    });

    res.json({
      success: true,
      explanation: response.choices[0]?.message?.content
    });

  } catch (error) {
    console.error('Explain API error:', error);
    res.status(500).json({ 
      error: '해설 생성 중 오류가 발생했습니다.',
      message: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
