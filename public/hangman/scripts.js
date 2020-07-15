//DOM VAR
const content = document.querySelector('#content');
const startButton = document.querySelector('#startBtn');
const wordWrapper = document.querySelector('#wordWrapper');

const inputDiv = document.createElement('div');
const inputLetter = document.createElement('input');
const checkBtn = document.createElement('button');
const resultDiv = document.createElement('div');

let wordId;

//functions

const isLetter = (char) => {
    const objRegExp = /^[a-z]+$/;
    return objRegExp.test(char);
};

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

const checkLetter = async (letter) => {
    try {
        if (isLetter(letter)) {
            const res = await fetch(`/hangman/guess/${wordId}/${letter}`);
            const ans = await res.json();
            resultDiv.innerText = ans;    
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