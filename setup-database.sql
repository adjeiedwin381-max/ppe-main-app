-- PPE Requests Table Setup
-- Run this in your Supabase SQL Editor

-- Create table
CREATE TABLE IF NOT EXISTS ppe_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  item text NOT NULL,
  quantity integer NOT NULL DEFAULT 1,
  requested_by text NOT NULL,
  status text NOT NULL DEFAULT 'Pending',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE ppe_requests ENABLE ROW LEVEL SECURITY;

-- Create policies (open access for prototype)
CREATE POLICY "Anyone can view requests"
  ON ppe_requests FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert requests"
  ON ppe_requests FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update requests"
  ON ppe_requests FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Insert sample data
INSERT INTO ppe_requests (item, quantity, requested_by, status) VALUES
  ('Safety Goggles', 5, 'John Smith', 'Pending'),
  ('Hard Hat', 3, 'Jane Doe', 'Approved'),
  ('Safety Gloves', 10, 'Bob Johnson', 'Delivered'),
  ('Ear Plugs', 20, 'Alice Brown', 'Pending')
ON CONFLICT DO NOTHING;
