let currentQuestion = null;
let correctCount = 0;
let wrongCount = 0;

// 요소 선택
const loadingEl = document.getElementById('loading');
const quizContentEl = document.getElementById('quiz-content');
const questionTextEl = document.getElementById('question-text');
const optionsContainerEl = document.getElementById('options-container');
const resultMessageEl = document.getElementById('result-message');
const nextButtonEl = document.getElementById('next-button');
const correctCountEl = document.getElementById('correct-count');
const wrongCountEl = document.getElementById('wrong-count');

// 새 문제 로드
async function loadQuestion() {
    try {
        loadingEl.style.display = 'block';
        quizContentEl.style.display = 'none';
        resultMessageEl.classList.remove('show');
        nextButtonEl.style.display = 'none';
        
        const response = await fetch('/api/questions/random');
        if (!response.ok) throw new Error('문제를 불러올 수 없습니다.');
        
        currentQuestion = await response.json();
        displayQuestion();
    } catch (error) {
        console.error('Error loading question:', error);
        loadingEl.textContent = '문제를 불러오는데 실패했습니다. 새로고침 해주세요.';
    }
}

// 문제 표시
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
        button.onclick = () => selectAnswer(String.fromCharCode(97 + index)); // 'a', 'b', 'c', 'd'
        optionsContainerEl.appendChild(button);
    });
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
        } else if (optionLetter === selectedAnswer && !isCorrect) {
            btn.classList.add('wrong');
        }
    });
    
    resultMessageEl.className = 'result-message show';
    
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

// 초기 문제 로드
loadQuestion();
