import React from 'react';
import Leaderboard from './Leaderboard';
import Button from './Button'

class LeaderboardOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayLeaderboard: false,
      easy: '',
      medium: '',
      hard: '',
      impossible: '',
    }
  }

  displayLeaderboard = difficulty => {
    this.setState({
      displayLeaderboard: true,
      difficulty: difficulty,
      easy: '',
      medium: '',
      hard: '',
      impossible: '',
      [difficulty]: 'activeButton',
    })

    this.props.getScores(difficulty)
  }

  render() {
    const { displayLeaderboard } = this.state;
    if (!displayLeaderboard) {
        return (
          <>
            <div className="leaderboardButtons">
              <button className={this.state.easy} onClick={() => this.displayLeaderboard('easy')}>Easy</button>
              <button className={this.state.medium} onClick={() => this.displayLeaderboard('medium')}>Medium</button>
              <button className={this.state.hard} onClick={() => this.displayLeaderboard('hard')}>Hard</button>
              <button className={this.state.impossible} onClick={() => this.displayLeaderboard('impossible')}>Impossible</button>
            </div>
            <Button origin="leadboardOptions" function={this.props.restart} wording="Back to game" />
          </>
        )
    } else {
      return(
        <>
          <div className="leaderboardButtons">
            <button className={this.state.easy} onClick={() => this.displayLeaderboard('easy')}>Easy</button>
            <button className={this.state.medium} onClick={() => this.displayLeaderboard('medium')}>Medium</button>
            <button className={this.state.hard} onClick={() => this.displayLeaderboard('hard')}>Hard</button>
            <button className={this.state.impossible} onClick={() => this.displayLeaderboard('impossible')}>Impossible</button>
          </div>
          <Leaderboard leaderboard={this.props.leaderboard} difficulty={this.state.difficulty}/>
          <Button origin="leadboardOptions" function={this.props.restart} wording="Back to game" />
          </>
      )
    }
  }
}

export default LeaderboardOptions
