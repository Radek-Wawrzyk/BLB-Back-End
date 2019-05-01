'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressFileupload = require('express-fileupload');

var _expressFileupload2 = _interopRequireDefault(_expressFileupload);

var _register = require('babel-core/register');

var _register2 = _interopRequireDefault(_register);

var _babelPolyfill = require('babel-polyfill');

var _babelPolyfill2 = _interopRequireDefault(_babelPolyfill);

var _errors = require('./middlewares/errors');

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _users = require('./routes/users');

var _users2 = _interopRequireDefault(_users);

var _teams = require('./routes/teams');

var _teams2 = _interopRequireDefault(_teams);

var _players = require('./routes/players');

var _players2 = _interopRequireDefault(_players);

var _matches = require('./routes/matches');

var _matches2 = _interopRequireDefault(_matches);

var _news = require('./routes/news');

var _news2 = _interopRequireDefault(_news);

var _database = require('./config/database');

var _database2 = _interopRequireDefault(_database);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Connect to database
_mongoose2.default.connect(_database2.default.mongoUrl);
_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connection.on('error', function (err) {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

var app = (0, _express2.default)();

app.set('secretKey', 'K4UgOiCggY');

app.use((0, _expressFileupload2.default)());
app.use((0, _cors2.default)());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());

// routes config
app.use('/api/users', (0, _users2.default)());
app.use('/api/teams', (0, _teams2.default)());
app.use('/api/players', (0, _players2.default)());
app.use('/api/matches', (0, _matches2.default)());
app.use('/api/news', (0, _news2.default)());

// errors handling
app.use(_errors.notFound);
app.use(_errors.catchErrors);

// Start
app.listen(4000, function () {
    console.log('Server is up!');
});