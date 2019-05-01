'use strict';

Object.defineProperty(exports, "__esModule", {
		value: true
});

var _user2 = require('../models/user');

var _user3 = _interopRequireDefault(_user2);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
		update: function update(req, res, next) {
				var _this = this;

				return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
						var user, _user;

						return regeneratorRuntime.wrap(function _callee$(_context) {
								while (1) {
										switch (_context.prev = _context.next) {
												case 0:
														if (!(!req.userInfo || !req.userInfo.permissions || !req.userInfo.permissions.users)) {
																_context.next = 2;
																break;
														}

														return _context.abrupt('return', res.status(500).send({ error: 'Permission deined!' }));

												case 2:
														if (!req.body._id) {
																_context.next = 29;
																break;
														}

														if (!req.body.remove) {
																_context.next = 15;
																break;
														}

														_context.prev = 4;
														_context.next = 7;
														return _user3.default.findByIdAndRemove(req.body._id);

												case 7:
														return _context.abrupt('return', res.status(200).send({ data: 'Removed successfully' }));

												case 10:
														_context.prev = 10;
														_context.t0 = _context['catch'](4);
														return _context.abrupt('return', res.status(500).send({ error: 'User not found!' }));

												case 13:
														_context.next = 27;
														break;

												case 15:
														_context.prev = 15;
														_context.next = 18;
														return _user3.default.findByIdAndUpdate(req.body._id, req.body);

												case 18:
														user = _context.sent;

														if (user) {
																_context.next = 21;
																break;
														}

														return _context.abrupt('return', res.status(500).send({ error: 'User not found!' }));

												case 21:
														return _context.abrupt('return', res.status(200).send({ data: user, message: 'User was saved successfully' }));

												case 24:
														_context.prev = 24;
														_context.t1 = _context['catch'](15);
														return _context.abrupt('return', res.status(500).send({ error: 'User not found!' }));

												case 27:
														_context.next = 33;
														break;

												case 29:
														_context.next = 31;
														return _user3.default.create(req.body);

												case 31:
														_user = _context.sent;
														return _context.abrupt('return', res.status(200).send({ data: _user, message: 'User was saved' }));

												case 33:
												case 'end':
														return _context.stop();
										}
								}
						}, _callee, _this, [[4, 10], [15, 24]]);
				}))();
		},
		findAll: function findAll(req, res, next) {
				var _this2 = this;

				return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
						var users;
						return regeneratorRuntime.wrap(function _callee2$(_context2) {
								while (1) {
										switch (_context2.prev = _context2.next) {
												case 0:
														if (!(!req.userInfo || !req.userInfo.permissions || !req.userInfo.permissions.users)) {
																_context2.next = 2;
																break;
														}

														return _context2.abrupt('return', res.status(500).send({ error: 'Permission deined!' }));

												case 2:
														if (!req.body._id) {
																_context2.next = 14;
																break;
														}

														_context2.prev = 3;
														_context2.next = 6;
														return _user3.default.findById(req.body._id);

												case 6:
														users = _context2.sent;
														_context2.next = 12;
														break;

												case 9:
														_context2.prev = 9;
														_context2.t0 = _context2['catch'](3);

														res.status(500).send({ data: "User not found" });

												case 12:
														_context2.next = 17;
														break;

												case 14:
														_context2.next = 16;
														return _user3.default.find(req.body);

												case 16:
														users = _context2.sent;

												case 17:
														return _context2.abrupt('return', res.status(200).send({ data: users }));

												case 18:
												case 'end':
														return _context2.stop();
										}
								}
						}, _callee2, _this2, [[3, 9]]);
				}))();
		},
		authenticate: function authenticate(req, res, next) {
				var _this3 = this;

				return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
						return regeneratorRuntime.wrap(function _callee3$(_context3) {
								while (1) {
										switch (_context3.prev = _context3.next) {
												case 0:
														_user3.default.findOne({ name: req.body.name }, function (err, user) {
																if (err || !req.body.password || !user) {
																		res.status(500).send({ message: "Invalid email/password!", data: null });
																} else {
																		if (_bcrypt2.default.compareSync(req.body.password, user.password)) {
																				var token = _jsonwebtoken2.default.sign({ id: user._id, 'userInfo': user }, req.app.get('secretKey'), { expiresIn: '1h' });
																				return res.status(200).send({ message: "logged in", data: { user: user, token: token } });
																		} else {
																				return res.status(500).send({ message: "Invalid email/password!", data: null });
																		}
																}
														});

												case 1:
												case 'end':
														return _context3.stop();
										}
								}
						}, _callee3, _this3);
				}))();
		},
		validate: function validate(req, res, next) {
				var _this4 = this;

				return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
						return regeneratorRuntime.wrap(function _callee4$(_context4) {
								while (1) {
										switch (_context4.prev = _context4.next) {
												case 0:
														_jsonwebtoken2.default.verify(req.headers['x-access-token'], req.app.get('secretKey'), function (err, decoded) {
																if (err) {
																		return res.status(500).send({ message: err.message, data: null });
																} else {
																		// add user data to request
																		req.userInfo = decoded.userInfo;
																		next();
																}
														});

												case 1:
												case 'end':
														return _context4.stop();
										}
								}
						}, _callee4, _this4);
				}))();
		}
};