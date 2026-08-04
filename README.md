# GuessTheWord

A word definition guessing game built in React. The game fetches random words, shows you a dictionary definition from the Merriam-Webster API, and you pick which of three words matches it. You have five lives, there is an impossible mode, and high scores go to a Firebase leaderboard.

## Stack

- React 16 (Create React App), class components
- Merriam-Webster Collegiate Dictionary API for definitions
- Random Word API for word generation
- Firebase for the leaderboard

## Running locally

```bash
npm install
npm start
```

Then open http://localhost:3000. You will need your own Merriam-Webster API key and Firebase config for the definitions and leaderboard to work.
