import React from 'react';

class AddUserScore extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
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
      <>
        <label>Enter Your Name</label>
        <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <input
          type="submit"
          name="submit"
          value="Add Score"
          onClick={() => this.props.addScore(`${this.state.username}`, `${this.props.score}`)}
        />
      </>
    )
  }
}
export default AddUserScore
