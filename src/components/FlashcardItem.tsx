import { useState } from 'react';
import { Card } from './ui/card.tsx';
import { Button } from './ui/button.tsx';
import { Rotate3D, Trash2 } from 'lucide-react';
import type { Flashcard } from '../types/flashcard.ts';
import { supabase } from '../lib/supabase.ts';
import { useToast } from '../hooks/use-toast.ts';

interface FlashcardItemProps {
  flashcard: Flashcard;
  onDelete: () => void;
}

export function FlashcardItem({ flashcard, onDelete }: FlashcardItemProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from('flashcards')
        .delete()
        .eq('id', flashcard.id);

      if (error) throw error;

      toast({
        description: "Flashcard deleted successfully",
      });
      
      onDelete();
    } catch (error) {
      toast({
        description: "Failed to delete flashcard",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="relative perspective-1000">
      <div
        className={`relative w-full transition-transform duration-500 preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        <Card className="p-4 backface-hidden min-h-[160px] flex flex-col">
          <div className="flex-1 overflow-hidden">
            <p className="text-lg font-medium overflow-hidden text-ellipsis">
              {flashcard.front}
            </p>
          </div>
          <div className="flex justify-end gap-2 mt-2 pt-2 border-t">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <Rotate3D className="h-4 w-4" />
            </Button>
          </div>
        </Card>

        <Card 
          className="p-4 absolute inset-0 backface-hidden rotate-y-180 bg-muted min-h-[160px] flex flex-col"
        >
          <div className="flex-1 overflow-hidden">
            <p className="text-lg overflow-hidden text-ellipsis">
              {flashcard.back}
            </p>
          </div>
          <div className="flex justify-end gap-2 mt-2 pt-2 border-t">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <Rotate3D className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}