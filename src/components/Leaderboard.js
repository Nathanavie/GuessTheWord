import React, { useEffect } from 'react';

const Leaderboard = props => {
  console.log('leaderboard array', props);
  let scores = props.leaderboard;

  let sortedScores = scores.sort(function(a, b) {
    return(b.userScore-a.userScore)
  });

  console.log('log', sortedScores);

  const rows = sortedScores.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.username}</td>
        <td>{row.userScore}</td>
      </tr>
    )
  })
  console.log(rows);
  return (
    <>
      <h3 className="leaderboardTitle">{props.difficulty}</h3>
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </>
  )
}
export default Leaderboard
