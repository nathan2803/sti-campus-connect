import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Settings, 
  Bell, 
  User, 
  Building, 
  Package, 
  LogOut, 
  Shield, 
  Menu,
  X
} from "lucide-react";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { profile, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

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

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-foreground hover:bg-secondary"
              onClick={() => navigate('/')}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-foreground hover:bg-secondary"
              onClick={() => navigate('/reservations')}
            >
              <Building className="h-4 w-4 mr-2" />
              Reservations
            </Button>
          </div>

          {/* User Actions - Desktop */}
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-accent rounded-full"></span>
            </Button>
            
            {/* Admin Dashboard Link */}
            {isAdmin && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/admin')}
                className="relative"
              >
                <Shield className="h-4 w-4" />
                <span className="ml-2 hidden lg:inline">Admin</span>
              </Button>
            )}
            
            {/* User Profile */}
            <Button variant="ghost" size="sm" className="relative">
              <User className="h-4 w-4" />
              <span className="ml-2 hidden lg:inline">
                {profile?.first_name || 'Profile'}
              </span>
            </Button>
            
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4" />
              <span className="ml-2 hidden lg:inline">Logout</span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <div className="px-4 py-2 space-y-2">
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => navigate('/')}
            >
              <Calendar className="h-4 w-4 mr-3" />
              Dashboard
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => navigate('/reservations')}
            >
              <Building className="h-4 w-4 mr-3" />
              Reservations
            </Button>
            {isAdmin && (
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => navigate('/admin')}
              >
                <Shield className="h-4 w-4 mr-3" />
                Admin Dashboard
              </Button>
            )}
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="h-4 w-4 mr-3" />
              Settings
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;