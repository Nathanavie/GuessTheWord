import React from 'react';

const RandomWords = props => {
  const randomWords = props.words.map((word, index) => {
    return(
      <p onClick={props.checkAnswer} key={index}>{word}</p>
    )
  })

  return (
    <>
      {randomWords}
    </>
  )
}
export default RandomWords
