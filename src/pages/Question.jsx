import React from "react";
import { useQuizContext } from "../QuizContext";
import he from "he";
import { Navigate } from "react-router-dom";
import { useMemo } from "react";
const Question = () => {
  const { loading, questions, index, timer, handleClick, score } =
    useQuizContext();

  const answers = useMemo(() => {
    if (questions && questions.length > 0 && index < 20) {
      return [
        questions[index].correct_answer,
        ...questions[index].incorrect_answers,
      ].sort(() => Math.random() - 0.5);
    }
    return [];
  }, [questions, index]);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  if (questions.length < 1) {
    return <Navigate to="/"></Navigate>;
  }

  if (index > 19) {
    return <Navigate to="/result"></Navigate>;
  }

  return (
    <div className="container">
      <div className="timer-container">
        <h3 className="score">
          Score: {score}/{index}
        </h3>
        <h2 style={timer > 10 ? { color: "green" } : { color: "red" }}>
          {timer}
        </h2>
      </div>

      <h1>{he.decode(questions[index].question)}</h1>
      {answers.map((answer, index) => {
        return (
          <button
            value={answer}
            key={index}
            onClick={handleClick}
            className="btn"
          >
            {he.decode(answer)}
          </button>
        );
      })}
    </div>
  );
};

export default Question;
