# Exercise Information

FullStack Open - Part 1 

Introduction to React: Exercises 1.1-1.2
Javascript: Exercises 1.3-1.5

App (root component):
-  course object: stores course information
-  returns JSX components (Header, Content (Part), Total), which will be rendered on the browser

Other components:
-  Receives arguments called props
-  props (properties) are a mechanism React uses to pass data from a parent component to a child component
Header:
-  expects a prop named "course" ( <Header course={course.name} /> )
Content:
-  expects a prop named "parts" ( <Content parts={course.parts} /> ) where parts is an array of objects and each object represents a single part and contains the fields name and exercise where each field can be accessed using indexing e.g props.parts[0]
Part:
-  expects a prop named "part" and "exercises" e.g ( <Part part={props.parts[0].name} exercises={props.parts[0].exercises} /> ), it uses the props it received from Content to display the name and the exercises
Total: 
-  receives the array of parts and calculates the total from the objects' exercises fields

The return values have been wrapped inside a React fragment <></> to group elements without adding an extra DOM node.