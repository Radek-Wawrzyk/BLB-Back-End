'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _news2 = require('../models/news');

var _news3 = _interopRequireDefault(_news2);

var _fb = require('fb');

var _fb2 = _interopRequireDefault(_fb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
	update: function update(req, res, next) {
		var _this = this;

		return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
			var news, _news;

			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							if (!(!req.userInfo || !req.userInfo.permissions || !req.userInfo.permissions.news)) {
								_context.next = 2;
								break;
							}

							return _context.abrupt('return', res.status(500).send({ error: 'Permission deined!' }));

						case 2:
							if (!req.body.id) {
								_context.next = 27;
								break;
							}

							if (!req.body.remove) {
								_context.next = 15;
								break;
							}

							_context.prev = 4;
							_context.next = 7;
							return _news3.default.findByIdAndRemove(req.body.id);

						case 7:
							return _context.abrupt('return', res.status(200).send({ data: 'Removed successfully' }));

						case 10:
							_context.prev = 10;
							_context.t0 = _context['catch'](4);
							return _context.abrupt('return', res.status(500).send({ error: 'News not found!' }));

						case 13:
							_context.next = 25;
							break;

						case 15:
							_context.prev = 15;
							_context.next = 18;
							return _news3.default.findByIdAndUpdate(req.body.id, req.body);

						case 18:
							news = _context.sent;
							return _context.abrupt('return', res.status(200).send({ data: news, message: 'News was saved successfully' }));

						case 22:
							_context.prev = 22;
							_context.t1 = _context['catch'](15);
							return _context.abrupt('return', res.status(500).send({ error: 'News not found!' }));

						case 25:
							_context.next = 31;
							break;

						case 27:
							_context.next = 29;
							return _news3.default.create(req.body);

						case 29:
							_news = _context.sent;
							return _context.abrupt('return', res.status(200).send({ data: _news, message: 'News was saved' }));

						case 31:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, _this, [[4, 10], [15, 22]]);
		}))();
	},
	findAll: function findAll(req, res, next) {
		var _this2 = this;

		return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
			var news;
			return regeneratorRuntime.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							if (!req.body.id) {
								_context2.next = 12;
								break;
							}

							_context2.prev = 1;
							_context2.next = 4;
							return _news3.default.findById(req.body.id);

						case 4:
							news = _context2.sent;
							_context2.next = 10;
							break;

						case 7:
							_context2.prev = 7;
							_context2.t0 = _context2['catch'](1);

							res.status(500).send({ data: "News not found" });

						case 10:
							_context2.next = 15;
							break;

						case 12:
							_context2.next = 14;
							return _news3.default.find(req.body).sort({ 'date': -1 }).limit(req.body.limit || 15);

						case 14:
							news = _context2.sent;

						case 15:
							return _context2.abrupt('return', res.status(200).send({ data: news }));

						case 16:
						case 'end':
							return _context2.stop();
					}
				}
			}, _callee2, _this2, [[1, 7]]);
		}))();
	},
	fetchFB: function fetchFB(req, res, next) {
		var _this3 = this;

		return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
			return regeneratorRuntime.wrap(function _callee3$(_context3) {
				while (1) {
					switch (_context3.prev = _context3.next) {
						case 0:
							_fb2.default.setAccessToken(req.body.fbAccessToken);
							_fb2.default.api('/' + req.body.fbPageID + '/posts', function (FBres) {
								if (!FBres || FBres.error) return res.status(400).send({ data: !FBres ? 'error occurred' : FBres.error });
								return res.status(200).send({ data: FBres });
							});

						case 2:
						case 'end':
							return _context3.stop();
					}
				}
			}, _callee3, _this3);
		}))();
	}
};