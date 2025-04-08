
import React from 'react';
import { QuizProvider } from '../context/QuizContext';
import Quiz from '../components/Quiz';

const QuizPage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b p-4 bg-card">
        <div className="container mx-auto">
          <h1 className="text-lg font-semibold">Interactive Quiz Platform</h1>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <QuizProvider>
          <Quiz />
        </QuizProvider>
      </main>
      
      <footer className="border-t p-4 text-center text-sm text-muted-foreground">
        <p>© 2025 Interactive Quiz Platform</p>
      </footer>
    </div>
  );
};

export default QuizPage;
