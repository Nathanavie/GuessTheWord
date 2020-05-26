import React from 'react';
import Button from './Button';

const EndOfGame = props => {
  return (
    <>
      <h3>Your Final Score was {props.finalScore}</h3>
      <Button wording="Start Again" origin="EndOfGame" restart={props.restartGame} />
    </>
  )
}
export default EndOfGame
