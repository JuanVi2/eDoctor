'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');

exports.createToken = function(user){
    var payload = {
        sub: user._id,
        name: user.name,
        age: user.age,
        email: user.email,
        iat: moment().unix(),
        exp: moment().add(30,'days').unix
    };

    return jwt.encode(payload, '1117');
}