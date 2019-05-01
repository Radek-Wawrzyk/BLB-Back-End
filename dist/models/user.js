'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bcrypt = require('bcrypt');
var saltRounds = 10;

var User = _mongoose2.default.Schema({
	name: String,
	surName: String,
	age: Number,
	location: String,
	email: String,
	password: String, //md5
	permissions: {
		teams: Boolean, //write
		players: Boolean, //write
		news: Boolean, //write
		matches: Boolean, //write
		users: Boolean //read/write
	}
});

User.pre('save', function (next) {
	this.password = bcrypt.hashSync(this.password, saltRounds);
	next();
});

exports.default = _mongoose2.default.model('Users', User);