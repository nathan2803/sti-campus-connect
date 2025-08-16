import React from 'react';
import Navigation from "@/components/ui/navigation";
import { useAuth } from '@/contexts/AuthContext';
import StatCard from "@/components/StatCard";
import { 
  Users, 
  Building, 
  Package, 
  Calendar, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Settings,
  UserCheck,
  BarChart3
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  const { profile } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Admin Header */}
      <div className="bg-gradient-primary text-primary-foreground py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-primary-foreground/80 mt-2">
                Welcome back, {profile?.first_name} {profile?.last_name}
              </p>
              <p className="text-primary-foreground/60 text-sm">
                Campus Resource Management System - Administrative Control
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="secondary">
                <Settings className="h-4 w-4 mr-2" />
                System Settings
              </Button>
              <Button variant="secondary">
                <BarChart3 className="h-4 w-4 mr-2" />
                Generate Reports
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* System Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value="248"
            icon={Users}
            variant="default"
            change={{ value: "12 new this week", trend: "up" }}
          />
          <StatCard
            title="Active Bookings"
            value="67"
            icon={Calendar}
            variant="accent"
            change={{ value: "15% increase", trend: "up" }}
          />
          <StatCard
            title="System Utilization"
            value="84%"
            icon={TrendingUp}
            variant="success"
            change={{ value: "8% from last month", trend: "up" }}
          />
          <StatCard
            title="Pending Approvals"
            value="12"
            icon={Clock}
            variant="warning"
            change={{ value: "3 urgent", trend: "neutral" }}
          />
        </div>

        {/* Management Sections */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* User Management */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserCheck className="h-5 w-5 mr-2 text-primary" />
                User Management
              </CardTitle>
              <CardDescription>
                Manage faculty and staff accounts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Faculty Members</span>
                <span className="font-medium">186</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Staff Members</span>
                <span className="font-medium">52</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Department Heads</span>
                <span className="font-medium">10</span>
              </div>
              <Button className="w-full mt-4">Manage Users</Button>
            </CardContent>
          </Card>

          {/* Resource Overview */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="h-5 w-5 mr-2 text-primary" />
                Resource Overview
              </CardTitle>
              <CardDescription>
                Campus facilities and equipment status
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Rooms</span>
                <span className="font-medium">156</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Equipment Items</span>
                <span className="font-medium">487</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Under Maintenance</span>
                <span className="font-medium text-warning">8</span>
              </div>
              <Button className="w-full mt-4">Manage Resources</Button>
            </CardContent>
          </Card>

          {/* System Health */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                System Health
              </CardTitle>
              <CardDescription>
                Current system status and alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-success mr-2" />
                  <span className="text-sm">Database</span>
                </div>
                <span className="text-success font-medium">Healthy</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-success mr-2" />
                  <span className="text-sm">Authentication</span>
                </div>
                <span className="text-success font-medium">Online</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <AlertTriangle className="h-4 w-4 text-warning mr-2" />
                  <span className="text-sm">Backup Status</span>
                </div>
                <span className="text-warning font-medium">Warning</span>
              </div>
              <Button className="w-full mt-4">View Details</Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity & Pending Approvals */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Pending Approvals */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Pending Approvals</CardTitle>
              <CardDescription>
                Requests requiring administrative review
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-4 bg-warning/10">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">Conference Room A - Extended Hours</p>
                    <p className="text-sm text-muted-foreground">Dr. Maria Santos - IT Department</p>
                    <p className="text-sm text-muted-foreground">Requested: Tomorrow 6:00 PM - 10:00 PM</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">Deny</Button>
                    <Button size="sm">Approve</Button>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">Projector Equipment - Weekend Use</p>
                    <p className="text-sm text-muted-foreground">Prof. Juan Dela Cruz - Business</p>
                    <p className="text-sm text-muted-foreground">Requested: Saturday 8:00 AM - 5:00 PM</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">Deny</Button>
                    <Button size="sm">Approve</Button>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">Lab C-205 - Special Event Setup</p>
                    <p className="text-sm text-muted-foreground">Ms. Ana Reyes - Events Coordinator</p>
                    <p className="text-sm text-muted-foreground">Requested: Next Friday 2:00 PM - 8:00 PM</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">Deny</Button>
                    <Button size="sm">Approve</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent System Activity */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Recent System Activity</CardTitle>
              <CardDescription>
                Latest system events and user actions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">New user registered</p>
                  <p className="text-xs text-muted-foreground">Prof. Lisa Wong joined as Faculty</p>
                  <p className="text-xs text-muted-foreground">2 minutes ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Room booking confirmed</p>
                  <p className="text-xs text-muted-foreground">Room B-304 booked for tomorrow 10:00 AM</p>
                  <p className="text-xs text-muted-foreground">5 minutes ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Equipment maintenance</p>
                  <p className="text-xs text-muted-foreground">Projector P-012 marked for maintenance</p>
                  <p className="text-xs text-muted-foreground">15 minutes ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Booking cancelled</p>
                  <p className="text-xs text-muted-foreground">Lab A-102 booking cancelled by user</p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Approval processed</p>
                  <p className="text-xs text-muted-foreground">Conference Room C booking approved</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;