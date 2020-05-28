import React from 'react';
import firebase from './Firebase';
import {getData} from '../Utils/Utils';
import RandomWords from './RandomWords';
import Definition from './Definition';
import GameOver from './GameOver';
import Header from './Header';
import Score from './Score';
import Lives from './Lives';
import EndOfGame from './EndOfGame';
import StartPage from './StartPage';
import LeaderboardOptions from './LeaderboardOptions';
import Button from './Button';
import ScoreAdded from './ScoreAdded';

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
      leaderboard: [],
      showLeaderboard: false,
      scoreAdded: false,
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

  backToStart = () => {
    this.setState({
      randomThreeWords: [],
      correctWord: '',
      definition: [],
      gameState: '',
      score: 0,
      lives: 5,
      gameStarted: false,
      difficulty: '0',
      leaderboard: [],
      showLeaderboard: false,
      scoreAdded: false,
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
    if (diff === 'Easy') {
      this.setState({
        difficulty: '3',
        gameStarted: true,
        lives: 6,
      })
      this.fetchRandomWord(3);
    } else if (diff === 'Medium') {
      this.setState({
        difficulty: '6',
        gameStarted: true,
        lives: 4,
      })
      this.fetchRandomWord(6);
    } else if (diff === 'Hard') {
      this.setState({
        difficulty: '9',
        gameStarted: true,
        lives: 2,
      })
      this.fetchRandomWord(9);
    } else if (diff === 'Impossible') {
      this.setState({
        difficulty: '11',
        gameStarted: true,
        lives: 1,
      })
      this.fetchRandomWord(1);
    }
  }

  addScore = (name, score) => {
    const { difficulty } = this.state
    let leaderboardDifficulty;
    if (difficulty === '3') {
      leaderboardDifficulty = 'easy'
    } else if (difficulty === '6') {
      leaderboardDifficulty = 'medium'
    } else if (difficulty === '9') {
      leaderboardDifficulty = 'hard'
    }

    let leaderboard = firebase.database().ref(`/${leaderboardDifficulty}`);

    let data = ({
      username: name,
      userScore: score,
    });

    leaderboard.push(data);

    this.backToStart();

    this.setState({
      scoreAdded: true,
      gameStarted: true,
    })
  }

  getScores = difficulty => {
    let leaderboard = firebase.database().ref(`/${difficulty}`);
    let tempLeaderboard = [];
    leaderboard.on('value', snapshot => {
      const database = snapshot.val();
      let keys = Object.keys(database)

      for (var i = 0; i < keys.length; i++) {
        tempLeaderboard.push(database[keys[i]]);
      }

      this.setState({
        leaderboard: tempLeaderboard
      })
    })
  }

  loadLeaderboard = () => {
    this.setState({
      showLeaderboard: true,
      gameStarted: true,
      lives: 1,
    })
  }
  render() {
    const { gameStarted, correctWord, randomThreeWords, definition, gameState, score, lives, leaderboard, showLeaderboard, scoreAdded, difficulty } = this.state;

    if (!gameStarted) {
      return (
        <>
          <Header wording="Match the word to the definition" />
          <div className="container">
            <StartPage setDifficulty={this.setDifficulty} />
          </div>
          <div className="goToLeaderboard">
            <Button origin="startToLeaderboard" wording="Show Leaderboard" loadLeaderboard={this.loadLeaderboard}/>
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
    } else if (lives === 0) {
      return (
        <>
          <Header wording="Game Over" />
          <div className="container">
            <EndOfGame finalScore={score} restartGame={this.backToStart} addScore={this.addScore}/>
          </div>
          <div className="goToLeaderboard">
            <Button origin="startToLeaderboard" wording="Show Leaderboard" loadLeaderboard={this.loadLeaderboard}/>
          </div>
        </>
      )
    } else if (showLeaderboard === true) {
      return (
        <>
          <Header wording="Leaderboard" />
          <div className="container">
            <LeaderboardOptions getScores={this.getScores} leaderboard={leaderboard} restart={this.backToStart}/>
          </div>
        </>
      )
    } else if (scoreAdded) {
      return (
        <>
          <Header wording="Score Added" />
          <div className="container">
            <ScoreAdded difficulty={difficulty}/>
            <Button origin="leadboardOptions" function={this.backToStart} wording="Back to game" />
            <Button origin="startToLeaderboard" wording="Show Leaderboard" loadLeaderboard={this.loadLeaderboard}/>
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
