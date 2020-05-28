import React from 'react';

const ScoreAdded = props => {
  let diff = props.difficulty;
  let leaderboard;
  if (diff === '3') {
    leaderboard = 'easy';
  } else if (diff === '6') {
    leaderboard = 'medium';
  } else if (diff === '9') {
    leaderboard = 'hard';
  } else if (diff === '11') {
    leaderboard = 'impossible';
  } else {
    leaderboard = 'unselected'
  }
    return (
      <>
        <h3>Score Added</h3>
        <p>Your score has successfully been added to the {leaderboard} leaderboard</p>
      </>
    )
}
export default ScoreAdded
