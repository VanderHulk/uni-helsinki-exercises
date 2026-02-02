export const Header = ({title}) => <h1>{title}</h1>
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

export const Course = ({courses}) => {
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