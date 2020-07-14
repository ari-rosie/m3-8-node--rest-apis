const { v4: uuidv4 } = require('uuid');
const { clients } = require('../data/clients');
const func = require('./handlers-utilities');
const { checkEmail, newEmail, getIndexById } = require('./handlers-utilities');

const handleNewClient = (req, res) => {
    const data = req.body;
    if (!checkEmail(data))
        res.status(400).json('Invalid email');
    if (!newEmail(data.email, clients))
        res.status(400).json('Email already exist');
    else {
        data.id = uuidv4();
        clients.push(data);
        res.status(200).json(clients);
    }
};

const handleRemoveClient = (req, res) => {
    const id = req.params.id;
    clients.splice(getIndexById(clients, id), 1);
    res.status(200).json(clients);
}

const handleClients = (req, res) => {
    res.status(200).json(func.createNameList(clients));
};

const handleId = (req, res) => {
    const id = req.params.id;
    const {name} = getClientById(clients, id);
    res.status(200).json(name);
}

module.exports = { handleClients, handleId, handleNewClient, handleRemoveClient };

