import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, Wrench } from "lucide-react";

interface ReservationCardProps {
  id: string;
  name: string;
  type: "room" | "equipment";
  description?: string;
  location?: string;
  capacity?: number;
  amenities?: string[];
  onReserve: (id: string, type: "room" | "equipment") => void;
}

const ReservationCard = ({ 
  id, 
  name, 
  type, 
  description, 
  location, 
  capacity, 
  amenities = [],
  onReserve 
}: ReservationCardProps) => {
  return (
    <Card className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-1 animate-scale-in bg-gradient-card border-border/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className={`w-12 h-12 rounded-xl ${type === 'room' ? 'bg-gradient-primary' : 'bg-gradient-accent'} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
            {type === 'room' ? (
              <MapPin className="h-6 w-6 text-white" />
            ) : (
              <Wrench className="h-6 w-6 text-white" />
            )}
          </div>
          <Badge variant="secondary" className="capitalize">
            {type}
          </Badge>
        </div>
        <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
          {name}
        </CardTitle>
        {description && (
          <CardDescription className="text-muted-foreground">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {type === 'room' && (
          <>
            {location && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {location}
              </div>
            )}
            {capacity && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                Capacity: {capacity} people
              </div>
            )}
            {amenities.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {amenities.map((amenity, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {amenity}
                  </Badge>
                ))}
              </div>
            )}
          </>
        )}
        <Button 
          className="w-full font-medium"
          onClick={() => onReserve(id, type)}
        >
          <Calendar className="h-4 w-4 mr-2" />
          Reserve {type === 'room' ? 'Room' : 'Equipment'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ReservationCard;