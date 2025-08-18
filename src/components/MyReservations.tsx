import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Calendar, Clock, MapPin, Wrench, X } from "lucide-react";
import { format } from "date-fns";

interface Reservation {
  id: string;
  resource_type: string;
  start_time: string;
  end_time: string;
  status: string;
  notes?: string;
  rooms?: { name: string; location: string };
  equipment?: { name: string; type: string };
}

const MyReservations = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchReservations = async () => {
    if (!user) return;

    try {
      // Fetch reservations first
      const { data: reservationsData, error: reservationsError } = await supabase
        .from('reservations')
        .select('*')
        .eq('user_id', user.id)
        .order('start_time', { ascending: true });

      if (reservationsError) throw reservationsError;

      // Then fetch related room and equipment data
      const reservationsWithDetails = await Promise.all(
        (reservationsData || []).map(async (reservation) => {
          if (reservation.resource_type === 'room') {
            const { data: roomData } = await supabase
              .from('rooms')
              .select('name, location')
              .eq('id', reservation.resource_id)
              .single();
            return { ...reservation, rooms: roomData };
          } else {
            const { data: equipmentData } = await supabase
              .from('equipment')
              .select('name, type')
              .eq('id', reservation.resource_id)
              .single();
            return { ...reservation, equipment: equipmentData };
          }
        })
      );

      setReservations(reservationsWithDetails);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      toast({
        title: "Error",
        description: "Failed to load your reservations.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const cancelReservation = async (reservationId: string) => {
    try {
      const { error } = await supabase
        .from('reservations')
        .update({ status: 'cancelled' })
        .eq('id', reservationId);

      if (error) throw error;

      toast({
        title: "Reservation Cancelled",
        description: "Your reservation has been cancelled successfully.",
      });

      fetchReservations();
    } catch (error) {
      console.error('Error cancelling reservation:', error);
      toast({
        title: "Error",
        description: "Failed to cancel reservation. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-success';
      case 'pending':
        return 'bg-warning';
      case 'cancelled':
        return 'bg-destructive';
      default:
        return 'bg-muted';
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Reservations</CardTitle>
          <CardDescription>Loading your reservations...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-foreground">My Reservations</h2>
        <p className="text-muted-foreground">Manage your upcoming and past reservations</p>
      </div>

      {reservations.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No reservations found</p>
              <p className="text-sm">Start by booking a room or equipment!</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {reservations.map((reservation) => {
            const resourceName = reservation.resource_type === 'room' 
              ? reservation.rooms?.name 
              : reservation.equipment?.name;
            const resourceDetails = reservation.resource_type === 'room'
              ? reservation.rooms?.location
              : reservation.equipment?.type;

            return (
              <Card key={reservation.id} className="bg-gradient-card border-border/50">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${reservation.resource_type === 'room' ? 'bg-gradient-primary' : 'bg-gradient-accent'} flex items-center justify-center`}>
                        {reservation.resource_type === 'room' ? (
                          <MapPin className="h-5 w-5 text-white" />
                        ) : (
                          <Wrench className="h-5 w-5 text-white" />
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{resourceName}</CardTitle>
                        <CardDescription>{resourceDetails}</CardDescription>
                      </div>
                    </div>
                    <Badge className={getStatusColor(reservation.status)}>
                      {reservation.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {format(new Date(reservation.start_time), 'EEEE, MMMM d, yyyy')}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {format(new Date(reservation.start_time), 'h:mm a')} - {format(new Date(reservation.end_time), 'h:mm a')}
                  </div>
                  {reservation.notes && (
                    <div className="text-sm text-muted-foreground">
                      <strong>Notes:</strong> {reservation.notes}
                    </div>
                  )}
                  {reservation.status === 'pending' && (
                    <div className="flex justify-end pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => cancelReservation(reservation.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyReservations;