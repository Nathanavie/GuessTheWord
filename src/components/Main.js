import React from 'react';
import {getData} from '../Utils/Utils';
import RandomWords from './RandomWords';
import Definition from './Definition';
import GameOver from './GameOver';
import Header from './Header';
import Score from './Score';
import Lives from './Lives';
import EndOfGame from './EndOfGame';
import StartPage from './StartPage';

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
      gameStarted: false,
      difficulty: '0',
    }

  }

fetchAPI = () => {
  getData(`https://dictionaryapi.com/api/v3/references/collegiate/json/${this.state.correctWord}?key=c0530e4a-01db-49b4-9a6f-cdf1b067626b`)
  .then((definition) => {
    if (definition[0].shortdef === undefined || definition[0].shortdef.length === 0) {
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

  fetchRandomWord = number => {
    let url;
    if (!this.state.gameStarted) {
        url = `https://random-word-api.herokuapp.com/word?number=${number}`
    } else {
      url = `https://random-word-api.herokuapp.com/word?number=${this.state.difficulty}`
    }
    getData(url).then(data => {
      let arr = data
      let correctWord = arr[Math.floor(Math.random() * arr.length)]
      this.setState({
        randomThreeWords: data,
        correctWord: correctWord
      })
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

  checkAnswer = e => {
    let word = e.target.innerText.toLowerCase();
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

  setDifficulty = diff => {
    if (diff === 'easy') {
      this.setState({
        difficulty: '3',
        gameStarted: true,
      })
      console.log(this.state.difficulty);
      this.fetchRandomWord(3);
    } else if (diff === 'medium') {
      this.setState({
        difficulty: '6',
        gameStarted: true,
      })
      this.fetchRandomWord(6);
    } else if (diff === 'hard') {
      this.setState({
        difficulty: '9',
        gameStarted: true,
      })
      this.fetchRandomWord(9);
    }
  }

  render() {
    const { gameStarted, correctWord, randomThreeWords, definition, gameState, score, lives } = this.state;

    if (!gameStarted) {
      return (
        <>
          <Header wording="Match the word to the definition" />
          <div className="container">
            <StartPage setDifficulty={this.setDifficulty} />
          </div>
        </>
      )
    } else if (gameState !== '') {
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
