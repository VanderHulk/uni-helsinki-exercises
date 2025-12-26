import { useState } from 'react'

const Header = ({ title }) => <h2>{title}</h2>

const Button = ({ onClick, text}) => <button onClick = {onClick}>{text}</button>

const Display = ({ text, result}) => <p>{text} {result}</p>

const App = () => {
  // save clicks of each button on its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)  

  const collectFeedback = (stateVal, stateUpdater) => {    
    const count = stateVal + 1    
    stateUpdater(count)    
  }

  const getTotal = (valGood, valNeutral, valBad) => valGood + valNeutral + valBad
  const getAverage = (valGood, valBad, totalCount) => 
    (totalCount) ? (valGood - valBad) / totalCount : 0
  const getPositivePercentage = (valGood, totalCount) => 
    (totalCount) ? (valGood / totalCount) * 100 : 0

  const totalFeedback = getTotal(good, neutral, bad)

  return (
    <div>
      <Header title='Give Feedback' />
      <Button onClick={() => collectFeedback(good, setGood)} text='Good' />
      <Button onClick={() => collectFeedback(neutral, setNeutral)} text='Neutral' />
      <Button onClick={() => collectFeedback(bad, setBad)} text='Bad' />
      <Header title='Statistics' />
      <Display text='Good' result={good} />
      <Display text='Neutral' result={neutral} />
      <Display text='Bad' result={bad} />
      <Display text='Total' result={totalFeedback} />
      <Display text='Average' result={getAverage(good, bad, totalFeedback)} />
      <Display text='Positive' result={getPositivePercentage(good, totalFeedback)} />
    </div>
  )
}

export default App