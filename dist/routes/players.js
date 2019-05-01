"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _playersController = require("../controllers/playersController");

var _playersController2 = _interopRequireDefault(_playersController);

var _usersController = require("../controllers/usersController");

var _usersController2 = _interopRequireDefault(_usersController);

var _errors = require("../middlewares/errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var api = (0, _express.Router)();

  //POST /api/players
  api.post('/', (0, _errors.catchAsync)(_usersController2.default.validate), (0, _errors.catchAsync)(_playersController2.default.update));

  //GET /api/players
  api.get('/', (0, _errors.catchAsync)(_playersController2.default.find));

  //GET /api/players/photo
  api.get('/photo', (0, _errors.catchAsync)(_playersController2.default.getPhoto));

  return api;
};