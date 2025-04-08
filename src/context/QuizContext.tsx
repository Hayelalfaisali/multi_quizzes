
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { QuizQuestion, QuizState } from '../types/quiz';

// Sample quiz questions
const quizData: QuizQuestion[] = [
  {
    id: 1,
    question: "What is React?",
    options: [
      "A JavaScript library for building user interfaces",
      "A programming language",
      "A database management system",
      "A server-side framework"
    ],
    correctAnswer: 0,
    category: "Programming"
  },
  {
    id: 2,
    question: "Which company developed React?",
    options: [
      "Google",
      "Facebook",
      "Amazon",
      "Microsoft"
    ],
    correctAnswer: 1,
    category: "Programming"
  },
  {
    id: 3,
    question: "What hook is used for side effects in React?",
    options: [
      "useState",
      "useReducer",
      "useEffect",
      "useContext"
    ],
    correctAnswer: 2,
    category: "Programming"
  },
  {
    id: 4,
    question: "What is the largest planet in our solar system?",
    options: [
      "Earth",
      "Saturn",
      "Jupiter",
      "Neptune"
    ],
    correctAnswer: 2,
    category: "Science"
  },
  {
    id: 5,
    question: "What is the chemical symbol for gold?",
    options: [
      "Au",
      "Ag",
      "Fe",
      "Gd"
    ],
    correctAnswer: 0,
    category: "Science"
  },
  {
    id: 6,
    question: "Which planet is known as the Red Planet?",
    options: [
      "Venus",
      "Mars",
      "Mercury",
      "Jupiter"
    ],
    correctAnswer: 1,
    category: "Science"
  },
  {
    id: 7,
    question: "Who wrote 'Romeo and Juliet'?",
    options: [
      "Charles Dickens",
      "William Shakespeare",
      "Jane Austen",
      "F. Scott Fitzgerald"
    ],
    correctAnswer: 1,
    category: "Literature"
  },
  {
    id: 8,
    question: "What is the capital of Japan?",
    options: [
      "Beijing",
      "Seoul",
      "Tokyo",
      "Bangkok"
    ],
    correctAnswer: 2,
    category: "Geography"
  },
  {
    id: 9,
    question: "Which ocean is the largest?",
    options: [
      "Atlantic",
      "Indian",
      "Arctic",
      "Pacific"
    ],
    correctAnswer: 3,
    category: "Geography"
  }
];

// Get unique categories
const uniqueCategories = Array.from(new Set(quizData.map(q => q.category)));

// Initial state
const initialState: QuizState = {
  questions: quizData,
  currentQuestionIndex: 0,
  score: 0,
  timeLeft: 15, // seconds per question
  isQuizStarted: false,
  isQuizCompleted: false,
  selectedAnswer: null,
  categories: uniqueCategories,
  selectedCategory: null
};

type QuizAction =
  | { type: 'START_QUIZ'; payload: string | null }
  | { type: 'SELECT_ANSWER'; payload: number }
  | { type: 'NEXT_QUESTION' }
  | { type: 'TIMER_TICK' }
  | { type: 'RESET_QUIZ' };

// Reducer function
const quizReducer = (state: QuizState, action: QuizAction): QuizState => {
  switch (action.type) {
    case 'START_QUIZ':
      const filteredQuestions = action.payload
        ? state.questions.filter(q => q.category === action.payload)
        : state.questions;
        
      return {
        ...state,
        isQuizStarted: true,
        isQuizCompleted: false,
        currentQuestionIndex: 0,
        score: 0,
        timeLeft: 15,
        selectedAnswer: null,
        questions: filteredQuestions,
        selectedCategory: action.payload
      };
      
    case 'SELECT_ANSWER':
      const currentQuestion = state.questions[state.currentQuestionIndex];
      const isCorrect = action.payload === currentQuestion.correctAnswer;
      
      return {
        ...state,
        selectedAnswer: action.payload,
        score: isCorrect ? state.score + 1 : state.score
      };
      
    case 'NEXT_QUESTION':
      const nextIndex = state.currentQuestionIndex + 1;
      const isCompleted = nextIndex >= state.questions.length;
      
      return {
        ...state,
        currentQuestionIndex: isCompleted ? state.currentQuestionIndex : nextIndex,
        isQuizCompleted: isCompleted,
        selectedAnswer: null,
        timeLeft: 15
      };
      
    case 'TIMER_TICK':
      if (state.timeLeft <= 0) {
        const nextIndex = state.currentQuestionIndex + 1;
        const isCompleted = nextIndex >= state.questions.length;
        
        return {
          ...state,
          currentQuestionIndex: isCompleted ? state.currentQuestionIndex : nextIndex,
          isQuizCompleted: isCompleted,
          selectedAnswer: null,
          timeLeft: 15
        };
      }
      
      return {
        ...state,
        timeLeft: state.timeLeft - 1
      };
      
    case 'RESET_QUIZ':
      return {
        ...initialState,
        questions: quizData,
      };
      
    default:
      return state;
  }
};

// Create context
type QuizContextType = {
  state: QuizState;
  startQuiz: (category: string | null) => void;
  selectAnswer: (answerIndex: number) => void;
  nextQuestion: () => void;
  resetQuiz: () => void;
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

// Provider component
export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  const startQuiz = (category: string | null) => {
    dispatch({ type: 'START_QUIZ', payload: category });
  };

  const selectAnswer = (answerIndex: number) => {
    dispatch({ type: 'SELECT_ANSWER', payload: answerIndex });
  };

  const nextQuestion = () => {
    dispatch({ type: 'NEXT_QUESTION' });
  };

  const resetQuiz = () => {
    dispatch({ type: 'RESET_QUIZ' });
  };

  return (
    <QuizContext.Provider value={{ state, startQuiz, selectAnswer, nextQuestion, resetQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};

// Custom hook to use the quiz context
export const useQuiz = (): QuizContextType => {
  const context = useContext(QuizContext);
  
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  
  return context;
};
