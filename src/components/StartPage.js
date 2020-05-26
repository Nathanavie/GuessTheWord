import React from 'react';
import Button from './Button';

const StartPage = props => {
  return (
    <>
      <h3>Choose your difficulty</h3>
      <Button wording="easy" origin="start" setDifficulty={props.setDifficulty}/>
      <Button wording="medium" origin="start" setDifficulty={props.setDifficulty}/>
      <Button wording="hard" origin="start" setDifficulty={props.setDifficulty}/>
    </>
  )
}
export default StartPage
