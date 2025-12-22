import { useState } from 'react'

const Header = ({ title }) => <h2>{title}</h2>

const Button = ({ onClick, text}) => <button onClick = {onClick}>{text}</button>

const Display = ({ text, totalFeedback}) => <p>{text} {totalFeedback}</p>

const App = () => {
  // save clicks of each button on its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header title='Give Feedback' />
      <Button onClick={console.log('Hello')} text='Good' />
      <Button onClick={console.log('Hello')} text='Neutral' />
      <Button onClick={console.log('Hello')} text='Bad' />
      <Header title='Statistics' />
      <Display text='Good' totalFeedback={good}/>
      <Display text='Neutral' totalFeedback={neutral}/>
      <Display text='Bad' totalFeedback={bad}/>
    </div>
  )
}

export default App