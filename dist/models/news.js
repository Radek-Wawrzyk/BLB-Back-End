'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var News = _mongoose2.default.Schema({
	title: String,
	imgUrl: String,
	date: Date,
	content: String,
	comments: [{//in future
	}]
});

exports.default = _mongoose2.default.model('News', News);