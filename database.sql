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
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 샘플 문제 데이터 삽입 (초등학교 2학년 수준)

-- 덧셈 문제
INSERT INTO questions (question, option_a, option_b, option_c, option_d, correct_answer) VALUES
('5 + 3 = ?', '6', '7', '8', '9', 'c'),
('10 + 7 = ?', '15', '16', '17', '18', 'c'),
('12 + 8 = ?', '18', '19', '20', '21', 'c'),
('6 + 9 = ?', '13', '14', '15', '16', 'c'),
('11 + 11 = ?', '20', '21', '22', '23', 'c');

-- 뺄셈 문제
INSERT INTO questions (question, option_a, option_b, option_c, option_d, correct_answer) VALUES
('15 - 7 = ?', '6', '7', '8', '9', 'c'),
('20 - 12 = ?', '6', '7', '8', '9', 'c'),
('18 - 9 = ?', '7', '8', '9', '10', 'c'),
('25 - 15 = ?', '8', '9', '10', '11', 'c'),
('30 - 18 = ?', '10', '11', '12', '13', 'c');

-- 곱셈 문제 (2학년 수준)
INSERT INTO questions (question, option_a, option_b, option_c, option_d, correct_answer) VALUES
('2 × 3 = ?', '4', '5', '6', '7', 'c'),
('2 × 5 = ?', '8', '9', '10', '11', 'c'),
('3 × 3 = ?', '7', '8', '9', '10', 'c'),
('2 × 4 = ?', '6', '7', '8', '9', 'c'),
('5 × 2 = ?', '8', '9', '10', '11', 'c');

-- 비교 문제
INSERT INTO questions (question, option_a, option_b, option_c, option_d, correct_answer) VALUES
('10과 15 중 더 큰 수는?', '10', '15', '같다', '모르겠다', 'b'),
('8과 5 중 더 작은 수는?', '8', '5', '같다', '모르겠다', 'b'),
('20과 25 중 더 큰 수는?', '20', '25', '같다', '모르겠다', 'b');

-- 시계 읽기
INSERT INTO questions (question, option_a, option_b, option_c, option_d, correct_answer) VALUES
('시계가 3시를 가리킵니다. 2시간 후는 몇 시인가요?', '4시', '5시', '6시', '7시', 'b'),
('지금이 오전 9시입니다. 3시간 후는?', '오전 11시', '정오 12시', '오후 1시', '오후 2시', 'b');

-- 도형 문제
INSERT INTO questions (question, option_a, option_b, option_c, option_d, correct_answer) VALUES
('삼각형은 변이 몇 개인가요?', '2개', '3개', '4개', '5개', 'b'),
('사각형은 꼭짓점이 몇 개인가요?', '2개', '3개', '4개', '5개', 'c'),
('원은 꼭짓점이 몇 개인가요?', '0개', '1개', '2개', '3개', 'a');

-- 길이 측정
INSERT INTO questions (question, option_a, option_b, option_c, option_d, correct_answer) VALUES
('1m는 몇 cm인가요?', '10cm', '50cm', '100cm', '1000cm', 'c'),
('연필 1자루의 길이는 약 몇 cm인가요?', '5cm', '10cm', '20cm', '50cm', 'c');

-- 수의 순서
INSERT INTO questions (question, option_a, option_b, option_c, option_d, correct_answer) VALUES
('15, 16, 17, ?의 다음 수는?', '18', '19', '20', '21', 'a'),
('20, 30, 40, ?의 다음 수는?', '45', '50', '55', '60', 'b'),
('10, 20, 30의 가운데 수는?', '10', '15', '20', '25', 'c');

-- 간단한 문장제
INSERT INTO questions (question, option_a, option_b, option_c, option_d, correct_answer) VALUES
('사과가 5개 있습니다. 3개를 더 받았어요. 모두 몇 개인가요?', '6개', '7개', '8개', '9개', 'c'),
('연필이 12자루 있었는데 4자루를 친구에게 주었어요. 남은 연필은?', '6자루', '7자루', '8자루', '9자루', 'c'),
('교실에 학생이 18명 있었는데 5명이 나갔어요. 몇 명이 남았나요?', '11명', '12명', '13명', '14명', 'c');
