import React,{Component} from 'react'

export default class InputArea extends Component {
  constructor (props) {
    super(props)
    this.inputOnChange = this.inputOnChange.bind(this);
    this.commentSend = this.commentSend.bind(this);
    this.state = {
      inputValue:''
    }
  }

  inputOnChange(e){
    this.setState({'inputValue': e.target.value})
  }

  commentSend(){
    this.props.commentSend(this.state.inputValue);
  }

  render() {
    return(
      <div className='input_container'>
        <input className='comment_input' value={this.state.inputValue} onChange={this.inputOnChange} type="text" name="name" placeholder="入力してください"/>
        <button className='send_button' disabled={this.state.inputValue!=''?false:true} onClick={this.commentSend}>送信</button>
      </div>
    )
  }
}