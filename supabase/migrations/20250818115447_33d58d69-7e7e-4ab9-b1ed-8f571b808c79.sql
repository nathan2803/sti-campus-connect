-- Create a default admin user directly in the profiles table
-- This simulates what would happen if an admin user signed up
-- We'll use a placeholder user_id that represents an admin account

-- First, let's create a function to generate a default admin profile
-- We'll insert a profile with admin role and default credentials
INSERT INTO public.profiles (
  user_id,
  sti_id,
  first_name,
  last_name,
  email,
  role,
  department
) VALUES (
  gen_random_uuid(),
  'ADMIN001',
  'System',
  'Administrator',
  'admin@sti.edu',
  'admin',
  'Administration'
);

-- Also create a few sample faculty/staff users for testing
INSERT INTO public.profiles (
  user_id,
  sti_id,
  first_name,
  last_name,
  email,
  role,
  department
) VALUES 
(
  gen_random_uuid(),
  'FAC001',
  'John',
  'Doe',
  'john.doe@sti.edu',
  'faculty',
  'Computer Science'
),
(
  gen_random_uuid(),
  'STAFF001',
  'Jane',
  'Smith',
  'jane.smith@sti.edu',
  'staff',
  'Academic Affairs'
),
(
  gen_random_uuid(),
  'DEPT001',
  'Robert',
  'Johnson',
  'robert.johnson@sti.edu',
  'department_head',
  'Information Technology'
);