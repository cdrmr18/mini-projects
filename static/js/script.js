// Challenge 1
const ageInDays = () => {
    const birthYear = prompt("What year were you born?");
    const ageInDays = (2021 - birthYear) * 365;
    const h1 = document.createElement('h1');
    const textAnswer = document.createTextNode(`You are ${ageInDays} days old.`);
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);
   document.getElementById('flex-box-result').appendChild(h1);
}

const resetGame = () => {
    const results = document.getElementById('ageInDays').remove();
}

// Challenge 2
const getImg = () => {
    const img = document.createElement('img');
    img.setAttribute('src', "https://media.giphy.com/media/Ub8XEam5vXbMY/giphy.gif");
    const imgDisplay = document.getElementById('displayImage');
    imgDisplay.appendChild(img);
}

// Challenege 3

const rpsGame = (yourChoice) => {
    const playerChoice = yourChoice.id;
    const botChoice = numberToChoice(randToRpsInt());

    let results = decideWinner(playerChoice, botChoice);
    let message = finalMessage(results); // {'message': 'You won!', 'color': 'green'}
    rpsDisplay(yourChoice.id, botChoice, message);
}

const randToRpsInt = () => {
    return Math.floor(Math.random() * 3);
}
const numberToChoice = (number) => {
    return ['rock', 'paper', 'scissors'][number];
}
const decideWinner = (playerChoice, botChoice) => {
    const rpsDb = {
        "rock": {'scissors': 1, 'rock': 0.5, 'paper': 0},
        "paper": {'rock': 1, 'paper': 0.5, 'scissors': 0},
        "scissors": {'paper': 1, 'scissors': 0.5, 'rock': 0},
    }
    
    const yourScore = rpsDb[playerChoice][botChoice];
    const botScore = rpsDb[botChoice][playerChoice];
    return [yourScore, botScore];
}
const finalMessage = ([yourScore, botScore]) => { 
    if(yourScore === 0){
        return  {'message': 'You lost!', 'color': 'red'};
    } else if (yourScore === 0.5){
        return  {'message': 'You tied!', 'color': 'orange'};
    } else if (yourScore === 1){
         return {'message': 'You won!', 'color': 'green'};
    }
}
const rpsDisplay = (playerImgChoice, botImgChoice, finalMessage) => {
    const imagesDb = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors':  document.getElementById('scissors').src
    }
    
    // remove images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    const playerDiv = document.createElement('div');
    const botDiv = document.createElement('div');
    const messageDiv = document.createElement('div');

    // display chosen images and message
    const playerImgSrc = imagesDb[playerImgChoice];
    const botImgSrc = imagesDb[botImgChoice];

    // create image and set attributes
    const playerImg = document.createElement('img')
    playerImg.setAttribute('src', playerImgSrc);
    playerImg.className = 'playerImage';

    const botImg = document.createElement('img')
    botImg.setAttribute('src', botImgSrc);
    botImg.className = 'botImage';
    
    // create message ele and insert message text & style
    const resultMessage = document.createElement('h2')
    resultMessage.className = "resultHeader";
    resultMessage.style.color = finalMessage['color'];
    resultMessage.innerText = finalMessage.message
    messageDiv.append(resultMessage);

    // append images to parent divs
    playerDiv.appendChild(playerImg);
    botDiv.appendChild(botImg);
    

    // append divs in parent flex box div
    const rpsDiv = document.getElementById('flex-box-rps-div');
    rpsDiv.appendChild(playerDiv);
    rpsDiv.appendChild(messageDiv);
    rpsDiv.appendChild(botDiv);
}


// Challenge 4
const allButtons = document.getElementsByTagName('button');

const copyAllButtons = [];
for (let i = 0; i < allButtons.length; i++) {
    copyAllButtons.push(allButtons[i].classList[1]);
}

const buttonColorChange = (selectObj) => {
    if(selectObj.value === 'red') {
        buttonRed();
    } else if(selectObj.value === 'green') {
        buttonGreen();
    } else if(selectObj.value === 'reset') {
        buttonReset();
    } else if(selectObj.value === 'random') {
        randomColor();
    }
}

const buttonRed = () => {
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-danger');
    }
}
const buttonGreen = () => {
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-success');
    }
}
const buttonReset = () => {
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(copyAllButtons[i]);
    }
}
const randomColor = () => {
    for (let i = 0; i < allButtons.length; i++) {
        const randomNum = Math.floor(Math.random() * allButtons.length)
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(copyAllButtons[randomNum]);
    }
}





