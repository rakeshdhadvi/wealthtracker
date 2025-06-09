-- Add metadata column to assets table for storing additional investment details
ALTER TABLE assets ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}';

-- Add some useful indexes for better performance
CREATE INDEX IF NOT EXISTS idx_assets_metadata ON assets USING GIN (metadata);
CREATE INDEX IF NOT EXISTS idx_assets_user_type ON assets (user_id, asset_type);
