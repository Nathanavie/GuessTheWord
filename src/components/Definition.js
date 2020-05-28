import React from 'react';

const Definition = props => {
  let defs = props.definition;
  let defArray = [];

  const definitions = defs.map((definition, index) =>{
    let wording = definition.slice(0,1).toUpperCase() + definition.slice(1, definition.length);
    defArray.push(wording)
    return defArray
  })
  const definition = defArray.map((def, index) => {
    return (
      <li key={index}>{def}</li>
    )
  })

  return (
    <>
      <div className="definitions">
        <ol>{definition}</ol>
      </div>
    </>
  )
}
export default Definition
