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
    // let message = finalMessage(results); // {'message': 'You won!', 'color': 'green'}
    // rpsDisplay(yourChioce.id, botChoice.id, message);

    console.log(results)
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
// const finalMessage = (results) => {
//     const rock = document.getElementById('rock');
//     const paper = document.getElementById('paper');
//     const scissors = document.getElementById('scissors');

//     if(yourChoice === 'rock') {
//         paper.remove();
//         scissors.remove();
//     } else if (yourChoice === 'paper'){
//         rock.remove();
//         scissors.remove();
//     } else if (yourChoice === 'scissors'){
//         paper.remove();
//         rock.remove();
//     }

// }
// const rpsDisplay = () => {
//     return 
// }