'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Match = _mongoose2.default.Schema({
	date: Date,
	loc: String,
	facts: [{
		type: Number, //TODO types
		player: {
			name: String //id is by default
		},
		player2: {
			name: String
		}
	}],
	hosts: {
		_id: String,
		name: String,
		players: [{
			name: String,
			stats: {}
		}]
	},
	guests: {
		_id: String,
		name: String,
		players: [{
			name: String,
			stats: {}
		}]
	},
	score: { hosts: Number, guests: Number },
	held: Boolean,
	round: Number
});

exports.default = _mongoose2.default.model('Matches', Match);