const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const BodyParser = require("koa-bodyparser");
const fetch = require("isomorphic-fetch");
const moment = require('moment');
const post = require('./controller/post')
var serve = require('koa-static');

const QUESTION_1={
  user:'こんにちは',
  bot:'こんにちは。'
};
const QUESTION_2={
  user:'今何時？',
  bot:'hh時MM分です。'
};
const QUESTION_3 = {
  user:'今日の東京の天気は？',
  bot:'**です。'
}
const weatherURL='http://weather.livedoor.com/forecast/webservice/json/v1?city=130010';

const getStartTime = () =>{
  const statrDate = moment().utcOffset('+0900');
  return {
    hour:statrDate.format('HH'),
    min:statrDate.format('mm')
  }
}

const getReturnDateTime=()=>{
  return moment().utcOffset('+0900').format('YYYY-MM-DDTHH:mm:ss');
}

// static
app.use(serve(__dirname + '/dist'));

// API
app.use(BodyParser());
const router = new Router();
router
.post('/chat', async (ctx, next) => {
  let params = ctx.request.body;
  const user_input = params.user_input;
  const startTime = getStartTime();
  await next();
  switch (user_input) {
    case QUESTION_1.user:
      params.bot_response = QUESTION_1.bot;   
      break;
    case QUESTION_2.user:
      params.bot_response = QUESTION_2.bot.replace('hh',startTime.hour).replace('MM',startTime.min); 
      break;
    case QUESTION_3.user:
      await fetch(weatherURL)
      .then((res)=> res.json())
      .then((result)=>{
        if(result.forecasts){
          params.bot_response = QUESTION_3.bot.replace('**',result.forecasts[0].telop);
        }
      })
      .catch(console.error);
      break;
  }
  params.response_timestamp=getReturnDateTime();
  post.insert([params.user_input,params.bot_response,params.response_timestamp]);
  ctx.body=params;
})
.get('/history/list', (ctx, next) => {
  const result = post.list();
  console.log('kita');
  this.body = result;
})

app
.use(router.routes())
// .use(router.allowedMethods());

app.listen(process.env.PORT || 3000);
