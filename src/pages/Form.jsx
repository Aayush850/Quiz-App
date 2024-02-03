import React from "react";
import { useQuizContext } from "../QuizContext";
import { useNavigate } from "react-router-dom";
import { FaHandPointRight } from "react-icons/fa";

const Form = () => {
  const navigate = useNavigate();

  const { formInput, handleChange, handleSubmit } = useQuizContext();
  const { category, difficulty } = formInput;
  return (
    <div className="container">
      <div className="form-container">
        <h1 className="brand-title">Quiz App</h1>
        <div className="rules">
          <h2>Rules</h2>

          <p>
            <span className="icon">
              <FaHandPointRight />
            </span>
            This quiz comprises only 20 questions, allowing you to select both
            the difficulty and category.
          </p>

          <p>
            <span className="icon">
              <FaHandPointRight />
            </span>
            You will have 30 seconds to answer each question.
          </p>
        </div>
        <div className="quiz-form">
          <h2>Options</h2>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
              navigate("/question");
            }}
          >
            <div className="form-control">
              <label htmlFor="category">Choose Category</label>
              <select
                name="category"
                id="category"
                value={category}
                onChange={handleChange}
              >
                <option value="9">General Knowledge</option>
                <option value="21">Sports</option>
                <option value="23">History</option>
              </select>
            </div>
            <div className="form-control">
              <label htmlFor="difficulty">Choose Difficulty</label>
              <select
                name="difficulty"
                id="difficulty"
                value={difficulty}
                onChange={handleChange}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <button type="submit" className="btn">
              Start Quiz
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
