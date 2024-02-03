import React, { useEffect, useState } from "react";
import { useContext } from "react";

const QuizContext = React.createContext();

const QuizContextProvider = ({ children }) => {
  const [formInput, setFormInput] = useState({
    category: "9",
    difficulty: "easy",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);

  const handleChange = (e) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        `https://opentdb.com/api.php?amount=20&category=${formInput.category}&difficulty=${formInput.difficulty}&type=multiple`
      );
      const { results } = await res.json();
      setQuestions(results);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  const nextQuestion = () => {
    if (index < 20) {
      setIndex((prev) => prev + 1);
    }
  };

  const newGame = () => {
    setIndex(0);
    setQuestions([]);
    setScore(0);
  };

  const handleClick = (e) => {
    if (e.target.value === questions[index].correct_answer) {
      setScore((prev) => prev + 1);
    }
    nextQuestion();
  };

  useEffect(() => {
    setTimer(30);
    let interval;

    if (questions.length > 0) {
      interval = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }

    return () => {
      console.log("component unmount");
      clearInterval(interval);
    };
  }, [index, questions]);

  useEffect(() => {
    if (timer === 0) {
      nextQuestion();
    }
  }, [timer]);

  return (
    <QuizContext.Provider
      value={{
        formInput,
        handleChange,
        handleSubmit,
        loading,
        questions,
        error,
        index,
        timer,
        handleClick,
        score,
        newGame,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

const useQuizContext = () => {
  return useContext(QuizContext);
};

export { QuizContextProvider, useQuizContext };
