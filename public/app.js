let currentQuestion = null;
let currentCategory = null;
let correctCount = 0;
let wrongCount = 0;
let currentAnswers = {};

// 요소 선택
const categoryPage = document.getElementById('category-page');
const quizPage = document.getElementById('quiz-page');
const loadingEl = document.getElementById('loading');
const quizContentEl = document.getElementById('quiz-content');
const writingContentEl = document.getElementById('writing-content');
const questionTextEl = document.getElementById('question-text');
const optionsContainerEl = document.getElementById('options-container');
const resultMessageEl = document.getElementById('result-message');
const resultMessageWritingEl = document.getElementById('result-message-writing');
const nextButtonEl = document.getElementById('next-button');
const nextButtonWritingEl = document.getElementById('next-button-writing');
const correctCountEl = document.getElementById('correct-count');
const wrongCountEl = document.getElementById('wrong-count');
const currentCategoryEl = document.getElementById('current-category');
const storyTextEl = document.getElementById('story-text');
const hintsContainerEl = document.getElementById('hints-container');

// 카테고리 이름 매핑
const categoryNames = {
    'reading': '📖 Reading',
    'writing': '✍️ Writing',
    'vocabulary': '📚 Vocabulary',
    'grammar': '📝 Grammar'
};

// 카테고리 선택
function selectCategory(category) {
    currentCategory = category;
    categoryPage.classList.remove('active');
    quizPage.classList.add('active');
    currentCategoryEl.textContent = categoryNames[category];
    currentCategoryEl.className = `category-badge ${category}`;
    correctCount = 0;
    wrongCount = 0;
    correctCountEl.textContent = correctCount;
    wrongCountEl.textContent = wrongCount;
    loadQuestion();
}

// 뒤로 가기
function goBack() {
    quizPage.classList.remove('active');
    categoryPage.classList.add('active');
    currentCategory = null;
}

// 새 문제 로드
async function loadQuestion() {
    try {
        loadingEl.style.display = 'block';
        quizContentEl.style.display = 'none';
        writingContentEl.style.display = 'none';
        resultMessageEl.classList.remove('show');
        resultMessageWritingEl.classList.remove('show');
        nextButtonEl.style.display = 'none';
        nextButtonWritingEl.style.display = 'none';
        
        const response = await fetch(`/api/questions/random?category=${currentCategory}`);
        if (!response.ok) throw new Error('Failed to load question');
        
        currentQuestion = await response.json();
        
        if (currentCategory === 'writing') {
            displayWritingExercise();
        } else {
            displayQuestion();
        }
    } catch (error) {
        console.error('Error loading question:', error);
        loadingEl.textContent = 'Failed to load question. Please refresh.';
    }
}

// 선다형 문제 표시
function displayQuestion() {
    loadingEl.style.display = 'none';
    quizContentEl.style.display = 'block';
    
    questionTextEl.textContent = currentQuestion.question;
    optionsContainerEl.innerHTML = '';
    
    const options = [
        currentQuestion.option_a,
        currentQuestion.option_b,
        currentQuestion.option_c,
        currentQuestion.option_d
    ];
    
    options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.onclick = () => selectAnswer(String.fromCharCode(97 + index));
        optionsContainerEl.appendChild(button);
    });
}

// 쓰기 문제 표시
function displayWritingExercise() {
    loadingEl.style.display = 'none';
    writingContentEl.style.display = 'block';
    currentAnswers = {};
    
    // 스토리 텍스트 생성 (빈칸 포함)
    const blanks = currentQuestion.blanks || [];
    let storyHTML = currentQuestion.story;
    
    blanks.forEach((blank, index) => {
        const inputId = `blank-${index}`;
        storyHTML = storyHTML.replace(`[${index}]`, 
            `<input type="text" id="${inputId}" data-answer="${blank.answer}" 
             placeholder="___" autocomplete="off" />`);
    });
    
    storyTextEl.innerHTML = storyHTML;
    
    // 힌트 표시
    if (currentQuestion.hints && currentQuestion.hints.length > 0) {
        hintsContainerEl.innerHTML = '';
        currentQuestion.hints.forEach(hint => {
            const hintEl = document.createElement('span');
            hintEl.className = 'hint-word';
            hintEl.textContent = hint;
            hintEl.onclick = () => useHint(hint, hintEl);
            hintsContainerEl.appendChild(hintEl);
        });
    }
}

// 힌트 사용
function useHint(word, element) {
    const focusedInput = document.activeElement;
    if (focusedInput && focusedInput.tagName === 'INPUT') {
        focusedInput.value = word;
        element.classList.add('used');
    }
}

// 답안 선택
async function selectAnswer(selectedAnswer) {
    // 모든 버튼 비활성화
    const buttons = optionsContainerEl.querySelectorAll('.option-btn');
    buttons.forEach(btn => btn.disabled = true);
    
    try {
        const response = await fetch('/api/check-answer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               Failed to check answerrentQuestion.id,
                answer: selectedAnswer
            })
        });
        
        const result = await response.json();
        showResult(result.correct, selectedAnswer, result.correctAnswer);
    } catch (error) {
        console.error('Error checking answer:', error);
        alert('답안을 확인하는데 실패했습니다.');
        buttons.forEach(btn => btn.disabled = false);
    }
}

// 결과 표시
function showResult(isCorrect, selectedAnswer, correctAnswer) {
    const buttons = optionsContainerEl.querySelectorAll('.option-btn');
    
    buttons.forEach((btn, index) => {
        const optionLetter = String.fromCharCode(97 + index);
        
        if (optionLetter === correctAnswer) {
            btn.classList.add('correct');
        } else if (optionLetter === selectCorrect! Great job!';
        correctCount++;
        correctCountEl.textContent = correctCount;
    } else {
        resultMessageEl.classList.add('wrong');
        resultMessageEl.textContent = '😊 Not quite! Try the next one
    
    if (isCorrect) {
        resultMessageEl.classList.add('correct');
        resultMessageEl.textContent = '🎉 정답입니다! 잘했어요!';
        correctCount++;
        correctCountEl.textContent = correctCount;
    } else {
        resultMessageEl.classList.add('wrong');
        resultMessageEl.textContent = '😊 아쉬워요! 다시 도전해봐요!';
        wrongCount++;
        wrongCountEl.textContent = wrongCount;
    }
    
    nextButtonEl.style.display = 'block';
}

// 다음 문제 버튼
nextButtonEl.onclick = () => {
    loadQuestion();
};

nextButtonWritingEl.onclick = () => {
    loadQuestion();
};
