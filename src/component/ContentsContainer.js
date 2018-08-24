import React,{Component} from 'react'
import InputContainer from "./InputContainer";
import ResultContainer from './ResultContainer'
export default class ContentsContainer extends Component {
  constructor (props) {
    super(props)
    this.sendTime = '';
    this.state = {
      currentMessages:[]
    }
  }
  
  componentDidMount(){
    console.log('AppMount');
  }

  getTimeStamp(){
    const returnTime = new Date();
    const y = returnTime.getFullYear();
    const month = ("0"+(returnTime.getMonth() + 1)).slice(-2);
    const date =  ("0"+returnTime.getDate()).slice(-2)
    const hour =  ("0"+(returnTime.getHours())).slice(-2);
    const min = ("0"+(returnTime.getMinutes())).slice(-2);
    const sec = ("0"+(returnTime.getSeconds())).slice(-2);
    return y+'-'+month+'-'+date+'T'+hour+':'+min+':'+sec;
  }

  commentSend(value){
    const methodName = "POST";
    const data = {user_input: value};
    const sendData = JSON.stringify(data);
    this.sendTime = this.getTimeStamp();
    fetch('/chat', {
      body:sendData,
      method:methodName,
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((res)=> res.json())
    .then((result)=>{
      const new_data = {
        'bot_response':result.bot_response,
        'user_input':result.user_input,
        'send_time':this.sendTime,
        'time':result.response_timestamp
      }
      let nextResult = this.state.currentMessages.slice();
      nextResult.push(new_data);
      this.setState({
        currentMessages:nextResult
      })
    })
    .catch(console.error);
  }

  history(){
    const methodName = "GET";
    fetch('/history/list', {
      method:methodName
    })
    .catch(console.error);
  }

  render() {
    return(
      <div>
        <InputContainer commentSend={(value)=>this.commentSend(value)}/>
        <ResultContainer messages={this.state.currentMessages}/>
        <button onClick={()=>this.history()}>履歴</button>
      </div>
    )
  }
}