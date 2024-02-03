import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useQuizContext } from "../QuizContext";

const Result = () => {
  const { score, index, newGame } = useQuizContext();
  if (index < 20) {
    return <Navigate to="/"></Navigate>;
  }
  return (
    <div className="container result">
      <h1>You Scored:</h1>
      <h2>
        {score}/{index}
      </h2>
      <Link to="/" onClick={newGame} className="btn">
        Play Again
      </Link>
    </div>
  );
};

export default Result;
