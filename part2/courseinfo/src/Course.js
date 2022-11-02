import React from 'react';

const Course = ({ course }) => {
  const sum = course.parts.reduce((s, e) => s + e.exercises, 0);
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total sum={sum} />
    </>
  );
};

const Header = ({ name }) => <h1>{name}</h1>;

const Total = ({ sum }) => {
  return (
    <p>
      <strong>Number of exercises {sum}</strong>
    </p>
  );
};
const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);
const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </>
);

export default Course;
