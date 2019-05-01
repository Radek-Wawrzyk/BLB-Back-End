'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _team = require('../models/team');

var _team2 = _interopRequireDefault(_team);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _playersController = require('../controllers/playersController');

var _playersController2 = _interopRequireDefault(_playersController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
	addPlayer: function addPlayer(teamId, playerData) {
		var _this = this;

		return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
			var team;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_context.prev = 0;
							_context.next = 3;
							return _team2.default.findByIdAndUpdate(teamId, { "$push": { "players": playerData } });

						case 3:
							team = _context.sent;
							_context.next = 9;
							break;

						case 6:
							_context.prev = 6;
							_context.t0 = _context['catch'](0);
							return _context.abrupt('return', { 'err': "cannot find team!" });

						case 9:
							if (team) {
								_context.next = 11;
								break;
							}

							return _context.abrupt('return', { 'err': "cannot find team!" });

						case 11:
							return _context.abrupt('return', { 'data': team });

						case 12:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, _this, [[0, 6]]);
		}))();
	},
	removePlayer: function removePlayer(teamId, playerId) {
		var _this2 = this;

		return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
			var team;
			return regeneratorRuntime.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							_context2.prev = 0;
							_context2.next = 3;
							return _team2.default.findByIdAndUpdate(teamId, { "$pull": { "players": { "_id": playerId } } });

						case 3:
							team = _context2.sent;
							_context2.next = 9;
							break;

						case 6:
							_context2.prev = 6;
							_context2.t0 = _context2['catch'](0);
							return _context2.abrupt('return', { 'err': _context2.t0 });

						case 9:
							return _context2.abrupt('return', { 'data': team });

						case 10:
						case 'end':
							return _context2.stop();
					}
				}
			}, _callee2, _this2, [[0, 6]]);
		}))();
	},
	updatePlayer: function updatePlayer(teamId, playerData) {
		var _this3 = this;

		return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
			var team;
			return regeneratorRuntime.wrap(function _callee3$(_context3) {
				while (1) {
					switch (_context3.prev = _context3.next) {
						case 0:
							_context3.prev = 0;
							_context3.next = 3;
							return _team2.default.findByIdAndUpdate(teamId, { "$set": {
									'players.$[element].name': playerData.name,
									'players.$[element].imgUrl': playerData.imgUrl
								} }, { arrayFilters: [{ 'element._id': playerData._id }] }, function (err, res) {});

						case 3:
							team = _context3.sent;
							_context3.next = 9;
							break;

						case 6:
							_context3.prev = 6;
							_context3.t0 = _context3['catch'](0);
							return _context3.abrupt('return', { 'err': _context3.t0 });

						case 9:
							return _context3.abrupt('return', { 'data': team });

						case 10:
						case 'end':
							return _context3.stop();
					}
				}
			}, _callee3, _this3, [[0, 6]]);
		}))();
	},
	update: function update(req, res, next) {
		var _this4 = this;

		return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
			var imgUrl, data, team;
			return regeneratorRuntime.wrap(function _callee4$(_context4) {
				while (1) {
					switch (_context4.prev = _context4.next) {
						case 0:
							if (!(!req.userInfo || !req.userInfo.permissions || !req.userInfo.permissions.teams || !req.userInfo.permissions.players)) {
								_context4.next = 2;
								break;
							}

							return _context4.abrupt('return', res.status(500).send({ error: 'Permission deined!' }));

						case 2:
							imgUrl = 'def';

							if (req.files && req.files.photo) {
								imgUrl = Math.random().toString(36).substr(2, 9);
								req.files.photo.mv('photos/teams/' + imgUrl + '.png', function (err) {});
							}

							data = req.body;

							delete data.players;
							data.imgUrl = imgUrl;

							if (!req.body.id) {
								_context4.next = 34;
								break;
							}

							if (!req.body.remove) {
								_context4.next = 19;
								break;
							}

							_context4.prev = 9;
							_context4.next = 12;
							return _team2.default.findByIdAndRemove(req.body.id);

						case 12:
							team = _context4.sent;
							return _context4.abrupt('return', res.status(200).send({ data: 'Removed successfully' }));

						case 16:
							_context4.prev = 16;
							_context4.t0 = _context4['catch'](9);
							return _context4.abrupt('return', res.status(500).send({ error: 'Team not found!' }));

						case 19:
							if (data.imgUrl == 'def') delete data.imgUrl;
							_context4.prev = 20;
							_context4.next = 23;
							return _team2.default.findByIdAndUpdate(req.body.id, data);

						case 23:
							team = _context4.sent;
							_context4.next = 26;
							return _playersController2.default.changeTeamInfo({ '_id': req.body.id, 'name': data.name || team.name, 'imgUrl': data.imgUrl || team.imgUrl });

						case 26:
							if (data.imgUrl) _fs2.default.unlink(process.cwd() + '/photos/teams/' + team.imgUrl + '.png', function (err) {}); //remove old image
							_context4.next = 32;
							break;

						case 29:
							_context4.prev = 29;
							_context4.t1 = _context4['catch'](20);
							return _context4.abrupt('return', res.status(500).send({ error: _context4.t1 }));

						case 32:
							_context4.next = 37;
							break;

						case 34:
							_context4.next = 36;
							return _team2.default.create(data);

						case 36:
							team = _context4.sent;

						case 37:
							return _context4.abrupt('return', res.status(200).send({ data: team, message: 'Team was saved' }));

						case 38:
						case 'end':
							return _context4.stop();
					}
				}
			}, _callee4, _this4, [[9, 16], [20, 29]]);
		}))();
	},
	find: function find(req, res, next) {
		var _this5 = this;

		return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
			var teams;
			return regeneratorRuntime.wrap(function _callee5$(_context5) {
				while (1) {
					switch (_context5.prev = _context5.next) {
						case 0:
							if (!req.body.id) {
								_context5.next = 12;
								break;
							}

							_context5.prev = 1;
							_context5.next = 4;
							return _team2.default.findById(req.body.id);

						case 4:
							teams = _context5.sent;
							_context5.next = 10;
							break;

						case 7:
							_context5.prev = 7;
							_context5.t0 = _context5['catch'](1);

							res.status(500).send({ data: "Team not found" });

						case 10:
							_context5.next = 15;
							break;

						case 12:
							_context5.next = 14;
							return _team2.default.find(req.body);

						case 14:
							teams = _context5.sent;

						case 15:
							return _context5.abrupt('return', res.status(200).send({ data: teams }));

						case 16:
						case 'end':
							return _context5.stop();
					}
				}
			}, _callee5, _this5, [[1, 7]]);
		}))();
	},
	getPhoto: function getPhoto(req, res, next) {
		var _this6 = this;

		return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
			var team, file;
			return regeneratorRuntime.wrap(function _callee6$(_context6) {
				while (1) {
					switch (_context6.prev = _context6.next) {
						case 0:
							if (req.body.id) {
								_context6.next = 2;
								break;
							}

							return _context6.abrupt('return', res.status(500).send({ error: 'No requested id!' }));

						case 2:
							_context6.next = 4;
							return _team2.default.findById(req.body.id);

						case 4:
							team = _context6.sent;
							file = team.imgUrl;
							return _context6.abrupt('return', res.status(200).sendFile(process.cwd() + '/photos/teams/' + file + '.png'));

						case 7:
						case 'end':
							return _context6.stop();
					}
				}
			}, _callee6, _this6);
		}))();
	}
};