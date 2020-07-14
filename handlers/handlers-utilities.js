const createNameList = (database) => {
    return database.map(each => each.name);
};

const getClientById = (database, id) => {
    return database.find(data => data.id === id)
};

const getIndexById = (database, id) => {
    return database.findIndex(data => data.id === id);
}

const checkEmail = (data) => {
    const {email} = data;
    if (/\S+@\S+\.\S+/.test(email))
        return true;
    else 
        return false;
};

const newEmail = (email, database) => {
    if (database.find(data => data.email === email) !== undefined)
        return false;
    return true;
}

module.exports = { createNameList, getClientById, checkEmail, newEmail, getIndexById };