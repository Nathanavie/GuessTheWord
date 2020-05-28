import React from 'react';

class ImpossibleMode extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      answer: '',
    }
  }

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    })
  }
    render() {
      return (
        <div className="addScoreContainer">
          <label>Your Answer</label>
          <input
            type="text"
            name="answer"
            value={this.state.answer}
            onChange={this.handleChange}
          />
          <input
            type="submit"
            value="Submit"
            onClick={() => this.props.checkAnswer(this.state.answer)}
          />
        </div>
      )
    }
  }
export default ImpossibleMode
