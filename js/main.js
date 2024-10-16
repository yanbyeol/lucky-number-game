/* intro */
let intro = document.querySelector('.intro');
let startBtn = document.getElementById('startBtn');
let userName = document.getElementById('userName');
/* playzone */
let playZone = document.querySelector('.playZone');
let userInput = document.getElementById('userInput');
let playBtn = document.getElementById('playBtn');
let resetBtn = document.getElementById('resetBtn');
let chance = document.getElementById('chance');
let result = document.getElementById('result');
/* game result */
let gameEndHide = document.querySelectorAll('.gameEndHide');
/* Storage */
let randomNum;
let chanceNum = 5;
let history = [];
let isGameEnd = false;


// 이벤트
startBtn.addEventListener('click', gameStart);
playBtn.addEventListener('click', gamePlay);
resetBtn.addEventListener('click', resetBtnAct);
userInput.addEventListener('focus', function(){
    userInput.value = "";
});
// 엔터버튼 이벤트
userName.addEventListener('keyup', function(e){
    let key = e.key || e.keyCode;
    if (key === 'Enter' || key === 13) { gameStart(); }
});
userInput.addEventListener('keyup', function(e){
    let key = e.key || e.keyCode;
    if (key === 'Enter' || key === 13) { gamePlay(); }
});


//게임시작
function gameStart(){
    let userNameVal = userName.value.trim();
    if(userNameVal){
        intro.classList.add('d-none');
        playZone.classList.remove('d-none');
        document.querySelector('.userName').textContent = userNameVal;
    }else{
        alert("닉네임을 입력하세요!");
    }

}

//랜덤번호 생성
function randomNumber(){
    randomNum = Math.floor(Math.random() * 100) + 1;
}

//플레이
function gamePlay(){
    let userNum = userInput.value;
    userInput.value = "";
    if(userNum < 1 || userNum > 100){ //숫자 범위 벗어날 경우
        alert("1~100 사이의 숫자만 입력하세요");
        /* result.textContent = "1~100 사이의 숫자만 입력하세요"; */
        return;
    }
    if(history.includes(userNum)){  //이미 입력했던 숫자일 경우
        alert("이미 입력한 숫자입니다");
        return;
    }
    if(userNum == randomNum){
        gameClear();
        return;
    }else if(userNum > randomNum){
        result.textContent = `Down! (입력숫자 : ${userNum})`;
    }else{
        result.textContent = `Up! (입력숫자 : ${userNum})`;
    }
    history.push(userNum); //히스토리에 유저넘버 추가
    chanceNum--;
    chance.textContent = chanceNum;
    if(chanceNum == 0){
        gameOver();
    }
}

function resetBtnAct(){
    if(isGameEnd){
        gameReset();
        isGameEnd = false;
    }else{
        if(confirm(`${chanceNum}번의 기회가 남았습니다. 처음부터 다시 시작 하시겠습니까?`)){
            gameReset();
        }else{
            return;
        }
    }
}

//리셋
function gameReset(){
    randomNumber(); //랜덤번호 생성
    userInput.disabled = false;
    playBtn.disabled = false; //버튼 활성화
    chanceNum = 5; //남은기회 세팅
    chance.textContent = chanceNum;
    result.textContent = "1~100 사이의 숫자를 입력하세요"
    history = []; //히스토리 비우기
    userInput.value = "";
    resetBtn.classList.remove('gameEnd');
    gameEndHide.forEach(element => {
        element.classList.remove('d-none');
    });
}
//게임끝
function gameEnd(){
    userInput.disabled = true;
    playBtn.disabled = true;
    isGameEnd = true;
    resetBtn.classList.add('gameEnd');
    gameEndHide.forEach(element => {
        element.classList.add('d-none');
    });
}


//게임 클리어
function gameClear(){
    result.innerHTML = `${randomNum} 정답입니다! <br><span>💚럭키${userName.value.trim()}💚</span>`;
    gameEnd();
}

//게임오버
function gameOver(){
    result.innerHTML = `<span>Game Over</span><br> 정답 : ${randomNum}`; //게임오버 시 정답 알려주기
    gameEnd();
}

randomNumber();