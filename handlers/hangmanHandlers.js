const { words } = require('../data/words');
const func = require('./hangman-utilities');
const { checkLetter } = require('./hangman-utilities');

const handlerWord = (req, res) => {
    const randomNum = Math.floor(Math.random() * words.length);
    const randomWord = words[randomNum];
    randomWord.boolArr = func.createBoolArr(randomWord);
    res.status(200).json({id: randomWord.id, letterCount: randomWord.letterCount});
    
};

const handlerLetter = (req, res) => {
    const {id, letter} = req.params;
    const {word, boolArr} = func.getWordObj(words, id);

    if (!boolArr) 
        res.status(404).json('oups! wrong word id.. Request /word first!');

    for (const c in word)
        if (word.charAt(c) === letter) boolArr[c] = ` ${letter} `;
    res.status(200).json(JSON.stringify(boolArr).replace(/"/g, ""));
};

module.exports = { handlerWord, handlerLetter };