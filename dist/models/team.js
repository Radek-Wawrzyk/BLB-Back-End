'use strict';

Object.defineProperty(exports, "__esModule", {
				value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Team = _mongoose2.default.Schema({
				name: String,
				imgUrl: String,
				stats: {
								wins: Number,
								looses: Number
				},
				players: [{
								name: String,
								imgUrl: String
				}]
});

exports.default = _mongoose2.default.model('Teams', Team);