import React,{Component} from 'react'

export default class ResultContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  
  componentDidUpdate(){
    const obj = document.getElementById('result');
    obj.scrollTop = obj.scrollHeight;
  }

  render() {
    return(
      <div id='result' className='result_conatiner'>
        {this.props.messages.map((target,index) => {
          return (
            <div key={index}>
              <p>{target.send_time!=''?target.send_time.slice(-8):''} You > {target.user_input}</p>
              <p>{target.time!=''?target.time.slice(-8):''} Bot > {target.bot_response}</p>
            </div>
          )
        })}
      </div>
    )
  }
}