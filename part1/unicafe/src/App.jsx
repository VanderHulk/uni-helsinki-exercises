import { useState } from 'react'

const Header = ({ title }) => <h2>{title}</h2>

const Button = ({ onClick, text}) => <button onClick = {onClick}>{text}</button>

const StatisticsLine = ({ text, value}) => <p>{text} {value}</p>

const Statistics = ({valGood, valNeutral, valBad}) => {
  const getTotal = valGood + valNeutral + valBad
  const getAverage = (valGood - valBad) / getTotal
  const getPositivePercentage = (valGood / getTotal) * 100

  if (getTotal) {
    return (
      <>
        <StatisticsLine text='Good' value={valGood} />
        <StatisticsLine text='Neutral' value={valNeutral} />
        <StatisticsLine text='Bad' value={valBad} />
        <StatisticsLine text='Total' value={getTotal} />
        <StatisticsLine text='Average' value={getAverage} />
        <StatisticsLine text='Positive' value={getPositivePercentage} />
      </>
    )
  } else {
    return (
      <p>No feedback</p>
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