require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Supabase 클라이언트 초기화
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

app.use(express.json());
app.use(express.static('public'));

// 모든 문제 가져오기
app.get('/api/questions', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .order('id', { ascending: true });
    
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: '문제를 불러오는데 실패했습니다.' });
  }
});

// 랜덤 문제 가져오기
app.get('/api/questions/random', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('questions')
      .select('*');
    
    if (error) throw error;
    
    if (data && data.length > 0) {
      const randomQuestion = data[Math.floor(Math.random() * data.length)];
      res.json(randomQuestion);
    } else {
      res.status(404).json({ error: '문제가 없습니다.' });
    }
  } catch (error) {
    console.error('Error fetching random question:', error);
    res.status(500).json({ error: '문제를 불러오는데 실패했습니다.' });
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
