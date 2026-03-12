let currentQuestion = null;
let currentCategory = null;
let correctCount = 0;
let wrongCount = 0;
let currentAnswers = {};

// 카테고리 이름 매핑
const categoryNames = {
    'reading': '📖 Reading',
    'writing': '✍️ Writing',
    'vocabulary': '📚 Vocabulary',
    'grammar': '📝 Grammar'
};

// DOM 요소들 (나중에 초기화)
let categoryPage, quizPage, loadingEl, quizContentEl, writingContentEl;
let questionTextEl, optionsContainerEl, resultMessageEl, resultMessageWritingEl;
let nextButtonEl, nextButtonWritingEl, correctCountEl, wrongCountEl;
let currentCategoryEl, storyTextEl, hintsContainerEl;

// DOM 로드 완료 후 초기화
document.addEventListener('DOMContentLoaded', function() {
    // 요소 선택
    categoryPage = document.getElementById('category-page');
    quizPage = document.getElementById('quiz-page');
    loadingEl = document.getElementById('loading');
    quizContentEl = document.getElementById('quiz-content');
    writingContentEl = document.getElementById('writing-content');
    questionTextEl = document.getElementById('question-text');
    optionsContainerEl = document.getElementById('options-container');
    resultMessageEl = document.getElementById('result-message');
    resultMessageWritingEl = document.getElementById('result-message-writing');
    nextButtonEl = document.getElementById('next-button');
    nextButtonWritingEl = document.getElementById('next-button-writing');
    correctCountEl = document.getElementById('correct-count');
    wrongCountEl = document.getElementById('wrong-count');
    currentCategoryEl = document.getElementById('current-category');
    storyTextEl = document.getElementById('story-text');
    hintsContainerEl = document.getElementById('hints-container');
    
    // 카테고리 카드 클릭 이벤트
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            selectCategory(category);
        });
    });
    
    // 뒤로가기 버튼
    const backButton = document.getElementById('back-button');
    if (backButton) {
        backButton.addEventListener('click', goBack);
    }
    
    // 다음 문제 버튼들
    if (nextButtonEl) {
        nextButtonEl.addEventListener('click', loadQuestion);
    }
    
    if (nextButtonWritingEl) {
        nextButtonWritingEl.addEventListener('click', loadQuestion);
    }
    
    // Check Answers 버튼
    const checkButton = document.getElementById('check-button');
    if (checkButton) {
        checkButton.addEventListener('click', checkWriting);
    }
});

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
        button.addEventListener('click', () => selectAnswer(String.fromCharCode(97 + index)));
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
            hintEl.addEventListener('click', () => useHint(hint, hintEl));
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
                questionId: currentQuestion.id,
                answer: selectedAnswer
            })
        });
        
        const result = await response.json();
        showResult(result.correct, selectedAnswer, result.correctAnswer);
    } catch (error) {
        console.error('Error checking answer:', error);
        alert('Failed to check answer.');
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
        } else if (optionLetter === selectedAnswer && !isCorrect) {
            btn.classList.add('wrong');
        }
    });
    
    resultMessageEl.classList.add('show');
    
    if (isCorrect) {
        resultMessageEl.classList.add('correct');
        resultMessageEl.textContent = '✅ Correct! Great job!';
        correctCount++;
        correctCountEl.textContent = correctCount;
    } else {
        resultMessageEl.classList.add('wrong');
        resultMessageEl.textContent = '😊 Not quite! Try the next one!';
        wrongCount++;
        wrongCountEl.textContent = wrongCount;
    }
    
    nextButtonEl.style.display = 'block';
}

// 쓰기 답안 확인
function checkWriting() {
    const inputs = storyTextEl.querySelectorAll('input[type="text"]');
    let allCorrect = true;
    let correctAnswers = 0;
    
    inputs.forEach(input => {
        const userAnswer = input.value.trim().toLowerCase();
        const correctAnswer = input.dataset.answer.toLowerCase();
        
        if (userAnswer === correctAnswer) {
            input.classList.remove('wrong');
            input.classList.add('correct');
            correctAnswers++;
        } else {
            input.classList.remove('correct');
            input.classList.add('wrong');
            allCorrect = false;
        }
    });
    
    resultMessageWritingEl.classList.add('show');
    
    if (allCorrect) {
        resultMessageWritingEl.classList.remove('wrong');
        resultMessageWritingEl.classList.add('correct');
        resultMessageWritingEl.textContent = '🎉 Perfect! All answers are correct!';
        correctCount++;
    } else {
        resultMessageWritingEl.classList.remove('correct');
        resultMessageWritingEl.classList.add('wrong');
        resultMessageWritingEl.textContent = `You got ${correctAnswers} out of ${inputs.length} correct. Try again!`;
        wrongCount++;
    }
    
    correctCountEl.textContent = correctCount;
    wrongCountEl.textContent = wrongCount;
    
    if (allCorrect) {
        nextButtonWritingEl.style.display = 'block';
    }
}
