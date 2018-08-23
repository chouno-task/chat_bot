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
  
  getTimeStamp(){
    const d = new Date();
    const hour = ( d.getHours()   < 10 ) ? '0' + d.getHours()   : d.getHours();
    const min = ( d.getMinutes() < 10 ) ? '0' + d.getMinutes() : d.getMinutes();
    const sec = ( d.getSeconds() < 10 ) ? '0' + d.getSeconds() : d.getSeconds();
    return hour+':'+min+':'+sec;
  }

  commentSend(value){
    const methodName = "POST";
    const data = {user_input: value};
    const sendData = JSON.stringify(data);
    this.sendTime = this.getTimeStamp();
    fetch("/chat", {
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
        'bot':result.bot_response,
        'user':result.user_input,
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

  render() {
    return(
      <div>
        <InputContainer commentSend={(value)=>this.commentSend(value)}/>
        <ResultContainer messages={this.state.currentMessages}/>
      </div>
    )
  }
}