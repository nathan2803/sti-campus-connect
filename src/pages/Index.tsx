import Navigation from "@/components/ui/navigation";
import HeroSection from "@/components/HeroSection";
import QuickAccessCard from "@/components/QuickAccessCard";
import StatCard from "@/components/StatCard";
import { Building, Package, Calendar, Clock, Users, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      
      {/* Main Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            title="Available Rooms"
            value="142"
            icon={Building}
            variant="success"
            change={{ value: "8 more than yesterday", trend: "up" }}
          />
          <StatCard
            title="Equipment Ready"
            value="487"
            icon={Package}
            variant="default"
            change={{ value: "3 in maintenance", trend: "neutral" }}
          />
          <StatCard
            title="Today's Bookings"
            value="23"
            icon={Calendar}
            variant="accent"
            change={{ value: "5 more than last week", trend: "up" }}
          />
          <StatCard
            title="Active Faculty"
            value="156"
            icon={Users}
            variant="warning"
            change={{ value: "12 online now", trend: "up" }}
          />
        </div>

        {/* Quick Access Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <QuickAccessCard
              title="Book a Room"
              description="Reserve classrooms, labs, conference rooms, and auditoriums for your classes and meetings."
              icon={Building}
              buttonText="Browse Rooms"
              variant="primary"
              onClick={() => navigate('/reservations')}
            />
            <QuickAccessCard
              title="Request Equipment"
              description="Access audio-visual equipment, laptops, projectors, and specialized lab tools."
              icon={Package}
              buttonText="View Equipment"
              variant="accent"
              onClick={() => navigate('/reservations')}
            />
            <QuickAccessCard
              title="View Schedule"
              description="Check your bookings, upcoming reservations, and coordinate with colleagues."
              icon={Calendar}
              buttonText="Open Calendar"
              variant="success"
              onClick={() => navigate('/reservations')}
            />
          </div>
        </div>

        {/* Today's Schedule & Recent Activity */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Today's Schedule */}
          <div className="bg-card rounded-xl border border-border shadow-soft p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-primary" />
              Today's Schedule
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Room A-301</p>
                  <p className="text-sm text-muted-foreground">Programming Fundamentals</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-primary">9:00 AM</p>
                  <p className="text-sm text-muted-foreground">2 hours</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Conference Room B</p>
                  <p className="text-sm text-muted-foreground">Faculty Meeting</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-primary">2:00 PM</p>
                  <p className="text-sm text-muted-foreground">1 hour</p>
                </div>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-card rounded-xl border border-border shadow-soft p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">System Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-success mr-3" />
                  <span className="text-foreground">All Systems Operational</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-warning mr-3" />
                  <span className="text-foreground">3 Equipment Items in Maintenance</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <XCircle className="h-5 w-5 text-destructive mr-3" />
                  <span className="text-foreground">Lab C-205 Temporarily Unavailable</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
