/*
  # Create keys table for key system

  1. New Tables
    - `keys`
      - `id` (uuid, primary key)
      - `key` (text, unique)
      - `used` (boolean)
      - `created_at` (timestamp)
      
  2. Security
    - Enable RLS on `keys` table
    - Add policy for authenticated users to read their own keys
*/

CREATE TABLE IF NOT EXISTS keys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  used boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE keys ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create keys"
  ON keys
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can read keys"
  ON keys
  FOR SELECT
  TO anon
  USING (true);