import React from 'react';

const Button = props => {

  const passScore = () => {
    if (props.gameState === 'correct') {
      props.nextWord(true)
    } else {
      props.nextWord(false)
    }
  }

  if (props.origin === "gameOver") {
    return (
      <button onClick={() => passScore()}>{props.wording}</button>
    )
  } else if (props.origin === "EndOfGame") {
    return (
      <button onClick={() => props.restart()}>{props.wording}</button>
    )
  } else if (props.origin === "start") {
    return (
      <button onClick={() => props.setDifficulty(props.wording)}>{props.wording}</button>
    )
  } else if (props.origin === "startToLeaderboard") {
    return (
      <button onClick={() => props.loadLeaderboard()}>{props.wording}</button>
    )
  } else {
    return (
      <button onClick={() => props.function()}>{props.wording}</button>
    )
  }
}
export default Button
