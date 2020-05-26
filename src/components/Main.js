import React from 'react';
import {getData} from '../Utils/Utils';
import RandomWords from './RandomWords';
import Definition from './Definition';
import GameOver from './GameOver';
import Header from './Header';
import Score from './Score';
import Lives from './Lives';
import EndOfGame from './EndOfGame';

class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      randomThreeWords: [],
      correctWord: '',
      definition: [],
      gameState: '',
      score: 0,
      lives: 5,
    }

  }

fetchAPI = () => {
  getData(`https://dictionaryapi.com/api/v3/references/collegiate/json/${this.state.correctWord}?key=c0530e4a-01db-49b4-9a6f-cdf1b067626b`)
  .then((definition) => {
    if (definition[0].shortdef === undefined || definition[0].shortdef.length === 0) {
      console.log('error caused by: ', definition[0].shortdef);
      console.log('the word did not return a definition, re running random word fetch')
      this.fetchRandomWord()
    } else {
      this.setState({
        definition: definition[0].shortdef,
      })
    }
  })
  .catch((error) => {
    console.error(error)
  })
  }

  fetchRandomWord = () => {
    getData("https://random-word-api.herokuapp.com/word?number=3").then(data => {
      let arr = data
      let correctWord = arr[Math.floor(Math.random() * arr.length)]
      this.setState({
        randomThreeWords: data,
        correctWord: correctWord
      })
      //delete this
      console.log('answer is',correctWord);
      this.fetchAPI()
    })
  }

  restartGame = () => {
    this.setState({
      gameState: '',
      score: 0,
      lives: 5,
    })
  }

  componentDidMount() {
    this.fetchRandomWord();
  }

  checkAnswer = e => {
    let word = e.target.innerText;
    let answer = this.state.correctWord;

    if (word === answer){
      this.setState({
        gameState: 'correct',
      })
    } else {
      this.setState({
        gameState: 'incorrect',
      })
    }

  }

  nextWord = answer => {
    this.fetchRandomWord();
    this.setState({
      randomThreeWords: [],
      correctWord: '',
      definition: [],
      gameState: '',
    })
    if (answer) {
      this.setState({
        score: this.state.score + 1,
      })
    } else {
      this.setState({
        lives: this.state.lives - 1,
      })
    }
  }

  render() {
    const { correctWord, randomThreeWords, definition, gameState, score, lives } = this.state;

    if (gameState !== '') {
      return (
        <>
          <Header wording="Match the word to the definition" />
          <div className="container">
            <GameOver nextWord={this.nextWord} gameState={gameState} correctWord={correctWord} definition={definition} />
          </div>
        </>
      )
    } else if(lives === 0) {
      return (
        <>
          <Header wording="Game Over" />
          <div className="container">
            <EndOfGame finalScore={score} restartGame={this.restartGame}/>
          </div>
        </>
      )
    } else {
      return(
        <>
          <Header wording="Match the word to the definition" />
          <div className="container">
            <Score score={score} />
            <Lives lives={lives} />
            <RandomWords checkAnswer={this.checkAnswer} words={randomThreeWords} />
            <Definition definition={definition} />
          </div>
        </>
      )
    }
  }
}
export default Main
