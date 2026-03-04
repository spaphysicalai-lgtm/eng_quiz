-- Supabase 데이터베이스 테이블 생성
-- Supabase 대시보드의 SQL Editor에서 실행하세요

CREATE TABLE IF NOT EXISTS questions (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_answer CHAR(1) NOT NULL CHECK (correct_answer IN ('a', 'b', 'c', 'd')),
  category TEXT NOT NULL CHECK (category IN ('reading', 'writing', 'vocabulary', 'grammar')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 샘플 문제 데이터 삽입 (미국 초등학생 1-3학년 수준)

-- Reading (읽기) - 문장 이해
INSERT INTO questions (question, option_a, option_b, option_c, option_d, correct_answer, category) VALUES
('The cat is ___ the table.', 'in', 'on', 'at', 'by', 'b', 'reading'),
('I ___ to school every day.', 'goes', 'go', 'going', 'gone', 'b', 'reading'),
('She ___ a red dress.', 'wear', 'wears', 'wearing', 'worn', 'b', 'reading'),
('The sun ___ in the morning.', 'rises', 'rise', 'rising', 'rose', 'a', 'reading'),
('We ___ happy today.', 'am', 'is', 'are', 'be', 'c', 'reading'),
('Birds can ___.', 'swim', 'fly', 'jump', 'run', 'b', 'reading'),
('The dog is ___ the house.', 'inside', 'outside', 'under', 'all correct', 'd', 'reading'),
('My mom ___ dinner.', 'cook', 'cooks', 'cooking', 'cooked', 'b', 'reading'),
('I like to ___ books.', 'see', 'look', 'read', 'watch', 'c', 'reading'),
('The ball is ___.', 'square', 'round', 'flat', 'long', 'b', 'reading');

-- Writing (쓰기) - 철자 및 대소문자
INSERT INTO questions (question, option_a, option_b, option_c, option_d, correct_answer, category) VALUES
('How do you spell "cat"?', 'kat', 'catt', 'cat', 'cet', 'c', 'writing'),
('Which word is spelled correctly?', 'frend', 'friend', 'freind', 'frind', 'b', 'writing'),
('How do you spell "dog"?', 'dawg', 'dogg', 'dog', 'doge', 'c', 'writing'),
('Which sentence has correct capitalization?', 'i like apples.', 'I like apples.', 'I Like Apples.', 'i Like apples.', 'b', 'writing'),
('How do you spell "book"?', 'buk', 'boook', 'book', 'bock', 'c', 'writing'),
('Which is the correct spelling?', 'hapy', 'happy', 'happie', 'happi', 'b', 'writing'),
('Start a sentence with:', 'a capital letter', 'a small letter', 'a number', 'a comma', 'a', 'writing'),
('How do you spell "play"?', 'pley', 'play', 'plai', 'plae', 'b', 'writing'),
('Which word is correct?', 'scool', 'school', 'shool', 'skool', 'b', 'writing'),
('End a sentence with:', 'a comma', 'nothing', 'a period', 'a space', 'c', 'writing');

-- Vocabulary (단어) - 단어 의미
INSERT INTO questions (question, option_a, option_b, option_c, option_d, correct_answer, category) VALUES
('What is the opposite of "hot"?', 'warm', 'cold', 'cool', 'heat', 'b', 'vocabulary'),
('What is a "chair"?', 'something to eat', 'something to sit', 'something to drink', 'something to wear', 'b', 'vocabulary'),
('What is the opposite of "big"?', 'large', 'huge', 'small', 'tall', 'c', 'vocabulary'),
('A "book" is for:', 'eating', 'reading', 'drinking', 'sleeping', 'b', 'vocabulary'),
('What is the opposite of "happy"?', 'sad', 'angry', 'tired', 'hungry', 'a', 'vocabulary'),
('What color is the sky?', 'red', 'green', 'blue', 'yellow', 'c', 'vocabulary'),
('What is a "banana"?', 'a fruit', 'a vegetable', 'a drink', 'a toy', 'a', 'vocabulary'),
('What is the opposite of "day"?', 'morning', 'night', 'afternoon', 'evening', 'b', 'vocabulary'),
('What do you use to write?', 'a fork', 'a spoon', 'a pencil', 'a plate', 'c', 'vocabulary'),
('What is the opposite of "up"?', 'left', 'right', 'down', 'side', 'c', 'vocabulary');

-- Grammar (문법) - 기초 문법
INSERT INTO questions (question, option_a, option_b, option_c, option_d, correct_answer, category) VALUES
('I ___ a student.', 'am', 'is', 'are', 'be', 'a', 'grammar'),
('She ___ my friend.', 'am', 'is', 'are', 'be', 'b', 'grammar'),
('They ___ at home.', 'am', 'is', 'are', 'be', 'c', 'grammar'),
('Choose the verb: "I ___ an apple."', 'am', 'eat', 'happy', 'red', 'b', 'grammar'),
('Choose the noun: "The ___ is red."', 'run', 'jump', 'apple', 'quickly', 'c', 'grammar'),
('Which is a question?', 'I like dogs.', 'The cat runs.', 'Where is mom?', 'We are happy.', 'c', 'grammar'),
('He ___ to school.', 'go', 'goes', 'going', 'gone', 'b', 'grammar'),
('We ___ lunch at noon.', 'eat', 'eats', 'eating', 'ate', 'a', 'grammar'),
('Which is plural?', 'dog', 'dogs', 'doges', 'dogo', 'b', 'grammar'),
('I have two ___.', 'cat', 'cats', 'cates', 'catoes', 'b', 'grammar');
