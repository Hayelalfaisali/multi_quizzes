
import React, { useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const QuizQuestion = () => {
  const { state, selectAnswer, nextQuestion } = useQuiz();
  const { currentQuestionIndex, questions, selectedAnswer, timeLeft } = state;
  const currentQuestion = questions[currentQuestionIndex];
  
  useEffect(() => {
    const timer = setInterval(() => {
      // Using dispatch here would be cleaner but we don't have access to it directly
      // So we check if we need to move to next question
      if (timeLeft <= 0) {
        nextQuestion();
      } else {
        // We'll update the timer directly in the context
        const event = new CustomEvent('timer-tick');
        document.dispatchEvent(event);
      }
    }, 1000);

    // Listen for custom timer tick event
    const handleTimerTick = () => {
      // This triggers the context's TIMER_TICK action
      if (state.timeLeft > 0) {
        state.timeLeft -= 1;
      }
    };

    document.addEventListener('timer-tick', handleTimerTick);
    
    return () => {
      clearInterval(timer);
      document.removeEventListener('timer-tick', handleTimerTick);
    };
  }, [timeLeft, nextQuestion]);

  const progressValue = (timeLeft / 15) * 100;
  
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Time Left: {timeLeft}s</span>
          <span className="text-sm font-medium">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
        </div>
        <Progress value={progressValue} className="h-2" />
      </div>
      
      <div className="bg-card rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-semibold mb-4">{currentQuestion.question}</h3>
        
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = selectedAnswer !== null && index === currentQuestion.correctAnswer;
            const isWrong = isSelected && selectedAnswer !== currentQuestion.correctAnswer;
            
            let buttonVariant: "default" | "outline" | "secondary" | "destructive" = "outline";
            
            if (selectedAnswer !== null) {
              if (isCorrect) buttonVariant = "default";
              if (isWrong) buttonVariant = "destructive";
            }
            
            return (
              <Button
                key={index}
                className="w-full justify-start text-left h-auto py-3 px-4"
                variant={buttonVariant}
                disabled={selectedAnswer !== null}
                onClick={() => selectAnswer(index)}
              >
                <span className="mr-2">{String.fromCharCode(65 + index)}.</span> {option}
              </Button>
            );
          })}
        </div>
      </div>
      
      {selectedAnswer !== null && (
        <div className="flex justify-end">
          <Button onClick={nextQuestion}>
            {currentQuestionIndex === questions.length - 1 ? "Finish Quiz" : "Next Question"}
          </Button>
        </div>
      )}
      
      <div className="text-sm text-muted-foreground mt-4">
        <p>Category: {currentQuestion.category}</p>
      </div>
    </div>
  );
};

export default QuizQuestion;
