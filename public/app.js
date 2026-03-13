let currentQuestion = null;
let currentCategory = null;
let currentLevel = null;
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

// 레벨 이름 매핑
const levelNames = {
    'beginner': '🌱 초급',
    'intermediate': '🌻 중급',
    'advanced': '🏆 고급'
};

// DOM 요소들 (나중에 초기화)
let categoryPage, levelPage, quizPage, loadingEl, quizContentEl, writingContentEl;
let questionTextEl, optionsContainerEl, resultMessageEl, resultMessageWritingEl;
let nextButtonEl, nextButtonWritingEl, correctCountEl, wrongCountEl;
let currentCategoryEl, storyTextEl, hintsContainerEl, levelSubtitleEl;

// DOM 로드 완료 후 초기화
document.addEventListener('DOMContentLoaded', function() {
    // 요소 선택
    categoryPage = document.getElementById('category-page');
    levelPage = document.getElementById('level-page');
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
    levelSubtitleEl = document.getElementById('level-subtitle');
    
    // 카테고리 카드 클릭 이벤트
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            selectCategory(category);
        });
    });
    
    // 레벨 카드 클릭 이벤트
    document.querySelectorAll('.level-card').forEach(card => {
        card.addEventListener('click', function() {
            const level = this.dataset.level;
            selectLevel(level);
        });
    });
    
    // 뒤로가기 버튼들
    const backButton = document.getElementById('back-button');
    if (backButton) {
        backButton.addEventListener('click', goBackToLevel);
    }
    
    const levelBackButton = document.getElementById('level-back-button');
    if (levelBackButton) {
        levelBackButton.addEventListener('click', goBackToCategory);
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
    
    // 힌트 버튼
    const hintButton = document.getElementById('hint-button');
    if (hintButton) {
        hintButton.addEventListener('click', showHint);
    }
    
    // 정답 보기 버튼
    const showAnswerButton = document.getElementById('show-answer-button');
    if (showAnswerButton) {
        showAnswerButton.addEventListener('click', showAnswer);
    }
});

// 카테고리 선택
function selectCategory(category) {
    currentCategory = category;
    categoryPage.classList.remove('active');
    levelPage.classList.add('active');
    levelSubtitleEl.textContent = categoryNames[category];
}

// 레벨 선택
function selectLevel(level) {
    currentLevel = level;
    levelPage.classList.remove('active');
    quizPage.classList.add('active');
    currentCategoryEl.textContent = `${categoryNames[currentCategory]} - ${levelNames[level]}`;
    currentCategoryEl.className = `category-badge ${currentCategory}`;
    correctCount = 0;
    wrongCount = 0;
    correctCountEl.textContent = correctCount;
    wrongCountEl.textContent = wrongCount;
    loadQuestion();
}

// 퀴즈에서 레벨 선택으로 돌아가기
function goBackToLevel() {
    quizPage.classList.remove('active');
    levelPage.classList.add('active');
}

// 레벨 선택에서 카테고리 선택으로 돌아가기
function goBackToCategory() {
    levelPage.classList.remove('active');
    categoryPage.classList.add('active');
    currentCategory = null;
    currentLevel = null;
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
        
        const response = await fetch(`/api/questions/random?category=${currentCategory}&level=${currentLevel}`);
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
    
    // 힌트와 설명 박스 초기화
    const hintBox = document.getElementById('hint-box');
    const explanationBox = document.getElementById('explanation-box');
    if (hintBox) hintBox.style.display = 'none';
    if (explanationBox) explanationBox.style.display = 'none';
    
    questionTextEl.textContent = currentQuestion.question;
    optionsContainerEl.innerHTML = '';
    
    // Support both formats: options array or option_a/b/c/d fields
    const options = currentQuestion.options || [
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
                answer: selectedAnswer,
                category: currentCategory,
                level: currentLevel
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

// 힌트 표시
function showHint() {
    if (!currentQuestion || !currentQuestion.hint) {
        alert('이 문제에는 힌트가 없습니다.');
        return;
    }
    
    const hintBox = document.getElementById('hint-box');
    const hintText = document.getElementById('hint-text');
    
    if (hintBox && hintText) {
        hintText.textContent = currentQuestion.hint;
        hintBox.style.display = 'block';
        
        // 힌트 박스로 부드럽게 스크롤
        setTimeout(() => {
            hintBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }
}

// 정답 보기
function showAnswer() {
    if (!currentQuestion || !currentQuestion.correct_answer) {
        alert('정답을 찾을 수 없습니다.');
        return;
    }
    
    const explanationBox = document.getElementById('explanation-box');
    const explanationText = document.getElementById('explanation-text');
    
    if (explanationBox && explanationText) {
        // 정답과 설명 함께 표시
        const correctAnswerText = `정답: ${currentQuestion.correct_answer}`;
        const fullExplanation = currentQuestion.explanation 
            ? `${correctAnswerText}\n\n${currentQuestion.explanation}`
            : correctAnswerText;
        
        explanationText.textContent = fullExplanation;
        explanationBox.style.display = 'block';
        
        // 설명 박스로 부드럽게 스크롤
        setTimeout(() => {
            explanationBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
        
        // 정답 옵션 하이라이트
        const buttons = optionsContainerEl.querySelectorAll('.option-btn');
        const options = currentQuestion.options || [
            currentQuestion.option_a,
            currentQuestion.option_b,
            currentQuestion.option_c,
            currentQuestion.option_d
        ];
        
        buttons.forEach((btn, index) => {
            const option = options[index];
            if (option && option.toLowerCase() === currentQuestion.correct_answer.toLowerCase()) {
                btn.classList.add('correct');
                btn.disabled = true;
            }
        });
        
        // 다음 문제 버튼 표시
        nextButtonEl.style.display = 'block';
    }
}

