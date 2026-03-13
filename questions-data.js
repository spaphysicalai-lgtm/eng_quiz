// 영어유치원 출신 초등 1학년을 위한 레벨테스트 문제 (예제 10개씩)
// 목표: 미국 초등 3학년 수준까지 측정

const questionsData = {
    reading: {
        beginner: [
            { id: 1, question: "The cat is ___.", options: ["happy", "sad", "angry", "sleepy"], correct_answer: "happy", image: "🐱", hint: "고양이가 웃고 있어요! 기분이 어떨까요?", explanation: "'happy'는 '행복한, 기쁜'이라는 뜻이에요. The cat is happy = 고양이가 행복해요." },
            { id: 2, question: "I like to ___ games.", options: ["play", "eat", "sleep", "run"], correct_answer: "play", image: "🎮", hint: "게임으로 무엇을 할까요?", explanation: "'play'는 '놀다, 게임하다'라는 뜻이에요. play games = 게임을 하다" },
            { id: 3, question: "The sun is ___.", options: ["yellow", "blue", "green", "purple"], correct_answer: "yellow", image: "☀️", hint: "태양은 무슨 색일까요?", explanation: "'yellow'는 '노란색'이에요. 태양은 노란색이죠!" },
            { id: 4, question: "We go to ___ on Monday.", options: ["school", "park", "home", "bed"], correct_answer: "school", image: "🏫", hint: "월요일에 친구들을 만나러 어디로 갈까요?", explanation: "'school'은 '학교'예요. 월요일에는 학교에 가요." },
            { id: 5, question: "My ___ is red.", options: ["apple", "banana", "orange", "grape"], correct_answer: "apple", image: "🍎", hint: "빨간색 과일은 무엇일까요?", explanation: "'apple'은 '사과'예요. 사과는 빨간색이죠!" },
            { id: 6, question: "The dog can ___.", options: ["run", "fly", "swim in ocean", "talk"], correct_answer: "run", image: "🐕", hint: "강아지가 할 수 있는 것은?", explanation: "'run'은 '달리다'예요. 강아지는 빨리 달릴 수 있어요!" },
            { id: 7, question: "I ___ a book.", options: ["read", "reads", "reading", "to read"], correct_answer: "read", image: "📚", hint: "'I'와 함께 쓰는 동사의 기본형은?", explanation: "'I read'는 '나는 읽는다'예요. I 다음에는 동사 원형이 와요." },
            { id: 8, question: "Mom is in the ___.", options: ["kitchen", "sky", "car", "tree"], correct_answer: "kitchen", image: "👩‍🍳", hint: "엄마가 요리하는 곳은?", explanation: "'kitchen'은 '부엌'이에요. 엄마는 부엌에서 요리해요." },
            { id: 9, question: "The bird is ___.", options: ["blue", "square", "heavy", "angry"], correct_answer: "blue", image: "🐦", hint: "새의 색깔을 나타내는 단어는?", explanation: "'blue'는 '파란색'이에요. 이 새는 파란색이에요." },
            { id: 10, question: "I see a ___.", options: ["flower", "flowers", "flowered", "flowering"], correct_answer: "flower", image: "🌸", hint: "'a' 다음에는 단수명사가 와요", explanation: "'a flower'는 '꽃 한 송이'예요. 'a' 다음에는 단수형을 써요." }
        ],
        intermediate: [
            { id: 11, question: "Sarah ___ to the park yesterday.", options: ["go", "goes", "went", "going"], correct_answer: "went", image: "🏞️", hint: "'yesterday'는 과거예요!", explanation: "'went'는 'go'의 과거형이에요. yesterday(어제)가 있으면 과거형을 써요." },
            { id: 12, question: "The dog is ___ than the cat.", options: ["big", "bigger", "biggest", "more big"], correct_answer: "bigger", image: "🐕", hint: "'than'이 있으면 비교급을 써요", explanation: "'bigger'는 '더 큰'이라는 뜻의 비교급이에요. big + -er = bigger" },
            { id: 13, question: "I ___ my homework every day.", options: ["do", "does", "did", "doing"], correct_answer: "do", image: "📚", hint: "'I'와 'every day'를 생각해보세요", explanation: "'I do'는 현재 습관을 나타내요. every day = 매일" },
            { id: 14, question: "She ___ a beautiful dress.", options: ["wear", "wears", "wearing", "wore"], correct_answer: "wears", image: "👗", hint: "'She'는 3인칭 단수예요", explanation: "'She wears'처럼 3인칭 단수는 동사에 -s를 붙여요." },
            { id: 15, question: "We ___ pizza for dinner.", options: ["eat", "ate", "eating", "eats"], correct_answer: "ate", image: "🍕", hint: "저녁을 '먹었어요' - 과거예요", explanation: "'ate'는 'eat'의 과거형이에요. 이미 먹은 것을 말할 때 써요." },
            { id: 16, question: "The birds ___ in the sky.", options: ["fly", "flies", "flying", "flew"], correct_answer: "fly", image: "🐦", hint: "'birds'는 복수예요", explanation: "'birds fly'처럼 복수 주어는 동사 원형을 써요." },
            { id: 17, question: "Tom ___ soccer last Sunday.", options: ["play", "plays", "played", "playing"], correct_answer: "played", image: "⚽", hint: "'last Sunday'는 지난 일요일이에요", explanation: "'played'는 과거형이에요. last Sunday = 지난 일요일" },
            { id: 18, question: "My brother is ___ than me.", options: ["tall", "taller", "tallest", "more tall"], correct_answer: "taller", image: "👦", hint: "두 사람을 비교할 때는?", explanation: "'taller'는 '더 큰'이라는 비교급이에요. tall + -er = taller" },
            { id: 19, question: "She ___ to school by bus.", options: ["go", "goes", "going", "went"], correct_answer: "goes", image: "🚌", hint: "'She'는 3인칭 단수, 현재 습관이에요", explanation: "'She goes'는 현재 습관을 나타내요. 3인칭 단수는 -s를 붙여요." },
            { id: 20, question: "They ___ a movie last night.", options: ["watch", "watches", "watched", "watching"], correct_answer: "watched", image: "🎬", hint: "'last night'는 어젯밤이에요", explanation: "'watched'는 과거형이에요. last night = 어젯밤" }
        ],
        advanced: [
            { id: 21, question: "The children ___ playing when it started to rain.", options: ["is", "are", "was", "were"], correct_answer: "were", image: "🌧️", hint: "'children'은 복수이고 과거예요", explanation: "'were playing'은 과거진행형이에요. 아이들이 놀고 있었어요 (과거)." },
            { id: 22, question: "If I ___ rich, I would travel the world.", options: ["am", "was", "were", "be"], correct_answer: "were", image: "✈️", hint: "가정법에서는 'were'를 써요", explanation: "가정법 과거는 'If I were...'를 써요. 실제가 아닌 상상을 말할 때 써요." },
            { id: 23, question: "She has ___ finished her project.", options: ["already", "yet", "still", "never"], correct_answer: "already", image: "✅", hint: "이미 끝냈다는 뜻이에요", explanation: "'already'는 '이미'라는 뜻이에요. has already finished = 이미 끝냈어요" },
            { id: 24, question: "The book ___ by Mark Twain is famous.", options: ["write", "wrote", "written", "writing"], correct_answer: "written", image: "📚", hint: "책은 '쓰여진' 것이에요 (수동)", explanation: "'written'은 과거분사예요. The book written by... = ...에 의해 쓰여진 책" },
            { id: 25, question: "I wish I ___ speak three languages.", options: ["can", "could", "will", "would"], correct_answer: "could", image: "🗣️", hint: "'wish' 다음에는 과거형을 써요", explanation: "'I wish I could'는 '할 수 있으면 좋을텐데'라는 소망을 나타내요." },
            { id: 26, question: "She ___ studying for two hours.", options: ["is", "has been", "was", "will be"], correct_answer: "has been", image: "📖", hint: "2시간 전부터 지금까지 계속 공부 중이에요", explanation: "'has been studying'은 현재완료진행형이에요. 과거부터 지금까지 계속되는 동작이에요." },
            { id: 27, question: "The movie was ___ than I expected.", options: ["good", "better", "best", "well"], correct_answer: "better", image: "🎥", hint: "'than'은 비교급의 신호예요", explanation: "'better'는 'good'의 비교급이에요. than = ...보다" },
            { id: 28, question: "We should ___ our homework now.", options: ["do", "doing", "did", "done"], correct_answer: "do", image: "✏️", hint: "'should' 다음에는 동사원형이 와요", explanation: "'should do'는 '해야 한다'는 뜻이에요. should + 동사원형" },
            { id: 29, question: "The cake ___ delicious yesterday.", options: ["taste", "tastes", "tasted", "tasting"], correct_answer: "tasted", image: "🎂", hint: "'yesterday'는 과거예요", explanation: "'tasted'는 과거형이에요. 어제 맛이 좋았어요." },
            { id: 30, question: "They will ___ the game tomorrow.", options: ["win", "wins", "won", "winning"], correct_answer: "win", image: "🏆", hint: "'will' 다음에는 동사원형이 와요", explanation: "'will win'은 미래형이에요. will + 동사원형 = ...할 것이다" }
        ]
    },
    vocabulary: {
        beginner: [
            { id: 31, question: "A place where you learn is called a ___.", options: ["school", "hospital", "restaurant", "store"], correct_answer: "school", image: "🏫", hint: "선생님과 친구들이 있는 곳", explanation: "'school'은 '학교'예요. 우리가 배우러 가는 곳이에요." },
            { id: 32, question: "You use this to write: ___.", options: ["pencil", "spoon", "cup", "shoe"], correct_answer: "pencil", image: "✏️", hint: "글씨를 쓸 때 사용하는 도구", explanation: "'pencil'은 '연필'이에요. 연필로 글씨를 써요." },
            { id: 33, question: "An animal that says 'meow' is a ___.", options: ["cat", "dog", "bird", "fish"], correct_answer: "cat", image: "🐱", hint: "야옹~ 하고 우는 동물", explanation: "'cat'은 '고양이'예요. 고양이는 'meow'라고 울어요." },
            { id: 34, question: "The color of grass is ___.", options: ["green", "red", "blue", "yellow"], correct_answer: "green", image: "🌿", hint: "풀의 색깔은?", explanation: "'green'은 '초록색'이에요. 풀은 초록색이에요." },
            { id: 35, question: "You wear this on your head: ___.", options: ["hat", "shoe", "glove", "pants"], correct_answer: "hat", image: "🎩", hint: "머리에 쓰는 것", explanation: "'hat'은 '모자'예요. 모자는 머리에 써요." },
            { id: 36, question: "A fruit that is yellow and long is a ___.", options: ["banana", "apple", "orange", "grape"], correct_answer: "banana", image: "🍌", hint: "노랗고 길쭉한 과일", explanation: "'banana'는 '바나나'예요. 바나나는 노랗고 길어요." },
            { id: 37, question: "The opposite of hot is ___.", options: ["cold", "warm", "cool", "big"], correct_answer: "cold", image: "❄️", hint: "뜨거움의 반대말", explanation: "'cold'는 '차가운'이에요. hot(뜨거운)의 반대말이에요." },
            { id: 38, question: "You sleep in a ___.", options: ["bed", "chair", "table", "door"], correct_answer: "bed", image: "🛏️", hint: "잠을 자는 곳", explanation: "'bed'는 '침대'예요. 침대에서 자요." },
            { id: 39, question: "A big animal with a trunk is an ___.", options: ["elephant", "mouse", "cat", "bird"], correct_answer: "elephant", image: "🐘", hint: "코가 길고 큰 동물", explanation: "'elephant'는 '코끼리'예요. 코끼리는 크고 코가 길어요." },
            { id: 40, question: "The opposite of sad is ___.", options: ["happy", "angry", "tired", "hungry"], correct_answer: "happy", image: "😊", hint: "슬픔의 반대말", explanation: "'happy'는 '행복한'이에요. sad(슬픈)의 반대말이에요." }
        ],
        intermediate: [
            { id: 41, question: "A person who teaches is a ___.", options: ["teacher", "doctor", "farmer", "driver"], correct_answer: "teacher", image: "👩‍🏫", hint: "학교에서 가르치는 사람", explanation: "'teacher'는 '선생님'이에요. 선생님은 우리를 가르쳐요." },
            { id: 42, question: "Something you read for fun is a ___.", options: ["book", "pencil", "eraser", "ruler"], correct_answer: "book", image: "📚", hint: "재미있는 이야기가 있는 것", explanation: "'book'은 '책'이에요. 책을 읽으면 재미있어요." },
            { id: 43, question: "When you are not sick, you are ___.", options: ["healthy", "tired", "hungry", "sleepy"], correct_answer: "healthy", image: "💪", hint: "아프지 않은 상태", explanation: "'healthy'는 '건강한'이에요. 아프지 않으면 건강해요." },
            { id: 44, question: "A place where sick people go is a ___.", options: ["hospital", "school", "park", "library"], correct_answer: "hospital", image: "🏥", hint: "아플 때 가는 곳", explanation: "'hospital'은 '병원'이에요. 아프면 병원에 가요." },
            { id: 45, question: "The season after winter is ___.", options: ["spring", "summer", "fall", "autumn"], correct_answer: "spring", image: "🌸", hint: "겨울 다음 계절, 꽃이 피어요", explanation: "'spring'은 '봄'이에요. 겨울 다음에 봄이 와요." },
            { id: 46, question: "When something is not easy, it is ___.", options: ["difficult", "simple", "easy", "nice"], correct_answer: "difficult", image: "🤔", hint: "쉽지 않은 것", explanation: "'difficult'는 '어려운'이에요. easy(쉬운)의 반대말이에요." },
            { id: 47, question: "A person who fixes teeth is a ___.", options: ["dentist", "teacher", "chef", "artist"], correct_answer: "dentist", image: "🦷", hint: "치아를 치료하는 사람", explanation: "'dentist'는 '치과의사'예요. 치과의사는 이를 치료해요." },
            { id: 48, question: "The meal you eat in the morning is ___.", options: ["breakfast", "lunch", "dinner", "snack"], correct_answer: "breakfast", image: "🍳", hint: "아침에 먹는 식사", explanation: "'breakfast'는 '아침식사'예요. 아침에 먹는 밥이에요." },
            { id: 49, question: "Something very old is called ___.", options: ["ancient", "new", "young", "fresh"], correct_answer: "ancient", image: "🏛️", hint: "아주 오래된 것", explanation: "'ancient'는 '고대의, 아주 오래된'이에요. 오래 전 것을 말해요." },
            { id: 50, question: "When you feel scared, you are ___.", options: ["afraid", "happy", "excited", "proud"], correct_answer: "afraid", image: "😰", hint: "무서울 때 느끼는 감정", explanation: "'afraid'는 '무서워하는'이에요. scared와 같은 뜻이에요." }
        ],
        advanced: [
            { id: 51, question: "A person who writes books is an ___.", options: ["author", "actor", "artist", "athlete"], correct_answer: "author", image: "✍️", hint: "책을 쓰는 사람", explanation: "'author'는 '작가'예요. 작가는 책을 써요." },
            { id: 52, question: "Something that is very important is ___.", options: ["essential", "optional", "unnecessary", "extra"], correct_answer: "essential", image: "⭐", hint: "꼭 필요한 것", explanation: "'essential'은 '필수적인'이에요. 반드시 필요한 것을 말해요." },
            { id: 53, question: "To look at something carefully is to ___.", options: ["examine", "ignore", "forget", "lose"], correct_answer: "examine", image: "🔍", hint: "자세히 살펴보는 것", explanation: "'examine'은 '조사하다, 살피다'예요. 자세히 보는 것이에요." },
            { id: 54, question: "A large group of people is called a ___.", options: ["crowd", "pair", "couple", "single"], correct_answer: "crowd", image: "👥", hint: "많은 사람들의 무리", explanation: "'crowd'는 '군중'이에요. 많은 사람들이 모인 것을 말해요." },
            { id: 55, question: "When something makes you laugh, it is ___.", options: ["hilarious", "sad", "boring", "scary"], correct_answer: "hilarious", image: "😂", hint: "아주 웃긴 것", explanation: "'hilarious'는 '아주 웃긴'이에요. 매우 재미있는 것을 말해요." },
            { id: 56, question: "To say you're sorry is to ___.", options: ["apologize", "celebrate", "argue", "complain"], correct_answer: "apologize", image: "🙏", hint: "미안하다고 말하는 것", explanation: "'apologize'는 '사과하다'예요. 잘못했을 때 미안하다고 말해요." },
            { id: 57, question: "Something that happens every year is ___.", options: ["annual", "daily", "monthly", "weekly"], correct_answer: "annual", image: "📅", hint: "매년 일어나는 것", explanation: "'annual'은 '매년의, 연례의'예요. 1년에 한 번 일어나요." },
            { id: 58, question: "A story that is not true is ___.", options: ["fiction", "fact", "reality", "truth"], correct_answer: "fiction", image: "📖", hint: "상상으로 만든 이야기", explanation: "'fiction'은 '허구, 소설'이에요. 사실이 아닌 이야기예요." },
            { id: 59, question: "Very tired and worn out means ___.", options: ["exhausted", "energetic", "excited", "happy"], correct_answer: "exhausted", image: "😫", hint: "아주 아주 피곤한 상태", explanation: "'exhausted'는 '지친, 기진맥진한'이에요. 매우 피곤한 것을 말해요." },
            { id: 60, question: "To make something better is to ___ it.", options: ["improve", "worsen", "damage", "break"], correct_answer: "improve", image: "📈", hint: "더 좋게 만드는 것", explanation: "'improve'는 '개선하다, 향상시키다'예요. 더 좋게 만드는 것이에요." }
        ]
    },
    grammar: {
        beginner: [
            { id: 61, question: "I ___ a student.", options: ["am", "is", "are", "be"], correct_answer: "am", image: "👨‍🎓", hint: "'I'와 함께 쓰는 be동사는?", explanation: "'I am'이 맞아요. I는 항상 am과 함께 써요." },
            { id: 62, question: "She ___ my friend.", options: ["is", "am", "are", "be"], correct_answer: "is", image: "👭", hint: "'She'는 3인칭 단수예요", explanation: "'She is'가 맞아요. He, She, It는 is를 써요." },
            { id: 63, question: "They ___ happy.", options: ["are", "is", "am", "be"], correct_answer: "are", image: "😊", hint: "'They'는 복수예요", explanation: "'They are'가 맞아요. 복수 주어는 are를 써요." },
            { id: 64, question: "We ___ to school.", options: ["go", "goes", "going", "went"], correct_answer: "go", image: "🏫", hint: "'We'는 복수라서 동사 원형을 써요", explanation: "'We go'가 맞아요. 복수 주어는 동사 원형을 써요." },
            { id: 65, question: "He ___ a ball.", options: ["has", "have", "had", "having"], correct_answer: "has", image: "⚽", hint: "'He'는 3인칭 단수예요", explanation: "'He has'가 맞아요. 3인칭 단수는 has를 써요." },
            { id: 66, question: "I ___ two cats.", options: ["have", "has", "had", "having"], correct_answer: "have", image: "🐱", hint: "'I'는 have를 써요", explanation: "'I have'가 맞아요. I, You, We, They는 have를 써요." },
            { id: 67, question: "The dog ___ fast.", options: ["runs", "run", "running", "ran"], correct_answer: "runs", image: "🐕", hint: "'The dog'는 3인칭 단수예요", explanation: "'The dog runs'가 맞아요. 3인칭 단수는 동사에 -s를 붙여요." },
            { id: 68, question: "This ___ my book.", options: ["is", "am", "are", "be"], correct_answer: "is", image: "📚", hint: "'This'는 단수예요", explanation: "'This is'가 맞아요. This, That은 is를 써요." },
            { id: 69, question: "You ___ nice.", options: ["are", "is", "am", "be"], correct_answer: "are", image: "👍", hint: "'You'는 항상 are를 써요", explanation: "'You are'가 맞아요. You는 단수든 복수든 are를 써요." },
            { id: 70, question: "It ___ cold.", options: ["is", "am", "are", "be"], correct_answer: "is", image: "❄️", hint: "'It'은 3인칭 단수예요", explanation: "'It is'가 맞아요. It은 is를 써요." }
        ],
        intermediate: [
            { id: 71, question: "She ___ swimming yesterday.", options: ["went", "go", "goes", "going"], correct_answer: "went", image: "🏊", hint: "'yesterday'는 과거의 신호!", explanation: "'went'는 go의 과거형이에요. yesterday = 어제" },
            { id: 72, question: "I ___ not like broccoli.", options: ["do", "does", "did", "doing"], correct_answer: "do", image: "🥦", hint: "'I'와 함께 쓰는 조동사는?", explanation: "'I do not'이 맞아요. I, You, We, They는 do를 써요." },
            { id: 73, question: "He ___ playing now.", options: ["is", "am", "are", "be"], correct_answer: "is", image: "🎮", hint: "현재진행형, 'He'는 3인칭 단수", explanation: "'He is playing'이 맞아요. 지금 하고 있는 동작이에요." },
            { id: 74, question: "We ___ been friends for years.", options: ["have", "has", "had", "having"], correct_answer: "have", image: "👫", hint: "현재완료, 'We'는 복수", explanation: "'We have been'이 맞아요. 복수 주어는 have를 써요." },
            { id: 75, question: "She speaks ___ than me.", options: ["louder", "loud", "loudest", "more loud"], correct_answer: "louder", image: "🔊", hint: "'than'이 있으면 비교급!", explanation: "'louder'는 비교급이에요. loud + -er = louder" },
            { id: 76, question: "They ___ watching TV now.", options: ["are", "is", "am", "be"], correct_answer: "are", image: "📺", hint: "'They'는 복수, 지금 진행 중", explanation: "'They are watching'이 맞아요. 복수는 are를 써요." },
            { id: 77, question: "I ___ to the store tomorrow.", options: ["will go", "go", "went", "going"], correct_answer: "will go", image: "🏪", hint: "'tomorrow'는 미래!", explanation: "'will go'는 미래형이에요. will + 동사원형 = ...할 것이다" },
            { id: 78, question: "She ___ her homework already.", options: ["finished", "finish", "finishes", "finishing"], correct_answer: "finished", image: "✅", hint: "'already'는 이미 끝난 일", explanation: "'finished'는 과거형이에요. 이미 끝난 일을 말해요." },
            { id: 79, question: "We ___ pizza every Friday.", options: ["eat", "eats", "ate", "eating"], correct_answer: "eat", image: "🍕", hint: "'We'는 복수, 'every Friday'는 습관", explanation: "'We eat'이 맞아요. 복수 주어는 동사 원형을 써요." },
            { id: 80, question: "The cat ___ on the bed.", options: ["is sleeping", "sleep", "sleeps", "slept"], correct_answer: "is sleeping", image: "😴", hint: "지금 자고 있어요 - 현재진행형", explanation: "'is sleeping'은 현재진행형이에요. 지금 하고 있는 동작이에요." }
        ],
        advanced: [
            { id: 81, question: "By next year, I ___ in this city for 10 years.", options: ["will have lived", "live", "lived", "am living"], correct_answer: "will have lived", image: "🏙️", hint: "미래완료: 미래의 어느 시점까지", explanation: "'will have lived'는 미래완료예요. 내년까지 10년이 돼요." },
            { id: 82, question: "If I ___ you, I would study harder.", options: ["were", "am", "was", "be"], correct_answer: "were", image: "📚", hint: "가정법에서는 'were'를 써요", explanation: "가정법 과거에서는 모든 인칭에 were를 써요. 실제와 반대 상황이에요." },
            { id: 83, question: "The homework ___ by tomorrow.", options: ["must be done", "must do", "must doing", "must did"], correct_answer: "must be done", image: "✏️", hint: "숙제는 '되어져야' 해요 - 수동태", explanation: "'must be done'은 수동태예요. 숙제는 행해지는 대상이에요." },
            { id: 84, question: "She ___ for three hours before he arrived.", options: ["had been waiting", "wait", "waits", "waiting"], correct_answer: "had been waiting", image: "⏰", hint: "과거의 과거 - 과거완료진행형", explanation: "'had been waiting'은 과거완료진행형이에요. 그가 도착하기 전부터 계속 기다렸어요." },
            { id: 85, question: "I ___ go to the party if I finish my work.", options: ["might", "must", "should", "would"], correct_answer: "might", image: "🎉", hint: "'아마도 갈지도' - 가능성", explanation: "'might'는 '~할지도 모른다'는 가능성을 나타내요." },
            { id: 86, question: "The book ___ by many people.", options: ["was read", "read", "reads", "reading"], correct_answer: "was read", image: "📖", hint: "책은 '읽혀진' 것 - 수동태", explanation: "'was read'는 과거 수동태예요. 많은 사람들에 의해 읽혔어요." },
            { id: 87, question: "He suggested that she ___ early.", options: ["leave", "leaves", "left", "leaving"], correct_answer: "leave", image: "🚪", hint: "suggest 다음에는 동사원형", explanation: "'suggest that + 주어 + 동사원형'이에요. 제안할 때 쓰는 표현이에요." },
            { id: 88, question: "Neither John nor his friends ___ coming.", options: ["are", "is", "am", "be"], correct_answer: "are", image: "👥", hint: "'nor' 뒤의 명사에 동사를 맞춰요", explanation: "'Neither A nor B'에서는 B(his friends)에 동사를 맞춰요. 복수라서 are예요." },
            { id: 89, question: "I wish I ___ more time yesterday.", options: ["had had", "have", "has", "having"], correct_answer: "had had", image: "⏳", hint: "wish 뒤 과거 - 과거완료", explanation: "'I wish I had had'는 과거에 대한 아쉬움이에요. 어제 시간이 있었으면 좋았을텐데." },
            { id: 90, question: "The concert ___ when we arrived.", options: ["had started", "start", "starts", "starting"], correct_answer: "had started", image: "🎵", hint: "우리가 도착하기 전에 시작했어요 - 과거완료", explanation: "'had started'는 과거완료예요. 우리가 도착했을 때 이미 시작했었어요." }
        ]
    },
    writing: {
        beginner: [
            { id: 91, story: "I have a [0]. My [0] is [1]. I love my [0].", blanks: [{answer: "dog"}, {answer: "happy"}], hints: ["dog", "happy", "cat", "sad"], image: "🐶" },
            { id: 92, story: "The [0] is in the sky. The [0] is [1].", blanks: [{answer: "sun"}, {answer: "yellow"}], hints: ["sun", "yellow", "moon", "blue"], image: "☀️" },
            { id: 93, story: "I like to [0]. I [0] every day.", blanks: [{answer: "play"}, {answer: "play"}], hints: ["play", "read", "eat", "sleep"], image: "🎮" },
            { id: 94, story: "My [0] is big. I sleep in my [0].", blanks: [{answer: "bed"}, {answer: "bed"}], hints: ["bed", "room", "house", "chair"], image: "🛏️" },
            { id: 95, story: "I go to [0]. I learn at [0].", blanks: [{answer: "school"}, {answer: "school"}], hints: ["school", "park", "home", "store"], image: "🏫" },
            { id: 96, story: "The [0] is red. I eat the [0].", blanks: [{answer: "apple"}, {answer: "apple"}], hints: ["apple", "banana", "orange", "grape"], image: "🍎" },
            { id: 97, story: "My mom is [0]. I love my [0] mom.", blanks: [{answer: "nice"}, {answer: "nice"}], hints: ["nice", "kind", "happy", "good"], image: "👩" },
            { id: 98, story: "The [0] can fly. The [0] is blue.", blanks: [{answer: "bird"}, {answer: "bird"}], hints: ["bird", "fish", "dog", "cat"], image: "🐦" },
            { id: 99, story: "I drink [0]. [0] is good.", blanks: [{answer: "water"}, {answer: "water"}], hints: ["water", "milk", "juice", "tea"], image: "💧" },
            { id: 100, story: "We [0] in the park. [0] is fun.", blanks: [{answer: "play"}, {answer: "playing"}], hints: ["play", "playing", "run", "walk"], image: "🏞️" }
        ],
        intermediate: [
            { id: 101, story: "Yesterday, I [0] to the park. I [1] my friends there.", blanks: [{answer: "went"}, {answer: "met"}], hints: ["went", "met", "saw", "played"], image: "🏞️" },
            { id: 102, story: "My dog is [0] than my cat. But my cat is [1].", blanks: [{answer: "bigger"}, {answer: "faster"}], hints: ["bigger", "faster", "smaller", "slower"], image: "🐕🐱" },
            { id: 103, story: "She [0] her homework every night. She is [1] student.", blanks: [{answer: "does"}, {answer: "a good"}], hints: ["does", "good", "makes", "smart"], image: "📚" },
            { id: 104, story: "Last week, we [0] a movie. The movie [1] very exciting.", blanks: [{answer: "watched"}, {answer: "was"}], hints: ["watched", "was", "saw", "is"], image: "🎬" },
            { id: 105, story: "I [0] pizza for dinner. It [1] delicious.", blanks: [{answer: "ate"}, {answer: "was"}], hints: ["ate", "was", "had", "tasted"], image: "🍕" },
            { id: 106, story: "My brother [0] soccer every Saturday. He [1] very well.", blanks: [{answer: "plays"}, {answer: "plays"}], hints: ["plays", "runs", "kicks", "does"], image: "⚽" },
            { id: 107, story: "She [0] to school by bus. The bus [1] at 8 o'clock.", blanks: [{answer: "goes"}, {answer: "arrives"}], hints: ["goes", "arrives", "comes", "leaves"], image: "🚌" },
            { id: 108, story: "We [0] our grandparents yesterday. They [1] very happy.", blanks: [{answer: "visited"}, {answer: "were"}], hints: ["visited", "were", "saw", "met"], image: "👴👵" },
            { id: 109, story: "The weather [0] nice today. I [1] go outside.", blanks: [{answer: "is"}, {answer: "want to"}], hints: ["is", "want", "will", "can"], image: "🌤️" },
            { id: 110, story: "My teacher [0] us math. She [1] it very well.", blanks: [{answer: "teaches"}, {answer: "explains"}], hints: ["teaches", "explains", "shows", "tells"], image: "👩‍🏫" }
        ],
        advanced: [
            { id: 111, story: "By the time we arrived, the movie [0] already [1].", blanks: [{answer: "had"}, {answer: "started"}], hints: ["had", "started", "was", "began"], image: "🎥" },
            { id: 112, story: "If I [0] more time, I [1] help you with your project.", blanks: [{answer: "had"}, {answer: "would"}], hints: ["had", "would", "have", "could"], image: "⏰" },
            { id: 113, story: "She [0] studying for three hours when her friend [1].", blanks: [{answer: "had been"}, {answer: "called"}], hints: ["had been", "called", "was", "phoned"], image: "📞" },
            { id: 114, story: "The book [0] by many famous authors [1] very popular.", blanks: [{answer: "written"}, {answer: "is"}], hints: ["written", "is", "wrote", "was"], image: "📚" },
            { id: 115, story: "We should [0] our homework before we [1] out to play.", blanks: [{answer: "finish"}, {answer: "go"}], hints: ["finish", "go", "complete", "leave"], image: "✏️" },
            { id: 116, story: "Neither my sister nor my brother [0] coming to the party. They [1] both busy.", blanks: [{answer: "is"}, {answer: "are"}], hints: ["is", "are", "was", "were"], image: "🎉" },
            { id: 117, story: "I wish I [0] speak French. It [1] be very useful.", blanks: [{answer: "could"}, {answer: "would"}], hints: ["could", "would", "can", "will"], image: "🇫🇷" },
            { id: 118, story: "The concert [0] already [1] when we got there.", blanks: [{answer: "had"}, {answer: "begun"}], hints: ["had", "begun", "was", "started"], image: "🎵" },
            { id: 119, story: "She suggested that we [0] earlier tomorrow. That [1] be a good idea.", blanks: [{answer: "leave"}, {answer: "would"}], hints: ["leave", "would", "go", "should"], image: "🚪" },
            { id: 120, story: "If he [0] harder last year, he [1] have passed the test.", blanks: [{answer: "had studied"}, {answer: "would"}], hints: ["had studied", "would", "studied", "could"], image: "📝" }
        ]
    }
};

module.exports = questionsData;
