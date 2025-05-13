import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Flashcard } from '@/types/flashcard';
import { FlashcardItem } from './FlashcardItem';

export function FlashcardList() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadFlashcards = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setFlashcards([]);
        return;
      }

      const { data, error } = await supabase
        .from('flashcards')
        .select('*')
        .eq('user_id', user.id)
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

    // Add event listener for flashcard creation
    const handleFlashcardCreated = () => {
      loadFlashcards();
    };

    window.addEventListener('flashcard-created', handleFlashcardCreated);

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        loadFlashcards();
      } else if (event === 'SIGNED_OUT') {
        setFlashcards([]);
      }
    });

    // Cleanup event listeners
    return () => {
      window.removeEventListener('flashcard-created', handleFlashcardCreated);
      subscription.unsubscribe();
    };
  }, []);

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