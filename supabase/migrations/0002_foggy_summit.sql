/*
  # Add key expiration and HWID tracking

  1. Changes
    - Add expires_at column to keys table
    - Add hwid column to keys table
    
  2. Security
    - Maintain existing RLS policies
*/

ALTER TABLE keys 
ADD COLUMN IF NOT EXISTS expires_at timestamptz NOT NULL DEFAULT (now() + interval '24 hours'),
ADD COLUMN IF NOT EXISTS hwid text;