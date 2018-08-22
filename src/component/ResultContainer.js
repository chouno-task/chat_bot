import React,{Component} from 'react'

export default class ResultContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  
  render() {
    return(
      <div className='result_conatiner'>
        {this.props.messages.map((target,index) => {
          return (
            <div key={index}>
              <p>{target.send_time} You > {target.user_input}</p>
              <p>{target.time} Bot > {target.bot_response}</p>
            </div>
          )
        })}
      </div>
    )
  }
}