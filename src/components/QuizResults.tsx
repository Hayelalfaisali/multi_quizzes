
import React from 'react';
import { useQuiz } from '../context/QuizContext';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';

const QuizResults = () => {
  const { state, resetQuiz } = useQuiz();
  const { score, questions, selectedCategory } = state;
  
  const percentage = (score / questions.length) * 100;
  
  let resultMessage = '';
  let resultEmoji = '';
  
  if (percentage >= 80) {
    resultMessage = 'Excellent! You\'re a quiz master!';
    resultEmoji = '🏆';
  } else if (percentage >= 60) {
    resultMessage = 'Great job! You did well!';
    resultEmoji = '🎉';
  } else if (percentage >= 40) {
    resultMessage = 'Good effort! Keep learning!';
    resultEmoji = '👍';
  } else {
    resultMessage = 'Keep practicing! You\'ll improve!';
    resultEmoji = '📚';
  }
  
  return (
    <div className="max-w-md mx-auto p-6 space-y-6 text-center">
      <div className="text-6xl mb-4">{resultEmoji}</div>
      
      <h2 className="text-3xl font-bold tracking-tight">{resultMessage}</h2>
      
      <div className="bg-card rounded-lg p-6 shadow-sm">
        <p className="text-2xl font-semibold mb-2">
          Your Score: {score}/{questions.length}
        </p>
        <p className="text-lg text-muted-foreground">
          {percentage.toFixed(0)}% Correct
        </p>
        
        {selectedCategory && (
          <p className="mt-2 text-sm text-muted-foreground">
            Category: {selectedCategory}
          </p>
        )}
      </div>
      
      <div className="space-y-4">
        <Button 
          className="w-full"
          onClick={resetQuiz}
        >
          Try Another Quiz
        </Button>
      </div>
      
      <div className="border rounded-lg p-4 mt-8">
        <h3 className="font-semibold mb-2">Performance Summary</h3>
        <div className="flex justify-center space-x-8">
          <div className="text-center">
            <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-1" />
            <p className="text-lg font-medium">{score}</p>
            <p className="text-xs text-muted-foreground">Correct</p>
          </div>
          <div className="text-center">
            <XCircle className="h-8 w-8 text-red-500 mx-auto mb-1" />
            <p className="text-lg font-medium">{questions.length - score}</p>
            <p className="text-xs text-muted-foreground">Wrong</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
