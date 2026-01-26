-- Create dev_consultation_requests table for storing contact form submissions
CREATE TABLE IF NOT EXISTS dev_consultation_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  inquiry_type TEXT NOT NULL,
  budget TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE dev_consultation_requests ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous inserts (for contact form submissions)
CREATE POLICY "Allow anonymous inserts" ON dev_consultation_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow authenticated users to read all requests (for admin)
CREATE POLICY "Allow authenticated read" ON dev_consultation_requests
  FOR SELECT
  TO authenticated
  USING (true);
