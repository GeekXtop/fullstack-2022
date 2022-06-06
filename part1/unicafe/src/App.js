import React, { useState } from 'react';

const Statistics = (props) => {
  // ...
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClickGood = () => {
    console.log('clicked the button');
    setGood(1);
  };
  const handleClicNeutral = () => {
    console.log('clicked the button');
    setNeutral(1);
  };
  const handleClickBad = () => {
    console.log('clicked the button');
    setBad(1);
  };

  return (
    <div>
      <button onClick={handleClick}>button</button>
    </div>
  );
};

export default App;