// Challenge 5 BLACKJACK
const blackjackGame = {
    'you': {
        'scoreSpan': '#your-blackjack-result',
        'div': '#player-box',
        'score': 0
    },
    'dealer': {
        'scoreSpan': '#dealer-blackjack-result',
        'div': '#dealer-box',
        'score': 0
    },
    'cards': ['2','3','4','5','6','7','8','9','10','K', 'J', 'Q','A'],
    'cardsMap': {'2': 2, '3': 3,'4': 4,'5': 5,'6': 6,'7': 7,'8': 8,'9': 9,'10': 10,'K': 10, 'J':10, 'Q':10, 'A': [1, 11] },
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,
}
const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const lossSound = new Audio('static/sounds/aww.mp3');

const blackjackHit = () => {
    if (blackjackGame['isStand' ] === false) {
        let card = randomCard();
        showCard(YOU, card);
        addToScore(card, YOU);
        displayScore(YOU);
        
        if (YOU['score'] > 21 && DEALER['score'] === 0) {
            showResults(computeWinner());
        }
    }
}
const blackjackDeal = () => {
    if (blackjackGame['turnsOver' ] === true) {
        blackjackGame['isStand' ] = false;
        const playerImages = document.querySelector(YOU['div']).querySelectorAll('img');
        const dealerImages = document.querySelector(DEALER['div']).querySelectorAll('img');

        for(let i = 0; i < playerImages.length; i++) {
            playerImages[i].remove();
        }
        for(let i = 0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }
        YOU['score'] = 0;
        DEALER['score'] = 0;

        document.querySelector(YOU['scoreSpan']).innerText = YOU['score'];
        document.querySelector(DEALER['scoreSpan']).innerText = DEALER['score'];
        
        document.querySelector('#blackjack-results').innerText = "Let's play";
        document.querySelector('#blackjack-results').style.color = 'black';
        
        document.querySelector(YOU['scoreSpan']).style.color = 'white';
        document.querySelector(DEALER['scoreSpan']).style.color = 'white';
        
        blackjackGame['turnsOver' ] = true;
    }
}
const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const dealerLogic =  async () => {
    blackjackGame['isStand' ] = true;

    while (DEALER['score'] <= 15 && blackjackGame['isStand'] === true) {
        let card = randomCard();
        showCard(DEALER, card);
        addToScore(card, DEALER);
        displayScore(DEALER);
        await sleep(1000);
    }
  
    blackjackGame['turnsOver' ] = true;
    showResults(computeWinner());
    
}
const blackjackStand= () => {
    if (blackjackGame['turnsOver' ] === false) {
        dealerLogic();
    }
}

// helper functions
const showCard = (activePlayer, card) => {
    if(activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.setAttribute('src', `static/images/${card}.png`)
        document.querySelector(activePlayer['div']).append(cardImage);
        hitSound.play();
    }
}
const randomCard = () => {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

const addToScore = (card, activePlayer) => {
    if(card === 'A') {
        if(activePlayer['score'] + blackjackGame['cardsMap'][card][0] <= 21) {
             activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        } else {
           activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        }
    } else {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    } 
}

const displayScore = (activePlayer) => {
    if(activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).innerText = 'BUST!';
        if(activePlayer === YOU) {
            lossSound.play();
        }
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else {
        document.querySelector(activePlayer['scoreSpan']).innerText = activePlayer['score'];
    }
}
const computeWinner = () => {
    let winner;
    if (YOU['score'] <= 21) {
        if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21) {   
            blackjackGame['wins']++;
            winner = YOU;
        } else if (YOU['score'] < DEALER['score']) {
            blackjackGame['losses']++;
            winner = DEALER;
        } else if (YOU['score'] === DEALER['score']) {
            blackjackGame['draws']++;
        }
    } else if (YOU['score'] > 21 && DEALER['score'] <= 21) { 
        blackjackGame['losses']++;
        winner = DEALER;
    } else if (YOU['score'] > 21 && DEALER['score'] > 21) {    
        blackjackGame['draws']++;
    }
   
    return winner;
}
const showResults = (winner) => {
    if (blackjackGame['turnsOver' ] = true) {
        let message;
        let messageColor;

        if (winner === YOU) {
            document.querySelector('#wins').innerText = blackjackGame['wins'];
            message = "You won!";
            messageColor = 'green';
            winSound.play();
        } else if (winner == DEALER) {
            document.querySelector('#losses').innerText = blackjackGame['losses'];
            message = "You lost!";
            messageColor = 'red';
            lossSound.play();
        } else {
            document.querySelector('#draws').innerText = blackjackGame['draws'];
            message = "You drew!";
            messageColor = 'orange';
        }

        document.querySelector('#blackjack-results').innerText = message;
        document.querySelector('#blackjack-results').style.color = messageColor;
    }
}


// button event listeners
document.querySelector('#hit-button').addEventListener('click', blackjackHit);
document.querySelector('#stand-button').addEventListener('click', blackjackStand);
document.querySelector('#deal-button').addEventListener('click', blackjackDeal);
