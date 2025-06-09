-- Update the goals table to support all the new categories
ALTER TABLE goals DROP CONSTRAINT IF EXISTS goals_category_check;

-- Add the new constraint with all supported categories
ALTER TABLE goals ADD CONSTRAINT goals_category_check 
CHECK (category IN (
  'emergency', 
  'retirement', 
  'house', 
  'education', 
  'vacation', 
  'other',
  'car',
  'wedding',
  'child'
));

-- Also update the priority constraint to make sure it's correct
ALTER TABLE goals DROP CONSTRAINT IF EXISTS goals_priority_check;
ALTER TABLE goals ADD CONSTRAINT goals_priority_check 
CHECK (priority IN ('low', 'medium', 'high'));
