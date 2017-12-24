const {ObjectId} = require('mongodb');

const User = require('./../../models/User');

const users = [{
    _id: new ObjectId(),
    username: 'user1',
    name: 'user',
    surname: 'one',
    email: 'user1@example.com',
    password: 'passwordlunga',
    privilege: 'admin',
    pin: '1234',
    rfidTag: '1'
},{
    _id: new ObjectId(),
    username: 'user2',
    name: 'user',
    surname: 'due',
    email: 'user2@example.com',
    password: 'passwordlunghissima',
    privilege: 'hr',
    pin: '6578',
    rfidTag: '2'
}];

const populateUsers = (done) => {
    User.remove({})
        .then(() => {
            return User.create(users[0]);
        })
        .then(() => {
            return User.create(users[1]);
        })
        .then(() => done())
};

module.exports = {users, populateUsers};