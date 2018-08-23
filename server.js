const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const BodyParser = require("koa-bodyparser");
const fetch = require("isomorphic-fetch");
const moment = require('moment');
const post = require('./contoller/post')
var serve = require('koa-static');

const prefix1={
  user:'こんにちは',
  bot:'こんにちは。'
};
const prefix2={
  user:'今何時？',
  bot:'hh時MM分です。'
};
const prefix3 = {
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

// display
app.use(serve(__dirname + '/dist'));
app.use(BodyParser());

// API
const router = new Router();

router
.post('/chat', async (ctx, next) => {
  let params = ctx.request.body;
  const user_input = params.user_input;
  const startTime = getStartTime();
  switch (user_input) {
    case prefix1.user:
      params.bot_response = prefix1.bot;   
      break;
    case prefix2.user:
      params.bot_response = prefix2.bot.replace('hh',startTime.hour).replace('MM',startTime.min); 
      break;
    case prefix3.user:
      await fetch(weatherURL)
      .then((res)=> res.json())
      .then((result)=>{
        if(result.forecasts){
          params.bot_response = prefix3.bot.replace('**',result.forecasts[0].telop);
        }
      })
      .catch(console.error);
      break;
  }
  params.response_timestamp=getReturnDateTime();
  //dbにレコードを登録
  post.insert([params.user_input,params.bot_response,params.response_timestamp]);

  ctx.body=params;
})
.get('/history/list',async (ctx, next) => {
  //dbからレコードを取得
})

app
.use(router.routes())
.use(router.allowedMethods());

app.listen(process.env.PORT || 3000);
