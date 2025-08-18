-- Create rooms table
CREATE TABLE public.rooms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  capacity INTEGER NOT NULL,
  amenities TEXT[],
  description TEXT,
  is_available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create equipment table
CREATE TABLE public.equipment (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT,
  is_available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create reservations table
CREATE TABLE public.reservations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  resource_type TEXT NOT NULL CHECK (resource_type IN ('room', 'equipment')),
  resource_id UUID NOT NULL,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- Rooms policies (everyone can view, only admins can modify)
CREATE POLICY "Everyone can view rooms" 
ON public.rooms 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage rooms" 
ON public.rooms 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE user_id = auth.uid() AND role = 'admin'
));

-- Equipment policies (everyone can view, only admins can modify)
CREATE POLICY "Everyone can view equipment" 
ON public.equipment 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage equipment" 
ON public.equipment 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE user_id = auth.uid() AND role = 'admin'
));

-- Reservations policies
CREATE POLICY "Users can view their own reservations" 
ON public.reservations 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all reservations" 
ON public.reservations 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE user_id = auth.uid() AND role = 'admin'
));

CREATE POLICY "Users can create reservations" 
ON public.reservations 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reservations" 
ON public.reservations 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can update all reservations" 
ON public.reservations 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE user_id = auth.uid() AND role = 'admin'
));

-- Add triggers for updated_at
CREATE TRIGGER update_rooms_updated_at
BEFORE UPDATE ON public.rooms
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_equipment_updated_at
BEFORE UPDATE ON public.equipment
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_reservations_updated_at
BEFORE UPDATE ON public.reservations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data
INSERT INTO public.rooms (name, location, capacity, amenities, description) VALUES
('Conference Room A', 'Building 1, Floor 2', 12, ARRAY['Projector', 'Whiteboard', 'WiFi'], 'Large conference room with modern amenities'),
('Study Room 101', 'Library, Floor 1', 6, ARRAY['Whiteboard', 'WiFi'], 'Quiet study room for small groups'),
('Lecture Hall B', 'Academic Building, Floor 3', 50, ARRAY['Projector', 'Audio System', 'WiFi'], 'Large lecture hall for presentations'),
('Meeting Room C', 'Administration Building, Floor 1', 8, ARRAY['TV Screen', 'WiFi'], 'Small meeting room for staff discussions');

INSERT INTO public.equipment (name, type, description) VALUES
('Laptop - Dell XPS 13', 'Laptop', 'High-performance laptop for presentations and work'),
('Projector - Epson 3LCD', 'Projector', 'Portable projector for presentations'),
('Microphone - Wireless Lapel', 'Audio', 'Wireless lapel microphone for events'),
('Camera - Canon EOS', 'Camera', 'Professional camera for documentation'),
('Tablet - iPad Pro', 'Tablet', 'Tablet for digital presentations and note-taking');