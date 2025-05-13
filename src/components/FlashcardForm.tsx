import { useState } from 'react';
import { Button } from './ui/button.tsx';
import { Textarea } from './ui/textarea.tsx';
import { useToast } from '../hooks/use-toast.ts';
import { supabase } from '../lib/supabase.ts';
import { textImprover } from '../lib/textImprover.ts';
import { Wand2 } from 'lucide-react';

export function FlashcardForm() {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isImproving, setIsImproving] = useState(false);
  const { toast } = useToast();

  const isValid = front.length > 0 && front.length <= 200 && back.length > 0 && back.length <= 500;
  const canImprove = front.length > 0 || back.length > 0;

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

  async function handleImprove() {
    if (!canImprove) return;

    setIsImproving(true);
    try {
      const [improvedFront, improvedBack] = await Promise.all([
        front ? textImprover.improve(front) : front,
        back ? textImprover.improve(back) : back
      ]);

      if (improvedFront === front && improvedBack === back) {
        toast({
          description: "No improvements needed! Your text looks good.",
        });
      } else {
        setFront(improvedFront);
        setBack(improvedBack);
        toast({
          title: "Text improved!",
          description: "The text has been checked and improved.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to improve text. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsImproving(false);
    }
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

      <div className="flex gap-4">
        <Button
          type="button"
          onClick={handleImprove}
          disabled={!canImprove || isImproving}
          className="flex-1"
        >
          <Wand2 className="w-4 h-4 mr-2" />
          {isImproving ? 'Improving...' : 'Fix Flashcard'}
        </Button>
        <Button 
          type="submit" 
          disabled={!isValid || isSubmitting}
          className="flex-1"
        >
          {isSubmitting ? 'Creating...' : 'Create Flashcard'}
        </Button>
      </div>
    </form>
  );
}