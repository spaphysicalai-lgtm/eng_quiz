require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Supabase 클라이언트 초기화
console.log('Initializing Supabase client...');
console.log('SUPABASE_URL:', process.env.SUPABASE_URL);
console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? 'Set' : 'Not set');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
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
    console.log('Fetching random question...');
    const { data, error } = await supabase
      .from('questions')
      .select('*');
    
    if (error) {
      console.error('Supabase error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      throw error;
    }
    
    console.log('Questions fetched:', data ? data.length : 0);
    
    if (data && data.length > 0) {
      const randomQuestion = data[Math.floor(Math.random() * data.length)];
      res.json(randomQuestion);
    } else {
      res.status(404).json({ 
        error: '문제가 없습니다.',
        hint: 'Supabase에서 database.sql을 실행했는지 확인하세요.'
      });
    }
  } catch (error) {
    console.error('Error fetching random question:', error);
    res.status(500).json({ 
      error: '문제를 불러오는데 실패했습니다.',
      message: error.message,
      details: error.details || error.hint || '상세 정보 없음'
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
