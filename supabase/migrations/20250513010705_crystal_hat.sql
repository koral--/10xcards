/*
  # Update authentication settings and add user_id to flashcards

  1. Changes
    - Add user_id column to flashcards table
    - Link flashcards to auth.users
    - Disable email confirmation requirement
  
  2. Security
    - Enable RLS on flashcards table
    - Add policies for user data access
*/

-- Disable email confirmation requirement
ALTER TABLE auth.users
ALTER COLUMN confirmed_at
SET DEFAULT NOW();

ALTER TABLE auth.users
ALTER COLUMN email_confirmed_at
SET DEFAULT NOW();

-- Add user_id to flashcards
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