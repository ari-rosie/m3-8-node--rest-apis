//DOM VAR
const content = document.querySelector('#content');
const startButton = document.querySelector('#startBtn');
const wordWrapper = document.querySelector('#wordWrapper');

const inputDiv = document.createElement('div');
const inputLetter = document.createElement('input');
const checkBtn = document.createElement('button');
const resultDiv = document.createElement('div');
const againBtn = document.createElement('button');

let wordId;

//functions

const endGame = (str) => {
    checkBtn.remove();
    inputDiv.remove();
    const newStr = str.replace(/,/g, '');
    resultDiv.innerText = newStr.replace(/Yesss!/, 'You win!');
    againBtn.innerText = 'AGAIN!';
    wordWrapper.appendChild(againBtn);
    againBtn.addEventListener('click', () => location.reload());
}

//returns true if is a letter
const isLetter = (char) => {
    const objRegExp = /^[a-z]+$/;
    return objRegExp.test(char);
};

//returns true if word complete
const isWordComplete = (str) => {
    if (str.includes('_'))
        return false;
    return true;
};

// creates input and appends divs for game interaction
const createInput = () => {
    startButton.style.display = 'none';
    wordWrapper.appendChild(resultDiv);
    wordWrapper.appendChild(inputDiv);
    inputLetter.type = 'text';
    inputLetter.maxLength = '1';
    inputDiv.appendChild(inputLetter);
    checkBtn.innerText = '?';
    wordWrapper.appendChild(checkBtn);
};

//start function
const newWord = async () => {
    try {
        const res = await fetch('/hangman/word');
        const mysteryWord = await res.json();
        resultDiv.innerText = `${mysteryWord.letterCount} letters`;
        createInput();
        wordId = mysteryWord.id;
    } catch (err) {
        console.log(err);
    }
};

// every time the user guesses a letter
const checkLetter = async (letter) => {
    try {
        if (isLetter(letter)) {
            const res = await fetch(`/hangman/guess/${wordId}/${letter}`);
            const ans = await res.json();
            (isWordComplete(ans)) ? endGame(ans) : resultDiv.innerText = ans; 
        } else
            resultDiv.innerText = "Enter a letter!" ;
    } catch (err) {
        console.log(err);
    }
}


// start button function, getting new word
startButton.addEventListener('click', newWord);

// check for letter in word
checkBtn.addEventListener('click', () => {
    checkLetter(inputLetter.value);
    inputLetter.value = '';
});