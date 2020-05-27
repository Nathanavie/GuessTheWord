import React from 'react';
import Button from './Button';

const StartPage = props => {
  return (
    <>
      <h3>Choose your difficulty</h3>
      <Button wording="Easy" origin="start" setDifficulty={props.setDifficulty}/>
      <Button wording="Medium" origin="start" setDifficulty={props.setDifficulty}/>
      <Button wording="Hard" origin="start" setDifficulty={props.setDifficulty}/>
    </>
  )
}
export default StartPage
