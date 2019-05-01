'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _player = require('../models/player');

var _player2 = _interopRequireDefault(_player);

var _teamsController = require('../controllers/teamsController');

var _teamsController2 = _interopRequireDefault(_teamsController);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
	changeTeamInfo: function changeTeamInfo(teamInfo) {
		var _this = this;

		return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_context.next = 2;
							return _player2.default.update({ "team._id": teamInfo._id }, { '$set': { 'team.name': teamInfo.name, 'team.imgUrl': teamInfo.imgUrl } }, { 'multi': true });

						case 2:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, _this);
		}))();
	},
	update: function update(req, res, next) {
		var _this2 = this;

		return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
			var imgUrl, data, player, resp;
			return regeneratorRuntime.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							if (!(!req.userInfo || !req.userInfo.permissions || !req.userInfo.permissions.players)) {
								_context2.next = 2;
								break;
							}

							return _context2.abrupt('return', res.status(500).send({ error: 'Permission deined!' }));

						case 2:
							imgUrl = 'def';

							if (req.files && req.files.photo) {
								imgUrl = Math.random().toString(36).substr(2, 9);
								req.files.photo.mv('photos/players/' + imgUrl + '.png', function (err) {});
							}

							data = req.body;

							data.imgUrl = imgUrl;

							if (!data._id) {
								_context2.next = 33;
								break;
							}

							if (!data.remove) {
								_context2.next = 19;
								break;
							}

							_context2.prev = 8;
							_context2.next = 11;
							return _player2.default.findByIdAndDelete(data._id);

						case 11:
							player = _context2.sent;

							if (player.team && player.team._id) _teamsController2.default.removePlayer(player.team._id, player._id);
							return _context2.abrupt('return', res.status(200).send({ data: 'Removed successfully' }));

						case 16:
							_context2.prev = 16;
							_context2.t0 = _context2['catch'](8);
							return _context2.abrupt('return', res.status(500).send({ error: 'Player not found!' }));

						case 19:

							if (data.imgUrl == 'def') delete data.imgUrl;
							_context2.prev = 20;
							_context2.next = 23;
							return _player2.default.findByIdAndUpdate(data._id, data);

						case 23:
							player = _context2.sent;

							if (data.imgUrl) //remove old image
								_fs2.default.unlink(process.cwd() + '/photos/players/' + player.imgUrl + '.png', function (err) {}); //remove old image
							if (player.team && player.team._id) if (data.team && data.team._id) {
								_teamsController2.default.removePlayer(player.team._id, player._id);
							} else {
								_teamsController2.default.updatePlayer(player.team._id, { "_id": player._id, "name": data.name || player.name, "imgUrl": data.imgUrl || player.imgUrl });
							}
							_context2.next = 31;
							break;

						case 28:
							_context2.prev = 28;
							_context2.t1 = _context2['catch'](20);
							return _context2.abrupt('return', res.status(500).send({ error: 'Player not found!' }));

						case 31:
							_context2.next = 36;
							break;

						case 33:
							_context2.next = 35;
							return _player2.default.create(data);

						case 35:
							player = _context2.sent;

						case 36:
							if (!(data.team && data.team._id && !data.remove)) {
								_context2.next = 45;
								break;
							}

							_context2.next = 39;
							return _teamsController2.default.addPlayer(data.team._id, { "_id": player._id, "name": data.name || player.name, "imgUrl": data.imgUrl || player.imgUrl });

						case 39:
							resp = _context2.sent;
							_context2.next = 42;
							return _player2.default.findByIdAndUpdate(data._id || player._id, { "team": resp.data });

						case 42:
							player = _context2.sent;

							if (!resp.err) {
								_context2.next = 45;
								break;
							}

							return _context2.abrupt('return', res.status(500).send({ data: player, message: 'Team not found!' }));

						case 45:
							return _context2.abrupt('return', res.status(200).send({ data: player, message: 'Player was saved' }));

						case 46:
						case 'end':
							return _context2.stop();
					}
				}
			}, _callee2, _this2, [[8, 16], [20, 28]]);
		}))();
	},
	find: function find(req, res, next) {
		var _this3 = this;

		return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
			var players;
			return regeneratorRuntime.wrap(function _callee3$(_context3) {
				while (1) {
					switch (_context3.prev = _context3.next) {
						case 0:
							if (!req.body.id) {
								_context3.next = 12;
								break;
							}

							_context3.prev = 1;
							_context3.next = 4;
							return _player2.default.findById(req.body.id);

						case 4:
							players = _context3.sent;
							_context3.next = 10;
							break;

						case 7:
							_context3.prev = 7;
							_context3.t0 = _context3['catch'](1);

							res.status(500).send({ data: "Player not found" });

						case 10:
							_context3.next = 15;
							break;

						case 12:
							_context3.next = 14;
							return _player2.default.find(req.body);

						case 14:
							players = _context3.sent;

						case 15:
							return _context3.abrupt('return', res.status(200).send({ data: players }));

						case 16:
						case 'end':
							return _context3.stop();
					}
				}
			}, _callee3, _this3, [[1, 7]]);
		}))();
	},
	getPhoto: function getPhoto(req, res, next) {
		var _this4 = this;

		return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
			var player, file;
			return regeneratorRuntime.wrap(function _callee4$(_context4) {
				while (1) {
					switch (_context4.prev = _context4.next) {
						case 0:
							if (req.body._id) {
								_context4.next = 2;
								break;
							}

							return _context4.abrupt('return', res.status(500).send({ error: 'No requested id!' }));

						case 2:
							_context4.prev = 2;
							_context4.next = 5;
							return _player2.default.findById(req.body._id);

						case 5:
							player = _context4.sent;
							_context4.next = 11;
							break;

						case 8:
							_context4.prev = 8;
							_context4.t0 = _context4['catch'](2);
							return _context4.abrupt('return', res.status(500).send({ data: "Player not found!" }));

						case 11:
							if (player) {
								_context4.next = 13;
								break;
							}

							return _context4.abrupt('return', res.status(500).send({ data: "Player not found!" }));

						case 13:
							file = player.imgUrl;
							return _context4.abrupt('return', res.status(200).sendFile(process.cwd() + '/photos/players/' + file + '.png'));

						case 15:
						case 'end':
							return _context4.stop();
					}
				}
			}, _callee4, _this4, [[2, 8]]);
		}))();
	}
};