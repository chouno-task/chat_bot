'use strict';

require('babel-polyfill');

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _koa2.default();
var router = new _koaRouter2.default();

router.get('/api/comments', /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          this.type = 'json';
          this.status = 200;
          this.body = [{ 'author': 'Pete Hunt', 'text': 'This is one comment', 'id': 1 }, { 'author': 'Jordan Walke', 'text': 'This is *another* comment', 'id': 2 }];

        case 3:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, this);
})).post('/api/comments', /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
  var json, author, text;
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (this.is('application/json') || this.is('application/x-www-form-urlencoded')) {
            json = this.request.body;
            author = json['author'];
            text = json['text'];


            this.type = 'json';
            this.status = 200;
            this.body = [{ 'author': author, 'text': text }];
            this.length = this.body.length;
          }

        case 1:
        case 'end':
          return _context2.stop();
      }
    }
  }, _callee2, this);
}));

app.use((0, _koaStatic2.default)('.')).use((0, _koaBodyparser2.default)()).use(router.routes());

app.listen(3000);
