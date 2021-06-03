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