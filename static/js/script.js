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
        return  {'message': 'You tied!', 'color': 'yellow'};
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

    const playerImg = document.createElement('img')
    playerImg.setAttribute('src', playerImgSrc);

    const botImg = document.createElement('img')
    botImg.setAttribute('src', botImgSrc);
    
    const resultMessage = document.createElement('h2')
    resultMessage.innerText = finalMessage.message

    playerDiv.appendChild(playerImg);
    botDiv.appendChild(botImg);
    messageDiv.appendChild(resultMessage);

    const rpsDiv = document.getElementById('flex-box-rps-div');
    rpsDiv.appendChild(playerDiv);
    rpsDiv.appendChild(messageDiv);
    rpsDiv.appendChild(botDiv);
    
}