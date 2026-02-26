export const Header = ({title}) => <h1>{title}</h1>

const SubHeader = ({name}) => <h2>{name}</h2>

const Part = ({part}) => <p>{part.name} {part.exercises}</p>

const Content = ({parts, courseId}) => {  
  return (
    <section>      
      { parts.map((part) =>
        <Part key={`${courseId}${part.id}`} part={part} />        
      )}     
    </section>
  )
}

const Total = ({total}) => <p>Total of {total} exercises</p>

export const Course = ({courses}) => {  
  return (
    <div>      
      { courses.map(course => (
        <section key={course.id}>
          <SubHeader name={course.name} />
          <Content parts={course.parts} courseId={course.id} />
          <Total total={totalExercises(course.parts)} />
        </section>
      ))}
    </div>
  )
}

const totalExercises = (parts) => parts.reduce((sum, part) => sum + part.exercises, 0)