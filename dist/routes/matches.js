"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _matchesController = require("../controllers/matchesController");

var _matchesController2 = _interopRequireDefault(_matchesController);

var _usersController = require("../controllers/usersController");

var _usersController2 = _interopRequireDefault(_usersController);

var _errors = require("../middlewares/errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var api = (0, _express.Router)();

  //POST /api/matches
  api.post('/', (0, _errors.catchAsync)(_usersController2.default.validate), (0, _errors.catchAsync)(_matchesController2.default.update));

  //GET /api/matches
  api.get('/', (0, _errors.catchAsync)(_matchesController2.default.findAll));

  //GET /api/matches/upcoming
  api.get('/upcoming', (0, _errors.catchAsync)(_matchesController2.default.findUpcoming));

  return api;
};