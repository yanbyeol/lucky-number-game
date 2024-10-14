let userInput = document.getElementById('userInput');
let playBtn = document.getElementById('playBtn');
let resetBtn = document.getElementById('resetBtn');
let chance = document.getElementById('chance');
let result = document.getElementById('result');
let randomNum;
let chanceNum = 5;
let history = [];

playBtn.addEventListener('click', gamePlay);
resetBtn.addEventListener('click', gameReset);
userInput.addEventListener('focus', function(){
    userInput.value = "";
});
// 엔터버튼 이벤트
userInput.addEventListener('keyup', function(e){
    let key = e.key || e.keyCode;
    if (key === 'Enter' || key === 13) { gamePlay(); }
});


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
        result.textContent = "이미 입력한 숫자입니다";
        return;
    }
    if(userNum == randomNum){
        result.textContent = `${randomNum} 정답입니다!`;
        playBtn.disabled = true;
        return;
    }else if(userNum > randomNum){
        result.textContent = `${userNum} down`;
    }else{
        result.textContent = `${userNum} up`;
    }
    history.push(userNum); //히스토리에 유저넘버 추가
    chanceNum--;
    chance.textContent = chanceNum;
    if(chanceNum == 0){
        gameOver();
    }
}

//리셋
function gameReset(){
    randomNumber(); //랜덤번호 생성
    playBtn.disabled = false; //버튼 활성화
    chanceNum = 5; //남은기회 세팅
    chance.textContent = chanceNum;
    result.textContent = "1~100 사이의 숫자를 입력하세요"
    history = []; //히스토리 비우기
}

//게임오버
function gameOver(){
    playBtn.disabled = true; //버튼 비활성화
    result.textContent = `game over 정답 : ${randomNum}`; //게임오버 시 정답 알려주기
}

randomNumber();
