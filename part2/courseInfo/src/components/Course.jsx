import Header from './Header'
import Content from './Content'
import Total from './Total'


const Course = ({ courses }) => {
  const total0 = courses[0].parts.reduce((s,p) => s+p.exercises, 0)
  const total1 = courses[1].parts.reduce((s,p) => s+p.exercises, 0)

  return (
    <>
      <Header course = {courses[0].name}/>
      <Content parts={courses[0].parts}/>
      <Total sum = {total0}/>

      <Header course = {courses[1].name}/>
      <Content parts={courses[1].parts}/>
      <Total sum = {total1}/>
    </>
  )
}

export default Course