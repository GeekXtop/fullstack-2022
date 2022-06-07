import { useState } from 'react';

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  const good = props.good;
  const bad = props.bad;
  const neutral = props.neutral;
  if (good === 0 && bad === 0 && neutral === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={good + neutral + bad} />
        <StatisticLine text='average' value={(good + neutral + bad) / 3} />
        <StatisticLine text='positive' value={good / (good + neutral + bad)} />
      </tbody>
    </table>
  );
};

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text={'good'} />
      <Button handleClick={() => setNeutral(neutral + 1)} text={'neutral'} />
      <Button handleClick={() => setBad(bad - 1)} text={'bad'} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
