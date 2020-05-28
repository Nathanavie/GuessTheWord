import React from 'react';

const Leaderboard = props => {
  let scores = props.leaderboard;

  let sortedScores = scores.sort(function(a, b) {
    return(b.userScore-a.userScore)
  });


  const rows = sortedScores.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.username}</td>
        <td>{row.userScore}</td>
      </tr>
    )
  })
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
