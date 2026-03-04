require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 환경 변수 확인
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
  console.error('❌ ERROR: Supabase 환경 변수가 설정되지 않았습니다!');
  console.error('SUPABASE_URL:', process.env.SUPABASE_URL || 'NOT SET');
  console.error('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? 'Set' : 'NOT SET');
  console.error('\nVercel 환경 변수 설정 방법:');
  console.error('1. Vercel Dashboard 접속');
  console.error('2. 프로젝트 선택 → Settings → Environment Variables');
  console.error('3. 다음 변수 추가:');
  console.error('   - SUPABASE_URL = https://gfrgaqqugwmzxqowhhbx.supabase.co');
  console.error('   - SUPABASE_ANON_KEY = (your anon key)');
  console.error('4. Deployments 탭에서 Redeploy\n');
}

// Supabase 클라이언트 초기화
console.log('Initializing Supabase client...');
console.log('SUPABASE_URL:', process.env.SUPABASE_URL || 'NOT SET');
console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? 'Set' : 'NOT SET');

const supabase = createClient(
  process.env.SUPABASE_URL || 'https://gfrgaqqugwmzxqowhhbx.supabase.co',
  process.env.SUPABASE_ANON_KEY || ''
);

app.use(express.json());
app.use(express.static('public'));

// Supabase 연결 테스트
app.get('/api/test', async (req, res) => {
  try {
    console.log('Testing Supabase connection...');
    const { data, error } = await supabase
      .from('questions')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('Supabase connection error:', error);
      return res.status(500).json({ 
        success: false, 
        error: error.message,
        details: error
      });
    }
    
    console.log('Supabase connection successful!');
    res.json({ 
      success: true, 
      message: 'Supabase 연결 성공!',
      hasData: data && data.length > 0
    });
  } catch (error) {
    console.error('Test endpoint error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// 모든 문제 가져오기
app.get('/api/questions', async (req, res) => {
  try {
    console.log('Fetching all questions...');
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .order('id', { ascending: true });
    
    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    
    console.log('Total questions:', data ? data.length : 0);
    res.json(data);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ 
      error: '문제를 불러오는데 실패했습니다.',
      message: error.message
    });
  }
});

// 랜덤 문제 가져오기
app.get('/api/questions/random', async (req, res) => {
  try {
    const category = req.query.category || 'reading';
    console.log('Fetching random question for category:', category);
    
    if (category === 'writing') {
      // Writing exercises from separate table
      const { data, error } = await supabase
        .from('writing_exercises')
        .select('*');
      
      if (error) {
        console.error('Supabase error details:', error);
        throw error;
      }
      
      console.log('Writing exercises fetched:', data ? data.length : 0);
      
      if (data && data.length > 0) {
        const randomExercise = data[Math.floor(Math.random() * data.length)];
        // Parse JSONB fields
        randomExercise.blanks = typeof randomExercise.blanks === 'string' 
          ? JSON.parse(randomExercise.blanks) 
          : randomExercise.blanks;
        randomExercise.hints = typeof randomExercise.hints === 'string' 
          ? JSON.parse(randomExercise.hints) 
          : randomExercise.hints;
        res.json(randomExercise);
      } else {
        res.status(404).json({ 
          error: 'No writing exercises found.',
          hint: 'Run database.sql in Supabase SQL Editor.'
        });
      }
    } else {
      // Multiple choice questions
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('category', category);
      
      if (error) {
        console.error('Supabase error details:', error);
        throw error;
      }
      
      console.log('Questions fetched:', data ? data.length : 0);
      
      if (data && data.length > 0) {
        const randomQuestion = data[Math.floor(Math.random() * data.length)];
        res.json(randomQuestion);
      } else {
        res.status(404).json({ 
          error: 'No questions found.',
          hint: 'Run database.sql in Supabase SQL Editor.'
        });
      }
    }
  } catch (error) {
    console.error('Error fetching random question:', error);
    res.status(500).json({ 
      error: 'Failed to fetch question.',
      message: error.message,
      details: error.details || error.hint || 'No details'
    });
  }
});

// 답안 확인
app.post('/api/check-answer', async (req, res) => {
  try {
    const { questionId, answer } = req.body;
    
    const { data, error } = await supabase
      .from('questions')
      .select('correct_answer')
      .eq('id', questionId)
      .single();
    
    if (error) throw error;
    
    const isCorrect = data.correct_answer === answer;
    res.json({ 
      correct: isCorrect,
      correctAnswer: data.correct_answer
    });
  } catch (error) {
    console.error('Error checking answer:', error);
    res.status(500).json({ error: '답안을 확인하는데 실패했습니다.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
