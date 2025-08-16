import { Button } from "@/components/ui/button";
import { Calendar, Settings, Bell, User, Building, Package } from "lucide-react";

const Navigation = () => {
  return (
    <nav className="bg-card border-b border-border shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Building className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">STI CRMS</h1>
                <p className="text-sm text-muted-foreground">Campus Resource Management</p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-foreground hover:bg-secondary">
              <Calendar className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            <Button variant="ghost" size="sm" className="text-foreground hover:bg-secondary">
              <Building className="h-4 w-4 mr-2" />
              Rooms
            </Button>
            <Button variant="ghost" size="sm" className="text-foreground hover:bg-secondary">
              <Package className="h-4 w-4 mr-2" />
              Equipment
            </Button>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-accent rounded-full"></span>
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-5 w-5 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center space-x-2">
              <User className="h-5 w-5 text-muted-foreground" />
              <span className="hidden sm:block text-sm text-foreground">Prof. Smith</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;