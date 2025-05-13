/*
  # Disable email confirmation and update flashcards table

  1. Authentication Changes
    - Disable email confirmation requirement by setting default values
    - Users will be automatically confirmed upon registration

  2. Flashcards Table Updates
    - Add user_id column with foreign key reference
    - Enable row level security
    - Add policies for user data access
*/

-- Disable email confirmation requirement
ALTER TABLE auth.users
ALTER COLUMN confirmed_at
SET DEFAULT NOW();

ALTER TABLE auth.users
ALTER COLUMN email_confirmed_at
SET DEFAULT NOW();

-- Add user_id to flashcards if it doesn't exist
DO $$ 
BEGIN 
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'flashcards' 
    AND column_name = 'user_id'
  ) THEN
    ALTER TABLE flashcards 
    ADD COLUMN user_id UUID REFERENCES auth.users(id);
  END IF;
END $$;

-- Enable RLS if not already enabled
ALTER TABLE flashcards ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate them
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Users can view their own flashcards" ON flashcards;
  DROP POLICY IF EXISTS "Users can create their own flashcards" ON flashcards;
  DROP POLICY IF EXISTS "Users can delete their own flashcards" ON flashcards;
END $$;

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