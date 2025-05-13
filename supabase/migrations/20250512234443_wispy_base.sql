/*
  # Create flashcards table

  1. New Tables
    - `flashcards`
      - `id` (uuid, primary key)
      - `front` (text, max 200 characters)
      - `back` (text, max 500 characters)
      - `created_at` (timestamp)

  2. Constraints
    - Text length limits enforced at database level
    - Default timestamp for created_at
*/

CREATE TABLE IF NOT EXISTS flashcards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  front text NOT NULL CHECK (char_length(front) <= 200),
  back text NOT NULL CHECK (char_length(back) <= 500),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE flashcards DISABLE ROW LEVEL SECURITY;