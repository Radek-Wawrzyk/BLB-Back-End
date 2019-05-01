"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _newsController = require("../controllers/newsController");

var _newsController2 = _interopRequireDefault(_newsController);

var _usersController = require("../controllers/usersController");

var _usersController2 = _interopRequireDefault(_usersController);

var _errors = require("../middlewares/errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var api = (0, _express.Router)();

  //POST /api/news
  api.post('/', (0, _errors.catchAsync)(_usersController2.default.validate), (0, _errors.catchAsync)(_newsController2.default.update));

  //GET /api/news
  api.get('/', (0, _errors.catchAsync)(_newsController2.default.findAll));

  //GET /api/news/fetchFB
  api.get('/fetchFB', (0, _errors.catchAsync)(_newsController2.default.fetchFB));
  return api;
};