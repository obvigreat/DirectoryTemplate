-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  file_path TEXT NOT NULL,
  file_url TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'uploaded',
  analysis JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  processed_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create listing_analysis_master table
CREATE TABLE IF NOT EXISTS listing_analysis_master (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  document_ids UUID[] NOT NULL,
  analysis JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create storage bucket for documents if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for documents bucket
CREATE POLICY "Documents are accessible to their owners"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Anyone can upload documents"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'documents');

CREATE POLICY "Document owners can update their documents"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Document owners can delete their documents"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Enable RLS on documents tables
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_analysis_master ENABLE ROW LEVEL SECURITY;

-- Set up RLS policies for documents table
CREATE POLICY "Documents are accessible to their owners"
  ON documents FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Document owners can insert documents"
  ON documents FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Document owners can update their documents"
  ON documents FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Document owners can delete their documents"
  ON documents FOR DELETE
  USING (user_id = auth.uid());

-- Set up RLS policies for listing_analysis_master table
CREATE POLICY "Listing analyses are accessible to their owners"
  ON listing_analysis_master FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Listing analysis owners can insert analyses"
  ON listing_analysis_master FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Listing analysis owners can update their analyses"
  ON listing_analysis_master FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Listing analysis owners can delete their analyses"
  ON listing_analysis_master FOR DELETE
  USING (user_id = auth.uid());

-- Add realtime support
ALTER PUBLICATION supabase_realtime ADD TABLE documents;
ALTER PUBLICATION supabase_realtime ADD TABLE listing_analysis_master;
