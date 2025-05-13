import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Rotate3D, Trash2 } from 'lucide-react';
import type { Flashcard } from '@/types/flashcard';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

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
        <Card className="p-6 backface-hidden">
          <div className="flex justify-between items-start">
            <p className="text-lg font-medium">{flashcard.front}</p>
            <div className="flex gap-2">
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
          </div>
        </Card>

        <Card 
          className="p-6 absolute inset-0 backface-hidden rotate-y-180 bg-muted"
        >
          <div className="flex justify-between items-start">
            <p className="text-lg">{flashcard.back}</p>
            <div className="flex gap-2">
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
          </div>
        </Card>
      </div>
    </div>
  );
}