
import React from 'react';
import { useQuiz } from '../context/QuizContext';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const QuizStart = () => {
  const { state, startQuiz } = useQuiz();
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value === "all" ? null : value);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-6 max-w-md mx-auto text-center">
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Interactive Quiz</h1>
      
      <p className="text-muted-foreground">
        Test your knowledge with this interactive quiz. Choose a category and start answering questions!
      </p>
      
      <div className="w-full max-w-xs">
        <Select onValueChange={handleCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {state.categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Button 
        className="w-full max-w-xs"
        onClick={() => startQuiz(selectedCategory)}
      >
        Start Quiz
      </Button>

      <div className="text-sm text-muted-foreground mt-8">
        <p>Available Categories: {state.categories.join(", ")}</p>
        <p>Total Questions: {state.questions.length}</p>
      </div>
    </div>
  );
};

export default QuizStart;
