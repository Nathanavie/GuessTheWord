import React from 'react';
import {getData} from '../Utils/Utils';
import RandomWords from './RandomWords';
import Definition from './Definition';
import GameOver from './GameOver';

class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      randomThreeWords: [],
      correctWord: '',
      definition: '',
      gameState: '',
      score: 0,
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
      console.log('answer is',correctWord);
      this.fetchAPI()
    })
  }

  tryAgain = () => {
    window.location.reload();
  }

  componentDidMount() {
    this.fetchRandomWord();
  }

  checkAnswer = e => {
    console.log(e.target.innerText)
    let word = e.target.innerText;
    let answer = this.state.correctWord;

    if (word === answer){
      this.setState({
        gameState: 'correct',
      })
      console.log('gameState ', this.state.gameState)
    } else {
      this.setState({
        gameState: 'incorrect',
      })
      console.log('gameState ', this.state.gameState)
    }

  }

  nextWord = answer => {
    this.fetchRandomWord();
    this.setState({
      gameState: '',
    })
    if (answer) {
      this.setState({
        score: this.state.score + 1,
      })
    }
  }

  render() {
    const { correctWord, randomThreeWords, definition, gameState, score } = this.state;

    if (gameState !== '') {
      return (
        <div className="container">
          <GameOver nextWord={this.nextWord} gameState={gameState} />
        </div>
      )
    } else {
      return(
        <div className="container">
          <p>Score: {score}</p>
          <RandomWords checkAnswer={this.checkAnswer} words={randomThreeWords} />
          <Definition definition={definition} />
        </div>
      )
    }
  }
}
export default Main
