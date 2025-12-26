import { useState } from 'react'

const Header = ({ title }) => <h2>{title}</h2>

const Button = ({ onClick, text}) => <button onClick = {onClick}>{text}</button>

const Display = ({ text, result}) => <p>{text} {result}</p>

const Statistics = ({valGood, valNeutral, valBad}) => {
  const getTotal = valGood + valNeutral + valBad
  const getAverage = (getTotal) ? (valGood - valBad) / getTotal : 0
  const getPositivePercentage = (getTotal) ? (valGood / getTotal) * 100 : 0

  if (getTotal) {
    return (
      <>
        <Display text='Good' result={valGood} />
        <Display text='Neutral' result={valNeutral} />
        <Display text='Bad' result={valBad} />
        <Display text='Total' result={getTotal} />
        <Display text='Average' result={getAverage} />
        <Display text='Positive' result={getPositivePercentage} />
      </>
    )
  } else {
    return (
      <p>No feedback given</p>
    )
  }
}

const App = () => {
  // save clicks of each button on its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)  

  const collectFeedback = (stateVal, stateUpdater) => {    
    const count = stateVal + 1    
    stateUpdater(count)    
  }  

  return (
    <div>
      <Header title='Give Feedback' />
      <Button onClick={() => collectFeedback(good, setGood)} text='Good' />
      <Button onClick={() => collectFeedback(neutral, setNeutral)} text='Neutral' />
      <Button onClick={() => collectFeedback(bad, setBad)} text='Bad' />
      <Header title='Statistics' />      
      <Statistics valGood={good} valNeutral={neutral} valBad={bad} />
    </div>
  )
}

export default App