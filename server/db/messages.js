const Joi = require('joi');
const db = require('./connection');

const schema = Joi.object().keys({
    username: Joi.string().alphanum().required(),
    subject: Joi.string().required(),
    message: Joi.string().max(500).required(),
    imageURL: Joi.string().uri({
        scheme: [
            /http?/
        ]
    })
})


const messages = db.get('messages');

function getAll() {
    return messages.find();
}

function create(message) {
    if(!messages.username) messages.username = 'anounimus'
    const result = Joi.validate(message, schema);
    if (result.error === null) {
        message.created = new Date();
    } else {
        return Promise.reject(result.error)
    }
    return messages.insert(message)
}

module.exports = {
    create,
    getAll
}