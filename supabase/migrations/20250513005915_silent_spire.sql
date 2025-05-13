/*
  # Add user_id to flashcards and set up RLS policies

  1. Changes
    - Add user_id column to flashcards table
    - Add foreign key constraint to auth.users
    - Add RLS policies for user-specific access

  2. Security
    - Enable RLS on flashcards table
    - Add policies for authenticated users to:
      - Read their own flashcards
      - Create flashcards (with their user_id)
      - Delete their own flashcards
*/

ALTER TABLE flashcards 
ADD COLUMN user_id UUID REFERENCES auth.users(id);

-- Enable RLS
ALTER TABLE flashcards ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own flashcards"
ON flashcards
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own flashcards"
ON flashcards
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own flashcards"
ON flashcards
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);