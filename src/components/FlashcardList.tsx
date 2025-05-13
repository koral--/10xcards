import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Flashcard } from '@/types/flashcard';
import { FlashcardItem } from './FlashcardItem';

export function FlashcardList({ trigger }: { trigger: number }) {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadFlashcards = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('flashcards')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFlashcards(data);
    } catch (error) {
      console.error('Error loading flashcards:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFlashcards();
  }, [trigger]);

  if (isLoading) {
    return <div className="text-center py-8">Loading flashcards...</div>;
  }

  if (flashcards.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No flashcards yet. Create your first one above!
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {flashcards.map((flashcard) => (
        <FlashcardItem 
          key={flashcard.id} 
          flashcard={flashcard} 
          onDelete={loadFlashcards}
        />
      ))}
    </div>
  );
}