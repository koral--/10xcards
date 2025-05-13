import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

export function FlashcardForm() {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const isValid = front.length > 0 && front.length <= 200 && back.length > 0 && back.length <= 500;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;

    setIsSubmitting(true);
    
    const { data: { user } } = await supabase.auth.getUser();
    
    const { error } = await supabase
      .from('flashcards')
      .insert([{ 
        front, 
        back,
        user_id: user?.id 
      }]);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to create flashcard. Please try again.",
        variant: "destructive",
      });
    } else {
      setFront('');
      setBack('');
      toast({
        title: "Success!",
        description: "Flashcard created successfully.",
      });
      window.dispatchEvent(new CustomEvent('flashcard-created'));
    }
    
    setIsSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Front (max 200 characters)
        </label>
        <Textarea
          placeholder="Enter the front of your flashcard..."
          value={front}
          onChange={(e) => setFront(e.target.value)}
          className="min-h-[100px]"
        />
        <p className="text-sm text-muted-foreground">
          {front.length}/200 characters
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Back (max 500 characters)
        </label>
        <Textarea
          placeholder="Enter the back of your flashcard..."
          value={back}
          onChange={(e) => setBack(e.target.value)}
          className="min-h-[150px]"
        />
        <p className="text-sm text-muted-foreground">
          {back.length}/500 characters
        </p>
      </div>

      <Button 
        type="submit" 
        disabled={!isValid || isSubmitting}
        className="w-full"
      >
        {isSubmitting ? 'Creating...' : 'Create Flashcard'}
      </Button>
    </form>
  );
}