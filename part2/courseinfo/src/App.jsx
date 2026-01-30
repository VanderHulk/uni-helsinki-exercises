const Header = (props) => <h1>{props.course}</h1>

// semantic use <p>
// pass the whole object
const Part = (props) => <p>{props.part.name} {props.part.exercises}</p>

const Content = (props) => {
  return (
    <div>      
      { props.parts.map((part, id) =>
        <Part key={id} part={part} />
      )}
      {/* <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} /> */}
    </div>
  )
}

const Total = (props) => <p>Number of exercises {props.total}</p>

const Course = (props) => {
  
  return (
    <div>
      {/* props.course is a box that holds the course object*/}
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <Total total={totalExercises(props.course.parts)} />
    </div>
  )
}

const totalExercises = (parts) => parts.reduce((sum, part) => sum + part.exercises, 0)

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }
  
  return <Course course={course} />
}

export default App