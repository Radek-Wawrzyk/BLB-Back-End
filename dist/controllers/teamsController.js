'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _team = require('../models/team');

var _team2 = _interopRequireDefault(_team);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
	create: function create(req, res, next) {
		var _this = this;

		return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
			var imgUrl, data, team;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							imgUrl = 'def';

							if (req.files && req.files.photo) {
								imgUrl = Math.random().toString(36).substr(2, 9);
								req.files.photo.mv('photos/teams/' + imgUrl + '.png', function (err) {
									if (err) console.log(err);
								});
							}

							data = req.body;

							data.imgUrl = imgUrl;
							_context.next = 6;
							return _team2.default.create(data);

						case 6:
							team = _context.sent;
							return _context.abrupt('return', res.status(200).send({ data: team, message: 'Team was saved' }));

						case 8:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, _this);
		}))();
	},
	findAll: function findAll(req, res, next) {
		var _this2 = this;

		return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
			var teams;
			return regeneratorRuntime.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							_context2.next = 2;
							return _team2.default.find();

						case 2:
							teams = _context2.sent;
							return _context2.abrupt('return', res.status(200).send({ data: teams }));

						case 4:
						case 'end':
							return _context2.stop();
					}
				}
			}, _callee2, _this2);
		}))();
	},
	uploadPhoto: function uploadPhoto(req, res, next) {
		var _this3 = this;

		return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
			var file, team;
			return regeneratorRuntime.wrap(function _callee3$(_context3) {
				while (1) {
					switch (_context3.prev = _context3.next) {
						case 0:
							if (req.body.id) {
								_context3.next = 2;
								break;
							}

							return _context3.abrupt('return', res.status(500).send({ error: 'No requested id!' }));

						case 2:
							if (!(!req.files || !req.files.photo)) {
								_context3.next = 4;
								break;
							}

							return _context3.abrupt('return', res.status(500).send({ error: 'No file sent!' }));

						case 4:
							file = Math.random().toString(36).substr(2, 9);

							req.files.photo.mv('photos/teams/' + file + '.png', function (err) {
								if (err) return res.status(500).send(err);
							});

							_context3.next = 8;
							return _team2.default.findById(req.body.id);

						case 8:
							team = _context3.sent;

							console.log(process.cwd() + '/photos/teams/' + team.imgUrl + '.png');
							_fs2.default.unlink(process.cwd() + '/photos/teams/' + team.imgUrl + '.png', function (err) {}); //remove old image
							team.imgUrl = file;
							team.save(function () {
								return res.status(200).send({ data: 'done' });
							});

						case 13:
						case 'end':
							return _context3.stop();
					}
				}
			}, _callee3, _this3);
		}))();
	},
	getPhoto: function getPhoto(req, res, next) {
		var _this4 = this;

		return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
			var team, file;
			return regeneratorRuntime.wrap(function _callee4$(_context4) {
				while (1) {
					switch (_context4.prev = _context4.next) {
						case 0:
							if (req.body.id) {
								_context4.next = 2;
								break;
							}

							return _context4.abrupt('return', res.status(500).send({ error: 'No requested id!' }));

						case 2:
							_context4.next = 4;
							return _team2.default.findById(req.body.id);

						case 4:
							team = _context4.sent;
							file = team.imgUrl;
							return _context4.abrupt('return', res.status(200).sendFile(process.cwd() + '/photos/teams/' + file + '.png'));

						case 7:
						case 'end':
							return _context4.stop();
					}
				}
			}, _callee4, _this4);
		}))();
	}
};