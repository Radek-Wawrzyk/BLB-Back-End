"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _teamsController = require("../controllers/teamsController");

var _teamsController2 = _interopRequireDefault(_teamsController);

var _errors = require("../middlewares/errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var api = (0, _express.Router)();

  //POST /api/teams
  api.post('/', (0, _errors.catchAsync)(_teamsController2.default.create));

  //GET /api/teams
  api.get('/', (0, _errors.catchAsync)(_teamsController2.default.findAll));

  //POST /api/teams/photo
  api.post('/photo', (0, _errors.catchAsync)(_teamsController2.default.uploadPhoto));

  //GET /api/teams/photo
  api.get('/photo', (0, _errors.catchAsync)(_teamsController2.default.getPhoto));

  return api;
};