
import React from 'react';
import { useQuiz } from '../context/QuizContext';
import QuizStart from './QuizStart';
import QuizQuestion from './QuizQuestion';
import QuizResults from './QuizResults';

const Quiz = () => {
  const { state } = useQuiz();
  const { isQuizStarted, isQuizCompleted } = state;

  if (!isQuizStarted) {
    return <QuizStart />;
  }

  if (isQuizCompleted) {
    return <QuizResults />;
  }

  return <QuizQuestion />;
};

export default Quiz;
