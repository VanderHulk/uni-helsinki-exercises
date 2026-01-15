import { useState } from 'react'

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  'The only way to go fast, is to go well.'
]

// creates an object where the votes will be stored, returns the object
const generateVotesTally = () => {
  const votesTally = {}

  for (let i = 0; i < anecdotes.length; i++) {
    votesTally[i] = 0;
  }

  return votesTally
}

// generates a random number and use it to choose an anecdote from the array
const generateRandomNumber = () => {
  const randomNumber = Math.floor(Math.random() * anecdotes.length)
  console.log('Generated Number: ', randomNumber)
  return randomNumber
}

// finds and displays anecdote with most votes
/* 
  two returns why?
  inner return: returns the result for acc
  outer return: returns the acc for mostVotes
*/
const mostVotes = (voteCount) => { 
  return Object.entries(voteCount).reduce((acc, [key, val]) => {
    return val > acc.val ? { key, val } : acc
  }, { key: null, val: -Infinity })  
}

// COMPONENTS:

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const DisplayAnecdoteVotes = ({text, anecdote, totalVotes}) => {
  return (
    <>
      <h2>{text}</h2>
      <div>{anecdote}</div>      
      <div>{`has ${totalVotes} votes`}</div>      
    </>
  )
}

const App = () => {  

  const [selected, setSelected] = useState(0)
  const [voteCount, setVoteCount] = useState(generateVotesTally())
  
  const voteAnAnecdote = () => {    
    const votesCopy = { ...voteCount } // make a shallow copy to update state without mutating the original object

    votesCopy[selected] += 1;
    // console.log(anecdotes[selected], votesCopy[selected])
    setVoteCount(votesCopy)
  }

  // console.log(voteCount)
  // console.log(mostVotes(voteCount))
  const key = mostVotes(voteCount).key

  return (
    <div>      
      <DisplayAnecdoteVotes text="Anecdote of the day" anecdote={anecdotes[selected]} totalVotes={voteCount[selected]} />
      <br />
      <Button onClick={() => voteAnAnecdote(selected)} text='Vote' />
      {/* pick a new random anecdote */}
      <Button onClick={() => setSelected(generateRandomNumber())} text='Next Anecdote' />
      <DisplayAnecdoteVotes text="Anecdote with most votes" anecdote={anecdotes[key]} totalVotes={voteCount[key]} />
    </div>
  )
}

export default App