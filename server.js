const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const BodyParser = require("koa-bodyparser");
var serve = require('koa-static');

app.use(serve(__dirname + '/dist'));
app.use(BodyParser());
// API
const router = new Router();
router
.post('/chat', async (ctx, next) => {
  let params = ctx.request.body;
  const user_input=params.user_input;
  //gen bot 
  params.bot_response = 'こんにちは';

  let returnTime = new Date();
  console.log(returnTime.toString());

  params.response_timestamp='2018-04-10T03:50:40';
  ctx.body=params;
})

app
.use(router.routes())
.use(router.allowedMethods());

app.listen(3000);
