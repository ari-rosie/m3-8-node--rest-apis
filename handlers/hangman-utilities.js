const getWordObj = (database, id) => {
    return database.find(data => data.id === id);
};

const createBoolArr = (word) => {
    const arr = [];
    for(let i = 0; i < word.letterCount; i++)
        arr[i] = " _ ";
    return arr;
};


module.exports = { getWordObj, createBoolArr };