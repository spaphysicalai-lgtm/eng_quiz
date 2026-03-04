-- Supabase Database Setup for English Quiz App
-- Run this in Supabase SQL Editor

-- Drop existing tables
DROP TABLE IF EXISTS writing_exercises CASCADE;
DROP TABLE IF EXISTS questions CASCADE;

-- Multiple Choice Questions Table
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

-- Writing Exercises Table
CREATE TABLE writing_exercises (
  id SERIAL PRIMARY KEY,
  story TEXT NOT NULL,
  blanks JSONB NOT NULL,
  hints JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX idx_questions_category ON questions(category);

-- READING QUESTIONS (30 total)
INSERT INTO questions (question, option_a, option_b, option_c, option_d, correct_answer, category) VALUES
-- Basic sentence comprehension
('The cat is ___ the table.', 'in', 'on', 'at', 'by', 'b', 'reading'),
('I ___ to school every day.', 'goes', 'go', 'going', 'gone', 'b', 'reading'),
('She ___ a red dress.', 'wear', 'wears', 'wearing', 'worn', 'b', 'reading'),
('The sun ___ in the morning.', 'rises', 'rise', 'rising', 'rose', 'a', 'reading'),
('We ___ happy today.', 'am', 'is', 'are', 'be', 'c', 'reading'),
('Birds can ___.', 'swim', 'fly', 'jump', 'run', 'b', 'reading'),
('The dog is ___ the house.', 'inside', 'outside', 'under', 'all correct', 'd', 'reading'),
('My mom ___ dinner.', 'cook', 'cooks', 'cooking', 'cooked', 'b', 'reading'),
('I like to ___ books.', 'see', 'look', 'read', 'watch', 'c', 'reading'),
('The ball is ___.', 'square', 'round', 'flat', 'long', 'b', 'reading'),
-- More reading questions
('Tom ___ his homework.', 'do', 'does', 'doing', 'done', 'b', 'reading'),
('They ___ to the park.', 'go', 'goes', 'went', 'going', 'c', 'reading'),
('The flowers ___ beautiful.', 'am', 'is', 'are', 'be', 'c', 'reading'),
('My sister ___ a bike.', 'ride', 'rides', 'riding', 'rode', 'b', 'reading'),
('We ___ lunch at noon.', 'eat', 'eats', 'eating', 'ate', 'a', 'reading'),
('The baby ___ crying.', 'am', 'is', 'are', 'be', 'b', 'reading'),
('I ___ my room clean.', 'keep', 'keeps', 'keeping', 'kept', 'a', 'reading'),
('Dad ___ to work by car.', 'go', 'goes', 'going', 'gone', 'b', 'reading'),
('The children ___ in the playground.', 'play', 'plays', 'playing', 'played', 'a', 'reading'),
('She ___ her teeth every morning.', 'brush', 'brushes', 'brushing', 'brushed', 'b', 'reading'),
('The students ___ quietly.', 'works', 'work', 'working', 'worked', 'b', 'reading'),
('A fish ___ in water.', 'live', 'lives', 'living', 'lived', 'b', 'reading'),
('My friend and I ___ games.', 'play', 'plays', 'playing', 'played', 'a', 'reading'),
('The teacher ___ the lesson.', 'explain', 'explains', 'explaining', 'explained', 'b', 'reading'),
('I ___ to the music.', 'listen', 'listens', 'listening', 'listened', 'a', 'reading'),
('The clock ___ on the wall.', 'hang', 'hangs', 'hanging', 'hung', 'b', 'reading'),
('We ___ our hands before eating.', 'wash', 'washes', 'washing', 'washed', 'a', 'reading'),
('The moon ___ at night.', 'shine', 'shines', 'shining', 'shone', 'b', 'reading'),
('My parents ___ me a lot.', 'love', 'loves', 'loving', 'loved', 'a', 'reading'),
('The rain ___ from the sky.', 'fall', 'falls', 'falling', 'fell', 'b', 'reading');

-- VOCABULARY QUESTIONS (30 total)
INSERT INTO questions (question, option_a, option_b, option_c, option_d, correct_answer, category) VALUES
-- Opposites and meanings
('What is the opposite of "hot"?', 'warm', 'cold', 'cool', 'heat', 'b', 'vocabulary'),
('What is a "chair"?', 'something to eat', 'something to sit', 'something to drink', 'something to wear', 'b', 'vocabulary'),
('What is the opposite of "big"?', 'large', 'huge', 'small', 'tall', 'c', 'vocabulary'),
('A "book" is for:', 'eating', 'reading', 'drinking', 'sleeping', 'b', 'vocabulary'),
('What is the opposite of "happy"?', 'sad', 'angry', 'tired', 'hungry', 'a', 'vocabulary'),
('What color is the sky?', 'red', 'green', 'blue', 'yellow', 'c', 'vocabulary'),
('What is a "banana"?', 'a fruit', 'a vegetable', 'a drink', 'a toy', 'a', 'vocabulary'),
('What is the opposite of "day"?', 'morning', 'night', 'afternoon', 'evening', 'b', 'vocabulary'),
('What do you use to write?', 'a fork', 'a spoon', 'a pencil', 'a plate', 'c', 'vocabulary'),
('What is the opposite of "up"?', 'left', 'right', 'down', 'side', 'c', 'vocabulary'),
-- More vocabulary
('What is "fast"?', 'slow', 'quick', 'lazy', 'tired', 'b', 'vocabulary'),
('A "teacher" works in:', 'a hospital', 'a school', 'a store', 'a park', 'b', 'vocabulary'),
('What is the opposite of "old"?', 'new', 'young', 'both a and b', 'tired', 'c', 'vocabulary'),
('What is "rain"?', 'water from sky', 'wind', 'snow', 'sun', 'a', 'vocabulary'),
('What is the opposite of "tall"?', 'big', 'small', 'short', 'long', 'c', 'vocabulary'),
('A "doctor" helps when you are:', 'happy', 'sick', 'hungry', 'sleepy', 'b', 'vocabulary'),
('What is "beautiful"?', 'ugly', 'pretty', 'bad', 'old', 'b', 'vocabulary'),
('What is the opposite of "loud"?', 'quiet', 'big', 'fast', 'slow', 'a', 'vocabulary'),
('A "bed" is for:', 'eating', 'sleeping', 'playing', 'studying', 'b', 'vocabulary'),
('What is "angry"?', 'happy', 'sad', 'mad', 'tired', 'c', 'vocabulary'),
('What is the opposite of "clean"?', 'dirty', 'wet', 'dry', 'clear', 'a', 'vocabulary'),
('A "kitchen" is where you:', 'sleep', 'cook', 'study', 'play', 'b', 'vocabulary'),
('What is "brave"?', 'scared', 'courageous', 'tired', 'hungry', 'b', 'vocabulary'),
('What is the opposite of "empty"?', 'full', 'big', 'small', 'clean', 'a', 'vocabulary'),
('A "library" has many:', 'toys', 'books', 'foods', 'beds', 'b', 'vocabulary'),
('What is "kind"?', 'mean', 'nice', 'angry', 'sad', 'b', 'vocabulary'),
('What is the opposite of "hard"?', 'soft', 'difficult', 'easy', 'both a and c', 'd', 'vocabulary'),
('A "zoo" has many:', 'books', 'animals', 'cars', 'houses', 'b', 'vocabulary'),
('What is "smart"?', 'dumb', 'clever', 'slow', 'lazy', 'b', 'vocabulary'),
('What is the opposite of "wet"?', 'dry', 'clean', 'dirty', 'cold', 'a', 'vocabulary');

-- GRAMMAR QUESTIONS (30 total)
INSERT INTO questions (question, option_a, option_b, option_c, option_d, correct_answer, category) VALUES
-- Basic grammar
('I ___ a student.', 'am', 'is', 'are', 'be', 'a', 'grammar'),
('She ___ my friend.', 'am', 'is', 'are', 'be', 'b', 'grammar'),
('They ___ at home.', 'am', 'is', 'are', 'be', 'c', 'grammar'),
('Choose the verb: "I ___ an apple."', 'am', 'eat', 'happy', 'red', 'b', 'grammar'),
('Choose the noun: "The ___ is red."', 'run', 'jump', 'apple', 'quickly', 'c', 'grammar'),
('Which is a question?', 'I like dogs.', 'The cat runs.', 'Where is mom?', 'We are happy.', 'c', 'grammar'),
('He ___ to school.', 'go', 'goes', 'going', 'gone', 'b', 'grammar'),
('We ___ lunch at noon.', 'eat', 'eats', 'eating', 'ate', 'a', 'grammar'),
('Which is plural?', 'dog', 'dogs', 'doges', 'dogo', 'b', 'grammar'),
('I have two ___.', 'cat', 'cats', 'cates', 'catoes', 'b', 'grammar'),
-- More grammar
('You ___ my best friend.', 'am', 'is', 'are', 'be', 'c', 'grammar'),
('The dog ___ brown.', 'am', 'is', 'are', 'be', 'b', 'grammar'),
('Which is an adjective?', 'run', 'big', 'jump', 'eat', 'b', 'grammar'),
('I ___ a new toy.', 'has', 'have', 'having', 'had', 'b', 'grammar'),
('She ___ three books.', 'has', 'have', 'having', 'had', 'a', 'grammar'),
('Which is correct?', 'He go home.', 'He goes home.', 'He going home.', 'He gone home.', 'b', 'grammar'),
('Make it plural: "one box, two ___"', 'box', 'boxs', 'boxes', 'boxies', 'c', 'grammar'),
('It ___ cold today.', 'am', 'is', 'are', 'be', 'b', 'grammar'),
('We ___ students.', 'am', 'is', 'are', 'be', 'c', 'grammar'),
('Which needs a capital letter?', 'dog', 'book', 'mary', 'table', 'c', 'grammar'),
('Choose the correct: "___ you happy?"', 'Am', 'Is', 'Are', 'Be', 'c', 'grammar'),
('I ___ not tired.', 'am', 'is', 'are', 'be', 'a', 'grammar'),
('Make it plural: "one child, two ___"', 'childs', 'children', 'childes', 'child', 'b', 'grammar'),
('The cats ___ sleeping.', 'am', 'is', 'are', 'be', 'c', 'grammar'),
('Which is a verb?', 'happy', 'run', 'big', 'red', 'b', 'grammar'),
('Make it plural: "one foot, two ___"', 'foots', 'feet', 'feets', 'foot', 'b', 'grammar'),
('___ name is Tom.', 'I', 'My', 'Me', 'Mine', 'b', 'grammar'),
('This is ___ book.', 'I', 'my', 'me', 'mine', 'b', 'grammar'),
('The book is ___.', 'I', 'my', 'me', 'mine', 'd', 'grammar'),
('Can you help ___?', 'I', 'my', 'me', 'mine', 'c', 'grammar');

-- WRITING EXERCISES (30 total)
-- Stories with blanks
INSERT INTO writing_exercises (story, blanks, hints) VALUES
('My Pet Dog[0]Today I [1] to the [2] with my dog. His name is [3]. He loves to [4] and catch balls. We had so much [5]!', 
'[{"answer":"park"},{"answer":"went"},{"answer":"park"},{"answer":"Max"},{"answer":"run"},{"answer":"fun"}]', 
'["went", "park", "Max", "run", "fun"]'),

('The Birthday Party[0]Yesterday was my [1]. My friends came to my [2]. We ate [3] and played [4]. It was the best day [5]!', 
'[{"answer":"birthday"},{"answer":"birthday"},{"answer":"house"},{"answer":"cake"},{"answer":"games"},{"answer":"ever"}]', 
'["birthday", "house", "cake", "games", "ever"]'),

('A Day at the Beach[0]Last summer, my [1] went to the beach. We [2] in the ocean and built [3] castles. The [4] was hot and [5].', 
'[{"answer":"family"},{"answer":"swam"},{"answer":"sand"},{"answer":"sun"},{"answer":"bright"}]', 
'["family", "swam", "sand", "sun", "bright"]'),

('My Favorite Food[0]I love to eat [1]. My mom makes the best pizza in the [2]. It has [3] and yummy toppings. I eat it every [4]!', 
'[{"answer":"pizza"},{"answer":"world"},{"answer":"cheese"},{"answer":"Friday"}]', 
'["pizza", "world", "cheese", "Friday"]'),

('Going to School[0]Every morning I [1] up early. I eat [2] and brush my teeth. Then I [3] to school on the big yellow [4].', 
'[{"answer":"wake"},{"answer":"breakfast"},{"answer":"go"},{"answer":"bus"}]', 
'["wake", "breakfast", "go", "bus"]'),

('The Lost Toy[0]I lost my favorite [1] yesterday. I looked everywhere in my [2]. Finally, I [3] it under my bed. I was so [4]!', 
'[{"answer":"toy"},{"answer":"room"},{"answer":"found"},{"answer":"happy"}]', 
'["toy", "room", "found", "happy"]'),

('Making a Friend[0]At the park, I met a new [1]. Her name is [2]. We played on the [3] together. Now we are best [4]!', 
'[{"answer":"girl"},{"answer":"Emma"},{"answer":"swings"},{"answer":"friends"}]', 
'["girl", "Emma", "swings", "friends"]'),

('The Rainy Day[0]Today it is [1] outside. I cant play in the [2]. Instead, I read my favorite [3] and draw [4].', 
'[{"answer":"raining"},{"answer":"yard"},{"answer":"book"},{"answer":"pictures"}]', 
'["raining", "yard", "book", "pictures"]'),

('Helping Mom[0]Today I helped my mom [1] the house. I [2] my toys and made my bed. Mom said I did a great [3]!', 
'[{"answer":"clean"},{"answer":"picked"},{"answer":"job"}]', 
'["clean", "picked", "job"]'),

('The Class Pet[0]Our class has a pet [1]. His name is [2]. We take turns [3] him. He likes to eat [4] and sleep.', 
'[{"answer":"hamster"},{"answer":"Fluffy"},{"answer":"feeding"},{"answer":"seeds"}]', 
'["hamster", "Fluffy", "feeding", "seeds"]'),

('The Big Game[0]Last week we [1] a soccer game. I [2] two goals! My [3] cheered loudly. We won the [4]!', 
'[{"answer":"played"},{"answer":"scored"},{"answer":"team"},{"answer":"game"}]', 
'["played", "scored", "team", "game"]'),

('Visiting Grandma[0]I love to [1] my grandma. She bakes [2] cookies. We read [3] together. She always makes me [4].', 
'[{"answer":"visit"},{"answer":"chocolate"},{"answer":"stories"},{"answer":"smile"}]', 
'["visit", "chocolate", "stories", "smile"]'),

('The Garden[0]In our [1], we grow [2] and flowers. I [3] them every day. Soon we will have fresh [4]!', 
'[{"answer":"garden"},{"answer":"vegetables"},{"answer":"water"},{"answer":"tomatoes"}]', 
'["garden", "vegetables", "water", "tomatoes"]'),

('My Best Friend[0]My best friend is [1]. We do everything [2]. We play, laugh, and share [3]. Friends are [4]!', 
'[{"answer":"Lucy"},{"answer":"together"},{"answer":"toys"},{"answer":"special"}]', 
'["Lucy", "together", "toys", "special"]'),

('The Snow Day[0]Today it [1]! Everything is white and [2]. We built a [3] and had a snowball [4]. Winter is fun!', 
'[{"answer":"snowed"},{"answer":"cold"},{"answer":"snowman"},{"answer":"fight"}]', 
'["snowed", "cold", "snowman", "fight"]'),

('Learning to Ride[0]I learned to ride a [1] last month. At first I [2], but I kept [3]. Now I can ride without [4]!', 
'[{"answer":"bike"},{"answer":"fell"},{"answer":"trying"},{"answer":"training"}]', 
'["bike", "fell", "trying", "training"]'),

('The Camping Trip[0]We went [1] in the woods. We [2] a tent and made a campfire. We saw [3] in the sky at [4].', 
'[{"answer":"camping"},{"answer":"pitched"},{"answer":"stars"},{"answer":"night"}]', 
'["camping", "pitched", "stars", "night"]'),

('The New Puppy[0]We got a new [1] today! Hes so cute and [2]. I will [3] him tricks and take good [4] of him.', 
'[{"answer":"puppy"},{"answer":"fluffy"},{"answer":"teach"},{"answer":"care"}]', 
'["puppy", "fluffy", "teach", "care"]'),

('My Room[0]I have my own [1]. It has a comfy [2] and lots of [3]. I keep it clean and [4] every day.', 
'[{"answer":"room"},{"answer":"bed"},{"answer":"toys"},{"answer":"tidy"}]', 
'["room", "bed", "toys", "tidy"]'),

('The Science Fair[0]At school we had a [1] fair. I made a [2] about plants. I won a blue [3]! Science is [4].', 
'[{"answer":"science"},{"answer":"project"},{"answer":"ribbon"},{"answer":"fun"}]', 
'["science", "project", "ribbon", "fun"]'),

('Making Breakfast[0]This morning I [1] breakfast for my family. I made [2] and juice. Everyone said it was [3]!', 
'[{"answer":"made"},{"answer":"pancakes"},{"answer":"delicious"}]', 
'["made", "pancakes", "delicious"]'),

('The Library Visit[0]I went to the [1] today. I checked out three [2] about dinosaurs. I love to [3] and learn!', 
'[{"answer":"library"},{"answer":"books"},{"answer":"read"}]', 
'["library", "books", "read"]'),

('The School Play[0]Our class did a [1]. I was a [2]. We practiced for [3]. Everyone [4] at the end!', 
'[{"answer":"play"},{"answer":"princess"},{"answer":"weeks"},{"answer":"clapped"}]', 
'["play", "princess", "weeks", "clapped"]'),

('The Picnic[0]We had a [1] in the park. We ate [2] and fruit. We played [3] on the grass. It was a perfect [4].', 
'[{"answer":"picnic"},{"answer":"sandwiches"},{"answer":"games"},{"answer":"day"}]', 
'["picnic", "sandwiches", "games", "day"]'),

('Learning Music[0]I am learning to play the [1]. My teacher is very [2]. I practice every [3]. Music makes me [4]!', 
'[{"answer":"piano"},{"answer":"patient"},{"answer":"day"},{"answer":"happy"}]', 
'["piano", "patient", "day", "happy"]'),

('The Hospital Visit[0]My mom works at the [1]. She is a [2]. She helps people who are [3]. She is my [4]!', 
'[{"answer":"hospital"},{"answer":"nurse"},{"answer":"sick"},{"answer":"hero"}]', 
'["hospital", "nurse", "sick", "hero"]'),

('The Art Class[0]In art class we [1] pictures. I used many [2]. I painted a [3]. Art is my favorite [4]!', 
'[{"answer":"draw"},{"answer":"colors"},{"answer":"rainbow"},{"answer":"subject"}]', 
'["draw", "colors", "rainbow", "subject"]'),

('The First Day[0]It was my first day at a new [1]. I felt [2]. But I made new [3]. Now I love my school!', 
'[{"answer":"school"},{"answer":"nervous"},{"answer":"friends"}]', 
'["school", "nervous", "friends"]'),

('The Farm Visit[0]We visited a [1] yesterday. We saw cows, [2], and chickens. I fed the [3]. Farm life is [4]!', 
'[{"answer":"farm"},{"answer":"pigs"},{"answer":"animals"},{"answer":"interesting"}]', 
'["farm", "pigs", "animals", "interesting"]'),

('My Dream[0]Last night I had a wonderful [1]. I could [2] like a bird. I flew over [3] and oceans. Dreams are [4]!', 
'[{"answer":"dream"},{"answer":"fly"},{"answer":"mountains"},{"answer":"amazing"}]', 
'["dream", "fly", "mountains", "amazing"]');
