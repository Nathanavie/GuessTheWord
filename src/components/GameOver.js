import React from 'react';
import Button from './Button';

const GameOver = props => {
  let defs = props.definition;
  let defArray = [];

  const definitions = defs.map((definition, index) =>{
    let wording = definition.slice(0,1).toUpperCase() + definition.slice(1, definition.length);
    defArray.push(wording)
    return defArray
  })
  const definition = defArray.map((def, index) => {
    return (
      <li key={index}>
        {def}
      </li>
    )
  })


  let wording;

  if (props.lives === 0) {
    wording = "Finish"
  } else {
    wording = "Next Word"
  }

  return (
    <>
      <h2>That answer was {props.gameState}</h2>
      <div>
        <ol>{definition}</ol>
        <p> is the definition of <strong>{props.correctWord}</strong></p>
      </div>
      <Button gameState={props.gameState} nextWord={props.nextWord} wording={wording} origin="gameOver"/>
    </>

  )

}
export default GameOver
