const Header = ({title}) => <h1>{title}</h1>
// props.title destructured version ({title}) => <h1>{title}</h1>

const SubHeader = ({name}) => <h2>{name}</h2>

// semantic use <p>
// pass the whole object
const Part = ({part}) => <p>{part.name} {part.exercises}</p>

const Content = ({parts}) => {
  return (
    <section>      
      { parts.map((part) =>
        <Part key={part.id} part={part} />
      )}     
    </section>
  )
}

const Total = ({total}) => <p>Total of exercises {total}</p>

const Course = ({courses}) => {
  return (
    <div>      
      { courses.map(course => (
        <section key={course.id}>
          <SubHeader name={course.name} />
          <Content parts={course.parts} />
          <Total total={totalExercises(course.parts)} />
        </section>
      ))}
    </div>
  )
}

const totalExercises = (parts) => parts.reduce((sum, part) => sum + part.exercises, 0)

const App = () => {
  const course = [
    {    
      name: 'Half Stack application development',
      id: 1,
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
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  
  return (
    <div>
      <Header title="Web development curriculum" />
      <Course courses={course} />
    </div>    
  )
}

export default App