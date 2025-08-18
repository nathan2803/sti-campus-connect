import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import ReservationCard from "@/components/ReservationCard";
import ReservationForm from "@/components/ReservationForm";
import MyReservations from "@/components/MyReservations";
import { Search, MapPin, Wrench } from "lucide-react";

interface Room {
  id: string;
  name: string;
  location: string;
  capacity: number;
  amenities: string[];
  description?: string;
}

interface Equipment {
  id: string;
  name: string;
  type: string;
  description?: string;
}

const Reservations = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedResource, setSelectedResource] = useState<{
    id: string;
    type: "room" | "equipment";
    name: string;
  } | null>(null);
  const { toast } = useToast();

  const fetchRooms = async () => {
    try {
      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .eq('is_available', true)
        .order('name');

      if (error) throw error;
      setRooms(data || []);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      toast({
        title: "Error",
        description: "Failed to load rooms.",
        variant: "destructive",
      });
    }
  };

  const fetchEquipment = async () => {
    try {
      const { data, error } = await supabase
        .from('equipment')
        .select('*')
        .eq('is_available', true)
        .order('name');

      if (error) throw error;
      setEquipment(data || []);
    } catch (error) {
      console.error('Error fetching equipment:', error);
      toast({
        title: "Error",
        description: "Failed to load equipment.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([fetchRooms(), fetchEquipment()]);
      setIsLoading(false);
    };
    loadData();
  }, []);

  const handleReserve = (id: string, type: "room" | "equipment") => {
    const resource = type === 'room' 
      ? rooms.find(r => r.id === id)
      : equipment.find(e => e.id === id);
    
    if (resource) {
      setSelectedResource({
        id,
        type,
        name: resource.name
      });
    }
  };

  const filteredRooms = rooms.filter(room =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredEquipment = equipment.filter(eq =>
    eq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    eq.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Loading...</CardTitle>
            <CardDescription>Please wait while we load the reservation system.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Campus Reservations</h1>
        <p className="text-muted-foreground">Book rooms and equipment for your activities</p>
      </div>

      <Tabs defaultValue="browse" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="browse">Browse & Book</TabsTrigger>
          <TabsTrigger value="my-reservations">My Reservations</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search rooms or equipment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Tabs defaultValue="rooms" className="space-y-6">
            <TabsList>
              <TabsTrigger value="rooms" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Rooms ({filteredRooms.length})
              </TabsTrigger>
              <TabsTrigger value="equipment" className="flex items-center gap-2">
                <Wrench className="h-4 w-4" />
                Equipment ({filteredEquipment.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="rooms">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRooms.map((room) => (
                  <ReservationCard
                    key={room.id}
                    id={room.id}
                    name={room.name}
                    type="room"
                    description={room.description}
                    location={room.location}
                    capacity={room.capacity}
                    amenities={room.amenities}
                    onReserve={handleReserve}
                  />
                ))}
              </div>
              {filteredRooms.length === 0 && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center text-muted-foreground">
                      <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No rooms found matching your search</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="equipment">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEquipment.map((eq) => (
                  <ReservationCard
                    key={eq.id}
                    id={eq.id}
                    name={eq.name}
                    type="equipment"
                    description={eq.description}
                    onReserve={handleReserve}
                  />
                ))}
              </div>
              {filteredEquipment.length === 0 && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center text-muted-foreground">
                      <Wrench className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No equipment found matching your search</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="my-reservations">
          <MyReservations />
        </TabsContent>
      </Tabs>

      {selectedResource && (
        <ReservationForm
          resourceId={selectedResource.id}
          resourceType={selectedResource.type}
          resourceName={selectedResource.name}
          onClose={() => setSelectedResource(null)}
          onSuccess={() => {
            // Optionally refresh data or switch to "My Reservations" tab
          }}
        />
      )}
    </div>
  );
};

export default Reservations;