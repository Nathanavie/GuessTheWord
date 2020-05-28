import React from 'react';
import Button from './Button';
import AddUserScore from './AddUserScore';

const EndOfGame = props => {
  return (
    <>
      <h3>Your Final Score was {props.finalScore}</h3>
      <Button wording="Start Again" origin="EndOfGame" restart={props.restartGame} />
      <div className="addScoreContainer">
        <h4>Want to add your score to the leaderboard?</h4>
        <AddUserScore score={props.finalScore} addScore={props.addScore}/>
      </div>
    </>
  )
}
export default EndOfGame
