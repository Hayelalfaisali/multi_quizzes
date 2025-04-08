
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FlashcardStudy from "@/components/flashcards/FlashcardStudy";
import DeckManager from "@/components/flashcards/DeckManager";
import { Deck } from "@/types/flashcard";

// Sample initial decks
const initialDecks: Deck[] = [
  {
    id: "1",
    name: "Spanish Basics",
    description: "Common Spanish words and phrases",
    cards: [
      { id: "1-1", front: "Hello", back: "Hola", lastReviewed: null, nextReview: null, level: 0 },
      { id: "1-2", front: "Goodbye", back: "Adiós", lastReviewed: null, nextReview: null, level: 0 },
      { id: "1-3", front: "Thank you", back: "Gracias", lastReviewed: null, nextReview: null, level: 0 },
      { id: "1-4", front: "Please", back: "Por favor", lastReviewed: null, nextReview: null, level: 0 },
    ],
  },
  {
    id: "2",
    name: "French Basics",
    description: "Essential French vocabulary",
    cards: [
      { id: "2-1", front: "Hello", back: "Bonjour", lastReviewed: null, nextReview: null, level: 0 },
      { id: "2-2", front: "Goodbye", back: "Au revoir", lastReviewed: null, nextReview: null, level: 0 },
      { id: "2-3", front: "Thank you", back: "Merci", lastReviewed: null, nextReview: null, level: 0 },
    ],
  },
];

const FlashcardsPage = () => {
  const [decks, setDecks] = useState<Deck[]>(initialDecks);
  const [selectedDeckId, setSelectedDeckId] = useState<string | null>(null);

  const handleAddDeck = (newDeck: Deck) => {
    setDecks([...decks, newDeck]);
  };

  const handleUpdateDeck = (updatedDeck: Deck) => {
    setDecks(decks.map((deck) => (deck.id === updatedDeck.id ? updatedDeck : deck)));
  };

  const handleDeleteDeck = (deckId: string) => {
    setDecks(decks.filter((deck) => deck.id !== deckId));
    if (selectedDeckId === deckId) {
      setSelectedDeckId(null);
    }
  };

  const selectedDeck = selectedDeckId 
    ? decks.find((deck) => deck.id === selectedDeckId) 
    : decks.length > 0 ? decks[0] : null;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Language Learning Flashcards</h1>
      
      <Tabs defaultValue="decks" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="decks">Manage Decks</TabsTrigger>
          <TabsTrigger value="study" disabled={!selectedDeck}>Study</TabsTrigger>
        </TabsList>
        
        <TabsContent value="decks">
          <DeckManager 
            decks={decks}
            onAddDeck={handleAddDeck}
            onUpdateDeck={handleUpdateDeck}
            onDeleteDeck={handleDeleteDeck}
            onSelectDeck={setSelectedDeckId}
            selectedDeckId={selectedDeckId}
          />
        </TabsContent>
        
        <TabsContent value="study">
          {selectedDeck && (
            <FlashcardStudy 
              deck={selectedDeck}
              onUpdateDeck={handleUpdateDeck}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FlashcardsPage;
