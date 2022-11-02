import { useState } from 'react';

const Anecdote = ({ text, vote }) => (
  <>
    {text}
    <div>has {vote} votes</div>
  </>
);

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
  ];

  const [selected, setSelected] = useState(0);
  const [arr, setArr] = useState({ 0: 0 });

  const handleVote = () =>
    setArr({
      ...arr,
      [selected]: isNaN(arr[selected]) ? 1 : arr[selected] + 1,
    });

  const getRandomInt = () => {
    let newSelected = selected;
    while (newSelected === selected) {
      newSelected = Math.floor(Math.random() * anecdotes.length);
    }
    return setSelected(newSelected);
  };

  const getMax = () => {
    //得到数组中最大值对应的Key
    return Object.keys(arr).reduce((a, b) => (arr[a] > arr[b] ? a : b));
  };

  console.log('', arr);
  let k = getMax();

  return (
    <div>
      <h1>anecdote of the day</h1>
      <Anecdote text={anecdotes[selected]} vote={arr[selected]} />
      <button onClick={handleVote}>vote</button>
      <button onClick={getRandomInt}>next anecdote </button>
      <h1>anecdotes with most votes</h1>
      <Anecdote text={anecdotes[k]} vote={arr[k]} />
    </div>
  );
};

export default App;
